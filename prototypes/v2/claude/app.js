/**
 * CityProfiler - Romanian City Comparison Tool
 * Main application JavaScript
 */

class CityProfiler {
    constructor() {
        this.data = null;
        this.cities = [];
        this.categories = [];
        this.stats = {};
        this.currentCriteria = 'overall';
        this.customWeights = {};
        this.selectedCities = new Set();
        this.map = null;
        this.markers = [];
        this.comparisonChart = null;
        
        // Criteria presets
        this.criteriaPresets = {
            overall: {
                name: 'Overall',
                weights: this.getEqualWeights()
            },
            family: {
                name: 'Kids & Family',
                weights: {
                    'Hospitals': 0.15,
                    'Pharmacies': 0.12,
                    'Schools': 0.20,
                    'Parks': 0.15,
                    'Cinema': 0.10,
                    'Museums': 0.08,
                    'Restaurants': 0.10,
                    'Dental': 0.10
                }
            },
            nightlife: {
                name: 'Night Life',
                weights: {
                    'Clubs (dancing)': 0.35,
                    'Pub Cafe': 0.30,
                    'Restaurants': 0.20,
                    'Cinema': 0.10,
                    'Fast Food': 0.05
                }
            },
            retirement: {
                name: 'Retirement',
                weights: {
                    'Hospitals': 0.20,
                    'Pharmacies': 0.20,
                    'Churches': 0.15,
                    'Parks': 0.15,
                    'Museums': 0.10,
                    'Theaters': 0.10,
                    'Doctor': 0.10
                }
            },
            culture: {
                name: 'Culture',
                weights: {
                    'Museums': 0.30,
                    'Theaters': 0.25,
                    'Cinema': 0.20,
                    'Books': 0.15,
                    'Churches': 0.10
                }
            },
            health: {
                name: 'Health & Wellness',
                weights: {
                    'Hospitals': 0.25,
                    'Pharmacies': 0.20,
                    'Doctor': 0.20,
                    'Dental': 0.15,
                    'Dentist': 0.10,
                    'Gyms Fitness': 0.10
                }
            }
        };
    }

    async init() {
        try {
            // Load data
            await this.loadData();
            
            // Initialize UI
            this.initializeEventListeners();
            this.initializeMap();
            
            // Render initial view
            this.updateViews();
            
            // Hide loading
            document.getElementById('loading').classList.add('hidden');
        } catch (error) {
            console.error('Initialization error:', error);
            this.showError('Failed to load city data. Please refresh the page.');
        }
    }

    async loadData() {
        // Load data from the repository JSON output. Use absolute repo path so prototype
        // served from project root can locate the file at /data/json/data.min.json
        const response = await fetch('../../../data/json/data.min.json');
        if (!response.ok) throw new Error('Failed to load data');
        
        this.data = await response.json();
        this.cities = this.data.cities;
        this.categories = this.data.categories;
        this.stats = this.data.stats;
        
        // Calculate scores for default criteria
        this.calculateScores();
    }

    getEqualWeights() {
        const weights = {};
        const weightValue = 1 / this.categories.length;
        this.categories.forEach(cat => {
            weights[cat] = weightValue;
        });
        return weights;
    }

    calculateScores() {
        const weights = this.currentCriteria === 'custom' 
            ? this.customWeights 
            : this.criteriaPresets[this.currentCriteria]?.weights || this.getEqualWeights();
        
        this.cities.forEach(city => {
            const cityStats = this.stats[city.id] || {};
            let totalScore = 0;
            let weightSum = 0;
            
            Object.entries(weights).forEach(([category, weight]) => {
                if (cityStats[category]) {
                    // Normalize by population (per 100k people)
                    const normalizedValue = (cityStats[category] / city.pop) * 100000;
                    totalScore += normalizedValue * weight;
                    weightSum += weight;
                }
            });
            
            city.score = weightSum > 0 ? Math.round(totalScore * 10) / 10 : 0;
        });
        
        // Calculate relative scores (0-100 scale)
        const maxScore = Math.max(...this.cities.map(c => c.score));
        this.cities.forEach(city => {
            city.relativeScore = maxScore > 0 ? Math.round((city.score / maxScore) * 100) : 0;
        });
    }

