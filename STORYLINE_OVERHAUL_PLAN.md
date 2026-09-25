# Storyline Overhaul Plan — Tutor Edition

**Goal:** Replace the civic-government storyline with a tutoring storyline where the player is a new tutor in town, and every mission focuses on **radicals or inverse functions**.

**Approach:** Work in phases. Update this file as each phase is completed.

---

## Phase 1: New Storyline Document ✅
**Status:** Complete
**Deliverable:** `STORYLINE_V2_TUTOR_EDITION.md`
**Contents:**
- Game premise and protagonist
- Setting and tone
- Story arc across 5 levels
- Ending
- NPC archetypes
- Math-focus rationale

## Phase 2: Mission Remapping
**Status:** Complete
**Deliverable:** `MISSION_REMAP_V2.md`

## Phase 3: Sample Dialogue
**Status:** Complete
**Deliverable:** `DIALOGUE_SAMPLES_V2.md`

## Phase 4: Code Integration
**Status:** Complete
**Deliverable:** Updated game files in `src/`
**Target files:**
- `src/App.tsx` — quiz questions
- `src/game/scenes/BarangayMap.ts` — Level 1 NPCs & mission data
- `src/game/scenes/CityMap.ts` — Level 2 NPCs & mission data
- `src/game/scenes/ProvinceMap.ts` — Level 3 NPCs & mission data
- `src/game/scenes/RegionMap.ts` — Level 4 NPCs & mission data
- `src/game/scenes/NationalMap.ts` — Level 5 NPCs & mission data

**Sub-phases:**
- 4a: Level 1 (Barangay) — complete
- 4b: Level 2 (City) — complete
- 4c: Level 3 (Province) — complete
- 4d: Level 4 (Region) — complete
- 4e: Level 5 (National) — complete
- 4f: Build/test & welcome text updates — complete
**Contents:**
- All 50 missions mapped to tutoring + radicals/inverse functions contexts
- NPC name, role, problem, math topic, and level placement
- Prerequisite chain

## Phase 5: Review & Test
**Status:** Complete
**Deliverable:** Verification checklist
**Contents:**
- Confirm all 50 missions align with tutoring theme
- Confirm math focus is radicals/inverse functions only
- Run game and check for broken references

---

## Verification Notes
- All 50 missions updated to tutoring + radicals/inverse functions theme.
- All mission locations and NPCs updated across Barangay, City, Province, Region, National maps.
- All 50 quiz questions in App.tsx verified present and unique.
- UI text updated: Tutorial, MainMenu, LandscapePrompt, PWAInstallPrompt, Credits, CharacterCreation, Extras.
- Map lockout messages and area names updated to tutoring theme.
- Package name and metadata updated to "mathtuto".
- Build passes successfully with `npm run build-nolog`.


**Last Updated:** 2026-09-11
**Current Phase:** Complete
