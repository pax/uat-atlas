// Data
const DATA = {
  cities: [
    { id: 'cluj-napoca', name: 'Cluj-Napoca', county: 'CJ', pop: 324576, area: 165, area_metro: 1537, rank: 1, image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Cluj-Napoca_Catolic_Church.jpg/640px-Cluj-Napoca_Catolic_Church.jpg', official_website: 'https://www.clujnapoca.ro', facebook: 'https://www.facebook.com/CityOfClujNapoca', instagram: 'clujnapoca.ro', reddit: 'r/Cluj' },
    { id: 'timisoara', name: 'Timișoara', county: 'TM', pop: 319279, area: 130, area_metro: 1100, rank: 2, official_website: 'https://www.timisoara.ro', facebook: 'https://www.facebook.com/TimisoaraCity', instagram: 'timisoara.ro', reddit: 'r/Timisoara' },
    { id: 'iasi', name: 'Iași', county: 'IS', pop: 290422, area: 102.5, area_metro: 800, rank: 3, official_website: 'https://www.iasi.ro', facebook: 'https://www.facebook.com/IasiCity', instagram: 'iasi.ro', reddit: 'r/Iasi' },
    { id: 'constanta', name: 'Constanța', county: 'CT', pop: 283872, area: 90, area_metro: 300, rank: 4, official_website: 'https://www.constanta.ro', facebook: 'https://www.facebook.com/ConstantaCity', instagram: 'constanta.ro', reddit: 'r/Constanta' },
    { id: 'craiova', name: 'Craiova', county: 'DJ', pop: 269506, area: 62, area_metro: 300, rank: 5, official_website: 'https://www.craiova.ro' },
    { id: 'brasov', name: 'Brașov', county: 'BV', pop: 235000, area: 82, area_metro: 400, rank: 6, official_website: 'https://www.brasov.ro' },
    { id: 'bucuresti', name: 'București', county: 'B', pop: 1830169, area: 226, area_metro: 2530, rank: 0, official_website: 'https://www.bucuresti.ro' },
    { id: 'oradea', name: 'Oradea', county: 'BH', pop: 196367, area: 100, rank: 7 },
    { id: 'sibiu', name: 'Sibiu', county: 'SB', pop: 147245, area: 139, rank: 8 },
    { id: 'galati', name: 'Galați', county: 'GL', pop: 249432, area: 80, rank: 9 },
    { id: 'ploiesti', name: 'Ploiești', county: 'PH', pop: 209948, area: 59, rank: 10 },
    { id: 'sfantu-gheorghe-cv', name: 'Sfântu Gheorghe', county: 'CV', pop: 55503, area: 55, rank: 11 }
  ],
  categories: ['ATMs', 'Books', 'Bus stations', 'Churches', 'Cinema', 'Clubs (dancing)', 'Dental', 'Dentist', 'Doctor', 'Fast Food', 'Gyms Fitness', 'Hospitals', 'Hotels', 'Lodging', 'Museums', 'Other Places of Worship', 'Pharmacies', 'Pub Cafe', 'Restaurants', 'Schools', 'Shopping', 'University', 'beauty wellness', 'culture_centers', 'dental_clinic', 'event_venue', 'gov', 'post_office', 'shopping_mall', 'sports', 'swimming_pool', 'theatre', 'veterinary_animals'],
  city_stats: {
    'cluj-napoca': { ATMs: 412, Books: 89, 'Bus stations': 28, Churches: 156, Cinema: 45, 'Clubs (dancing)': 67, Dental: 189, Dentist: 45, Doctor: 234, 'Fast Food': 312, 'Gyms Fitness': 95, Hospitals: 23, Hotels: 134, Lodging: 156, Museums: 34, 'Other Places of Worship': 45, Pharmacies: 223, 'Pub Cafe': 267, Restaurants: 456, Schools: 245, Shopping: 567, University: 12, 'beauty wellness': 123, culture_centers: 34, dental_clinic: 56, event_venue: 89, gov: 45, post_office: 67, shopping_mall: 23, sports: 134, swimming_pool: 16, theatre: 28, veterinary_animals: 89 },
    'timisoara': { ATMs: 398, Books: 76, 'Bus stations': 25, Churches: 142, Cinema: 41, 'Clubs (dancing)': 62, Dental: 172, Dentist: 38, Doctor: 215, 'Fast Food': 289, 'Gyms Fitness': 87, Hospitals: 21, Hotels: 128, Lodging: 148, Museums: 31, 'Other Places of Worship': 41, Pharmacies: 198, 'Pub Cafe': 245, Restaurants: 421, Schools: 223, Shopping: 512, University: 11, 'beauty wellness': 112, culture_centers: 31, dental_clinic: 51, event_venue: 81, gov: 41, post_office: 61, shopping_mall: 21, sports: 128, swimming_pool: 15, theatre: 26, veterinary_animals: 81 },
    'iasi': { ATMs: 356, Books: 68, 'Bus stations': 22, Churches: 134, Cinema: 38, 'Clubs (dancing)': 56, Dental: 156, Dentist: 34, Doctor: 198, 'Fast Food': 267, 'Gyms Fitness': 78, Hospitals: 19, Hotels: 115, Lodging: 132, Museums: 28, 'Other Places of Worship': 38, Pharmacies: 178, 'Pub Cafe': 223, Restaurants: 378, Schools: 198, Shopping: 456, University: 10, 'beauty wellness': 98, culture_centers: 28, dental_clinic: 45, event_venue: 72, gov: 38, post_office: 54, shopping_mall: 18, sports: 112, swimming_pool: 12, theatre: 24, veterinary_animals: 72 },
    'bucuresti': { ATMs: 2847, Books: 445, 'Bus stations': 156, Churches: 892, Cinema: 267, 'Clubs (dancing)': 412, Dental: 1123, Dentist: 267, Doctor: 1456, 'Fast Food': 1967, 'Gyms Fitness': 567, Hospitals: 123, Hotels: 876, Lodging: 987, Museums: 189, 'Other Places of Worship': 267, Pharmacies: 1234, 'Pub Cafe': 1567, Restaurants: 2789, Schools: 1345, Shopping: 3456, University: 67, 'beauty wellness': 756, culture_centers: 189, dental_clinic: 345, event_venue: 512, gov: 267, post_office: 378, shopping_mall: 112, sports: 789, swimming_pool: 78, theatre: 156, veterinary_animals: 512 },
    'constanta': { ATMs: 289, Books: 54, 'Bus stations': 18, Churches: 98, Cinema: 32, 'Clubs (dancing)': 48, Dental: 134, Dentist: 29, Doctor: 167, 'Fast Food': 223, 'Gyms Fitness': 65, Hospitals: 15, Hotels: 234, Lodging: 267, Museums: 24, 'Other Places of Worship': 32, Pharmacies: 145, 'Pub Cafe': 189, Restaurants: 312, Schools: 156, Shopping: 378, University: 8, 'beauty wellness': 78, culture_centers: 22, dental_clinic: 37, event_venue: 58, gov: 31, post_office: 45, shopping_mall: 14, sports: 92, swimming_pool: 8, theatre: 19, veterinary_animals: 58 },
    'craiova': { ATMs: 245, Books: 48, 'Bus stations': 15, Churches: 87, Cinema: 28, 'Clubs (dancing)': 42, Dental: 118, Dentist: 25, Doctor: 145, 'Fast Food': 195, 'Gyms Fitness': 56, Hospitals: 13, Hotels: 98, Lodging: 112, Museums: 21, 'Other Places of Worship': 28, Pharmacies: 128, 'Pub Cafe': 165, Restaurants: 275, Schools: 134, Shopping: 332, University: 7, 'beauty wellness': 68, culture_centers: 19, dental_clinic: 32, event_venue: 51, gov: 27, post_office: 39, shopping_mall: 12, sports: 81, swimming_pool: 7, theatre: 17, veterinary_animals: 51 },
    'brasov': { ATMs: 278, Books: 61, 'Bus stations': 20, Churches: 112, Cinema: 36, 'Clubs (dancing)': 54, Dental: 142, Dentist: 32, Doctor: 178, 'Fast Food': 245, 'Gyms Fitness': 72, Hospitals: 17, Hotels: 198, Lodging: 223, Museums: 27, 'Other Places of Worship': 36, Pharmacies: 156, 'Pub Cafe': 198, Restaurants: 334, Schools: 178, Shopping: 412, University: 9, 'beauty wellness': 89, culture_centers: 25, dental_clinic: 42, event_venue: 67, gov: 34, post_office: 49, shopping_mall: 16, sports: 98, swimming_pool: 11, theatre: 22, veterinary_animals: 67 },
    'oradea': { ATMs: 232, Books: 52, 'Bus stations': 17, Churches: 98, Cinema: 31, 'Clubs (dancing)': 46, Dental: 128, Dentist: 28, Doctor: 156, 'Fast Food': 212, 'Gyms Fitness': 62, Hospitals: 14, Hotels: 112, Lodging: 134, Museums: 23, 'Other Places of Worship': 31, Pharmacies: 142, 'Pub Cafe': 178, Restaurants: 289, Schools: 156, Shopping: 367, University: 8, 'beauty wellness': 76, culture_centers: 21, dental_clinic: 36, event_venue: 58, gov: 29, post_office: 42, shopping_mall: 13, sports: 87, swimming_pool: 9, theatre: 19, veterinary_animals: 58 },
    'sibiu': { ATMs: 198, Books: 44, 'Bus stations': 14, Churches: 89, Cinema: 26, 'Clubs (dancing)': 38, Dental: 108, Dentist: 23, Doctor: 132, 'Fast Food': 178, 'Gyms Fitness': 52, Hospitals: 11, Hotels: 156, Lodging: 178, Museums: 31, 'Other Places of Worship': 26, Pharmacies: 119, 'Pub Cafe': 148, Restaurants: 245, Schools: 128, Shopping: 298, University: 6, 'beauty wellness': 63, culture_centers: 28, dental_clinic: 30, event_venue: 49, gov: 24, post_office: 35, shopping_mall: 11, sports: 72, swimming_pool: 8, theatre: 24, veterinary_animals: 49 },
    'galati': { ATMs: 267, Books: 58, 'Bus stations': 19, Churches: 101, Cinema: 33, 'Clubs (dancing)': 49, Dental: 135, Dentist: 30, Doctor: 167, 'Fast Food': 232, 'Gyms Fitness': 68, Hospitals: 16, Hotels: 89, Lodging: 101, Museums: 19, 'Other Places of Worship': 33, Pharmacies: 148, 'Pub Cafe': 189, Restaurants: 312, Schools: 167, Shopping: 389, University: 9, 'beauty wellness': 81, culture_centers: 20, dental_clinic: 38, event_venue: 61, gov: 31, post_office: 45, shopping_mall: 15, sports: 92, swimming_pool: 10, theatre: 18, veterinary_animals: 61 },
    'ploiesti': { ATMs: 254, Books: 55, 'Bus stations': 18, Churches: 95, Cinema: 31, 'Clubs (dancing)': 46, Dental: 128, Dentist: 28, Doctor: 158, 'Fast Food': 218, 'Gyms Fitness': 64, Hospitals: 15, Hotels: 78, Lodging: 89, Museums: 17, 'Other Places of Worship': 31, Pharmacies: 139, 'Pub Cafe': 178, Restaurants: 295, Schools: 158, Shopping: 367, University: 8, 'beauty wellness': 76, culture_centers: 18, dental_clinic: 36, event_venue: 57, gov: 29, post_office: 42, shopping_mall: 14, sports: 87, swimming_pool: 9, theatre: 16, veterinary_animals: 57 },
    'sfantu-gheorghe-cv': { ATMs: 89, Books: 21, 'Bus stations': 7, Churches: 42, Cinema: 12, 'Clubs (dancing)': 18, Dental: 52, Dentist: 11, Doctor: 63, 'Fast Food': 87, 'Gyms Fitness': 25, Hospitals: 5, Hotels: 31, Lodging: 35, Museums: 8, 'Other Places of Worship': 12, Pharmacies: 56, 'Pub Cafe': 72, Restaurants: 118, Schools: 63, Shopping: 148, University: 3, 'beauty wellness': 31, culture_centers: 9, dental_clinic: 14, event_venue: 23, gov: 12, post_office: 17, shopping_mall: 5, sports: 35, swimming_pool: 4, theatre: 7, veterinary_animals: 23 }
  },
  preset_profiles: {
    overall: { name: 'Overall Score', weights: { Restaurants: 15, Shopping: 15, Hotels: 10, University: 10, Hospitals: 10, Pharmacies: 10, 'Fast Food': 5, 'Gyms Fitness': 5, Cinema: 5, Museums: 5, 'Clubs (dancing)': 5, 'Pub Cafe': 5 } },
    kids_friendly: { name: 'Kids Friendly', weights: { Schools: 20, sports: 15, swimming_pool: 15, Museums: 15, Cinema: 10, Restaurants: 10, 'Fast Food': 10, 'beauty wellness': 5 } },
    nightlife: { name: 'Nightlife', weights: { 'Clubs (dancing)': 30, 'Pub Cafe': 25, Restaurants: 15, Hotels: 10, Cinema: 10, 'Fast Food': 10 } },
    retirement: { name: 'Retirement Friendly', weights: { Hospitals: 20, Pharmacies: 20, Doctor: 15, Restaurants: 10, Shopping: 10, 'Pub Cafe': 10, 'Fast Food': 5, 'beauty wellness': 10 } },
    culture: { name: 'Culture & Arts', weights: { Museums: 25, theatre: 20, culture_centers: 15, Books: 15, University: 15, Churches: 10 } }
  }
};

// State
const state = {
  selectedCities: [],
  currentView: 'landing',
  currentCity: null,
  sortBy: 'name',
  cityLimit: 12,
  searchQuery: '',
  weights: {},
  currentProfile: 'overall'
};

// Initialize weights with default profile
function initializeWeights() {
  state.weights = {};
  DATA.categories.forEach(cat => {
    state.weights[cat] = 0;
  });
  applyPresetProfile('overall');
}

// Navigation
function showView(viewId) {
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });
  document.getElementById(viewId).classList.add('active');
  state.currentView = viewId;
  updateFAB();
}

