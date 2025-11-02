## City Profiler - Product Specification

### Project Overview
Design a web-based city comparison tool for Romanian cities that helps residents and tourists evaluate cities across multiple quality-of-life dimensions using venue density data from Google Places API and other sources.

### Core Requirements

**Data Foundation**
- 20 Romanian cities at launch
- Primary data: venue counts from Google Places (pharmacies, schools, bars, hospitals, restaurants, parks, etc.)
- Future data sources: Numbeo, Expatistan, Wikipedia page views
- All metrics normalized per 100k population (default view)
- Option to view: per capita, per km², or raw counts

**Target Users**
1. **Relocators** (primary): Romanians deciding where to live, prioritizing quality of life factors
2. **Tourists** (secondary): Visitors evaluating cities for short/medium-term stays

**User Needs**
- Compare 2-4 cities simultaneously across multiple dimensions
- Customize importance of different categories (healthcare vs nightlife vs culture)
- Quickly understand city strengths/weaknesses
- Discover cities that match their priorities
- Deep-dive into specific categories

---

### Functional Requirements

#### 1. Category Organization
Group venue types into 5-7 major categories:

**Suggested structure:**
- **Healthcare & Wellness** (hospitals, pharmacies, clinics, gyms)
- **Education & Learning** (schools, universities, libraries)
- **Food & Dining** (restaurants, cafes, bars)
- **Culture & Entertainment** (museums, theaters, galleries, cinemas)
- **Shopping & Services** (supermarkets, shops, banks, post offices)
- **Recreation & Nature** (parks, sports facilities, playgrounds)
- **Transportation** (public transit density, parking)

Each category should:
- Display aggregated score (0-100 scale)
- Show underlying venue type breakdown
- Allow drilling down to raw numbers

#### 2. Core Features

**A. Multi-City Comparison View**
- Select 2-4 cities from dropdown/chips
- Side-by-side comparison across all categories
- Visual: Radar/spider chart showing all categories
- Visual: Bar charts for individual category deep-dives
- Toggle between normalized/raw data
- Export comparison as image/PDF

**B. Custom Weighting System**
- User adjusts importance of each category (slider: 0-100%)
- Real-time recalculation of overall city scores
- Save custom profiles (e.g., "Young Professional", "Family with Kids", "Digital Nomad")
- See how city rankings change with different weights

**C. City Explorer/Rankings**
- Sortable table of all 20 cities
- Filter by minimum thresholds per category
- Overall score based on current weights
- Quick comparison: click checkbox on 2-4 cities → instant comparison view

**D. Individual City Profile**
- Dedicated page per city
- Hero stats: population, overall score, rank
- Category breakdown with visual charts
- Map showing venue distribution (heatmap or pins)
- Top strengths/weaknesses callouts
- "Similar cities" recommendations

**E. Discovery Tools**
- "Find My City" wizard: answer 5-7 questions → get ranked recommendations
- Preset personas: "Student", "Retiree", "Young Family", "Night Owl", "Remote Worker"
- Filter cities by specific criteria (e.g., "must have 5+ hospitals AND 20+ restaurants per 100k")

---

### Design Principles

1. **Clarity over complexity**: Data viz should be immediately understandable
2. **Flexibility**: Users can customize weights without overwhelming interface
3. **Progressive disclosure**: Start simple, reveal complexity on demand
4. **Mobile-responsive**: Must work on phones (tourists checking on-the-go)
5. **Performance**: Fast load, instant weight adjustments (client-side calculations)
6. **Scannable**: Use color coding (good/avg/poor), clear hierarchy

---

### Technical Considerations

**Data Model**
```
City {
  id, name, population, area_km2,
  categories: {
    healthcare: { score, venues: { hospitals: count, pharmacies: count, ... } },
    education: { score, venues: { schools: count, ... } },
    ...
  }
}
```

