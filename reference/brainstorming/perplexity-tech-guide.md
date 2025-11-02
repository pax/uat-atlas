# City Profiler - Technical Implementation Guide

## Database to JSON Export Script

This Python script exports the SQLite data to a JSON format suitable for embedding in the web app:

```python
#!/usr/bin/env python3
"""
Export cities.db to JSON for static web app deployment
Usage: python export_to_json.py --output app-data.json
"""

import sqlite3
import json
import argparse
from collections import defaultdict

def export_data(db_path, output_file):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # 1. Export cities
    cursor.execute("""
        SELECT id, name, county, pop, area, area_metro, pop_metro, rank, wikidata_id
        FROM cities
        ORDER BY rank
    """)
    cities = []
    for row in cursor.fetchall():
        cities.append({
            'id': row[0],
            'name': row[1],
            'county': row[2],
            'pop': row[3],
            'area': row[4],
            'area_metro': row[5],
            'pop_metro': row[6],
            'rank': row[7],
            'wikidata_id': row[8]
        })
    
    # 2. Export categories
    cursor.execute("SELECT DISTINCT category FROM city_stats ORDER BY category")
    categories = [row[0] for row in cursor.fetchall()]
    
    # 3. Export city_stats (nested by city)
    cursor.execute("SELECT city_id, category, count FROM city_stats")
    city_stats = defaultdict(dict)
    for city_id, category, count in cursor.fetchall():
        city_stats[city_id][category] = count
    
    # Convert to regular dict
    city_stats = dict(city_stats)
    
    # 4. Export city_meta (extended metadata)
    cursor.execute("""
        SELECT City_ID, meta_name, value 
        FROM city_meta
    """)
    city_meta = defaultdict(dict)
    for city_id, meta_name, value in cursor.fetchall():
        city_meta[city_id][meta_name] = value
    
    city_meta = dict(city_meta)
    
    # 5. Build final data structure
    app_data = {
        'version': '1.0',
        'generated': __import__('datetime').datetime.now().isoformat(),
        'cities': cities,
        'categories': categories,
        'city_stats': city_stats,
        'city_meta': city_meta
    }
    
    # 6. Write to file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(app_data, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Exported {len(cities)} cities")
    print(f"✓ Exported {len(categories)} categories")
    print(f"✓ Exported stats for {len(city_stats)} cities")
    print(f"✓ Output: {output_file}")
    
    conn.close()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Export SQLite database to JSON')
    parser.add_argument('--db', default='cities.db', help='Database file path')
    parser.add_argument('--output', default='app-data.json', help='Output JSON file')
    args = parser.parse_args()
    
    export_data(args.db, args.output)
```

## JavaScript Core Functions

### data.js - Data Management

```javascript
// Global app data holder
window.APP_DATA = {}; // Loaded from JSON file

class DataManager {
  static getCities() {
    return APP_DATA.cities || [];
  }
  
  static getCity(cityId) {
    return this.getCities().find(c => c.id === cityId);
  }
  
  static getCategories() {
    return APP_DATA.categories || [];
  }
  
  static getCityStats(cityId) {
    return APP_DATA.city_stats?.[cityId] || {};
  }
  
  static getCityMeta(cityId) {
    return APP_DATA.city_meta?.[cityId] || {};
  }
  
  static getStatForCity(cityId, category) {
    return this.getCityStats(cityId)[category] || 0;
  }
  
  static getMaxInCategory(category) {
    const stats = APP_DATA.city_stats || {};
    let max = 0;
    for (const cityStats of Object.values(stats)) {
      max = Math.max(max, cityStats[category] || 0);
    }
    return max;
  }
  
  static getNormalizedValue(value, category) {
    const max = this.getMaxInCategory(category);
    return max > 0 ? value / max : 0;
  }
}
```

### scoring.js - Calculation Engine