// City Selection
function toggleCitySelection(cityId) {
  const index = state.selectedCities.indexOf(cityId);
  if (index > -1) {
    state.selectedCities.splice(index, 1);
  } else {
    if (state.selectedCities.length < 3) {
      state.selectedCities.push(cityId);
    } else {
      alert('You can only compare up to 3 cities at once.');
      return;
    }
  }
  renderCityGrid();
  updateFAB();
}

// FAB Update
function updateFAB() {
  const fab = document.getElementById('compareFab');
  const fabText = document.getElementById('fabText');
  if (state.selectedCities.length > 0 && state.currentView === 'landing') {
    fab.style.display = 'block';
    fabText.textContent = `Compare Cities (${state.selectedCities.length}/3)`;
  } else {
    fab.style.display = 'none';
  }
}

// Render City Grid
function renderCityGrid() {
  const container = document.getElementById('cityGrid');
  let cities = filterAndSortCities();
  
  container.innerHTML = cities.map(city => {
    const stats = DATA.city_stats[city.id];
    const isSelected = state.selectedCities.includes(city.id);
    const topStats = getTopStats(stats, 4);
    
    return `
      <div class="city-card ${isSelected ? 'selected' : ''}" data-city-id="${city.id}">
        <div class="city-card-header">
          <div>
            <h3>${city.name}</h3>
            <div class="city-card-meta">${city.county} | Pop: ${formatNumber(city.pop)}</div>
          </div>
          <div class="city-select-btn ${isSelected ? 'selected' : ''}" data-action="select"></div>
        </div>
        <div class="city-card-stats">
          ${topStats.map(stat => `
            <div class="stat-item">
              <span class="stat-label">${stat.category}:</span>
              <span class="stat-value">${stat.value}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
  
  // Add event listeners
  container.querySelectorAll('.city-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const cityId = card.dataset.cityId;
      if (e.target.closest('.city-select-btn')) {
        toggleCitySelection(cityId);
      } else {
        showCityProfile(cityId);
      }
    });
  });
}

