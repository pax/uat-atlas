#!/usr/bin/env python3
"""
Convert data from data/json format to format needed by perplexity-alpine prototype
"""

import json
import os
from pathlib import Path

def load_json_file(filepath):
    """Load a JSON file and return its contents"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def convert_data(input_dir, output_file):
    """Convert JSON data to the format needed by the prototype"""
    
    # Load source data
    cities_data = load_json_file(os.path.join(input_dir, 'cities.json'))
    categories_data = load_json_file(os.path.join(input_dir, 'categories.json'))
    stats_data = load_json_file(os.path.join(input_dir, 'city_stats.json'))
    
    # Prepare output data structure
    output = {
        'cities': [],
        'categories': [],
        'scores': {},
        'stats': {}  # Will keep the existing stats object unchanged
    }
    
    # Convert cities
    for city in cities_data:
        output['cities'].append({
            'id': city['ID'].lower(),  # Ensure lowercase IDs
            'name': city['name'],
            'pop': city['pop']
        })
    
    # Extract unique categories from the stats
    categories = set()
    for city_stat in stats_data:
        categories.update(city_stat['stats'].keys())
    output['categories'] = sorted(list(categories))
    
    # Convert scores
    for category in categories:
        output['scores'][category] = {}
        for city_stat in stats_data:
            if category in city_stat['stats']:
                city_id = city_stat['city_id'].lower()  # Ensure lowercase IDs
                output['scores'][category][city_id] = city_stat['stats'][category]
    
    # Write output
    output_path = Path(output_file)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            'data': output  # Wrap in data object since it's used as a module
        }, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    # Get the project root directory (where the script is located)
    project_root = Path(__file__).parent
    
    # Set paths relative to project root
    input_dir = project_root / "data" / "json"
    output_dir = project_root / "data" / "v3-perplexity-alpine"
    
    # Ensure output directory exists
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Set output file path
    output_file = output_dir / "data.js"
    
    # Convert data
    convert_data(input_dir, output_file)
    print(f"Converted data written to {output_file}")
    
    # Also create a symlink in the prototype directory for development
    prototype_data_path = project_root / "prototypes" / "v3" / "perplexity-alpine" / "data.js"
    if os.path.exists(prototype_data_path) or os.path.islink(prototype_data_path):
        os.remove(prototype_data_path)
    os.symlink(output_file, prototype_data_path)
    print(f"Created symlink at {prototype_data_path}")