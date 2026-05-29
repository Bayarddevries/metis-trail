# Changelog — Cart Trail RPG

## 2026-05-28 — Sprint 2: Historical Source Integration

### Documentation Built Today

| File | Purpose |
|---|---|
| `SOURCE-LIBRARY.html` | 4 source documents, 20+ tagged extracts by game system, complete trail network, quick-ref numbers |
| `SPRINT-2-PLAN.html` | Original 6-recommendation sprint plan (superseded by v2) |
| `SPRINT-2-PLAN-v2.html` | Rebuilt plan with historical source integration, phased build order, effort estimates |
| `HISTORICAL-INTEGRATION.html` | First-pass integration plan for narrative voice, cart mechanics, NWMP, events |

### Sources Added

1. **"Red River Settlement: Its Rise, Progress, and Present State"** — Alexander Ross (1856) — 89K words
   - URL: https://archive.org/stream/P000330/P000330_djvu.txt
   - Key content: Buffalo hunt logistics (1840), cart construction, brigade governance, Sunday routines, trail distances

2. **"To Red River and Beyond"** — Anonymous traveller (1875) — 290K words
   - URL: https://archive.org/stream/toredriverbeyond00marb/toredriverbeyond00marb_djvu.txt
   - Key content: Day-by-day trail narrative, mule behavior, hunt events, mosquito swamps, landscape descriptions, camp life

3. **"La Vérité sur la Question Métisse"** — Adolphe Ouimet / Gabriel Dumont (1885) — 803K words
   - URL: https://archive.org/stream/P001517/P001517_djvu.txt
   - Key content: Dumont's biography, Batoche battle account, spy encounters, river blockade tactics, 1885 timeline

4. **"Red River Cart and Trails"** — Brehaut (1972) — already in project
   - Key content: Cart specs, repair methods, trail network map, brigade organization

5. **NWMP Research Report** — already in project
   - Key content: Patrol frequency, fort locations, legal authority, customs enforcement

### Bugs Fixed Today

| Bug | Fix |
|---|---|
| Dice roll "undefined" on live site | `chooseEventChoice()` returns array `[{action, result}]`, not flat object. Added unwrap: `const inner = Array.isArray(result) ? result[0]?.result : result` |
| Double-click crash on choice buttons | Added `data-clicked` guard on choice buttons |
| Mobile CSS not applying | Mobile CSS was appended outside `<style>` tag. Fixed by injecting before closing `</style>` |
| Fullscreen toggle broken | Script was embedded inside Leaflet `<script src>` tag (ignored by browser). Moved to separate `<script>` block |
| Pages not serving from gh-pages | Created `gh-pages` branch via `git subtree split` and pushed |

### Deployments Today

| Time | What | URL |
|---|---|---|
| 20:27 | SPRINT-2-PLAN.html (original) | /SPRINT-2-PLAN.html |
| 21:39 | HISTORICAL-INTEGRATION.html | /HISTORICAL-INTEGRATION.html |
| 21:49 | SOURCE-LIBRARY.html | /SOURCE-LIBRARY.html |
| 22:03 | SPRINT-2-PLAN-v2.html (rebuilt with sources) | /SPRINT-2-PLAN-v2.html |

Live game: https://bayarddevries.github.io/metis-trail/

### Key Design Decisions Today

1. **Economy calibration from sources**: Ross's 1840 hunt (1,210 carts, 1,089,000 lbs meat) and Brehaut's trail distances (900 miles, 20-25 mi/day) give us real numbers. Starting food changed from 12 → 30.

2. **Cart squeal mechanic**: Brehaut documents the "blood-curdling squeal heard for miles." Became a gameplay mechanic affecting NWMP detection range.

3. **First-person narrative voice**: Marbot's voice (wry, specific, sensory) chosen as the model for all event rewrites.

4. **Source-grounded events over generic**: Instead of designing "a river crossing event," each river crossing uses Brehaut's three specific methods (ford, cajeux, wheel-raft). Each hunt uses Marbot's specific animal behaviors.

### What's NOT Done (Next Steps)

See SPRINT-2-PLAN-v2.html for full build order. Summary:
- **Phase A** (economy + cart + voice): 17-22 hours
- **Phase B** (encounters + environment): 18-23 hours  
- **Phase C** (major events + crew): 14-18 hours
- **Total**: 49-63 hours across 3 phases

### Known Issues / Debt

- Node.js segfaults on `new Function()` and `eval()` for large files — headless harness must use one-shot subprocess per game
- Archive.org rate limiting blocks fetching new sources
- Saskatchewan & Rocky Mountains (1875) Milton & Cheadle source not yet retrieved (404 on archive.org)

---

*Previous work (Sprint 1) documented in AGENTS.md and TASKS.md*