    initializeEventListeners() {
        // View toggle buttons
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchView(e.target.dataset.toggle);
            });
        });
        
        // Criteria pills
        document.querySelectorAll('.pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
                this.changeCriteria(e.target.dataset.criteria);
            });
        });
        
        // Search
        document.getElementById('search').addEventListener('input', (e) => {
            this.filterCities(e.target.value);
        });
        
        // Sort
        document.getElementById('sort').addEventListener('change', (e) => {
            this.sortCities(e.target.value);
        });
        
        // Modal close
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });
        
        // FAB
        document.getElementById('fab').addEventListener('click', () => {
            this.showComparison();
        });
        
        // Heatmap toggle
        document.getElementById('heatmap-toggle').addEventListener('change', (e) => {
            this.toggleHeatmap(e.target.checked);
        });
    }

    initializeMap() {
        // Center map on Romania
        this.map = L.map('map').setView([45.9432, 24.9668], 7);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
        
        this.updateMapMarkers();
    }

    updateMapMarkers() {
        // Clear existing markers
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
        
        // Add markers for cities with coordinates
        this.cities.forEach(city => {
            if (city.coords) {
                const marker = L.circleMarker(city.coords, {
                    radius: 8 + (city.relativeScore / 10),
                    fillColor: this.getScoreColor(city.relativeScore),
                    color: '#fff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                }).addTo(this.map);
                
                marker.bindPopup(`
                    <div class="map-popup">
                        <h3>${city.name}</h3>
                        <p>County: ${city.county}</p>
                        <p>Population: ${city.pop?.toLocaleString() || 'N/A'}</p>
                        <p>Score: ${city.relativeScore}/100</p>
                        <button onclick="app.showCityProfile('${city.id}')">View Profile</button>
                    </div>
                `);
                
                this.markers.push(marker);
            }
        });
    }

    getScoreColor(score) {
        if (score >= 80) return '#22c55e';
        if (score >= 60) return '#3b82f6';
        if (score >= 40) return '#f59e0b';
        return '#ef4444';
    }

    switchView(view) {
        // Update active buttons
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.toggle === view);
        });
        
        // Update view panels
        document.querySelectorAll('.view-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        const viewMap = {
            'map': 'map-view',
            'list': 'list-view',
            'table': 'table-view'
        };
        
        const viewPanel = document.getElementById(viewMap[view]);
        if (viewPanel) {
            viewPanel.classList.add('active');
            
            // Refresh map if switching to map view
            if (view === 'map' && this.map) {
                setTimeout(() => this.map.invalidateSize(), 100);
            }
        }
    }

    changeCriteria(criteria) {
        this.currentCriteria = criteria;
        
        // Update active pill
        document.querySelectorAll('.pill').forEach(pill => {
            pill.classList.toggle('active', pill.dataset.criteria === criteria);
        });
        
        if (criteria === 'custom') {
            this.showCriteriaBuilder();
        } else {
            this.calculateScores();
            this.updateViews();
        }
    }

    updateViews() {
        this.updateListView();
        this.updateTableView();
        this.updateMapMarkers();
    }

    updateListView() {
        const container = document.getElementById('cities-list');
        const sortedCities = [...this.cities].sort((a, b) => b.relativeScore - a.relativeScore);
        
        container.innerHTML = sortedCities.map(city => `
            <div class="city-card" onclick="app.showCityProfile('${city.id}')">
                <h3>${city.name}</h3>
                <div class="city-meta">
                    <span>📍 ${city.county}</span>
                    <span>👥 ${city.pop?.toLocaleString() || 'N/A'}</span>
                </div>
                <div class="city-scores">
                    <div class="score-item">
                        <span>Overall Score</span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${city.relativeScore}%"></div>
                        </div>
                        <span>${city.relativeScore}/100</span>
                    </div>
                </div>
                <div style="margin-top: 1rem;">
                    <label>
                        <input type="checkbox" 
                               onchange="app.toggleCitySelection('${city.id}')"
                               ${this.selectedCities.has(city.id) ? 'checked' : ''}>
                        Add to comparison
                    </label>
                </div>
            </div>
        `).join('');
    }

    updateTableView() {
        const headerRow = document.getElementById('table-header');
        const tbody = document.getElementById('table-body');
        
        // Get top categories for display
        const topCategories = this.categories.slice(0, 8);
        
        // Build header
        headerRow.innerHTML = `
            <th>City</th>
            <th>Score</th>
            <th>Population</th>
            ${topCategories.map(cat => `<th>${cat}</th>`).join('')}
        `;
        
        // Build rows
        const sortedCities = [...this.cities].sort((a, b) => b.relativeScore - a.relativeScore);
        tbody.innerHTML = sortedCities.map(city => {
            const cityStats = this.stats[city.id] || {};
            return `
                <tr>
                    <td><strong>${city.name}</strong></td>
                    <td>${city.relativeScore}/100</td>
                    <td>${city.pop?.toLocaleString() || 'N/A'}</td>
                    ${topCategories.map(cat => {
                        const value = cityStats[cat] || 0;
                        const normalized = city.pop ? Math.round((value / city.pop) * 100000) : 0;
                        return `<td class="${this.getHeatmapClass(normalized)}">${value}</td>`;
                    }).join('')}
                </tr>
            `;
        }).join('');
    }

    getHeatmapClass(value) {
        if (value === 0) return 'heat-0';
        if (value < 10) return 'heat-1';
        if (value < 20) return 'heat-2';
        if (value < 30) return 'heat-3';
        if (value < 50) return 'heat-4';
        if (value < 75) return 'heat-5';
        if (value < 100) return 'heat-6';
        if (value < 150) return 'heat-7';
        return 'heat-8';
    }

    showCityProfile(cityId) {
        const city = this.cities.find(c => c.id === cityId);
        if (!city) return;
        
        const cityStats = this.stats[cityId] || {};
        const modal = document.getElementById('city-modal');
        const profileContainer = document.getElementById('city-profile');
        
        // Build profile HTML
        profileContainer.innerHTML = `
            <div class="city-profile">
                <div class="city-header">
                    <h2>${city.name}</h2>
                    <p>${city.county} County | Population: ${city.pop?.toLocaleString() || 'N/A'}</p>
                    <h3>Overall Score: ${city.relativeScore}/100</h3>
                </div>
                
                <div class="city-stats-grid">
                    ${Object.entries(cityStats).map(([category, count]) => {
                        const normalized = city.pop ? Math.round((count / city.pop) * 100000) : 0;
                        return `
                            <div class="stat-card">
                                <h4>${category}</h4>
                                <div class="value">${count}</div>
                                <small>${normalized} per 100k people</small>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="app.toggleCitySelection('${cityId}')">
                        ${this.selectedCities.has(cityId) ? 'Remove from' : 'Add to'} Comparison
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
    }

    closeModal() {
        document.getElementById('city-modal').classList.remove('active');
    }

    toggleCitySelection(cityId) {
        if (this.selectedCities.has(cityId)) {
            this.selectedCities.delete(cityId);
        } else if (this.selectedCities.size < 3) {
            this.selectedCities.add(cityId);
        } else {
            alert('You can compare up to 3 cities at a time');
            return;
        }
        
        // Update FAB
        document.getElementById('compare-count').textContent = 
            `Compare (${this.selectedCities.size}/3)`;
        
        // Update checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            if (cb.onchange && cb.onchange.toString().includes(cityId)) {
                cb.checked = this.selectedCities.has(cityId);
            }
        });
    }

    showComparison() {
        if (this.selectedCities.size < 2) {
            alert('Please select at least 2 cities to compare');
            return;
        }
        
        // Switch to comparison view
        document.querySelectorAll('.view-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById('comparison-view').classList.add('active');
        
        // Build comparison
        const selectedCityData = Array.from(this.selectedCities).map(id => 
            this.cities.find(c => c.id === id)
        );
        
        this.renderComparison(selectedCityData);
    }

    renderComparison(cities) {
        const container = document.getElementById('comparison-cities');
        
        // Show city cards
        container.innerHTML = cities.map(city => `
            <div class="city-card">
                <h3>${city.name}</h3>
                <p>Score: ${city.relativeScore}/100</p>
            </div>
        `).join('');
        
        // Create comparison chart
        const ctx = document.getElementById('comparison-chart').getContext('2d');
        
        if (this.comparisonChart) {
            this.comparisonChart.destroy();
        }
        
        const topCategories = this.categories.slice(0, 10);
        const datasets = cities.map((city, index) => ({
            label: city.name,
            data: topCategories.map(cat => {
                const value = this.stats[city.id]?.[cat] || 0;
                return city.pop ? Math.round((value / city.pop) * 100000) : 0;
            }),
            backgroundColor: `hsla(${index * 120}, 70%, 50%, 0.5)`,
            borderColor: `hsl(${index * 120}, 70%, 50%)`,
            borderWidth: 2
        }));
        
        this.comparisonChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: topCategories,
                datasets: datasets
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'City Comparison (per 100k people)'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    showCriteriaBuilder() {
        document.querySelectorAll('.view-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById('criteria-builder').classList.add('active');
        
        const container = document.getElementById('criteria-sliders');
        const weights = this.customWeights || this.getEqualWeights();
        
        container.innerHTML = this.categories.map(category => {
            const weight = Math.round((weights[category] || 0) * 100);
            return `
                <div class="slider-group">
                    <div class="slider-label">
                        <span>${category}</span>
                        <span id="weight-${category}">${weight}%</span>
                    </div>
                    <input type="range" 
                           class="slider" 
                           min="0" 
                           max="100" 
                           value="${weight}"
                           data-category="${category}"
                           oninput="app.updateWeight('${category}', this.value)">
                </div>
            `;
        }).join('');
        
        // Apply criteria button
        document.getElementById('apply-criteria').onclick = () => {
            this.applyCriteria();
        };
    }

    updateWeight(category, value) {
        document.getElementById(`weight-${category}`).textContent = `${value}%`;
        if (!this.customWeights) {
            this.customWeights = {};
        }
        this.customWeights[category] = parseInt(value) / 100;
    }

    applyCriteria() {
        this.currentCriteria = 'custom';
        this.calculateScores();
        this.updateViews();
        this.switchView('list');
    }

    filterCities(searchTerm) {
        const term = searchTerm.toLowerCase();
        const cards = document.querySelectorAll('.city-card');
        
        cards.forEach(card => {
            const cityName = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = cityName.includes(term) ? 'block' : 'none';
        });
    }

    sortCities(sortBy) {
        if (sortBy === 'score') {
            this.cities.sort((a, b) => b.relativeScore - a.relativeScore);
        } else if (sortBy === 'population') {
            this.cities.sort((a, b) => (b.pop || 0) - (a.pop || 0));
        } else if (sortBy === 'name') {
            this.cities.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        this.updateViews();
    }

    toggleHeatmap(enabled) {
        const table = document.getElementById('comparison-table');
        table.classList.toggle('heatmap', enabled);
    }

    showError(message) {
        const loading = document.getElementById('loading');
        loading.innerHTML = `
            <div style="color: var(--danger); text-align: center;">
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Initialize application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new CityProfiler();
    app.init();
});
