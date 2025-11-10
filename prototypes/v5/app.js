
let currentData = null;
let sortColumn = null;
let sortDirection = 'desc';
let currentView = 'parent';
let weights = {};
let drawerOpen = false;
let categoryMetadata = {};
let displayMode = 'score'; // 'score' or 'absolute'

// Preset profiles for parent categories
const presetsParent = {
    'equal': {},
    'small-children': {
        'Education': 30,
        'Health and Wellness': 25,
        'Entertainment and Recreation': 20,
        'Shopping': 15,
        'Services': 10
    },
    'family': {
        'Education': 25,
        'Health and Wellness': 20,
        'Shopping': 15,
        'Entertainment and Recreation': 15,
        'Housing': 15,
        'Transportation': 10
    },
    'retired': {
        'Health and Wellness': 30,
        'Entertainment and Recreation': 20,
        'Culture': 15,
        'Shopping': 15,
        'Transportation': 10,
        'Services': 10
    },
    'culture': {
        'Culture': 40,
        'Entertainment and Recreation': 25,
        'Food and Drink': 20,
        'Lodging': 15
    },
    'tourism': {
        'Entertainment and Recreation': 25,
        'Culture': 20,
        'Food and Drink': 20,
        'Lodging': 20,
        'Transportation': 15
    },
    'youth': {
        'Entertainment and Recreation': 30,
        'Food and Drink': 20,
        'Shopping': 15,
        'Culture': 15,
        'Transportation': 10,
        'Sports': 10
    }
};

// Preset profiles for raw categories
const presetsRaw = {
    'equal': {},
    'small-children': {
        'preschool': 25,
        'primary_school': 20,
        'park': 20,
        'doctor': 15,
        'hospital': 10,
        'supermarket': 10
    },
    'family': {
        'school': 20,
        'primary_school': 15,
        'secondary_school': 15,
        'park': 15,
        'supermarket': 10,
        'doctor': 10,
        'hospital': 10,
        'apartment housing': 5
    },
    'retired': {
        'doctor': 20,
        'hospital': 15,
        'pharmacies': 15,
        'park': 15,
        'museum': 10,
        'restaurant': 10,
        'supermarket': 10,
        'bus stations stops taxis': 5
    },
    'culture': {
        'museum': 30,
        'performing_arts_theater': 25,
        'culture alt': 20,
        'restaurant': 15,
        'hotel': 10
    },
    'tourism': {
        'tourism alt': 20,
        'museum': 15,
        'hotel': 15,
        'lodging': 15,
        'restaurant': 15,
        'park': 10,
        'bus stations stops taxis': 10
    },
    'youth': {
        'night_club': 20,
        'bar cafe': 20,
        'movie_theater': 15,
        'park': 15,
        'restaurant': 10,
        'fitness gym': 10,
        'sports alt': 10
    }
};

async function loadData() {
    try {
        const response = await fetch(`../../api-raw.php?view=${currentView}`);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'Failed to load data');
        }

        currentData = data;
        categoryMetadata = data.categoryMetadata || {};
        initializeWeights();
        calculateWeightedScores(); // Calculate initial weighted scores with equal weights
        updateViewInfo();
        renderWeightControls();
        sortData('weighted'); // Sort by weighted score initially
    } catch (error) {
        document.getElementById('content').innerHTML =
            `<div class="error">Error: ${error.message}</div>`;
    }
}

function toggleView() {
    const toggle = document.getElementById('viewToggle');
    currentView = toggle.checked ? 'raw' : 'parent';
    sortColumn = null; // Reset to force descending sort
    sortDirection = 'desc';
    loadData();
}

function toggleDisplayMode() {
    const toggle = document.getElementById('displayModeToggle');
    displayMode = toggle.checked ? 'absolute' : 'score';
    // Re-sort with the current column to update order based on new display mode
    if (sortColumn) {
        const currentColumn = sortColumn;
        const currentDirection = sortDirection;
        sortColumn = null; // Reset to force re-sort
        sortDirection = currentDirection;
        sortData(currentColumn);
    } else {
        renderTable();
    }
}

function toggleWeightsDrawer() {
    drawerOpen = !drawerOpen;
    const drawer = document.getElementById('weightsDrawer');
    const button = document.querySelector('.weights-button');
    drawer.classList.toggle('open', drawerOpen);

    if (drawerOpen) {
        button.textContent = '✕ Close Customizer';
    } else {
        button.textContent = '⚖️ Customize Weights';
    }
}

function initializeWeights() {
    weights = {};
    currentData.categories.forEach(cat => {
        weights[cat] = 1;
    });
}

function updateViewInfo() {
    const count = currentData.categories.length;
    const type = currentView === 'parent' ? 'parent categories (aggregated)' : 'raw categories';
    document.getElementById('viewInfo').textContent = `Viewing ${count} ${type}`;
}