**Score Calculation**
- Each venue type has baseline "expected" count per 100k population
- Score = (actual / expected) × 100, capped at 100
- Category score = weighted average of venue type scores within category
- Overall score = weighted average of category scores (using user's custom weights)

**Default Weights** (for initial view)
- All categories weighted equally (100% each)
- Or preset "Balanced" profile

---

### UI Structure & Wireframe Requirements

**Agent Task: Design the following views**

#### View 1: Homepage/Explorer
- City selection interface (cards? list? map?)
- Quick comparison: select multiple cities
- Top filters: sort by overall score, by specific category
- Visual indicator of city rankings
- CTA: "Compare Cities" or "Find My Match"

#### View 2: Comparison View (most important)
- Selected cities displayed prominently (2-4 columns)
- Radar chart: all categories on one visualization
- Category-by-category breakdown (bar charts or data table)
- Weight adjustment panel (sidebar? modal? inline?)
- Toggle: per capita / per km² / raw numbers
- Responsive: stack on mobile

#### View 3: City Profile
- Hero section: city name, photo, key stats
- Overall score with gauge/progress bar
- Category scores (horizontal bars or cards)
- "Compare with..." quick-add button
- Map section (future: pin venues by type)
- Strengths/weaknesses callout boxes

#### View 4: Weight Customization Interface
- Sliders for each category (0-100%)
- Visual feedback: how rankings change as you adjust
- Save/load preset personas
- Reset to defaults
- Inline preview: "Top 3 cities with these weights"

---

### Design Constraints

**Must Have:**
- Radar chart library support (Chart.js, Recharts, D3, etc.)
- Works in modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive: mobile (360px+), tablet (768px+), desktop (1024px+)

**Nice to Have:**
- Animations on chart updates
- Dark mode
- Comparison URL sharing (e.g., `/compare?cities=bucharest,cluj,timisoara`)
- Printable comparison report

---

### Success Metrics (for evaluation)

A good design should:
1. Let users compare 3 cities in <30 seconds
2. Make it obvious which city is "best" for a given profile
3. Support both quick scans (tourists) and deep analysis (relocators)
4. Feel intuitive without tutorial/documentation
5. Scale to 50+ cities without redesign

---

### Example User Flows

**Flow 1: Tourist**
1. Land on homepage
2. Click "Tourist" persona preset
3. See top 5 cities ranked by tourism factors
4. Select 3 cities to compare
5. View radar chart → Bucharest wins on culture, Brașov on nature
6. Decide to visit both

**Flow 2: Relocator**
1. Land on homepage
2. Use "Find My City" wizard
3. Answer: "Healthcare important, nightlife not important, need good schools"
4. Get ranked list: Cluj #1, Timișoara #2, Constanța #3
5. Compare top 3 side-by-side
6. Adjust weights manually (increase healthcare to 150%)
7. Cluj still #1 → deep dive into Cluj profile
8. Decision made

---

### Agent Deliverables

**Phase 1: Structure**
- Information architecture diagram
- Data categorization (which venues go in which categories)
- User flow diagrams for 2-3 key scenarios
- Component hierarchy (what UI elements are needed)

**Phase 2: Wireframes**
- Low-fi wireframes for 4 core views (homepage, comparison, profile, weights)
- Desktop + mobile layouts
- Annotations explaining interaction patterns
- Alternative layouts for A/B consideration

**Style:** Focus on layout, hierarchy, and functionality. No colors/branding yet—grayscale boxes and labels are fine. Prioritize usability over aesthetics.

---

### Open Questions for Agent to Resolve

1. Should weight adjustment be always visible (sidebar) or on-demand (modal/toggle)?
2. Homepage: card grid, list, or interactive map for city selection?
3. Comparison view: horizontal cities (columns) or vertical (rows)?
4. How to handle missing data (some cities lack certain venues)?
5. Should there be a "versus" mode (A vs B deep comparison) in addition to multi-city view?

---

**Agent, your task:** Based on this spec, propose:
1. A complete information architecture
2. Wireframe concepts for the 4 core views
3. Rationale for key design decisions
4. Any spec ambiguities that need clarification