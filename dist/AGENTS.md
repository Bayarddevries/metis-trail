# AGENTS.md — Métis Trail RPG

## Project Overview

**Métis Trail RPG** is a historical survival game set on the Carlton Trail (Red River to Fort Edmonton, ~900 miles). The player leads a Red River cart brigade, managing food, cart wear, crew health, and events while travelling westward through the Métis frontier.

**Repository:** `~/.hermes/projects/metis-trail`
**Live URL:** https://bayarddevries.github.io/metis-trail/
**Status:** Sprint 1 complete (playable prototype). Sprint 2 planning complete (historical source integration + systems rework). Implementation not yet started.
**Target:** Mobile-first web game. Future: Android app store via Capacitor/TWA.

## Architecture

### Game Engine
- **Single HTML file** at `dist/index.html` — contains all CSS, JS engine, UI code, and game data
- **No frameworks or build tools** — pure HTML/CSS/JS
- **Leaflet.js** loaded from CDN for map rendering
- **Google Fonts** (Rye, Alegreya) for period typography
- **Deploy target:** GitHub Pages (gh-pages branch via `git subtree split`)

### Key Technical Constraints
- **Node.js is broken** on this machine — segfaults on `new Function()` and eval of large files. Headless testing requires one-shot subprocess per game (works for small scripts, crashes for engine-sized code)
- **No websocket libraries** in Python — can't do direct CDP
- **Archive.org rate limits** aggressively — use `https://r.jina.ai/<URL>` to fetch texts

### File Structure
```
metis-trail/
  AGENTS.md          — This file. Read first.
  CHANGELOG.md       — What was done and when
  CHARACTERS.md      — Crew character designs (from tabletop RPG origins)
  TASKS.md           — Task tracking (synced to Google Tasks)
  index.html         — Sprint 2 plan v2 (source-grounded)
  SPRINT-2-PLAN.html — Original sprint plan (superseded by v2)
  HISTORICAL-INTEGRATION.html — First-pass integration analysis
  SOURCE-LIBRARY.html — 4 source documents, 20+ tagged extracts by game system
  data/              — Research texts (PDFs, CSVs, HTML)
  research/          — Design drafts (resources, skills, towns, river crossings)
  art/               — Cart marker PNGs (32/48/64px)
  dist/              — Deployed build (GitHub Pages)
    index.html       — Live game
    README.md        — Deployment instructions
    SOURCE-LIBRARY.html — Source reference
    SPRINT-2-PLAN-v2.html — Current sprint plan
    HISTORICAL-INTEGRATION.html — Integration analysis
    art/             — Cart marker images
  test/              — Playtesting harness
    harness.py       — Python batch runner (Node subprocess per game)
    debug_rolls.js   — Debug script (broken — Node segfault)
```

## Sources (Critical for Authenticity)

All game content should be grounded in these sources. Read SOURCE-LIBRARY.html for tagged extracts.

1. **"Red River Settlement" — Alexander Ross (1856)**
   - https://archive.org/stream/P000330/P000330_djvu.txt
   - 89K words. First-hand settler account. Sunday camp routines, buffalo hunt logistics, brigade organization, cart construction.

2. **"To Red River and Beyond" — Anonymous (1875)**
   - https://archive.org/stream/toredriverbeyond00marb/toredriverbeyond00marb_djvu.txt
   - 290K words. Daily travelogue. Mule behavior, hunt events, mosquito swamps, landscape descriptions. Narrative voice model (wry, specific).

3. **"La Vérité sur la Question Métisse" — Ouimet/Dumont (1885)**
   - https://archive.org/stream/P001517/P001517_djvu.txt
   - 803K words. Gabriel Dumont's own words. Batoche battle, spy encounters, river blockades, Métis governance.

4. **"Red River Cart and Trails" — Brehaut (1972)** — in `data/`
   - Cart specs and construction details. Trail network map (18 named routes). Repair methods.

5. **NWMP Research Report** — in `research/`
   - Patrol frequency, fort locations, legal authority, customs enforcement.

## Sprint Status

### Sprint 1 — COMPLETE (May 2026)
- Playable prototype with map, events, settlements, travel
- Mobile-responsive layout
- Cart marker image (Red River cart illustration from Google Drive)
- Economy balance: starting food 20, food/segment 1, breakdown threshold 4
- **Known issue:** 0% win rate — economy too tight (all games end in starvation by day 10-14)
- **Known issue:** Dice rolls returned array instead of object (fixed May 28)