function renderWeightControls() {
    const container = document.getElementById('weightControls');
    container.innerHTML = '';

    currentData.categories.forEach(category => {
        const displayName = currentView === 'raw' ? formatCategoryName(category) : category;
        const weight = weights[category] || 1;

        // Get tooltip from metadata
        let tooltip = '';
        if (categoryMetadata[category]) {
            if (currentView === 'parent' && categoryMetadata[category].children) {
                tooltip = categoryMetadata[category].children.replace(/_/g, ' ');
            } else if (currentView === 'raw' && categoryMetadata[category].slugs) {
                tooltip = categoryMetadata[category].slugs;
            }
        }

        const item = document.createElement('div');
        item.className = 'weight-item';
        item.innerHTML = `
                    <span class="weight-label" title="${tooltip}">${displayName}</span>
                    <span class="weight-value" id="weight-${category}">${weight.toFixed(1)}x</span>
                    <input type="range"
                           class="weight-slider"
                           min="0"
                           max="3"
                           step="0.1"
                           value="${weight}"
                           oninput="updateWeight('${category}', this.value)">
                `;
        container.appendChild(item);
    });
}

function updateWeight(category, value) {
    weights[category] = parseFloat(value);
    document.getElementById(`weight-${category}`).textContent = value + 'x';
    calculateWeightedScores();
    // Force descending sort without toggling
    sortColumn = null;
    sortData('weighted'); // Re-sort by weighted score
}

function resetWeights() {
    initializeWeights();
    renderWeightControls();
    calculateWeightedScores();
    // Force descending sort without toggling
    sortColumn = null;
    sortData('weighted'); // Re-sort by weighted score
    document.getElementById('presetSelect').value = 'equal';
}

function applyPreset() {
    const preset = document.getElementById('presetSelect').value;
    const presets = currentView === 'parent' ? presetsParent : presetsRaw;
    const presetWeights = presets[preset];

    // Reset all to 1 first
    initializeWeights();

    // Apply preset weights
    if (preset !== 'equal') {
        Object.keys(presetWeights).forEach(cat => {
            if (weights.hasOwnProperty(cat)) {
                weights[cat] = presetWeights[cat] / 10; // Convert to multiplier
            }
        });
    }

    renderWeightControls();
    calculateWeightedScores();
    // Force descending sort without toggling
    sortColumn = null;
    sortData('weighted'); // Re-sort by weighted score
}

function calculateWeightedScores() {
    currentData.cities.forEach(city => {
        let totalWeightedScore = 0;
        let totalWeight = 0;
        let totalAbsolute = 0;

        currentData.categories.forEach(category => {
            const score = city.scores[category];
            const count = city.counts ? city.counts[category] : null;
            const weight = weights[category] || 1;

            if (score !== null && score !== undefined) {
                totalWeightedScore += score * weight;
                totalWeight += weight;
            }

            if (count !== null && count !== undefined) {
                totalAbsolute += count * weight;
            }
        });

        city.weighted_score = totalWeight > 0 ?
            Math.round((totalWeightedScore / totalWeight) * 100) / 100 : null;
        city.absolute_sum = totalAbsolute;
    });
}

function getScoreClass(score) {
    if (score === null || score === undefined) return 'no-data';
    if (score >= 90) return 'score-90-100';
    if (score >= 80) return 'score-80-90';
    if (score >= 70) return 'score-70-80';
    if (score >= 60) return 'score-60-70';
    if (score >= 50) return 'score-50-60';
    if (score >= 40) return 'score-40-50';
    if (score >= 30) return 'score-30-40';
    if (score >= 20) return 'score-20-30';
    if (score >= 10) return 'score-10-20';
    return 'score-0-10';
}

function formatScore(score) {
    if (score === null || score === undefined) return 'N/A';
    return score.toFixed(1);
}

function formatPopulation(pop) {
    if (!pop) return '';
    return pop.toLocaleString();
}

