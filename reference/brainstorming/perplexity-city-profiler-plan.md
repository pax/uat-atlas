# City Profiler - Web Application Plan

## Project Overview

**City Profiler** is a responsive web application for exploring and comparing Romanian cities based on venue statistics (pharmacies, restaurants, gyms, hotels, cultural institutions, etc.). The app allows users to:

- Browse city profiles with statistics
- Compare cities side-by-side
- Create custom comparison criteria
- Apply weighted scoring to find their ideal city

## Architecture & Deployment

### Tech Stack
- **Frontend**: HTML5, CSS3 (responsive design), Vanilla JavaScript (no frameworks)
- **Data**: SQLite database → JSON export → embedded in app
- **Hosting Options**:
  - **Static hosting** (GitHub Pages, Netlify, Vercel, AWS S3) - ✅ Recommended
  - **Shared PHP hosting** - with PHP backend to serve JSON
  - **No backend required** for static deployment

### Why Static Hosting is Optimal
- Zero server costs
- Unlimited scalability
- No database connection management needed
- Faster CDN delivery
- Data exported from SQLite as JSON and embedded in app.js

## Data Pipeline

### Current State
- **cities.db** (SQLite) contains:
  - `cities` table: 14 cities with metadata (name, population, area, coordinates)
  - `city_stats` table: Venue counts per city per category
  - `city_meta` table: Extended metadata (social media, images, etc.)
  - `categories` table: 34 venue categories
  - `metas` table: Metadata definitions

### Data Export Process
To deploy, extract from SQLite and convert to JSON:

```python
import sqlite3
import json

conn = sqlite3.connect('cities.db')
cursor = conn.cursor()

# Export cities with stats
cursor.execute("""
SELECT c.id, c.name, c.pop, c.area, c.county, c.rank
FROM cities c
ORDER BY c.pop DESC
""")
cities = cursor.fetchall()

# Build data structure for embedding
app_data = {
    'cities': [...],
    'categories': [...],
    'city_stats': {...},
    'city_meta': {...}
}

# Write to app.js as: window.APP_DATA = {...}
```

## Feature Set

### 1. Landing Page
- **Hero section** with call-to-action
- **Dual view toggle**: Map view / List view
- **Sidebar controls**:
  - Preset criteria buttons (Overall, Kids, Nightlife, Retirement, Culture)
  - Sort dropdown (by population, score, etc.)
  - City limit slider
- **Floating action button**: Shows selected cities count

### 2. City Profile View
- City header with image, name, population, area, county
- Social media links (Facebook, Instagram, Reddit if available)
- Statistics grid showing all venue categories with counts
- "Add to Comparison" button

### 3. Comparison Table
- Up to 3 cities as columns
- Categories as rows
- Heatmap coloring (red = low, green = high)
- **Weighted score calculation**:
  - Each category has a weight (0-100%)
  - Normalized score: `(count / max_in_category) * weight`
  - Total score: sum of all normalized weighted scores

### 4. Criteria Builder
- Create custom weighting profiles
- Sliders for each category (0-100%)
- Save/Load profiles
- Visual "recipe" showing the profile signature
- Copy to clipboard for sharing

### 5. Navigation & UI
- Responsive header with site logo
- Hamburger menu on mobile
- Breadcrumb navigation
- Tab navigation for different views

## UI Components

### Core Components
1. **CityCard**: Compact city info card
2. **StatisticsGrid**: Display venue counts
3. **ComparisonTable**: Heatmap-based comparison
4. **CriteriaSlider**: Weight adjustment for categories
5. **CitySelector**: Dropdown/search for city selection
6. **MapView**: Interactive map with city markers (using Leaflet or similar)