// Render Map View
function renderMapView() {
  const container = document.getElementById('mapCities');
  let cities = filterAndSortCities();
  
  container.innerHTML = cities.map(city => `
    <div class="map-city-marker" data-city-id="${city.id}">
      <strong>${city.name}</strong><br>
      <small>Pop: ${formatNumber(city.pop)}</small>
    </div>
  `).join('');
  
  container.querySelectorAll('.map-city-marker').forEach(marker => {
    marker.addEventListener('click', (e) => {
      showCityProfile(marker.dataset.cityId);
    });
  });
}

// Filter and Sort Cities
function filterAndSortCities() {
  let cities = [...DATA.cities];
  
  // Filter by search
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    cities = cities.filter(city => 
      city.name.toLowerCase().includes(query) || 
      city.county.toLowerCase().includes(query)
    );
  }
  
  // Sort
  cities.sort((a, b) => {
    switch (state.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'pop':
        return b.pop - a.pop;
      case 'area':
        return b.area - a.area;
      case 'score':
        return calculateCityScore(b.id) - calculateCityScore(a.id);
      default:
        return 0;
    }
  });
  
  // Limit
  return cities.slice(0, state.cityLimit);
}

// Get Top Stats
function getTopStats(stats, count) {
  return Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([category, value]) => ({ category, value }));
}

