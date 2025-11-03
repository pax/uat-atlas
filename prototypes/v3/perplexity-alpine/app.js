// Data
const data = {
  cities: [
    {id: 'bucuresti', name: 'Bucuresti', pop: 1877155},
    {id: 'bucuresi-s3', name: 'Sector 3', pop: 373566},
    {id: 'bucuresi-s6', name: 'Sector 6', pop: 325759},
    {id: 'cluj-napoca', name: 'Cluj-Napoca', pop: 324576},
    {id: 'timisoara', name: 'Timisoara', pop: 319279},
    {id: 'bucuresi-s2', name: 'Sector 2', pop: 290507},
    {id: 'iasi', name: 'Iasi', pop: 290422},
    {id: 'constanta', name: 'Constanta', pop: 283872},
    {id: 'craiova', name: 'Craiova', pop: 269506},
    {id: 'bucuresi-s4', name: 'Sector 4', pop: 262780},
    {id: 'bucuresi-s5', name: 'Sector 5', pop: 239607},
    {id: 'bucuresi-s1', name: 'Sector 1', pop: 224764},
    {id: 'sfantu-gheorghe-cv', name: 'Sfantu Gheorghe', pop: 50080},
    {id: 'brasov', name: 'Brasov', pop: 2532}
  ],
  categories: [
    'ATMs', 'Books', 'Bus stations', 'Churches', 'Cinema', 'Clubs (dancing)',
    'Dental', 'Dentist', 'Dentist + Clinic', 'Doctor', 'Fast Food', 'Gyms Fitness',
    'Hospitals', 'Hotels', 'Lodging', 'Museums', 'Other Places of Worship',
    'Pharmacies', 'Pub Cafe', 'Restaurants', 'Schools', 'Shopping', 'University',
    'beauty wellness', 'culture_centers', 'dental_clinic', 'event_venue', 'gov',
    'post_office', 'shopping_mall', 'sports', 'swimming_pool', 'theatre', 'veterinary_animals'
  ],
  scores: {
    'Pharmacies': {'cluj-napoca': 0.43, 'bucuresi-s1': 0.61, 'bucuresi-s2': 0.49, 'bucuresti': 0.19, 'bucuresi-s5': 0.0, 'bucuresi-s3': 0.06, 'bucuresi-s4': 0.3, 'sfantu-gheorghe-cv': 0.29, 'brasov': 100.0, 'iasi': 1.08, 'timisoara': 0.19, 'craiova': 0.58, 'constanta': 0.87},
    'University': {'bucuresi-s1': 2.36, 'sfantu-gheorghe-cv': 0.0, 'bucuresti': 0.56, 'bucuresi-s2': 0.58, 'bucuresi-s4': 0.16, 'bucuresi-s5': 0.42, 'bucuresi-s3': 0.06, 'constanta': 0.7, 'craiova': 0.53, 'brasov': 100.0, 'timisoara': 1.04, 'iasi': 2.04, 'cluj-napoca': 2.44},
    'Books': {'bucuresi-s1': 1.88, 'sfantu-gheorghe-cv': 0.0, 'bucuresti': 0.27, 'bucuresi-s2': 0.16, 'bucuresi-s4': 0.16, 'bucuresi-s5': 0.09, 'bucuresi-s3': 0.04, 'cluj-napoca': 0.91, 'constanta': 0.21, 'brasov': 100.0, 'craiova': 0.14, 'timisoara': 0.26, 'iasi': 0.98},
    'Other Places of Worship': {'bucuresi-s1': 0.38, 'sfantu-gheorghe-cv': 0.0, 'bucuresti': 0.81, 'bucuresi-s2': 1.74, 'bucuresi-s4': 0.32, 'bucuresi-s5': 0.35, 'bucuresi-s3': 1.36, 'cluj-napoca': 1.04, 'constanta': 4.46, 'craiova': 0.63, 'brasov': 100.0, 'timisoara': 0.53, 'iasi': 1.16},
    'Lodging': {'bucuresi-s1': 0.39, 'bucuresi-s2': 0.02, 'sfantu-gheorghe-cv': 0.01, 'bucuresti': 0.05, 'bucuresi-s4': 0.01, 'bucuresi-s5': 0.0, 'bucuresi-s3': 0.1, 'cluj-napoca': 0.23, 'craiova': 0.04, 'constanta': 0.6, 'brasov': 100.0, 'timisoara': 0.18, 'iasi': 0.04},
    'ATMs': {'bucuresi-s1': 1.41, 'bucuresi-s2': 0.46, 'sfantu-gheorghe-cv': 0.7, 'bucuresti': 0.37, 'bucuresi-s4': 0.28, 'bucuresi-s5': 0.0, 'bucuresi-s3': 0.3, 'cluj-napoca': 0.6, 'craiova': 0.32, 'constanta': 0.55, 'brasov': 100.0, 'timisoara': 0.39, 'iasi': 0.55},
    'Hotels': {'bucuresi-s1': 0.54, 'bucuresi-s2': 0.15, 'bucuresti': 0.11, 'bucuresi-s4': 0.05, 'bucuresi-s5': 0.0, 'bucuresi-s3': 0.15, 'sfantu-gheorghe-cv': 0.06, 'brasov': 100.0, 'timisoara': 0.22, 'cluj-napoca': 0.28, 'craiova': 0.1, 'constanta': 0.97, 'iasi': 0.09},
    'Fast Food': {'bucuresi-s1': 1.58, 'bucuresi-s2': 0.78, 'sfantu-gheorghe-cv': 0.1, 'bucuresti': 0.48, 'bucuresi-s4': 0.17, 'bucuresi-s5': 0.0, 'bucuresi-s3': 0.49, 'cluj-napoca': 0.47, 'craiova': 0.33, 'constanta': 0.7, 'brasov': 100.0, 'timisoara': 0.81, 'iasi': 0.89},
    'Pub Cafe': {'bucuresi-s1': 1.64, 'bucuresi-s2': 0.39, 'sfantu-gheorghe-cv': 0.08, 'bucuresti': 0.25, 'bucuresi-s4': 0.0, 'bucuresi-s5': 0.0, 'bucuresi-s3': 0.27, 'cluj-napoca': 0.28, 'craiova': 0.09, 'constanta': 0.44, 'brasov': 100.0, 'timisoara': 0.18, 'iasi': 0.49},
    'Restaurants': {'bucuresi-s1': 1.58, 'bucuresi-s2': 0.64, 'bucuresti': 0.36, 'bucuresi-s5': 0.05, 'bucuresi-s4': 0.17, 'bucuresi-s3': 0.31, 'sfantu-gheorghe-cv': 0.0, 'brasov': 100.0, 'timisoara': 0.37, 'cluj-napoca': 0.48, 'craiova': 0.19, 'constanta': 0.7, 'iasi': 0.31},
    'Schools': {'bucuresi-s1': 1.19, 'bucuresi-s2': 0.65, 'bucuresti': 0.3, 'bucuresi-s5': 0.0, 'bucuresi-s4': 0.38, 'bucuresi-s3': 0.2, 'sfantu-gheorghe-cv': 0.11, 'brasov': 100.0, 'timisoara': 0.37, 'cluj-napoca': 0.43, 'craiova': 0.08, 'constanta': 0.32, 'iasi': 0.46},
    'theatre': {'bucuresi-s1': 2.46, 'sfantu-gheorghe-cv': 2.24, 'bucuresti': 0.52, 'bucuresi-s4': 0.88, 'bucuresi-s5': 0.39, 'bucuresi-s2': 0.81, 'bucuresi-s3': 0.25, 'cluj-napoca': 0.53, 'constanta': 0.18, 'brasov': 100.0, 'craiova': 0.0, 'timisoara': 0.45, 'iasi': 0.81},
    'Churches': {'bucuresi-s1': 0.58, 'bucuresi-s2': 0.19, 'bucuresti': 0.05, 'bucuresi-s5': 0.03, 'bucuresi-s4': 0.11, 'bucuresi-s3': 0.03, 'sfantu-gheorghe-cv': 0.41, 'brasov': 100.0, 'timisoara': 0.0, 'cluj-napoca': 0.99, 'iasi': 0.83, 'craiova': 0.24, 'constanta': 0.19},
    'Clubs (dancing)': {'bucuresi-s1': 2.09, 'bucuresi-s2': 0.19, 'bucuresti': 0.44, 'bucuresi-s5': 0.03, 'bucuresi-s3': 1.22, 'bucuresi-s4': 0.06, 'brasov': 100.0, 'sfantu-gheorghe-cv': 0.0, 'timisoara': 0.24, 'cluj-napoca': 0.52, 'iasi': 0.3, 'craiova': 0.19, 'constanta': 0.71},
    'Museums': {'bucuresi-s1': 3.48, 'bucuresi-s2': 0.04, 'bucuresti': 0.43, 'bucuresi-s5': 0.11, 'bucuresi-s3': 0.13, 'bucuresi-s4': 0.44, 'sfantu-gheorghe-cv': 2.11, 'brasov': 100.0, 'timisoara': 0.94, 'iasi': 2.03, 'cluj-napoca': 1.6, 'craiova': 0.22, 'constanta': 0.0},
    'Cinema': {'bucuresi-s1': 1.14, 'bucuresi-s2': 0.63, 'bucuresti': 0.31, 'bucuresi-s5': 0.0, 'bucuresi-s3': 0.12, 'bucuresi-s4': 0.11, 'sfantu-gheorghe-cv': 0.5, 'brasov': 100.0, 'iasi': 0.52, 'timisoara': 0.66, 'cluj-napoca': 0.45, 'craiova': 0.46, 'constanta': 0.2},
    'Hospitals': {'bucuresi-s1': 2.31, 'bucuresi-s2': 0.92, 'bucuresti': 0.4, 'bucuresi-s5': 0.0, 'bucuresi-s3': 0.01, 'bucuresi-s4': 0.43, 'sfantu-gheorghe-cv': 0.19, 'brasov': 100.0, 'iasi': 0.87, 'cluj-napoca': 0.82, 'timisoara': 1.06, 'craiova': 0.75, 'constanta': 0.3},
    'gov': {'bucuresti': 0.21, 'bucuresi-s1': 1.89, 'brasov': 100.0, 'sfantu-gheorghe-cv': 1.03, 'bucuresi-s4': 0.04, 'bucuresi-s2': 0.39, 'bucuresi-s3': 0.0, 'constanta': 0.71, 'craiova': 0.19, 'iasi': 0.44, 'cluj-napoca': 0.24, 'timisoara': 0.8, 'bucuresi-s5': 0.04},
    'post_office': {'bucuresti': 0.22, 'bucuresi-s1': 0.4, 'brasov': 100.0, 'sfantu-gheorghe-cv': 0.05, 'bucuresi-s4': 0.09, 'bucuresi-s2': 0.63, 'bucuresi-s3': 0.24, 'bucuresi-s5': 0.0, 'constanta': 0.34, 'craiova': 0.48, 'iasi': 0.45, 'cluj-napoca': 0.29, 'timisoara': 0.45},
    'Dental': {'bucuresti': 0.46, 'bucuresi-s1': 1.78, 'brasov': 100.0, 'sfantu-gheorghe-cv': 0.0, 'bucuresi-s4': 0.3, 'bucuresi-s5': 0.06, 'bucuresi-s2': 0.95, 'bucuresi-s3': 0.39, 'constanta': 0.65, 'craiova': 0.39, 'iasi': 0.89, 'cluj-napoca': 0.91, 'timisoara': 0.84},
    'sports': {'bucuresti': 0.4, 'bucuresi-s1': 1.41, 'brasov': 100.0, 'sfantu-gheorghe-cv': 0.16, 'bucuresi-s4': 0.4, 'bucuresi-s5': 0.0, 'bucuresi-s2': 0.84, 'bucuresi-s3': 0.28, 'constanta': 0.28, 'craiova': 0.0, 'cluj-napoca': 0.43, 'iasi': 0.28, 'timisoara': 0.22},
    'swimming_pool': {'bucuresti': 1.03, 'bucuresi-s1': 2.68, 'sfantu-gheorghe-cv': 1.16, 'brasov': 100.0, 'bucuresi-s4': 1.24, 'bucuresi-s5': 0.0, 'bucuresi-s2': 1.95, 'bucuresi-s3': 0.72, 'constanta': 2.01, 'craiova': 0.1, 'cluj-napoca': 0.91, 'iasi': 0.49, 'timisoara': 1.2},
    'Bus stations': {'bucuresi-s1': 99.36, 'bucuresi-s2': 62.06, 'bucuresti': 51.74, 'bucuresi-s5': 49.45, 'bucuresi-s3': 39.04, 'bucuresi-s4': 52.03, 'sfantu-gheorghe-cv': 0.0, 'brasov': 100.0, 'timisoara': 0.16, 'cluj-napoca': 2.03, 'iasi': 3.31, 'craiova': 0.19, 'constanta': 0.0},
    'Gyms Fitness': {'bucuresti': 0.4, 'bucuresi-s1': 1.19, 'sfantu-gheorghe-cv': 0.11, 'brasov': 100.0, 'bucuresi-s4': 0.45, 'bucuresi-s5': 0.17, 'bucuresi-s2': 0.68, 'bucuresi-s3': 0.24, 'constanta': 0.26, 'craiova': 0.0, 'cluj-napoca': 0.81, 'iasi': 0.37, 'timisoara': 0.26},
    'culture_centers': {'bucuresi-s1': 5.76, 'sfantu-gheorghe-cv': 5.52, 'bucuresti': 1.35, 'bucuresi-s4': 0.0, 'bucuresi-s5': 0.06, 'bucuresi-s2': 3.63, 'bucuresi-s3': 0.78, 'constanta': 1.21, 'brasov': 100.0, 'craiova': 0.93, 'timisoara': 2.93, 'cluj-napoca': 2.56, 'iasi': 1.35},
    'beauty wellness': {'bucuresi-s1': 1.25, 'sfantu-gheorghe-cv': 0.0, 'bucuresti': 0.29, 'bucuresi-s4': 0.2, 'bucuresi-s5': 0.09, 'bucuresi-s2': 0.48, 'bucuresi-s3': 0.24, 'brasov': 100.0, 'constanta': 0.44, 'craiova': 0.05, 'timisoara': 0.2, 'cluj-napoca': 0.43, 'iasi': 0.32},
    'event_venue': {'bucuresi-s1': 2.02, 'sfantu-gheorghe-cv': 0.47, 'bucuresti': 0.43, 'bucuresi-s4': 0.33, 'bucuresi-s5': 0.1, 'bucuresi-s2': 0.89, 'bucuresi-s3': 0.22, 'brasov': 100.0, 'constanta': 0.23, 'craiova': 0.0, 'timisoara': 0.44, 'cluj-napoca': 0.45, 'iasi': 0.33},
    'Shopping': {'bucuresi-s1': 0.92, 'bucuresti': 0.21, 'sfantu-gheorghe-cv': 0.18, 'brasov': 100.0, 'bucuresi-s4': 0.11, 'bucuresi-s5': 0.0, 'bucuresi-s2': 0.48, 'bucuresi-s3': 0.14, 'constanta': 0.29, 'craiova': 0.09, 'cluj-napoca': 0.37, 'timisoara': 0.16, 'iasi': 0.45},
    'shopping_mall': {'bucuresi-s1': 0.61, 'sfantu-gheorghe-cv': 0.23, 'bucuresti': 0.32, 'bucuresi-s4': 0.2, 'bucuresi-s5': 0.16, 'bucuresi-s2': 0.46, 'bucuresi-s3': 0.44, 'brasov': 100.0, 'constanta': 0.93, 'craiova': 0.46, 'cluj-napoca': 0.0, 'timisoara': 0.15, 'iasi': 0.84},
    'veterinary_animals': {'bucuresi-s1': 1.05, 'bucuresti': 0.3, 'sfantu-gheorghe-cv': 0.55, 'bucuresi-s4': 0.43, 'bucuresi-s5': 0.06, 'bucuresi-s2': 0.86, 'bucuresi-s3': 0.01, 'brasov': 100.0, 'constanta': 0.0, 'craiova': 0.05, 'cluj-napoca': 0.8, 'timisoara': 0.22, 'iasi': 0.87},
    'Doctor': {'timisoara': 0.7, 'cluj-napoca': 0.64, 'iasi': 1.64, 'brasov': 100.0, 'craiova': 0.5, 'constanta': 1.02, 'sfantu-gheorghe-cv': 0.0},
    'dental_clinic': {'timisoara': 0.66, 'cluj-napoca': 1.05, 'iasi': 1.03, 'sfantu-gheorghe-cv': 0.0, 'brasov': 100.0, 'craiova': 0.5, 'constanta': 0.49},
    'Dentist': {'timisoara': 0.93, 'cluj-napoca': 0.91, 'iasi': 0.73, 'constanta': 0.68, 'sfantu-gheorghe-cv': 0.0, 'brasov': 100.0, 'craiova': 0.31},
    'Dentist + Clinic': {'sfantu-gheorghe-cv': 0.0, 'brasov': 100.0, 'craiova': 0.39, 'constanta': 0.64, 'iasi': 0.89, 'timisoara': 0.84, 'cluj-napoca': 0.91}
  },
  stats: {
    'ATMs': {avg: 0.003869, median: 0.000392},
    'Books': {avg: 0.00177, median: 0.000162},
    'Bus stations': {avg: 0.000698, median: 0.000771},
    'Churches': {avg: 0.00309, median: 0.000279},
    'Cinema': {avg: 0.000259, median: 0.000019},
    'Clubs (dancing)': {avg: 0.001104, median: 0.000117},
    'Dental': {avg: 0.009133, median: 0.001286},
    'Dentist': {avg: 0.009681, median: 0.000912},
    'Dentist + Clinic': {avg: 0.015852, median: 0.001478},
    'Doctor': {avg: 0.018124, median: 0.001538},
    'Fast Food': {avg: 0.003017, median: 0.000412},
    'Gyms Fitness': {avg: 0.003572, median: 0.000331},
    'Hospitals': {avg: 0.004147, median: 0.000679},
    'Hotels': {avg: 0.01127, median: 0.000412},
    'Lodging': {avg: 0.041602, median: 0.001067},
    'Museums': {avg: 0.000541, median: 0.000061},
    'Other Places of Worship': {avg: 0.000103, median: 0.00001},
    'Pharmacies': {avg: 0.005676, median: 0.000687},
    'Pub Cafe': {avg: 0.011322, median: 0.001116},
    'Restaurants': {avg: 0.019357, median: 0.001992},
    'Schools': {avg: 0.006707, median: 0.000777},
    'Shopping': {avg: 0.109246, median: 0.010661},
    'University': {avg: 0.001182, median: 0.000117},
    'beauty wellness': {avg: 0.013925, median: 0.0013},
    'culture_centers': {avg: 0.000202, median: 0.000038},
    'dental_clinic': {avg: 0.008264, median: 0.000576},
    'event_venue': {avg: 0.002812, median: 0.000329},
    'gov': {avg: 0.004648, median: 0.000668},
    'post_office': {avg: 0.000932, median: 0.000092},
    'shopping_mall': {avg: 0.001741, median: 0.000182},
    'sports': {avg: 0.0051, median: 0.00049},
    'swimming_pool': {avg: 0.000218, median: 0.00004},
    'theatre': {avg: 0.000293, median: 0.000046},
    'veterinary_animals': {avg: 0.001942, median: 0.000293}
  }
};

// State
const state = {
  selectedCities: [],
  selectedCategories: new Set(data.categories),
  viewMode: 'heatmap',
  sortBy: 'name'
};

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

// Start the app
init();