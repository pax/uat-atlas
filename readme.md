# City Atlas

City profile and comparisons based on number of venues


Answer questions like: I want to move to ?


use data fetched with [pax/gis-places-osint](https://github.com/pax/gis-places-osint)

- non stop shops
- pharmacies, non stop
- bars, cafes
- cinema
- theaters, cinemas, museums
- public toilets

create city profiles, maps 

![v5](reference/misc/ui-v5.png)

## Roadmap
- [x] MPV UI
    - [x] figure out stack
    - [x] read data from db/api?
    - [x] how to calculate scores?-
    - [x] norm to population
    - [ ] use <prototypes/claude/> - use views (scores) instead of absolute counts. Disply normed to pop.
- [ ] split categories by parent categories / grouping
- [ ] icons for categories

- [ ] add INS data
- [ ] multi lang
- [ ] text to sql - hugginface trained model
- [ ] Reddit threads - vreau să mă mut în <City>

see <prototypes/claude/> (php api) and <prototypes/perplexity/> (exported static jsons)

see [reference/brainstorming/]

## Views

- landing
- city profile
- overall multi-city table
- Side-by-side comparison
- Criteria builder
- rankings/reports
- static: about, contact, methodology


### Landing
- intro
- criteria switcher
- map
- compact list (cards) view


### City Profile

### Overall table

heatmap 
can select cities, variables
custom criteria widget / prefilled profiles

### City comparison side-by-side

somewhat similar with _Overall table_ more focused / dedicated UI, a bit towards _City Profile_

### Criteria builder

percentage slider for each criteria
pre-built sample criterias (kids friendly, nighltife, culture, retirement)

### Report analysis

Custom dashboards, lists - best city for ..


## Notes
<https://github.com/claudio-silva/claude-artifact-runner>