// Show City Profile
function showCityProfile(cityId) {
  const city = DATA.cities.find(c => c.id === cityId);
  if (!city) return;
  
  state.currentCity = cityId;
  const stats = DATA.city_stats[cityId];
  const isSelected = state.selectedCities.includes(cityId);
  
  const content = `
    <div class="profile-info">
      <h2>${city.name}</h2>
      <div class="profile-details">
        <div class="profile-detail">
          <span class="profile-detail-label">County</span>
          <span class="profile-detail-value">${city.county}</span>
        </div>
        <div class="profile-detail">
          <span class="profile-detail-label">Population</span>
          <span class="profile-detail-value">${formatNumber(city.pop)}</span>
        </div>
        <div class="profile-detail">
          <span class="profile-detail-label">Area</span>
          <span class="profile-detail-value">${city.area} km²</span>
        </div>
        ${city.area_metro ? `
        <div class="profile-detail">
          <span class="profile-detail-label">Metro Area</span>
          <span class="profile-detail-value">${city.area_metro} km²</span>
        </div>
        ` : ''}
      </div>
      ${(city.official_website || city.facebook || city.instagram || city.reddit) ? `
      <div class="social-links">
        ${city.official_website ? `<a href="${city.official_website}" target="_blank">Official Website</a>` : ''}
        ${city.facebook ? `<a href="${city.facebook}" target="_blank">Facebook</a>` : ''}
        ${city.instagram ? `<a href="https://instagram.com/${city.instagram}" target="_blank">Instagram</a>` : ''}
        ${city.reddit ? `<a href="https://reddit.com/${city.reddit}" target="_blank">Reddit</a>` : ''}
      </div>
      ` : ''}
    </div>
    
    <h3>Venue Statistics</h3>
    <div class="stats-grid">
      ${Object.entries(stats).map(([category, value]) => `
        <div class="stat-card">
          <h4>${category}</h4>
          <div class="stat-card-value">${value}</div>
        </div>
      `).join('')}
    </div>
  `;
  
  document.getElementById('profileContent').innerHTML = content;
  
  const addBtn = document.getElementById('addToCompareProfile');
  if (isSelected) {
    addBtn.textContent = 'Remove from Compare';
    addBtn.classList.remove('btn--primary');
    addBtn.classList.add('btn--secondary');
  } else {
    addBtn.textContent = 'Add to Compare';
    addBtn.classList.remove('btn--secondary');
    addBtn.classList.add('btn--primary');
  }
  
  showView('profileView');
}