### Styling
- **Color scheme**: 
  - Primary: Modern blue/teal
  - Heatmap: Red → Yellow → Green
  - Text: Dark gray (#333) on white
- **Typography**: Clean sans-serif (e.g., Inter, Segoe UI)
- **Spacing**: 8px grid system
- **Responsiveness**: Mobile-first (320px, 768px, 1200px breakpoints)

## File Structure

```
city-profiler/
├── index.html          # Main entry point
├── styles.css          # Responsive styling
├── app.js              # Main application logic
├── components.js       # Reusable UI components
├── data.js             # Embedded app data (JSON export)
├── utils.js            # Helper functions
├── README.md           # Deployment instructions
└── assets/
    ├── logo.svg        # Site logo
    ├── icons/          # UI icons (SVG)
    └── images/         # City images
```

## Data Normalization & Scoring

### Heatmap Coloring
For each category and city:
```javascript
const normalized = (value) => {
  const max = Math.max(...values_in_category);
  return value / max; // 0-1 scale
};

const heatmapColor = (normalized) => {
  // Red (low): rgb(255, 0, 0)
  // Yellow (mid): rgb(255, 255, 0)
  // Green (high): rgb(0, 255, 0)
  const hue = normalized * 120; // 0° (red) to 120° (green)
  return `hsl(${hue}, 100%, 50%)`;
};
```

### Weighted Score
```javascript
const weightedScore = (city, weights) => {
  let score = 0;
  for (const [category, weight] of Object.entries(weights)) {
    const count = city_stats[city][category] || 0;
    const max = Math.max(...all_counts[category]);
    const normalized = count / max;
    score += normalized * weight;
  }
  return score / 100; // 0-100 scale
};
```

## Preset Profiles

| Profile | Focus Categories | Key Weights |
|---------|-----------------|-------------|
| **Overall** | All categories | Balanced (5-15% each) |
| **Kids Friendly** | Schools, Parks, Museums, Playgrounds | 15-20% each |
| **Nightlife** | Clubs, Pubs, Restaurants, Hotels | 25-30% |
| **Retirement** | Hospitals, Pharmacies, Parks, Restaurants | 20% each |
| **Culture** | Museums, Theatres, Universities, Culture Centers | 15-25% |

## Implementation Phases

### Phase 1: MVP (Core Features)
- [ ] Data export from SQLite to JSON
- [ ] Landing page with city list and map
- [ ] City profile page
- [ ] Basic comparison table (2 cities)
- [ ] Simple heatmap coloring

### Phase 2: Enhanced Features
- [ ] Criteria builder with sliders
- [ ] Preset profiles
- [ ] Weighted score calculation
- [ ] Save/load profiles (localStorage)
- [ ] Export comparison as CSV

### Phase 3: Polish & Optimization
- [ ] Mobile responsiveness refinement
- [ ] Performance optimization
- [ ] SEO metadata
- [ ] Analytics integration
- [ ] Multi-language support (i18n)

### Phase 4: Advanced Features
- [ ] Interactive map with filtering
- [ ] Reddit data integration (show city subreddits)
- [ ] Weather/AQI data
- [ ] User feedback collection
- [ ] Progressive Web App (PWA) support

## Deployment Instructions

### For Static Hosting (Recommended)

**GitHub Pages:**
```bash
# 1. Create repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/city-profiler.git
git push -u origin main

# 2. Enable GitHub Pages in repository settings
# 3. Set branch to 'main', folder to '/'
```

**Netlify:**
```bash
# 1. Connect repository to Netlify
# 2. Build settings: None (static site)
# 3. Publish directory: ./
# 4. Deploy
```

### For PHP Hosting

Create `api.php`:
```php
<?php
header('Content-Type: application/json');

$db = new PDO('sqlite:cities.db');
$action = $_GET['action'] ?? '';

if ($action === 'cities') {
    $stmt = $db->query('SELECT * FROM cities ORDER BY rank');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($action === 'stats') {
    $city = $_GET['city'] ?? '';
    $stmt = $db->prepare('SELECT * FROM city_stats WHERE City_ID = ?');
    $stmt->execute([$city]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}
?>
```

Update `app.js` to fetch from `api.php` instead of embedded data.

## Performance Considerations

- **Initial load**: < 2s (static files from CDN)
- **Comparison calculation**: < 100ms (JavaScript)
- **Search/filter**: Debounced to 300ms
- **Data size**: ~200KB gzipped (all cities + stats)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

1. **Real-time data sync**: Auto-update city stats periodically
2. **User accounts**: Save favorite profiles and comparisons
3. **Community voting**: Rate cities and criteria accuracy
4. **APIs integration**: Weather, traffic, housing prices
5. **Mobile app**: React Native version for iOS/Android
6. **ML-based recommendations**: Suggest best cities based on user preferences

## Notes & Considerations

- Data freshness: Update city_stats quarterly from Google Places API
- Population data should be normalized (statistics per 10,000 residents)
- Consider adding confidence scores for data accuracy
- Implement caching strategy for large datasets
- Add error handling for missing data
- Include methodology documentation in "About" section