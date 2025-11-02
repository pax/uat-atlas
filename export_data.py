#!/usr/bin/env python3
"""
Export SQLite data to JSON files for static site generation
This creates optimized JSON files that can be served statically
"""

import sqlite3
import json
import os
from pathlib import Path

def export_database_to_json(db_path, output_dir):
    """Export SQLite database to JSON files for static hosting"""
    
    # Create output directory
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    
    # Connect to database
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # 1. Export cities with all their data
    print("Exporting cities...")
    cursor.execute("""
        SELECT c.*, 
               GROUP_CONCAT(DISTINCT cm.meta_id || ':' || cm.value) as meta_values
        FROM cities c
        LEFT JOIN city_meta cm ON c.ID = cm.City_ID
        GROUP BY c.ID
        ORDER BY c.rank
    """)
    
    cities_data = []
    for row in cursor.fetchall():
        city = dict(row)
        
        # Parse meta values
        meta = {}
        if city['meta_values']:
            for meta_item in city['meta_values'].split(','):
                if ':' in meta_item:
                    key, value = meta_item.split(':', 1)
                    meta[key] = value
        city['meta'] = meta
        del city['meta_values']
        
        cities_data.append(city)
    
    # Save cities data
    with open(f"{output_dir}/cities.json", 'w', encoding='utf-8') as f:
        json.dump(cities_data, f, ensure_ascii=False, indent=2)
    
    # 2. Export categories
    print("Exporting categories...")
    cursor.execute("SELECT DISTINCT Category, api_ctg FROM categories ORDER BY Category")
    categories = [dict(row) for row in cursor.fetchall()]
    
    with open(f"{output_dir}/categories.json", 'w', encoding='utf-8') as f:
        json.dump(categories, f, ensure_ascii=False, indent=2)
    
    # 3. Export city stats (venue counts)
    print("Exporting city stats...")
    cursor.execute("""
        SELECT cs.City_ID, cs.category, cs.count, c.name as city_name
        FROM city_stats cs
        JOIN cities c ON cs.City_ID = c.ID
        ORDER BY c.rank, cs.category
    """)
    
    stats_by_city = {}
    for row in cursor.fetchall():
        city_id = row['City_ID']
        if city_id not in stats_by_city:
            stats_by_city[city_id] = {
                'city_id': city_id,
                'city_name': row['city_name'],
                'stats': {}
            }
        stats_by_city[city_id]['stats'][row['category']] = row['count']
    
    with open(f"{output_dir}/city_stats.json", 'w', encoding='utf-8') as f:
        json.dump(list(stats_by_city.values()), f, ensure_ascii=False, indent=2)
    
    # 4. Create a combined minimal dataset for quick loading
    print("Creating optimized combined dataset...")
    combined_data = {
        'cities': [],
        'categories': [cat['Category'] for cat in categories if cat['Category']],
        'stats': {}
    }
    
    for city in cities_data:
        city_info = {
            'id': city['ID'],
            'name': city['name'],
            'county': city['county'],
            'pop': city['pop'],
            'area': city['area'],
            'rank': city['rank'],
            'coords': None
        }
        
        # Extract coordinates from meta if available
        if 'P625' in city.get('meta', {}):
            coord_str = city['meta']['P625']
            if 'Point(' in coord_str:
                # Clean up the coordinate string
                coords_raw = coord_str.replace('Point(', '').replace(')', '').replace('"', '').replace(']', '')
                coords = coords_raw.split()
                try:
                    if len(coords) >= 2:
                        city_info['coords'] = [float(coords[1]), float(coords[0])]  # [lat, lng]
                except ValueError:
                    pass  # Skip invalid coordinates
        
        combined_data['cities'].append(city_info)
        
        # Add stats
        if city['ID'] in stats_by_city:
            combined_data['stats'][city['ID']] = stats_by_city[city['ID']]['stats']
    
    with open(f"{output_dir}/data.min.json", 'w', encoding='utf-8') as f:
        json.dump(combined_data, f, ensure_ascii=False, separators=(',', ':'))
    
    # 5. Export metadata definitions
    print("Exporting metadata definitions...")
    cursor.execute("SELECT * FROM metas ORDER BY name")
    metas = [dict(row) for row in cursor.fetchall()]
    
    with open(f"{output_dir}/metas.json", 'w', encoding='utf-8') as f:
        json.dump(metas, f, ensure_ascii=False, indent=2)
    
    conn.close()
    
    # Print summary
    print(f"\nExport complete!")
    print(f"- {len(cities_data)} cities")
    print(f"- {len(categories)} categories")
    print(f"- {sum(len(s['stats']) for s in stats_by_city.values())} stat entries")
    print(f"\nFiles created in {output_dir}:")
    for file in os.listdir(output_dir):
        size = os.path.getsize(f"{output_dir}/{file}")
        print(f"  - {file} ({size:,} bytes)")

if __name__ == "__main__":
    # Allow overriding via environment variables or CLI args
    import argparse

    parser = argparse.ArgumentParser(description='Export SQLite DB to JSON files')
    parser.add_argument('--db', dest='db_path', default=None,
                        help='Path to SQLite database (default: data/cities.db)')
    parser.add_argument('--out', dest='output_dir', default=None,
                        help='Output directory for JSON files (default: data/json)')
    args = parser.parse_args()

    db_path = args.db_path or os.environ.get('CITY_DB_PATH') or 'data/cities.db'
    output_dir = args.output_dir or os.environ.get('CITY_OUT_DIR') or 'data/json'

    print(f"Using DB path: {db_path}\nOutput directory: {output_dir}")
    export_database_to_json(db_path, output_dir)
