<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# I want to create a city profiler, an interface to see and compare some aspects about some cities (in Romania), how do they fare for culture, transport etc.

I have already built a pipeline that gets venue counts from Google Places Aggregate API - pharmacies, schools, bars, hospitals etc. In the future I'm thinking to add data from other sources like Numbeo, Expatistan, Wikipedia page popularity etc.

I need your help to help me plan and structure the UI. Be my research assistant. First let's think and brainstorm, what would be the approach, what could be some patterns, I'd need to break the signals (numbers) into categories, what tools would this UI need to have? Are there any sites / examples that already do this?

Perfect! Now I'll compile all the research into a comprehensive planning document.

## Strategic Approach for Your Romanian City Profiler UI

### Core Architecture \& Strategic Approach

Your city profiler needs a **layered interaction model** that separates city selection from comparison visualization. Based on research into existing platforms like Mercer's Quality of Living rankings, Numbeo, and Expatistan, the most effective approach combines three key elements: a discoverable selection interface, flexible comparison views, and normalized metric visualization.[^1][^2][^3]

**chart:61**

### Breaking Down the Signal: Categorization Framework

The raw venue counts from your Google Places Aggregate API need to be organized into semantic categories that users understand. Rather than displaying raw numbers, you should group related metrics into meaningful domains. Research from urban accessibility studies and city quality indices suggests these core categories:[^4][^5][^6]

**Infrastructure \& Transport**: Pharmacies, hospitals, public transport hubs, parking facilities, fuel stations
**Culture \& Entertainment**: Museums, theaters, restaurants, bars, cafes, parks, recreational facilities
**Commerce \& Services**: Supermarkets, shopping centers, banks, post offices, utility services
**Education \& Civic**: Schools, universities, libraries, government offices
**Health \& Wellness**: Hospitals, clinics, fitness centers, wellness facilities
**Cost-of-Living Indicators**: These would integrate data from Numbeo and Expatistan

**chart:62**

This framework should be flexible—you can expand or collapse categories based on data availability. The key insight from examining the WMREDI City Index Tool (which uses 50 metrics across 10 categories) and Mercer's system (39 criteria across multiple domains) is that **most successful systems organize 6-10 primary categories**.[^2][^3]

### Normalization Strategy: Converting Raw Numbers to Meaningful Comparisons

Raw venue counts are only useful when contextualized. You need **percentile-based normalization**:[^7][^8]

**Step 1 - Raw Aggregate**: Count pharmacies across all Romanian cities you're profiling

**Step 2 - Percentile Ranking**: Calculate where each city ranks (0-100 percentile scale). If City A has 45 pharmacies and ranks in the 72nd percentile compared to other Romanian cities, it scores 72/100

**Step 3 - Category Aggregation**: Average normalized scores within each category (e.g., if Transport has 5 metrics, average their percentile scores)

**Step 4 - Overall Score**: Optionally calculate a weighted overall city score, though this is more controversial as it can oversimplify

This approach handles cities of different sizes naturally—a small city won't penalized just for being small, but will be ranked appropriately within its peer group.

### UI Component Patterns \& Layout Structure

Based on analysis of successful city comparison tools and dashboard best practices, here are the key UI patterns you should implement:

#### 1. City Selection Interface (Left Sidebar or Top Panel)

**Design Pattern**: Searchable multi-select dropdown with favorites/recents

**Components needed**:[^9][^10]

- **Search input field** with autocomplete filtered by Romanian cities
- **Recent selections** bar (for quick re-comparison)
- **Favorites toggle** (let users star cities)
- **Multi-select limit indicator** (e.g., "Compare up to 5 cities")
- **Dynamic filter feedback** (show how many results match)

Best practice: Use a left sidebar on desktop that converts to a modal/drawer on mobile. This follows the pattern demonstrated in successful map applications.[^11][^9]

#### 2. Comparison View - Multiple Visualization Options

Users need different ways to understand the same data:

