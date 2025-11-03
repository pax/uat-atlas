# City Comparison Table

Interactive city comparison tool with sortable DataTable, heatmap visualization, and customizable weighted scoring.

## Files

- **export_cities.py** - Python script to export database to JSON
- **cities_data.json** - Exported city data with normalized scores (0-100)
- **index.html** - Main application (vanilla JS, standalone)

## Setup

1. **Export data** (already done, but for future updates):
   ```bash
   python3 export_cities.py
   ```

2. **Run the application**:
   - Open `index.html` in a web browser
   - Or serve with a local server:
     ```bash
     python3 -m http.server 8000
     # Then visit http://localhost:8000
     ```

## Features

### 1. Sortable DataTable
- Click any column header to sort
- All 34 categories are displayed
- City name, weighted score, and social media links

### 2. Heatmap Visualization
- Color-coded cells (red → yellow → green)
- 0 = red, 50 = yellow, 100 = green
- Instant visual comparison across all metrics

### 3. Weighted Score Calculator
- Left panel: 34 sliders (one per category)
- Adjust weights from 0-100%
- Real-time score recalculation
- **Note**: Weights don't need to sum to 100% - they're normalized internally

### 4. Saved Profiles
Right panel buttons apply preset weight configurations:

- **Kids Friendly**: Schools (15%), Hospitals (12%), Pharmacies (10%), Swimming (8%), Sports (8%)
- **Nightlife**: Clubs (20%), Pubs/Cafes (18%), Restaurants (15%), Cinema (10%)
- **Retirement**: Hospitals (18%), Pharmacies (15%), Doctors (12%), Churches (10%)
- **Culture**: Museums (20%), Theatre (18%), Cinema (12%), Books (12%), Universities (10%)
- **Balanced**: Equal weights across all categories

### 5. Social Media Links
Last column shows available links:
- Official website
- Facebook
- YouTube

## Data Structure

### cities_data.json format:
```json
{
  "categories": ["ATMs", "Books", ...],
  "cities": [
    {
      "id": "bucuresti",
      "name": "București",
      "population": 1877155,
      "scores": {
        "ATMs": 100.0,
        "Books": 95.3,
        ...
      },
      "social": {
        "official_website": "...",
        "facebook_username": "...",
        ...
      }
    }
  ]
}
```

All scores are normalized 0-100 using min-max normalization across all cities for each category.

## Customization

### Adding New Profiles
Edit the `profiles` object in `index.html`:

```javascript
const profiles = {
  myProfile: {
    'CategoryName': 20,  // 20% weight
    'AnotherCategory': 30,
    // ... rest of categories
  }
};
```

Then add a button:
```html
<button class="profile-btn" data-profile="myProfile">My Profile</button>
```

### Changing Color Scheme
Modify `getHeatmapColor()` function in `index.html` to use different colors.

### Adjusting Normalization
Edit `normalize_scores()` in `export_cities.py` to use different normalization methods:
- Z-score normalization
- Log normalization
- Per-capita normalization (requires population data)

## Dependencies

All loaded from CDN (no local installation needed):
- jQuery 3.7.0
- DataTables 1.13.6

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Opera

## Performance

- Loads 14 cities × 34 categories instantly
- Real-time weight updates (<16ms)
- Smooth sorting and filtering

## Future Improvements

1. **Export Results**: Add CSV/PDF export functionality
2. **Compare Cities**: Select 2-3 cities for side-by-side comparison
3. **Custom Filters**: Filter by population range, region, etc.
4. **Historical Data**: Track score changes over time
5. **Responsive Design**: Better mobile layout
6. **Tooltips**: Show raw counts on hover