### Sprint 2 — PLANNED (Source Integration + Systems Rework)
Full plan at `SPRINT-2-PLAN-v2.html`. Summary:

**Phase A — Economy + Cart + Voice (17-22 hours)**
- Economy calibration from Ross's real numbers (starting food → 30, etc.)
- Cart squeal mechanic from Brehaut
- River crossing events (3 methods from Brehaut)
- First-person voice pass (all event text rewritten in Marbot's voice)

**Phase B — Encounters + Environment (18-23 hours)**
- Mosquito + Alkaline Water event (Marbot)
- Prairie Fire event (Marbot)
- Mule behavior events — Geometry Lesson, sick animal (Marbot)
- Hunt events — elk, antelope, crane, eagle (Marbot)
- Sunday Rest mechanic (Marbot)
- NWMP patrol encounter (NWMP Report + Dumont)
- Settlement types + actions (Ross + NWMP Report)

**Phase C — Major Events + Crew (14-18 hours)**
- Buffalo Hunt multi-step chain (Ross 1840)
- Brigade organization event (Ross)
- Crew morale/bonus/death system (Dumont voice)
- Fort-specific encounters (NWMP Report)
- Landscape milestones (Marbot)

**Total: 49-63 hours across 3 phases**

### Sprint 3 — NOT YET PLANNED
- Cart inventory (RE4-style grid, weight system)
- Push-your-luck travel mechanics
- Crew depth + story events
- Fort Edmonton endgame / scoring

## Game Mechanics (Current State)

### Cart
- Starting wear: 0/4 (breakdown at 4)
- Wear increased by: failed event rolls, rough terrain, prairie fire
- Repairs at settlements (costs trade goods)
- **Cart squeal** (not yet implemented): ungreased wheels = louder = NWMP detection doubled

### Food
- Starting: 20 (to be changed to 30)
- Cost: 1 per travel day
- No cost for camping
- Loss at settlements (to be changed: +2 for resting)

### Events
- Random events triggered while traveling between nodes
- Each event has 1-3 choices with d20 + mods vs DC
- Success/failure with text feedback and effects (food, wear, crew)
- **Bug fixed:** `chooseEventChoice()` returns `[{action, result}]` not flat object

### Settlements
- Types: mission, métis, trading post, HBC fort
- Actions: rest, trade, repair, continue
- **To be expanded:** forage, gather rumours, recruit crew

### Map
- 14 nodes from Fort Garry to Fort Edmonton
- Leaflet.js map with cart marker
- Trail shown as polyline between nodes
- Mobile: touch-pan friendly, fullscreen toggle

## Key Design Principles

1. **Source-grounded over designed**: Every mechanic should trace to a specific source quote. Not "add cart squeal" but "cart squeal heard for miles (Brehaut)."

2. **First-person voice**: All event text in first-person past tense, Marbot's voice (wry, specific, sensory). Not "you encounter rough ground" but "the prairie breaks into gopher holes and sun-cracked clay."

3. **Specific over generic**: Not "river crossing event" but "ford (risky), cajeux (costs goods), wheel-raft (remove wheels)." Not "animal event" but "elk that shakes its antlers and plunges into an alder swamp."

4. **Economy creates interesting scarcity**: Not "you starve by day 10 because math" but "you're close to the edge and every decision matters."

5. **Mobile-first**: Touch targets ≥48px, responsive layout, pinch-zoom map.

## Deployment

```bash
cd ~/.hermes/projects/metis-trail
# Copy any new files to dist/
cp NEWFILE.html dist/
# Commit and deploy
git add dist/
git commit -m "Deploy: description"
git subtree split --prefix dist -b gh-pages
git push origin gh-pages --force
```

Live URL: https://bayarddevries.github.io/metis-trail/

## For New Agents

1. Read this file completely
2. Read CHANGELOG.md
3. Read SOURCE-LIBRARY.html (tab: Sources, then tab: Extracts)
4. Read SPRINT-2-PLAN-v2.html (full sprint plan)
5. The game engine is in `dist/index.html` — all CSS, JS, and data in one file
6. Test changes by opening the HTML file directly in browser
7. When editing, maintain the single-file architecture (no build step)
8. All new content should cite a source from SOURCE-LIBRARY.html