**Dashboard Grid View** (Default): Card-based layout showing one category per card

- Use a responsive grid (CSS Grid) that adapts: 3 columns on desktop, 2 on tablet, 1 on mobile[^12][^13][^14]
- Each card shows: category name, icon, and city scores as horizontal bar charts or progress indicators
- Color-coded status (e.g., red for below-average, green for above-average)
- Hover states show exact scores and percentile rankings

**Radar/Spider Chart View**: Ideal for comparing 2-4 cities across all categories simultaneously

- Each city gets a different color
- All categories appear as axes around a circle
- Allows quick pattern recognition—users see shape differences immediately[^15][^16][^17]
- Interactive legend to toggle cities on/off

**Detailed Comparison Table**: For detailed analysis

- Rows = categories, columns = selected cities
- Shows both percentile scores and absolute counts
- Sortable columns
- Export functionality (CSV/PDF)

**Tabs vs Accordion Pattern**: Use tabs to switch between these views on desktop, but convert to accordion on mobile to save screen space.[^18][^19]

#### 3. Metric Display Components

**Score Badges/Gauges**: For displaying individual metrics[^20][^21][^22][^23][^24]

- Circular gauges showing 0-100 scale with color gradients (red 0-33, yellow 34-66, green 67-100)
- Optional numerical value in center
- Percentile indicator below

**Progress Bars**: For linear metric display within cards

- Horizontal bars with color coding
- Label on left (metric name), value on right

**Status Indicators**: To quickly show comparative performance[^25]

- Icon + color only (minimal) for when space is tight
- Supports "above average," "average," "below average" states


### Interaction Patterns \& Data Tools

#### City Selection Workflows

1. **Quick Compare**: User selects 2-3 cities from dropdown, comparison loads immediately
2. **Filtered Discovery**: Use search to find cities by name or characteristics ("cities near Budapest", "largest cities")
3. **Favorites Management**: Save comparison sets (e.g., "My Top 3 Work Destinations")
4. **Sharing**: Generate shareable URLs with pre-selected cities (e.g., `yoursite.com/compare?cities=cluj,sibiu,oradea`)

#### Filtering \& Sorting

Beyond city selection, consider filtering within comparisons:

- **Filter by metric range**: "Show categories where cities differ by >20%"
- **Sort categories**: By gap size, alphabetical, custom order
- **Toggle data sources**: When you integrate multiple sources, let users choose which to display


#### Export \& Sharing

Research into Stockholm's Compare Services tool shows that **data export is critical**. Provide:[^26]

- PDF export (formatted comparison report)
- CSV export (for personal analysis)
- Shareable link (embed specific comparison)
- Screenshot/download visualization


### Existing Tools \& Pattern Examples

Several platforms demonstrate different successful approaches you can learn from:

**Numbeo** (Cost of Living Focus): Strength is crowdsourced price data with city-to-city percentage comparisons ("City A is 25% more expensive than City B"). Their interface is pragmatic but not particularly polished. You could improve on their UX.[^27][^28]

**Expatistan** (Cost + Quality): Similar to Numbeo but with more refined visualizations. Shows both costs and quality-of-life factors. Uses a simple side-by-side comparison.[^27]

**Mercer Quality of Living Ranking**: Uses 39 criteria across domains like safety, education, hygiene, health care, culture, environment, recreation, political stability, public transport. Ranks 241 cities. Shows comprehensive categorization without overwhelming users.[^3][^29]

**WMREDI City Index Tool** (UK Focus): Excellent model using 50 metrics across 10 categories. Each city gets a 0-1 score per metric (normalized percentile). Categories aggregate to category scores, which aggregate to overall scores. Allows filtering and ranking.[^2]

**Stockholm's Compare Services Tool**: Designed to feel like online shopping—users familiar with filtering products use same mental models to filter city services. Emphasizes citizen-focused needs over municipal metrics.[^26]

### Recommended Architecture