function formatCategoryName(category) {
    return category.replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function sortData(column) {
    // Save current scroll position
    const tableWrapper = document.querySelector('.table-wrapper');
    const scrollLeft = tableWrapper ? tableWrapper.scrollLeft : 0;

    // If clicking the same column, toggle direction
    // Otherwise, set new column and default to desc (higher numbers on top)
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'desc'; // Always start with highest values on top
    }

    const cities = [...currentData.cities];

    cities.sort((a, b) => {
        let valA, valB;

        if (column === 'city') {
            valA = a.name.toLowerCase();
            valB = b.name.toLowerCase();
        } else if (column === 'population') {
            valA = a.population || 0;
            valB = b.population || 0;
        } else if (column === 'average') {
            valA = a.average_score !== null ? a.average_score : -1;
            valB = b.average_score !== null ? b.average_score : -1;
        } else if (column === 'weighted') {
            // Sort by sum in absolute mode, weighted score in score mode
            if (displayMode === 'absolute') {
                valA = a.absolute_sum !== null ? a.absolute_sum : -1;
                valB = b.absolute_sum !== null ? b.absolute_sum : -1;
            } else {
                valA = a.weighted_score !== null ? a.weighted_score : -1;
                valB = b.weighted_score !== null ? b.weighted_score : -1;
            }
        } else {
            // Sort by count in absolute mode, score in score mode
            if (displayMode === 'absolute') {
                valA = a.counts && a.counts[column] !== null ? a.counts[column] : -1;
                valB = b.counts && b.counts[column] !== null ? b.counts[column] : -1;
            } else {
                valA = a.scores[column] !== null ? a.scores[column] : -1;
                valB = b.scores[column] !== null ? b.scores[column] : -1;
            }
        }

        // Sort logic: for desc, higher values come first (return 1 if a < b)
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    currentData.cities = cities;
    renderTable();

    // Restore scroll position after render
    requestAnimationFrame(() => {
        const newTableWrapper = document.querySelector('.table-wrapper');
        if (newTableWrapper) {
            newTableWrapper.scrollLeft = scrollLeft;
        }
    });
}

function renderTable() {
    const { categories, cities } = currentData;
    let html = '<div class="table-wrapper"><table>';

    // Header
    html += '<thead><tr>';
    html += `<th class="city-column sortable ${sortColumn === 'city' ? 'sort-' + sortDirection : ''}"
                        onclick="sortData('city')">City</th>`;
    const weightedLabel = displayMode === 'absolute' ? 'Sum' : 'Weighted';
    html += `<th class="weighted-column score-cell sortable ${sortColumn === 'weighted' ? 'sort-' + sortDirection : ''}"
                        onclick="sortData('weighted')">${weightedLabel}</th>`;
    html += `<th class="average-column score-cell sortable ${sortColumn === 'average' ? 'sort-' + sortDirection : ''}"
                        onclick="sortData('average')">Average</th>`;
    categories.forEach(category => {
        const displayName = currentView === 'raw' ? formatCategoryName(category) : category;

        // Get tooltip from metadata
        let tooltip = '';
        if (categoryMetadata[category]) {
            if (currentView === 'parent' && categoryMetadata[category].children) {
                tooltip = categoryMetadata[category].children.replace(/_/g, ' ');
            } else if (currentView === 'raw' && categoryMetadata[category].slugs) {
                tooltip = categoryMetadata[category].slugs;
            }
        }

        html += `<th class="score-cell sortable ${sortColumn === category ? 'sort-' + sortDirection : ''}"
                            title="${tooltip}"
                            onclick="sortData('${category}')">${displayName}</th>`;
    });
    html += '</tr></thead>';

    // Body
    html += '<tbody>';
    cities.forEach(city => {
        html += '<tr>';
        html += `<td class="city-column">
                    <strong>${city.name}</strong>
                    <span class="population">${formatPopulation(city.population)} people</span>
                </td>`;

        // Weighted score column (or Sum in absolute mode)
        const weightedScore = city.weighted_score;
        const weightedClass = getScoreClass(weightedScore);
        const isWeightedActive = sortColumn === 'weighted';
        const weightedDisplay = displayMode === 'absolute' ?
            (city.absolute_sum !== null ? city.absolute_sum.toLocaleString() : 'N/A') :
            formatScore(weightedScore);
        html += `<td class="weighted-column score-cell ${isWeightedActive ? 'active-sort-column' : ''}">
                    <div class="score-bar ${weightedClass}">
                        ${weightedDisplay}
                    </div>
                </td>`;

        // Average score column
        const avgScore = city.average_score;
        const avgClass = getScoreClass(avgScore);
        const isAverageActive = sortColumn === 'average';
        html += `<td class="average-column score-cell ${isAverageActive ? 'active-sort-column' : ''}">
                    <div class="score-bar ${avgClass}">
                        ${formatScore(avgScore)}
                    </div>
                </td>`;

        categories.forEach(category => {
            const score = city.scores[category];
            const scoreClass = getScoreClass(score);
            const count = city.counts ? city.counts[category] : null;
            const population = city.population || 1;
            const perThousand = count !== null ? (count / population * 1000).toFixed(2) : null;

            let tooltipAttr = '';
            if (count !== null) {
                const tooltipText = `${count} ${category}\n${perThousand} / 1k people`;
                tooltipAttr = ` title="${tooltipText}"`;
            }

            const isActiveColumn = category === sortColumn;
            const displayValue = displayMode === 'absolute' ?
                (count !== null ? count.toLocaleString() : 'N/A') :
                formatScore(score);

            html += `<td class="score-cell ${isActiveColumn ? 'active-sort-column' : ''}"${tooltipAttr}>
                        <div class="score-bar ${scoreClass}">
                            ${displayValue}
                        </div>
                    </td>`;
        });

        html += '</tr>';
    });
    html += '</tbody>';

    html += '</table></div>';
    document.getElementById('content').innerHTML = html;
}

// Load data on page load
loadData();
