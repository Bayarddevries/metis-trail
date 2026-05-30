# Sprint 2 Phase A — Implementation Summary

**Date:** 2026-05-31
**Status:** COMPLETE — Deployed to GitHub Pages
**Commit:** `e63b26b` (main), `2959da4` (gh-pages)

## May 31 Bug Fix Session

### Missing Choice Buttons (willow_shade, mosquito_plague)
- **Root cause:** NOT in event data — all 37 events have valid choices arrays in source
- **Actual cause:** Browser caching serving stale `index.html`, OR a transient build artifact from an earlier session that was since overwritten
- **Fix applied:**
  - Added `clearPendingEvent()` method to game object (was referenced but never defined)
  - Improved empty-choices fallback: shows visible red error text on the overlay instead of just console.log, auto-skips after 1.5s
  - Added `test/validate-events.js` — validates all 37 events have non-empty choices at build time
- **Validation:** `node test/validate-events.js` → PASS (37 events, 0 issues)
- **Deployed:** https://bayarddevries.github.io/metis-trail/

### Key Lesson
- The agent spent 4+ sessions debugging this via browser tools when a simple grep would have confirmed the data was correct in minutes
- Always write validation scripts BEFORE debugging UI rendering issues
- Browser caching is the #1 suspect for "works on my machine but not on user's device"

## Changes Made

### Economy Rework (all values deployed)
| Parameter | Old Value | New Value | Rationale |
|-----------|-----------|-----------|-----------|
| Starting food | 20 | 45 | Ross's real numbers; addresses 0% win rate |
| Settlement rest | -2 food (cost) | +2 food (gain) | Settlements provide food, not drain it |
| Trade food gain | +3-4 (fixed) | +6-10 (random) | More meaningful trade reward |
| Breakdown threshold | wear >= 4 | wear >= 5 | Extra wear point gives breathing room |
| Wear mod | <=1:0, 2:-1, 3+:-3 | <=2:0, 3:-1, 4:-3, 5+:-5 | Gradual penalty curve for new threshold |

### Cart Squeal Mechanic (fully wired)
- **State:** `S.squeal` (0-100) initialized in `createGame()`
- **Increment:** Terrain-based daily chance in `travelOneDay()`
  - plains: 15%, river_valley: 10%, wooded: 20%, uplands: 18%, river: 5%
  - Each trigger adds +10 squeal, capped at 100
- **Flavor text:** At squeal >= 30: axle groan narrative; at >= 60: shriek narrative
- **NWMP detection:** Infrastructure ready (squeal value tracked) ×2 detection coming in Phase B
- **Reset:** Settlement rest resets squeal to 0

### New Settlement Action: Grease Wheels
- **Cost:** 1 shaganappi
- **Effect:** Resets squeal to 0
- **Available at:** HBC, Métis, Trading Post, NWMP settlements (all except Mission)

### UI Updates
- **Squeal status bar:** Shows labels instead of numbers
  - Quiet (0-9), Murmuring (10-29), Loud (30-59), Shrieking (60+)
  - Amber color highlight at Loud/Shrieking
- **Wear highlight:** Triggers at >= 4 (1 below breakdown at 5)

### Files Modified
- `dist/index.html` — All changes in single file
- `dist/test/index.html` — Synced copy

### Deployment
- Live at: https://bayarddevries.github.io/metis-trail/
- Test page: https://bayarddevries.github.io/metis-trail/test/

## What's Next (Phase B)
- Mosquito + Alkaline Water event (Marbot)
- Prairie Fire event (Marbot)
- Mule behavior events (Marbot)
- Hunt events (elk, antelope, crane, eagle)
- Sunday Rest mechanic
- NWMP patrol encounter (will use squeal ×2 detection)
- Settlement types + actions expansion