```javascript
class ScoringEngine {
  constructor() {
    this.profiles = {
      overall: {
        name: 'Overall Score',
        weights: this.getDefaultWeights()
      },
      kids: {
        name: 'Kids Friendly',
        weights: {
          'Schools': 20,
          'Gyms Fitness': 10,
          'Swimming pool': 15,
          'Museums': 15,
          'Cinema': 10,
          'Restaurants': 10,
          'Parks': 10
        }
      },
      nightlife: {
        name: 'Nightlife',
        weights: {
          'Clubs (dancing)': 30,
          'Pub Cafe': 25,
          'Restaurants': 15,
          'Hotels': 10,
          'Cinema': 10,
          'Fast Food': 10
        }
      },
      retirement: {
        name: 'Retirement Friendly',
        weights: {
          'Hospitals': 20,
          'Pharmacies': 20,
          'Doctor': 15,
          'Churches': 10,
          'Restaurants': 10,
          'Shopping': 10,
          'Pub Cafe': 5,
          'Parks': 10
        }
      },
      culture: {
        name: 'Culture & Arts',
        weights: {
          'Museums': 25,
          'theatre': 20,
          'culture_centers': 15,
          'Books': 15,
          'University': 15,
          'Churches': 10
        }
      }
    };
  }
  
  getDefaultWeights() {
    const categories = DataManager.getCategories();
    const weight = 100 / categories.length;
    const weights = {};
    categories.forEach(cat => {
      weights[cat] = weight;
    });
    return weights;
  }
  
  calculateWeightedScore(cityId, weights) {
    let totalScore = 0;
    let totalWeight = 0;
    
    for (const [category, weight] of Object.entries(weights)) {
      const value = DataManager.getStatForCity(cityId, category);
      const max = DataManager.getMaxInCategory(category);
      const normalized = max > 0 ? (value / max) * 100 : 0;
      totalScore += (normalized * weight) / 100;
      totalWeight += weight;
    }
    
    // Normalize by total weight
    return totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
  }
  
  getHeatmapColor(normalizedValue) {
    // Returns RGB color: red (0) to green (1)
    const h = normalizedValue * 120; // 0° red to 120° green
    const s = 100;
    const l = 50;
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  
  getRankingByProfile(profileKey) {
    const profile = this.profiles[profileKey];
    if (!profile) return [];
    
    const rankings = DataManager.getCities().map(city => ({
      city,
      score: this.calculateWeightedScore(city.id, profile.weights)
    }));
    
    return rankings.sort((a, b) => b.score - a.score);
  }
}
```

### components.js - UI Components

