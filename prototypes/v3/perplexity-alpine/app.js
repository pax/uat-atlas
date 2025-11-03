// Application state
let data = null;
let state = {
  selectedCities: [],
  selectedCategories: new Set(),
  viewMode: 'heatmap',
  sortBy: 'name'
};

// Import data from project data folder
async function loadData() {
  // Primary path (server root), then a relative fallback from this file's location
  const candidates = [
    '/data/v4-perplexity-city_data_export.json',
    '../../../v4-perplexity-city_data_export.json'
  ];

  for (const p of candidates) {
    try {
      const resp = await fetch(p);
      if (!resp.ok) {
        console.debug('No response for', p, 'status', resp.status);
        continue;
      }

      const contentType = (resp.headers.get('content-type') || '').toLowerCase();

      // If it's JSON, parse and validate structure
      if (contentType.includes('application/json') || p.endsWith('.json')) {
        const json = await resp.json();
        // Some exports wrap the payload under `data` key
        const payload = json.data || json;
        if (payload && payload.cities && payload.categories && payload.scores) {
          return payload;
        }
        console.debug('JSON loaded but missing keys from', p);
        continue;
      }

      // Otherwise treat as a JS module text and attempt to import
      const moduleText = await resp.text();
      const blob = new Blob([moduleText], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      try {
        const mod = await import(url);
        if (mod && mod.data) return mod.data;
      } finally {
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.debug('Error fetching', p, err);
      continue;
    }
  }

  // If we get here nothing worked
  showError('Failed to load data. Tried /data/v4-perplexity-city_data_export.json and ../../../v4-perplexity-city_data_export.json');
  console.error('Data load failed for all candidate paths');
  return null;
}

// City colors for bar view
const cityColors = [
  '#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F',
  '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'
];

// Initialize app
function init() {
  renderCitySelector();
  renderCategoryFilter();
  renderStatsPanel();
  attachEventListeners();
  updateView();
}

// Format population with commas
function formatPopulation(pop) {
  return pop.toLocaleString('en-US');
}

// Render city selector
function renderCitySelector() {
  const container = document.getElementById('citySelector');
  container.innerHTML = data.cities.map(city => `
    <label class="city-checkbox">
      <input type="checkbox" value="${city.id}" ${state.selectedCities.includes(city.id) ? 'checked' : ''}>
      <div class="city-label">
        <div class="city-name">${city.name}</div>
        <div class="city-pop">${formatPopulation(city.pop)}</div>
      </div>
    </label>
  `).join('');
}

// Render category filter
function renderCategoryFilter() {
  const container = document.getElementById('categoryFilter');
  const sortedCategories = getSortedCategories();
  
  container.innerHTML = sortedCategories.map(category => `
    <label class="category-checkbox">
      <input type="checkbox" value="${category}" ${state.selectedCategories.has(category) ? 'checked' : ''}>
      <span>${category}</span>
    </label>
  `).join('');
}

// Get sorted categories
function getSortedCategories() {
  const categories = [...data.categories];
  if (state.sortBy === 'name') {
    return categories.sort((a, b) => a.localeCompare(b));
  } else {
    return categories.sort((a, b) => {
      const avgA = calculateAverageScore(a);
      const avgB = calculateAverageScore(b);
      return avgB - avgA;
    });
  }
}

// Calculate average score for a category
function calculateAverageScore(category) {
  const scores = data.scores[category];
  if (!scores) return 0;
  const values = Object.values(scores);
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

// Render statistics panel
function renderStatsPanel() {
  const container = document.getElementById('statsPanel');
  const sortedCategories = getSortedCategories();
  const visibleCategories = sortedCategories.filter(cat => state.selectedCategories.has(cat));
  
  if (visibleCategories.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>Select categories to view statistics</p></div>';
    return;
  }
  
  container.innerHTML = visibleCategories.map(category => {
    const stats = data.stats[category] || {avg: 0, median: 0};
    return `
      <div class="stat-item">
        <div class="stat-category">${category}</div>
        <div class="stat-values">
          <div class="stat-row">
            <span class="stat-label">Average:</span>
            <span class="stat-value">${stats.avg.toFixed(6)}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Median:</span>
            <span class="stat-value">${stats.median.toFixed(6)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Get color for heatmap based on score
function getHeatmapColor(score) {
  // Red (0) -> Yellow (50) -> Green (100)
  if (score <= 50) {
    const ratio = score / 50;
    const r = 220;
    const g = Math.round(50 + ratio * 150);
    const b = 50;
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const ratio = (score - 50) / 50;
    const r = Math.round(220 - ratio * 120);
    const g = 200;
    const b = 50;
    return `rgb(${r}, ${g}, ${b})`;
  }
}

// Render heatmap view
function renderHeatmap() {
  const container = document.getElementById('comparisonView');
  const sortedCategories = getSortedCategories();
  const visibleCategories = sortedCategories.filter(cat => state.selectedCategories.has(cat));
  
  if (state.selectedCities.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🏙️</div>
        <div class="empty-state-text">Select 1-3 cities to compare</div>
      </div>
    `;
    return;
  }
  
  if (visibleCategories.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📊</div>
        <div class="empty-state-text">Select categories to display</div>
      </div>
    `;
    return;
  }
  
  const selectedCityData = state.selectedCities.map(cityId => 
    data.cities.find(c => c.id === cityId)
  );
  
  let html = '<div class="heatmap-container"><table class="heatmap-table">';
  
  // Header row
  html += '<thead><tr><th>Category</th>';
  selectedCityData.forEach(city => {
    html += `<th>${city.name}</th>`;
  });
  html += '<th>Average</th></tr></thead><tbody>';
  
  // Data rows
  visibleCategories.forEach(category => {
    html += `<tr><td>${category}</td>`;
    const scores = [];
    
    selectedCityData.forEach(city => {
      const score = data.scores[category]?.[city.id] || 0;
      scores.push(score);
      const color = getHeatmapColor(score);
      html += `<td class="heatmap-cell" style="background-color: ${color}">${score.toFixed(2)}</td>`;
    });
    
    const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
    const avgColor = getHeatmapColor(avg);
    html += `<td class="heatmap-cell" style="background-color: ${avgColor}">${avg.toFixed(2)}</td>`;
    html += '</tr>';
  });
  
  // Average row
  html += '<tr class="average-row"><td><strong>Average</strong></td>';
  selectedCityData.forEach(city => {
    const cityScores = visibleCategories.map(cat => data.scores[cat]?.[city.id] || 0);
    const avg = cityScores.reduce((sum, s) => sum + s, 0) / cityScores.length;
    html += `<td><strong>${avg.toFixed(2)}</strong></td>`;
  });
  
  const allScores = visibleCategories.flatMap(cat => 
    selectedCityData.map(city => data.scores[cat]?.[city.id] || 0)
  );
  const totalAvg = allScores.reduce((sum, s) => sum + s, 0) / allScores.length;
  html += `<td><strong>${totalAvg.toFixed(2)}</strong></td></tr>`;
  
  html += '</tbody></table></div>';
  container.innerHTML = html;
}

// Render bar view
function renderBarView() {
  const container = document.getElementById('comparisonView');
  const sortedCategories = getSortedCategories();
  const visibleCategories = sortedCategories.filter(cat => state.selectedCategories.has(cat));
  
  if (state.selectedCities.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🏙️</div>
        <div class="empty-state-text">Select 1-3 cities to compare</div>
      </div>
    `;
    return;
  }
  
  if (visibleCategories.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📊</div>
        <div class="empty-state-text">Select categories to display</div>
      </div>
    `;
    return;
  }
  
  const selectedCityData = state.selectedCities.map(cityId => 
    data.cities.find(c => c.id === cityId)
  );
  
  let html = '<div class="bar-view">';
  
  visibleCategories.forEach(category => {
    html += `<div class="bar-category">`;
    html += `<div class="bar-category-name">${category}</div>`;
    html += `<div class="bar-group">`;
    
    selectedCityData.forEach((city, index) => {
      const score = data.scores[category]?.[city.id] || 0;
      const color = cityColors[index % cityColors.length];
      
      html += `
        <div class="bar-item">
          <div class="bar-city-label">${city.name}</div>
          <div class="bar-container">
            <div class="bar-fill" style="width: ${score}%; background-color: ${color};"></div>
            <div class="bar-value">${score.toFixed(2)}</div>
          </div>
        </div>
      `;
    });
    
    html += '</div></div>';
  });
  
  html += '</div>';
  container.innerHTML = html;
}

// Update view based on current state
function updateView() {
  if (state.viewMode === 'heatmap') {
    renderHeatmap();
  } else {
    renderBarView();
  }
  renderStatsPanel();
}

// Attach event listeners
function attachEventListeners() {
  // City selector
  document.getElementById('citySelector').addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      const cityId = e.target.value;
      if (e.target.checked) {
        if (state.selectedCities.length < 3) {
          state.selectedCities.push(cityId);
        } else {
          e.target.checked = false;
          alert('You can select up to 3 cities');
        }
      } else {
        state.selectedCities = state.selectedCities.filter(id => id !== cityId);
      }
      updateView();
    }
  });
  
  // View toggle
  document.getElementById('heatmapBtn').addEventListener('click', () => {
    state.viewMode = 'heatmap';
    document.getElementById('heatmapBtn').classList.add('active');
    document.getElementById('barBtn').classList.remove('active');
    document.getElementById('heatmapBtn').classList.remove('btn--secondary');
    document.getElementById('heatmapBtn').classList.add('btn--primary');
    document.getElementById('barBtn').classList.remove('btn--primary');
    document.getElementById('barBtn').classList.add('btn--secondary');
    updateView();
  });
  
  document.getElementById('barBtn').addEventListener('click', () => {
    state.viewMode = 'bar';
    document.getElementById('barBtn').classList.add('active');
    document.getElementById('heatmapBtn').classList.remove('active');
    document.getElementById('barBtn').classList.remove('btn--secondary');
    document.getElementById('barBtn').classList.add('btn--primary');
    document.getElementById('heatmapBtn').classList.remove('btn--primary');
    document.getElementById('heatmapBtn').classList.add('btn--secondary');
    updateView();
  });
  
  // Category filter
  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      const category = e.target.value;
      if (e.target.checked) {
        state.selectedCategories.add(category);
      } else {
        state.selectedCategories.delete(category);
      }
      updateView();
    }
  });
  
  // Select/Clear all categories
  document.getElementById('selectAllBtn').addEventListener('click', () => {
    state.selectedCategories = new Set(data.categories);
    renderCategoryFilter();
    updateView();
  });
  
  document.getElementById('clearAllBtn').addEventListener('click', () => {
    state.selectedCategories.clear();
    renderCategoryFilter();
    updateView();
  });
  
  // Sort selector
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderCategoryFilter();
    updateView();
  });
}

// Show error message
function showError(message) {
  const container = document.getElementById('comparisonView');
  container.innerHTML = `
    <div class="error-state">
      <div class="error-icon">⚠️</div>
      <div class="error-message">${message}</div>
      <div class="error-help">Try running these commands:</div>
      <pre class="error-commands">
python export_data.py
python convert_data-v3-perplexity-alpine.py</pre>
    </div>
  `;
}

// Show loading state
function showLoading() {
  const container = document.getElementById('comparisonView');
  container.innerHTML = `
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading data...</div>
    </div>
  `;
}

// Start the app
showLoading();
loadData().then(loadedData => {
  if (loadedData) {
    data = loadedData;
    window.data = loadedData;  // Make data globally available for debugging
    // initialize selectedCategories with all categories present in the data
    state.selectedCategories = new Set(Array.isArray(data.categories) ? data.categories : []);
    init();
  }
});