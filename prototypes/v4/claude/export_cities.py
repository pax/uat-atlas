#!/usr/bin/env python3
"""
Export cities database to JSON format for the comparison table.
Normalizes all category scores to 0-100 scale.
"""

import sqlite3
import json
from collections import defaultdict

def normalize_scores(city_scores, category):
    """Normalize scores for a category to 0-100 scale using min-max normalization"""
    values = [score for score in city_scores.values() if score is not None]
    if not values or len(values) < 2:
        return {city: 50.0 for city in city_scores}  # Default to middle if not enough data
    
    min_val = min(values)
    max_val = max(values)
    
    if max_val == min_val:
        return {city: 50.0 for city in city_scores}  # All same, return middle
    
    normalized = {}
    for city, score in city_scores.items():
        if score is None:
            normalized[city] = 0.0
        else:
            normalized[city] = round(((score - min_val) / (max_val - min_val)) * 100, 2)
    
    return normalized

def get_social_media(cursor, city_id):
    """Extract social media links from city_meta"""
    social_fields = {
        'P856': 'official_website',
        'P11245': 'youtube_handle',
        'P2397': 'youtube_channel_id',
        'P4003': 'facebook_location_id',
        'P2013': 'facebook_username'
    }
    
    social = {}
    for prop_id, field_name in social_fields.items():
        cursor.execute("""
            SELECT value FROM city_meta 
            WHERE City_ID = ? AND meta_id = ?
        """, (city_id, prop_id))
        result = cursor.fetchone()
        if result:
            try:
                # Parse JSON array and get first value
                values = json.loads(result[0])
                if values and len(values) > 0:
                    social[field_name] = values[0]
            except:
                social[field_name] = result[0]
    
    return social

def export_data(db_path, output_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Get all cities
    cursor.execute("""
        SELECT ID, name, county, pop, area, pop_metro, area_metro, wikidata_id
        FROM cities
        ORDER BY pop DESC
    """)
    cities = cursor.fetchall()
    
    # Get all categories
    cursor.execute("SELECT DISTINCT category FROM city_stats ORDER BY category")
    categories = [row[0] for row in cursor.fetchall()]
    
    print(f"Processing {len(cities)} cities and {len(categories)} categories...")
    
    # Get all city_stats data
    cursor.execute("SELECT City_ID, category, count FROM city_stats")
    city_stats_raw = cursor.fetchall()
    
    # Organize data by category
    category_data = defaultdict(dict)
    for city_id, category, count in city_stats_raw:
        category_data[category][city_id] = count
    
    # Normalize each category
    normalized_scores = {}
    for category in categories:
        normalized_scores[category] = normalize_scores(category_data[category], category)
    
    # Build final data structure
    cities_data = []
    for city in cities:
        city_id, name, county, pop, area, pop_metro, area_metro, wikidata_id = city
        
        # Get normalized scores for this city
        scores = {}
        for category in categories:
            scores[category] = normalized_scores[category].get(city_id, 0.0)
        
        # Get social media
        social = get_social_media(cursor, city_id)
        
        city_data = {
            'id': city_id,
            'name': name,
            'county': county,
            'population': pop,
            'area': area,
            'population_metro': pop_metro,
            'area_metro': area_metro,
            'wikidata_id': wikidata_id,
            'scores': scores,
            'social': social
        }
        
        cities_data.append(city_data)
    
    # Export to JSON
    output = {
        'categories': categories,
        'cities': cities_data,
        'metadata': {
            'total_cities': len(cities),
            'total_categories': len(categories),
            'export_date': '2025-11-03'
        }
    }
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Exported {len(cities)} cities to {output_path}")
    print(f"✓ Categories: {', '.join(categories[:10])}{'...' if len(categories) > 10 else ''}")
    
    conn.close()

if __name__ == '__main__':
    export_data('/mnt/user-data/uploads/cities.db', '/home/claude/cities_data.json')