```javascript
class UI {
  static renderCityCard(city) {
    const stats = DataManager.getCityStats(city.id);
    const statCount = Object.keys(stats).length;
    
    return `
      <div class="city-card" data-city-id="${city.id}">
        <div class="city-card-header">
          <h3>${city.name}</h3>
          <span class="county">${city.county}</span>
        </div>
        <div class="city-card-stats">
          <div class="stat">Population: <strong>${this.formatNumber(city.pop)}</strong></div>
          <div class="stat">Area: <strong>${city.area} km²</strong></div>
          <div class="stat">Venues tracked: <strong>${statCount}</strong></div>
        </div>
        <button class="btn-add-comparison" onclick="ComparisonManager.addCity('${city.id}')">
          Add to Compare
        </button>
      </div>
    `;
  }
  
  static renderComparisonTable(cityIds, weights) {
    const cities = cityIds.map(id => DataManager.getCity(id));
    const categories = DataManager.getCategories();
    const scorer = new ScoringEngine();
    
    let html = `
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Category</th>
            ${cities.map(c => `<th>${c.name}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
    `;
    
    categories.forEach(category => {
      html += `<tr class="category-row">
        <td class="category-name">${category}</td>`;
      
      cityIds.forEach(cityId => {
        const value = DataManager.getStatForCity(cityId, category);
        const normalized = DataManager.getNormalizedValue(value, category);
        const color = scorer.getHeatmapColor(normalized);
        
        html += `<td style="background-color: ${color}; color: white;">
          ${value}
        </td>`;
      });
      
      html += `</tr>`;
    });
    
    // Add weighted score row
    html += `<tr class="weighted-score-row">
      <td class="category-name"><strong>Weighted Score</strong></td>`;
    
    cityIds.forEach(cityId => {
      const score = scorer.calculateWeightedScore(cityId, weights);
      html += `<td><strong>${score.toFixed(1)}%</strong></td>`;
    });
    
    html += `</tr></tbody></table>`;
    
    return html;
  }
  
  static renderCriteriaBuilder(onSave) {
    const categories = DataManager.getCategories();
    const scorer = new ScoringEngine();
    
    let html = `<div class="criteria-builder">
      <h3>Create Custom Criteria</h3>
      <div class="criteria-inputs">`;
    
    categories.forEach(category => {
      html += `
        <div class="criteria-item">
          <label>${category}</label>
          <input type="range" class="weight-slider" 
                 data-category="${category}" 
                 min="0" max="100" value="50">
          <span class="weight-value">50%</span>
        </div>
      `;
    });
    
    html += `
      </div>
      <div class="preset-profiles">
        <button class="preset-btn" data-profile="kids">Kids Friendly</button>
        <button class="preset-btn" data-profile="nightlife">Nightlife</button>
        <button class="preset-btn" data-profile="retirement">Retirement</button>
        <button class="preset-btn" data-profile="culture">Culture</button>
      </div>
      <div class="criteria-actions">
        <input type="text" placeholder="Save as..." class="criteria-name">
        <button class="btn-primary" onclick="${onSave}">Save Profile</button>
      </div>
    </div>`;
    
    return html;
  }
  
  static formatNumber(num) {
    if (!num) return 'N/A';
    return num.toLocaleString('en-US');
  }
}
```

## HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CityProfiler - Find Your Perfect Romanian City</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="navbar">
        <div class="container">
            <div class="logo">CityProfiler.ro</div>
            <nav class="nav-menu">
                <a href="#home">Home</a>
                <a href="#compare">Compare</a>
                <a href="#about">About</a>
            </nav>
        </div>
    </header>

    <main>
        <div id="app"></div>
    </main>

    <script src="app-data.json.js"></script>
    <script src="data.js"></script>
    <script src="scoring.js"></script>
    <script src="components.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

## Deployment Checklist

- [ ] Run export script: `python export_to_json.py --db cities.db --output app-data.json`
- [ ] Create `app-data.json.js`: wrap JSON in `window.APP_DATA = {...}`
- [ ] Test all comparison calculations locally
- [ ] Verify responsive design on mobile (320px, 768px)
- [ ] Minify CSS and JS for production
- [ ] Set up GZIP compression on server
- [ ] Add `.htaccess` for caching headers (if Apache)
- [ ] Test cross-browser compatibility
- [ ] Set up 404 redirect to index.html for SPA routing
- [ ] Add meta tags for SEO and social sharing
- [ ] Deploy to chosen hosting platform
- [ ] Monitor performance with Lighthouse
- [ ] Set up analytics (optional)

## Performance Optimization Tips

1. **Lazy load city images**: Use Intersection Observer
2. **Code splitting**: Load criteria builder only when needed
3. **Data compression**: GZIP all files (nginx/Apache)
4. **Caching strategy**: Cache app shell (HTML) for 1 day, data for 7 days
5. **Web fonts**: Use system fonts or subset Google Fonts
6. **Image optimization**: Compress city images to < 100KB each

## Future Enhancement: PHP Backend

If you decide to use PHP hosting later, here's a simple backend:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$db = new PDO('sqlite:cities.db');

$action = $_GET['action'] ?? 'all';

switch ($action) {
    case 'cities':
        $stmt = $db->query('SELECT * FROM cities ORDER BY rank');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;
    
    case 'stats':
        $cityId = $_GET['city'] ?? '';
        $stmt = $db->prepare('SELECT * FROM city_stats WHERE City_ID = ?');
        $stmt->execute([$cityId]);
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;
    
    case 'all':
        $cities = $db->query('SELECT * FROM cities')->fetchAll(PDO::FETCH_ASSOC);
        $stats = $db->query('SELECT * FROM city_stats')->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['cities' => $cities, 'stats' => $stats]);
        break;
}
?>
```

Then update app.js to fetch from the API:

```javascript
async function loadData() {
    const response = await fetch('api.php?action=all');
    window.APP_DATA = await response.json();
    initializeApp();
}

loadData();
```