// Show Comparison
function showComparison() {
  if (state.selectedCities.length === 0) {
    alert('Please select at least one city to compare.');
    return;
  }
  
  renderComparisonTable();
  renderWeightSliders();
  calculateWeightedScores();
  showView('comparisonView');
}

// Render Comparison Table
function renderComparisonTable() {
  const container = document.getElementById('comparisonTable');
  const cities = state.selectedCities.map(id => DATA.cities.find(c => c.id === id));
  
  // Get all stats for normalization
  const categoryValues = {};
  DATA.categories.forEach(cat => {
    categoryValues[cat] = [];
    state.selectedCities.forEach(cityId => {
      categoryValues[cat].push(DATA.city_stats[cityId][cat] || 0);
    });
  });
  
  const table = `
    <table class="comparison-table">
      <thead>
        <tr>
          <th class="category-cell">Category</th>
          ${cities.map(city => `<th class="value-cell">${city.name}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${DATA.categories.map(category => {
          const values = categoryValues[category];
          const min = Math.min(...values);
          const max = Math.max(...values);
          
          return `
            <tr>
              <td class="category-cell">${category}</td>
              ${state.selectedCities.map(cityId => {
                const value = DATA.city_stats[cityId][category] || 0;
                const heatmapClass = getHeatmapClass(value, min, max);
                return `<td class="value-cell ${heatmapClass}">${value}</td>`;
              }).join('')}
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
  
  container.innerHTML = table;
}

// Get Heatmap Class
function getHeatmapClass(value, min, max) {
  if (max === min) return 'heatmap-medium';
  const normalized = (value - min) / (max - min);
  if (normalized < 0.33) return 'heatmap-low';
  if (normalized < 0.67) return 'heatmap-medium';
  return 'heatmap-high';
}

// Render Weight Sliders
function renderWeightSliders() {
  const container = document.getElementById('weightSliders');
  
  container.innerHTML = DATA.categories.map(category => `
    <div class="slider-group">
      <div class="slider-label">
        <span>${category}</span>
        <span class="slider-value">${state.weights[category] || 0}%</span>
      </div>
      <input type="range" min="0" max="100" value="${state.weights[category] || 0}" 
             data-category="${category}" class="weight-slider">
    </div>
  `).join('');
  
  container.querySelectorAll('.weight-slider').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const category = e.target.dataset.category;
      const value = parseInt(e.target.value);
      state.weights[category] = value;
      e.target.parentElement.querySelector('.slider-value').textContent = `${value}%`;
      calculateWeightedScores();
    });
  });
}

// Calculate City Score
function calculateCityScore(cityId) {
  const stats = DATA.city_stats[cityId];
  let totalScore = 0;
  let totalWeight = 0;
  
  Object.entries(state.weights).forEach(([category, weight]) => {
    if (weight > 0 && stats[category]) {
      // Normalize by population for fair comparison
      const city = DATA.cities.find(c => c.id === cityId);
      const normalizedValue = (stats[category] / city.pop) * 100000;
      totalScore += normalizedValue * weight;
      totalWeight += weight;
    }
  });
  
  return totalWeight > 0 ? totalScore / totalWeight : 0;
}

// Calculate Weighted Scores
function calculateWeightedScores() {
  const container = document.getElementById('weightedResults');
  
  const scores = state.selectedCities.map(cityId => {
    const city = DATA.cities.find(c => c.id === cityId);
    return {
      name: city.name,
      score: calculateCityScore(cityId)
    };
  }).sort((a, b) => b.score - a.score);
  
  container.innerHTML = `
    <h4>Weighted Scores</h4>
    ${scores.map(item => `
      <div class="result-item">
        <span class="result-city">${item.name}</span>
        <span class="result-score">${item.score.toFixed(2)}</span>
      </div>
    `).join('')}
  `;
}

// Apply Preset Profile
function applyPresetProfile(profileKey) {
  const profile = DATA.preset_profiles[profileKey];
  if (!profile) return;
  
  // Reset all weights
  DATA.categories.forEach(cat => {
    state.weights[cat] = 0;
  });
  
  // Apply profile weights
  Object.entries(profile.weights).forEach(([category, weight]) => {
    if (state.weights.hasOwnProperty(category)) {
      state.weights[category] = weight;
    }
  });
  
  state.currentProfile = profileKey;
  
  // Update UI if on comparison view
  if (state.currentView === 'comparisonView') {
    renderWeightSliders();
    calculateWeightedScores();
  }
  
  // Update criteria modal if open
  updateCriteriaSliders();
}

// Render Criteria Sliders
function renderCriteriaSliders() {
  const container = document.getElementById('criteriaSliders');
  
  container.innerHTML = DATA.categories.map(category => `
    <div class="slider-group">
      <div class="slider-label">
        <span>${category}</span>
        <span class="slider-value">${state.weights[category] || 0}%</span>
      </div>
      <input type="range" min="0" max="100" value="${state.weights[category] || 0}" 
             data-category="${category}" class="criteria-slider">
    </div>
  `).join('');
  
  container.querySelectorAll('.criteria-slider').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const category = e.target.dataset.category;
      const value = parseInt(e.target.value);
      state.weights[category] = value;
      e.target.parentElement.querySelector('.slider-value').textContent = `${value}%`;
      updateProfileSignature();
    });
  });
  
  updateProfileSignature();
}

// Update Criteria Sliders
function updateCriteriaSliders() {
  document.querySelectorAll('.criteria-slider').forEach(slider => {
    const category = slider.dataset.category;
    slider.value = state.weights[category] || 0;
    slider.parentElement.querySelector('.slider-value').textContent = `${state.weights[category] || 0}%`;
  });
  updateProfileSignature();
}

// Update Profile Signature
function updateProfileSignature() {
  const textarea = document.getElementById('profileSignature');
  if (!textarea) return;
  
  const activeWeights = Object.entries(state.weights)
    .filter(([_, weight]) => weight > 0)
    .map(([category, weight]) => `${category}:${weight}%`)
    .join(', ');
  
  textarea.value = activeWeights || 'No weights set';
}

// Format Number
function formatNumber(num) {
  return num.toLocaleString('en-US');
}

// Debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  initializeWeights();
  renderCityGrid();
  renderMapView();
  
  // Navigation toggle
  document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('active');
  });
  
  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.dataset.view;
      if (view === 'landing') {
        showView('landingView');
      } else if (view === 'about') {
        showView('aboutView');
      }
      document.getElementById('navMenu').classList.remove('active');
    });
  });
  
  // Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`${tabName}View`).classList.add('active');
    });
  });
  
  // Search
  const searchInput = document.getElementById('citySearch');
  searchInput.addEventListener('input', debounce((e) => {
    state.searchQuery = e.target.value;
    renderCityGrid();
    renderMapView();
  }, 300));
  
  // Sort
  document.getElementById('sortBy').addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderCityGrid();
    renderMapView();
  });
  
  // City Limit
  document.getElementById('cityLimit').addEventListener('change', (e) => {
    state.cityLimit = parseInt(e.target.value) || 12;
    renderCityGrid();
    renderMapView();
  });
  
  // Preset buttons (landing)
  document.querySelectorAll('.sidebar .preset-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      applyPresetProfile(btn.dataset.preset);
      renderCityGrid();
    });
  });
  
  // Preset buttons (comparison)
  document.querySelectorAll('.weight-settings .preset-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      applyPresetProfile(btn.dataset.preset);
    });
  });
  
  // FAB
  document.getElementById('compareFab').addEventListener('click', () => {
    showComparison();
  });
  
  // Profile View
  document.getElementById('backToLanding').addEventListener('click', () => {
    showView('landingView');
  });
  
  document.getElementById('addToCompareProfile').addEventListener('click', () => {
    if (state.currentCity) {
      toggleCitySelection(state.currentCity);
      const isSelected = state.selectedCities.includes(state.currentCity);
      const btn = document.getElementById('addToCompareProfile');
      if (isSelected) {
        btn.textContent = 'Remove from Compare';
        btn.classList.remove('btn--primary');
        btn.classList.add('btn--secondary');
      } else {
        btn.textContent = 'Add to Compare';
        btn.classList.remove('btn--secondary');
        btn.classList.add('btn--primary');
      }
    }
  });
  
  // Comparison View
  document.getElementById('backToLandingFromComparison').addEventListener('click', () => {
    showView('landingView');
  });
  
  document.getElementById('clearComparison').addEventListener('click', () => {
    state.selectedCities = [];
    renderCityGrid();
    updateFAB();
    showView('landingView');
  });
  
  // Criteria Modal
  document.getElementById('createCriteriaBtn').addEventListener('click', () => {
    document.getElementById('criteriaModal').classList.add('active');
    renderCriteriaSliders();
  });
  
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('criteriaModal').classList.remove('active');
  });
  
  document.getElementById('cancelCriteria').addEventListener('click', () => {
    document.getElementById('criteriaModal').classList.remove('active');
  });
  
  document.getElementById('applyCriteria').addEventListener('click', () => {
    document.getElementById('criteriaModal').classList.remove('active');
    renderCityGrid();
    if (state.currentView === 'comparisonView') {
      renderWeightSliders();
      calculateWeightedScores();
    }
  });
  
  // Preset buttons in modal
  document.querySelectorAll('#criteriaModal .preset-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      applyPresetProfile(btn.dataset.preset);
    });
  });
  
  // Copy signature
  document.getElementById('copySignature').addEventListener('click', () => {
    const textarea = document.getElementById('profileSignature');
    textarea.select();
    document.execCommand('copy');
    alert('Profile signature copied to clipboard!');
  });
  
  // Close modal on outside click
  document.getElementById('criteriaModal').addEventListener('click', (e) => {
    if (e.target.id === 'criteriaModal') {
      document.getElementById('criteriaModal').classList.remove('active');
    }
  });
});