**Tier 1 - MVP (Phase 1)**

- Search \& multi-select interface for Romanian cities
- Dashboard card view showing 6 core categories
- Percentile-based normalization from Google Places data only
- Progress bar + score badge visualization
- Responsive layout (desktop/mobile)

**Tier 2 - Enhanced (Phase 2)**

- Radar chart comparison view
- Filters and sorting within comparisons
- Integration with Numbeo cost data
- Favorites/save comparison sets
- Export to PDF/CSV

**Tier 3 - Advanced (Phase 3)**

- Wikipedia page popularity as cultural indicator
- Expatistan salary calculator integration
- Secondary data sources (air quality, crime stats, employment data)
- Predictive analytics ("Which city best matches your priorities?")
- Community-contributed data layers


### Key UX Principles for Your Design

1. **Visual Hierarchy**: Place most important categories/metrics prominently. Use size and color strategically.[^30][^31]
2. **Responsive Design**: Test carefully on mobile. Consider that complex comparisons are often viewed on phones while deciding where to live.[^10]
3. **Consistent Color Coding**: Use the same color scheme across all views (red/yellow/green for performance levels).[^30]
4. **Tooltips \& Hover States**: Provide context without cluttering. Hovering should reveal additional details.[^30]
5. **Progressive Disclosure**: Don't show everything at once. Let users drill down into categories for detail.[^31]
6. **Clear Comparison Feedback**: Always show which cities are being compared and how they differ.[^9]
7. **Temporal Data**: When you add data over time, show trends with sparklines or small line charts.[^32]

Your venue-count approach is actually quite powerful—it's location intelligence at its core. The key to great UX is converting that raw data into easily scannable, comparative information that helps users make decisions about cities.
<span style="display:none">[^33][^34][^35][^36][^37][^38][^39][^40][^41][^42][^43][^44][^45][^46][^47][^48][^49][^50][^51][^52][^53][^54][^55][^56][^57][^58][^59][^60]</span>

<div align="center">⁂</div>

[^1]: https://www.youtube.com/watch?v=d5BbwzBYroE

[^2]: https://blog.bham.ac.uk/cityredi/wmredi-city-index-tool-core-cities-comparison/

[^3]: https://en.wikipedia.org/wiki/The_Economist's_Worlds_Most_Livable_Cities

[^4]: https://unhabitat.org/sites/default/files/2022/08/the_global_urban_monitoring_framework_metadata.pdf

[^5]: https://emotionalcities-h2020.eu/wp-content/uploads/2024/03/eMC_2023.01_D4.1_V03_RF.pdf

[^6]: https://www.sciencedirect.com/science/article/pii/S2667091722000310

[^7]: https://www.maplibrary.org/11327/6-advanced-techniques-for-data-normalization-in-mapping/

[^8]: https://former-students.imperial.edu/wwu11/article?ID=vtF32-2702\&title=map-percentile-chart.pdf

[^9]: https://signatureux.garofalostudios.com/enhancing-user-experience-with-side-by-side-comparison-views-in-web-based-mapping-applications-c178295c00f1?gi=161c5743046e

[^10]: https://www.justinmind.com/ui-design/search-filters-results-page

[^11]: https://www.eleken.co/blog-posts/map-ui-design

[^12]: https://uxdesign.cc/8-best-practices-for-ui-card-design-898f45bb60cc

[^13]: https://uxpilot.ai/blogs/grid-systems

[^14]: https://www.uxpin.com/studio/blog/ui-grids-how-to-guide/

[^15]: https://www.chartjs.org/docs/latest/charts/radar.html

[^16]: https://flourish.studio/blog/create-online-radar-spider-charts/

[^17]: https://www.tableau.com/blog/use-radar-charts-compare-dimensions-over-several-metrics-41592

[^18]: https://github.com/samsono/Easy-Responsive-Tabs-to-Accordion

[^19]: https://blog.stackademic.com/building-responsive-product-detail-layouts-tabs-for-desktop-accordions-for-mobile-c742894db007

