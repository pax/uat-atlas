import React, { useState } from 'react';
import { Sliders, TrendingUp, Map, BarChart3, Users, Building2, Heart, GraduationCap, ShoppingBag, Palette, Bus } from 'lucide-react';

export default function CityProfilerWireframes() {
  const [activeView, setActiveView] = useState('homepage');
  const [activeVariant, setActiveVariant] = useState('A');
  const [weights, setWeights] = useState({
    healthcare: 100,
    education: 100,
    dining: 100,
    culture: 100,
    shopping: 100,
    recreation: 100,
    transport: 100
  });

  const cities = ['București', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța'];
  const categories = [
    { id: 'healthcare', name: 'Healthcare', icon: Heart, color: '#ef4444' },
    { id: 'education', name: 'Education', icon: GraduationCap, color: '#3b82f6' },
    { id: 'dining', name: 'Food & Dining', icon: ShoppingBag, color: '#f59e0b' },
    { id: 'culture', name: 'Culture', icon: Palette, color: '#8b5cf6' },
    { id: 'shopping', name: 'Shopping', icon: Building2, color: '#10b981' },
    { id: 'recreation', name: 'Recreation', icon: Users, color: '#06b6d4' },
    { id: 'transport', name: 'Transport', icon: Bus, color: '#6366f1' }
  ];

  const views = [
    { id: 'homepage', name: 'Homepage / Explorer' },
    { id: 'comparison', name: 'City Comparison' },
    { id: 'profile', name: 'City Profile' },
    { id: 'weights', name: 'Weight Customization' }
  ];

  // Mock data
  const cityScores = {
    'București': { overall: 87, healthcare: 92, education: 88, dining: 95, culture: 90, shopping: 89, recreation: 82, transport: 85 },
    'Cluj-Napoca': { overall: 85, healthcare: 88, education: 92, dining: 87, culture: 85, shopping: 84, recreation: 88, transport: 78 },
    'Timișoara': { overall: 82, healthcare: 85, education: 86, dining: 84, culture: 82, shopping: 81, recreation: 85, transport: 75 },
    'Iași': { overall: 79, healthcare: 82, education: 89, dining: 78, culture: 80, shopping: 76, recreation: 79, transport: 70 },
    'Constanța': { overall: 76, healthcare: 78, education: 75, dining: 82, culture: 74, shopping: 77, recreation: 80, transport: 68 }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-2">City Profiler - Wireframe Explorations</h1>
        <p className="text-gray-600 mb-6">Interactive prototype showing different UI patterns and layouts</p>
        
        {/* View Selector */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {views.map(view => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === view.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {view.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {activeView === 'homepage' && <HomepageWireframes variant={activeVariant} setVariant={setActiveVariant} cities={cities} cityScores={cityScores} categories={categories} />}
        {activeView === 'comparison' && <ComparisonWireframes cities={cities} cityScores={cityScores} categories={categories} weights={weights} />}
        {activeView === 'profile' && <ProfileWireframes city="Cluj-Napoca" cityScores={cityScores} categories={categories} />}
        {activeView === 'weights' && <WeightsWireframes weights={weights} setWeights={setWeights} categories={categories} cities={cities} cityScores={cityScores} />}
      </div>
    </div>
  );
}

// Homepage Wireframes
function HomepageWireframes({ variant, setVariant, cities, cityScores, categories }) {
  return (
    <div>
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Pattern Options:</h2>
          <div className="flex gap-2">
            {['A', 'B', 'C'].map(v => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-3 py-1 rounded ${variant === v ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Variant {v}
              </button>
            ))}
          </div>
        </div>
        
        {variant === 'A' && <HomepageVariantA cities={cities} cityScores={cityScores} />}
        {variant === 'B' && <HomepageVariantB cities={cities} cityScores={cityScores} categories={categories} />}
        {variant === 'C' && <HomepageVariantC cities={cities} cityScores={cityScores} />}
      </div>

      {/* Annotations */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <h3 className="font-bold mb-2">Design Notes:</h3>
        <ul className="space-y-1 text-sm">
          <li><strong>Variant A (Card Grid):</strong> Visual, scannable, good for browsing. Best for tourists.</li>
          <li><strong>Variant B (Data Table):</strong> Dense information, easy sorting/filtering. Best for relocators doing research.</li>
          <li><strong>Variant C (Map + List):</strong> Geographic context, great for understanding regional differences.</li>
        </ul>
      </div>
    </div>
  );
}

function HomepageVariantA({ cities, cityScores }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">Variant A: Card Grid Layout</h3>
        <p className="text-sm text-gray-600 mb-4">Visual browsing with quick selection for comparison</p>
      </div>

      {/* Search & Filters */}
      <div className="border-2 border-dashed border-gray-300 rounded p-4 mb-4 bg-gray-50">
        <div className="flex gap-4">
          <div className="flex-1 border-2 border-gray-400 rounded p-2 bg-white">
            🔍 Search cities...
          </div>
          <button className="border-2 border-gray-400 rounded px-4 py-2 bg-white">
            <Sliders className="inline mr-2" size={16} /> Filters
          </button>
          <button className="border-2 border-blue-600 rounded px-4 py-2 bg-blue-600 text-white font-medium">
            Compare Selected (0)
          </button>
        </div>
      </div>

      {/* City Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.slice(0, 6).map(city => (
          <div key={city} className="border-2 border-gray-300 rounded-lg p-4 bg-white hover:border-blue-500 transition-colors cursor-pointer">
            {/* Checkbox */}
            <div className="flex justify-between items-start mb-3">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">#{cities.indexOf(city) + 1}</span>
            </div>
            
            {/* City Image Placeholder */}
            <div className="border-2 border-dashed border-gray-300 rounded h-32 mb-3 bg-gray-100 flex items-center justify-center text-gray-400">
              📷 City Image
            </div>
            
            {/* City Info */}
            <h3 className="font-bold text-lg mb-1">{city}</h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold text-blue-600">{cityScores[city].overall}</span>
              <span className="text-sm text-gray-500">Overall Score</span>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="border border-gray-200 rounded p-2">
                <div className="text-gray-500">Healthcare</div>
                <div className="font-bold">{cityScores[city].healthcare}</div>
              </div>
              <div className="border border-gray-200 rounded p-2">
                <div className="text-gray-500">Culture</div>
                <div className="font-bold">{cityScores[city].culture}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomepageVariantB({ cities, cityScores, categories }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">Variant B: Data Table Layout</h3>
        <p className="text-sm text-gray-600 mb-4">Sortable, filterable, information-dense</p>
      </div>

      {/* Controls */}
      <div className="border-2 border-dashed border-gray-300 rounded p-4 mb-4 bg-gray-50 flex justify-between items-center">
        <div className="flex gap-2">
          <button className="border-2 border-gray-400 rounded px-3 py-1 bg-white text-sm">
            All Cities (20)
          </button>
          <button className="border-2 border-gray-400 rounded px-3 py-1 bg-white text-sm">
            <Sliders size={14} className="inline mr-1" /> Min Score: 75
          </button>
        </div>
        <button className="border-2 border-blue-600 rounded px-4 py-2 bg-blue-600 text-white font-medium text-sm">
          Compare Selected
        </button>
      </div>

      {/* Table */}
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
        <table className="w-full">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="p-3 text-left">
                <input type="checkbox" className="w-5 h-5" />
              </th>
              <th className="p-3 text-left font-bold">City</th>
              <th className="p-3 text-left font-bold cursor-pointer hover:bg-gray-200">
                Overall ↓
              </th>
              {categories.slice(0, 4).map(cat => (
                <th key={cat.id} className="p-3 text-left font-bold cursor-pointer hover:bg-gray-200">
                  {cat.name}
                </th>
              ))}
              <th className="p-3 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, idx) => (
              <tr key={city} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3">
                  <input type="checkbox" className="w-5 h-5" />
                </td>
                <td className="p-3">
                  <div className="font-bold">{city}</div>
                  <div className="text-xs text-gray-500">Pop: 320k</div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{cityScores[city].overall}</span>
                    <span className="text-xs text-gray-500">#{idx + 1}</span>
                  </div>
                </td>
                {categories.slice(0, 4).map(cat => (
                  <td key={cat.id} className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${cityScores[city][cat.id]}%` }}
                        />
                      </div>
                      <span className="text-sm">{cityScores[city][cat.id]}</span>
                    </div>
                  </td>
                ))}
                <td className="p-3">
                  <button className="text-blue-600 text-sm hover:underline">View →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HomepageVariantC({ cities, cityScores }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">Variant C: Map + List Hybrid</h3>
        <p className="text-sm text-gray-600 mb-4">Geographic context with interactive filtering</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map Section */}
        <div className="lg:col-span-2 border-2 border-gray-300 rounded-lg p-4 bg-white">
          <div className="border-2 border-dashed border-gray-300 rounded h-96 bg-gray-100 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Map size={48} className="mx-auto mb-2" />
              <div>Romania Map with City Pins</div>
              <div className="text-sm">(size = overall score)</div>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="border-2 border-gray-300 rounded-lg bg-white">
          <div className="p-4 border-b-2 border-gray-300 bg-gray-50">
            <h3 className="font-bold mb-2">Cities</h3>
            <input 
              type="text" 
              placeholder="Filter..." 
              className="w-full border-2 border-gray-300 rounded p-2 text-sm"
            />
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {cities.map(city => (
              <div key={city} className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">{city}</span>
                  <input type="checkbox" className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600">{cityScores[city].overall}</span>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${cityScores[city].overall}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t-2 border-gray-300">
            <button className="w-full border-2 border-blue-600 rounded px-4 py-2 bg-blue-600 text-white font-medium">
              Compare Selected (0)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Comparison Wireframes
function ComparisonWireframes({ cities, cityScores, categories, weights }) {
  const [selectedCities, setSelectedCities] = useState(['București', 'Cluj-Napoca', 'Timișoara']);
  const [showWeights, setShowWeights] = useState(false);
  const [normalization, setNormalization] = useState('per100k');

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {selectedCities.map(city => (
              <div key={city} className="border-2 border-blue-500 rounded-lg px-3 py-1 bg-blue-50 flex items-center gap-2">
                <span className="font-medium">{city}</span>
                <button className="text-gray-500 hover:text-red-600">×</button>
              </div>
            ))}
            <button className="border-2 border-dashed border-gray-400 rounded-lg px-3 py-1 text-gray-600 hover:border-blue-500">
              + Add City
            </button>
          </div>
          
          <div className="flex gap-2">
            <select className="border-2 border-gray-300 rounded px-3 py-2">
              <option>Per 100k pop</option>
              <option>Per km²</option>
              <option>Raw counts</option>
            </select>
            <button 
              onClick={() => setShowWeights(!showWeights)}
              className="border-2 border-gray-300 rounded px-4 py-2 bg-white hover:bg-gray-50"
            >
              <Sliders size={16} className="inline mr-2" />
              Adjust Weights
            </button>
            <button className="border-2 border-gray-300 rounded px-4 py-2 bg-white hover:bg-gray-50">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Comparison Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-bold mb-4">Multi-Dimensional Comparison</h3>
          <div className="border-2 border-dashed border-gray-300 rounded h-80 bg-gray-50 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto mb-2" />
              <div>Radar/Spider Chart</div>
              <div className="text-sm mt-2">All 7 categories visualized</div>
              <div className="text-xs mt-2">București (blue) vs Cluj (red) vs Timișoara (green)</div>
            </div>
          </div>
          <div className="mt-4 flex gap-4 justify-center">
            {selectedCities.map((city, idx) => (
              <div key={city} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-red-500' : 'bg-green-500'}`} />
                <span className="text-sm">{city}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Scores */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-bold mb-4">Overall Scores</h3>
          <div className="space-y-4">
            {selectedCities.map((city, idx) => (
              <div key={city} className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">#{idx + 1}</span>
                    <div>
                      <div className="font-bold text-lg">{city}</div>
                      <div className="text-xs text-gray-500">Pop: 320k • Area: 228 km²</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{cityScores[city].overall}</div>
                    <div className="text-xs text-gray-500">Weighted Score</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all" 
                    style={{ width: `${cityScores[city].overall}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-bold mb-4">Category-by-Category Breakdown</h3>
        <div className="space-y-6">
          {categories.map(category => (
            <div key={category.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-center gap-2 mb-3">
                <category.icon size={20} style={{ color: category.color }} />
                <span className="font-bold">{category.name}</span>
                <span className="text-xs text-gray-500 ml-auto">Weight: {weights[category.id]}%</span>
              </div>
              
              {/* Horizontal bars comparison */}
              <div className="space-y-2">
                {selectedCities.map((city, idx) => (
                  <div key={city} className="flex items-center gap-3">
                    <span className="text-sm w-32 text-right">{city}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 relative">
                      <div 
                        className={`h-6 rounded-full transition-all ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${cityScores[city][category.id]}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white mix-blend-difference">
                        {cityScores[city][category.id]}
                      </span>
                    </div>
                    <span className="text-sm w-16 text-gray-600">
                      {Math.floor(cityScores[city][category.id] * 1.2)} venues
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Notes */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <h3 className="font-bold mb-2">Key Design Decisions:</h3>
        <ul className="space-y-1 text-sm">
          <li>• Radar chart gives instant visual "shape" of each city</li>
          <li>• Horizontal bars allow easy direct comparison per category</li>
          <li>• Color coding consistent across all visualizations</li>
          <li>• Raw numbers shown alongside percentages for context</li>
          <li>• Weight adjustments recalculate all scores in real-time</li>
        </ul>
      </div>
    </div>
  );
}

// City Profile Wireframe
function ProfileWireframes({ city, cityScores, categories }) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="border-2 border-dashed border-gray-300 h-48 bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center text-gray-400">
          📷 Hero Image: {city} Skyline
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{city}</h1>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>🏛️ Pop: 286,598</span>
                <span>📏 Area: 179.5 km²</span>
                <span>🌍 Region: Transilvania</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-blue-600">{cityScores[city].overall}</div>
              <div className="text-sm text-gray-500">Overall Score</div>
              <div className="text-xs text-gray-400 mt-1">Rank #2 of 20</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <button className="flex-1 border-2 border-blue-600 rounded-lg px-4 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700">
          Compare with Other Cities
        </button>
        <button className="border-2 border-gray-300 rounded-lg px-4 py-3 bg-white font-medium hover:bg-gray-50">
          Export Profile
        </button>
        <button className="border-2 border-gray-300 rounded-lg px-4 py-3 bg-white font-medium hover:bg-gray-50">
          Share
        </button>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h3 className="font-bold text-green-800 mb-3">💪 Top Strengths</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Education</span>
              <span className="font-bold text-green-600">92</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Healthcare</span>
              <span className="font-bold text-green-600">88</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Recreation</span>
              <span className="font-bold text-green-600">88</span>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
          <h3 className="font-bold text-orange-800 mb-3">⚠️ Areas for Improvement</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Transport</span>
              <span className="font-bold text-orange-600">78</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Shopping</span>
              <span className="font-bold text-orange-600">84</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Culture</span>
              <span className="font-bold text-orange-600">85</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Deep Dive */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-bold text-xl mb-6">Category Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(category => (
            <div key={category.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${category.color}20` }}>
                  <category.icon size={24} style={{ color: category.color }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{category.name}</h4>
                  <p className="text-xs text-gray-500">Per 100k population</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold" style={{ color: category.color }}>
                    {cityScores[city][category.id]}
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                <div 
                  className="h-2 rounded-full" 
                  style={{ 
                    width: `${cityScores[city][category.id]}%`,
                    backgroundColor: category.color 
                  }}
                />
              </div>
              
              {/* Venue breakdown */}
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>• Primary venues:</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between">
                  <span>• Secondary venues:</span>
                  <span className="font-medium">23</span>
                </div>
              </div>
              
              <button className="text-xs text-blue-600 hover:underline mt-2">
                View detailed breakdown →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-bold text-xl mb-4">Venue Distribution Map</h3>
        <div className="border-2 border-dashed border-gray-300 rounded h-96 bg-gray-50 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <Map size={48} className="mx-auto mb-2" />
            <div>Interactive map of {city}</div>
            <div className="text-sm mt-2">Filter by category • Heatmap view • Cluster view</div>
          </div>
        </div>
      </div>

      {/* Similar Cities */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-bold text-xl mb-4">Similar Cities You Might Like</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['București', 'Timișoara', 'Brașov'].map(similarCity => (
            <div key={similarCity} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors">
              <div className="border-2 border-dashed border-gray-300 rounded h-24 mb-3 bg-gray-100" />
              <h4 className="font-bold mb-1">{similarCity}</h4>
              <div className="text-sm text-gray-600 mb-2">Match: 87%</div>
              <button className="text-sm text-blue-600 hover:underline">Compare →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Design Notes */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <h3 className="font-bold mb-2">Profile View Rationale:</h3>
        <ul className="space-y-1 text-sm">
          <li>• Hero section establishes identity and key stats immediately</li>
          <li>• Strengths/weaknesses provide quick actionable insights</li>
          <li>• Category cards allow drilling down without overwhelming</li>
          <li>• Map provides spatial context for venue distribution</li>
          <li>• Similar cities encourage exploration</li>
        </ul>
      </div>
    </div>
  );
}

// Weight Customization Wireframes
function WeightsWireframes({ weights, setWeights, categories, cities, cityScores }) {
  const [previewCities] = useState(['București', 'Cluj-Napoca', 'Timișoara']);

  const calculateWeightedScore = (city) => {
    let totalWeight = 0;
    let weightedSum = 0;
    
    categories.forEach(cat => {
      const weight = weights[cat.id] / 100;
      totalWeight += weight;
      weightedSum += cityScores[city][cat.id] * weight;
    });
    
    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-2">Customize Category Weights</h2>
        <p className="text-gray-600">Adjust the importance of each category to match your priorities. Scores will update in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weight Sliders */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Adjust Weights</h3>
            <div className="flex gap-2">
              <button className="text-sm text-blue-600 hover:underline">Reset to Default</button>
              <button className="text-sm text-blue-600 hover:underline">Save Profile</button>
            </div>
          </div>

          <div className="space-y-6">
            {categories.map(category => (
              <div key={category.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded" style={{ backgroundColor: `${category.color}20` }}>
                    <category.icon size={20} style={{ color: category.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{category.name}</div>
                    <div className="text-xs text-gray-500">How important is this to you?</div>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: category.color }}>
                    {weights[category.id]}%
                  </div>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={weights[category.id]}
                  onChange={(e) => setWeights({...weights, [category.id]: parseInt(e.target.value)})}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${category.color} 0%, ${category.color} ${weights[category.id]/2}%, #e5e7eb ${weights[category.id]/2}%, #e5e7eb 100%)`
                  }}
                />
                
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Not Important</span>
                  <span>Normal (100%)</span>
                  <span>Very Important</span>
                </div>
              </div>
            ))}
          </div>

          {/* Preset Profiles */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-bold mb-3">Quick Presets</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['Balanced', 'Family', 'Student', 'Professional', 'Tourist', 'Retiree', 'Digital Nomad', 'Custom'].map(preset => (
                <button 
                  key={preset}
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 text-sm hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-bold mb-4">Live Rankings Preview</h3>
          <p className="text-xs text-gray-600 mb-4">Top 3 cities with your custom weights:</p>
          
          <div className="space-y-3">
            {previewCities.map((city, idx) => {
              const score = calculateWeightedScore(city);
              return (
                <div key={city} className="border-2 border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xl font-bold ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : 'text-orange-600'}`}>
                      #{idx + 1}
                    </span>
                    <span className="font-bold text-sm">{city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-600">{score}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Change indicator */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs">
            <strong>💡 Tip:</strong> Rankings update as you adjust weights. Try emphasizing healthcare or nightlife to see changes!
          </div>

          {/* Apply Button */}
          <button className="w-full mt-4 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Apply & View Full Rankings
          </button>
        </div>
      </div>

      {/* Before/After Comparison */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-4">Impact Analysis: Default vs Your Weights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-3">Default Rankings (Equal Weights)</h4>
            <div className="space-y-2">
              {cities.slice(0, 5).map((city, idx) => (
                <div key={city} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">#{idx + 1} {city}</span>
                  <span className="font-bold">{cityScores[city].overall}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-3">Your Custom Rankings</h4>
            <div className="space-y-2">
              {cities.slice(0, 5).map((city, idx) => {
                const score = calculateWeightedScore(city);
                return (
                  <div key={city} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-sm">#{idx + 1} {city}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{score}</span>
                      <span className="text-xs text-green-600">↑3</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Design Notes */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <h3 className="font-bold mb-2">Weight Customization Strategy:</h3>
        <ul className="space-y-1 text-sm">
          <li>• <strong>Sidebar pattern:</strong> Keep weights visible while browsing (for power users)</li>
          <li>• <strong>Modal pattern:</strong> Dedicated focus mode for adjustment (shown here)</li>
          <li>• Real-time preview shows immediate impact of changes</li>
          <li>• Preset profiles allow quick exploration of different perspectives</li>
          <li>• Save/load functionality enables returning users to pick up where they left off</li>
          <li>• 200% max allows emphasizing critical factors (e.g., healthcare for families)</li>
        </ul>
      </div>
    </div>
  );
}
