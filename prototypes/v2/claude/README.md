# CityProfiler.ro - Romanian City Comparison Tool

A modern, responsive web application for comparing Romanian cities based on various criteria like amenities, culture, healthcare, and lifestyle factors.

## Features

- **Interactive Map View**: Visual representation of cities with score-based markers
- **List View**: Card-based city listings with scores and quick stats
- **Comparison Table**: Side-by-side comparison with heatmap visualization
- **Custom Criteria Builder**: Create personalized ranking criteria with weighted factors
- **City Profiles**: Detailed view of each city's statistics and amenities
- **Multi-City Comparison**: Compare up to 3 cities with radar charts
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Static-First Architecture**: Can be hosted anywhere (GitHub Pages, Netlify, etc.)

## Quick Start

### Static Deployment (Recommended)

1. **Generate Data Files**:
   ```bash
   python3 export_data.py
   ```
   This creates JSON files in the `data/` directory from your SQLite database.

2. **Deploy Files**:
   Upload these files to your web server or static hosting:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `data/` directory (with all JSON files)

3. **That's it!** Open `index.html` in a browser.

### Hosting Options

#### GitHub Pages (Free)
1. Push all files to a GitHub repository
2. Go to Settings → Pages
3. Select source branch and folder
4. Your site will be available at `https://[username].github.io/[repo-name]/`

#### Netlify (Free tier available)
1. Drag and drop your project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Get instant deployment with a custom URL

#### Vercel (Free tier available)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow prompts for deployment

#### Traditional Web Hosting
Simply upload all files via FTP to your web server's public directory.

### Optional PHP Backend

If you prefer dynamic data loading:

1. Upload `api.php` to your server
2. Place the SQLite database in `data/cities.db`
3. Update `app.js` to use the API endpoint:
   ```javascript
   // Replace the loadData() method in app.js
   async loadData() {
       const response = await fetch('api.php?action=cities');
       // ... rest of the code
   }
   ```

## Project Structure

```
cityprofiler/
├── index.html          # Main application HTML
├── styles.css          # Stylesheet
├── app.js             # JavaScript application
├── api.php            # Optional PHP backend
├── export_data.py     # Data export script
├── data/              # Data directory
│   ├── cities.db      # SQLite database (source)
│   ├── cities.json    # City data
│   ├── categories.json # Category definitions
│   ├── city_stats.json # Venue statistics
│   └── data.min.json  # Optimized combined data
└── README.md          # This file

```

## Data Management

### Updating City Data

1. **Update SQLite Database**: 
   Use your existing Python scripts to fetch new data from Google Places API

2. **Regenerate JSON Files**:
   ```bash
   python3 export_data.py
   ```

3. **Deploy Updated Files**:
   Upload the new JSON files to your hosting

### Database Schema

The application expects these tables in the SQLite database:

- **cities**: City information (ID, name, county, population, area, etc.)
- **categories**: Venue categories (hospitals, schools, restaurants, etc.)
- **city_stats**: Venue counts per city per category
- **city_meta**: Additional city metadata (coordinates, websites, etc.)
- **metas**: Metadata definitions

## Customization

### Adding New Criteria Presets

Edit the `criteriaPresets` object in `app.js`:

```javascript
criteriaPresets: {
    yourPreset: {
        name: 'Your Preset Name',
        weights: {
            'Category1': 0.30,
            'Category2': 0.25,
            // ... weights should sum to 1.0
        }
    }
}
```

### Styling

Modify `styles.css` to change colors, fonts, or layout. The app uses CSS variables for easy theming:

```css
:root {
    --primary: #2563eb;    /* Main brand color */
    --secondary: #10b981;  /* Accent color */
    /* ... other variables */
}
```

### Map Customization

The application uses Leaflet with OpenStreetMap tiles. To use different map tiles, modify in `app.js`:

```javascript
L.tileLayer('YOUR_TILE_URL', {
    attribution: 'Your attribution'
}).addTo(this.map);
```

## Performance Considerations

- **Static JSON files** are cached by browsers, ensuring fast subsequent loads
- **Minified data file** (`data.min.json`) is under 10KB for quick initial load
- **Lazy loading**: Detailed data loaded only when needed
- **Responsive images**: Map tiles load based on viewport

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features used
- Fallback for older browsers can be added with Babel transpilation

## API Endpoints (Optional PHP Backend)

If using the PHP backend, these endpoints are available:

- `api.php?action=cities` - Get all cities
- `api.php?action=stats&city_id=ID` - Get stats for specific city
- `api.php?action=categories` - Get all categories
- `api.php?action=compare&cities=ID1,ID2,ID3` - Compare multiple cities
- `api.php?action=search&q=QUERY` - Search cities by name
- `api.php?action=rankings&weights={JSON}` - Get custom rankings

## Troubleshooting

### Map not showing
- Check internet connection (map tiles need to load)
- Verify Leaflet CSS/JS files are loading

### Data not loading
- Check browser console for errors
- Verify JSON files are in `data/` directory
- Ensure correct file paths in `app.js`

### PHP API issues
- Check PHP version (7.4+ recommended)
- Verify SQLite PDO extension is enabled
- Check file permissions on database file

## Future Enhancements

Potential improvements from your roadmap:

- [ ] Multi-language support (RO/EN)
- [ ] User accounts for saving preferences
- [ ] More data sources (weather, cost of living, etc.)
- [ ] Social features (reviews, comments)
- [ ] Progressive Web App (PWA) capabilities
- [ ] Advanced filtering options
- [ ] Data normalization improvements
- [ ] Integration with Reddit discussions

## License

This project is open source. Feel free to modify and distribute.

## Credits

- Data sourced via Google Places API and OpenStreetMap
- Map tiles by OpenStreetMap contributors
- Icons and design inspired by modern web standards

## Contact

For questions or contributions, please open an issue on the project repository.