[^20]: https://www.syncfusion.com/blogs/post/circular-progress-bars-flutter-radial-gauge-p1

[^21]: https://designsystems.surf/components/progress-bar

[^22]: https://pcf.gallery/score-indicator/

[^23]: https://primevue.org/badge/

[^24]: https://www.uinkits.com/blog-post/how-to-use-gauge-elements-in-ui-design

[^25]: https://carbondesignsystem.com/patterns/status-indicator-pattern/

[^26]: https://www.nyc.gov/assets/globalpartners/downloads/pdf/Stockholm_CompareServices.pdf

[^27]: https://www.expatistan.com/cost-of-living

[^28]: https://www.numbeo.com/cost-of-living/

[^29]: https://en.wikipedia.org/wiki/List_of_cities_by_quality_of_living

[^30]: https://www.gooddata.com/blog/5-data-visualization-best-practices/

[^31]: https://peerdh.com/blogs/programming-insights/user-interface-design-patterns-in-data-visualization-libraries

[^32]: https://www.bdo.com/insights/digital/the-3-types-of-data-analytics-dashboards-which-one-are-you-designing

[^33]: https://us.ui.city/solutions

[^34]: https://raywoodcockslatest.wordpress.com/2017/06/06/123-low-cost-cities/

[^35]: https://www.pdxmonthly.com/2013/05/fun-free-tools-for-map-geeks-may-2013

[^36]: https://www.ui.city/en/solutions/ui-datalab

[^37]: https://www.ui.city/en/news/blog-archiv/how-can-i-visualize-my-urban-data

[^38]: https://paro.ai/blog/kpi-dashboard-is-your-greatest-tool/

[^39]: https://www.smartsheet.com/essential-guide-defining-business-dashboard-metrics

[^40]: https://www.evl.uic.edu/documents/design_patterns.pdf

[^41]: https://www.transcenda.com/insights/data-visualization-ui-best-practices-and-winning-approaches

[^42]: https://www.mercer.com/en-us/insights/total-rewards/talent-mobility-insights/cost-of-living-2022/

[^43]: https://www.unfpa.org/sites/default/files/resource-pdf/STIC_urban_rural_delineation.pdf

[^44]: https://www.romaniaexperience.com/best-cities-to-live-in-romania-based-on-safety-air-quality-healthcare-options-and-more/

[^45]: https://seoulsolution.kr/sites/default/files/gettoknowus/EIU_BestCities.pdf

[^46]: https://stinwo.ro/best-cities-in-romania/

[^47]: https://besjournals.onlinelibrary.wiley.com/doi/am-pdf/10.1111/1365-2664.13358

[^48]: https://www.romaniaexperience.com/where-to-live-in-romania-small-city-vs-large-city/

[^49]: https://www.youtube.com/watch?v=SLFlFC7u4bo

[^50]: https://molbiotools.com/listcompare.php

[^51]: https://www.youtube.com/watch?v=gryO05B1aqU

[^52]: https://stackoverflow.com/questions/69071538/how-to-use-search-filter-in-sidenav-bar-in-react-js

[^53]: https://www.youtube.com/watch?v=x0aCdLDZ8BM

[^54]: https://stackoverflow.com/questions/1182818/examples-of-good-ui-for-selecting-multiple-records

[^55]: https://www.youtube.com/watch?v=EAnKoqUQHYQ

[^56]: https://pmc.ncbi.nlm.nih.gov/articles/PMC6811587/

[^57]: https://www.superchart.io/blog/grading-5-popular-data-visualizations-posted-in-r-dataisbeautiful-may-2022

[^58]: http://arxiv.org/pdf/2406.04543.pdf

[^59]: https://www.figma.com/community/file/1272185145737268273/progress-bar-ui-kit

[^60]: https://xtemos.com/forums/topic/change-default-page-designs-tabs-into-accordion-on-mobile/

