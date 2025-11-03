# Database to JSON Export Script
# Extracts city statistics, social media links, and basic info from cities.db
# Normalizes scores to 0-100 scale using min-max normalization
# Outputs: city_data_export.json

import sqlite3
import json
from collections import defaultdict

def export_cities_db(db_path='cities.db', output_path='city_data_export.json'):
    """
    Export city data from SQLite database to JSON format.
    
    Args:
        db_path: Path to cities.db file
        output_path: Path where JSON will be saved
    
    Returns:
        Dictionary containing exported data
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Get all city stats and calculate normalization values
    cursor.execute("SELECT City_ID, category, count FROM city_stats")
    all_stats = cursor.fetchall()
    
    stats_by_category = defaultdict(list)
    for city, category, count in all_stats:
        stats_by_category[category].append(count)
    
    # Create normalized scores (0-100 scale using min-max normalization)
    normalized_stats = {}
    for city, category, count in all_stats:
        min_val = min(stats_by_category[category])
        max_val = max(stats_by_category[category])
        
        # Normalize to 0-100
        if max_val == min_val:
            normalized = 50  # middle value if all same
        else:
            normalized = ((count - min_val) / (max_val - min_val)) * 100
        
        if city not in normalized_stats:
            normalized_stats[city] = {}
        
        normalized_stats[city][category] = round(normalized, 2)
    
    # Get all cities basic info
    cursor.execute("SELECT ID, name, county, pop, area FROM cities")
    cities_info = {row[0]: {
        'name': row[1],
        'county': row[2],
        'population': row[3],
        'area': row[4]
    } for row in cursor.fetchall()}
    
    # Get social media links
    social_fields = [
        'official website',
        'YouTube handle',
        'YouTube channel ID',
        'Facebook location ID',
        'Facebook username'
    ]
    social_media = defaultdict(dict)
    
    cursor.execute(f"""
        SELECT City_ID, meta_name, value 
        FROM city_meta 
        WHERE meta_name IN ({','.join(['?' for _ in social_fields])})
    """, social_fields)
    
    for city_id, meta_name, value in cursor.fetchall():
        try:
            # Parse the JSON array stored as string
            parsed = json.loads(value)
            if parsed and len(parsed) > 0:
                social_media[city_id][meta_name] = parsed[0]
        except:
            pass
    
    # Build the final export structure
    export_data = {
        'cities': [],
        'metadata': {
            'categories': sorted(list(stats_by_category.keys())),
            'total_cities': len(cities_info),
            'normalization_method': 'min-max (0-100 scale)',
            'export_date': '2025-11-03'
        }
    }
    
    for city_id, city_info in cities_info.items():
        city_record = {
            'id': city_id,
            'name': city_info['name'],
            'county': city_info['county'],
            'population': city_info['population'],
            'area': city_info['area'],
            'scores': normalized_stats.get(city_id, {}),
            'social_media': dict(social_media.get(city_id, {}))
        }
        export_data['cities'].append(city_record)
    
    # Save to JSON
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(export_data, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Exported {len(export_data['cities'])} cities")
    print(f"✓ Categories included: {len(export_data['metadata']['categories'])}")
    print(f"✓ Saved to: {output_path}")
    
    conn.close()
    
    return export_data

if __name__ == '__main__':
    # Run export with default parameters
    export_cities_db()
