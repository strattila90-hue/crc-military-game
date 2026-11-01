# Project memory

## Product intent & audience

- Browser-based protest/dispersal game in Hungarian; two playable sides (Oszlató/MH disperser and Tüntető protester)
- Goal: improve gameplay feel, performance, visual polish, and realistic protester movement
- Audience: casual browser game players; language: Hungarian

## Brand personality & voice

- Tone is neutral and direct; UI labels in Hungarian
- Theme is serious/tactical (dark navy), not arcade-lighthearted

## Visual design & UX direction

- Dark navy theme; two mode-selection cards on start screen
- Game screen: canvas + timer + three progress bars + action buttons
- Sprites stored inline as embedded image data (~367 KB file, mostly image data)
- Background/overlay canvases pre-rendered; characters drawn procedurally
- Added: faint drifting dust motes for atmosphere; screen shake on heavy impacts (molotov, flash grenade, roar ability)
- HUD counters (timer, crowd, fatigue) update only on value change, not every frame

## Decisions, constraints & rationale

- Single-file architecture: all JS/CSS/images embedded in index.html (~367 KB)
- Protester movement: added uneven stop-and-go surge rhythm per individual; existing surge event still overrides
- Performance: reduced per-frame page writes; draw loop rebuilds/re-sorts character list each frame (further optimization possible but not done)
- Sound: built-in synth engine for effects and crowd/siren loops
- Offline cache: version number must be bumped when file changes so returning players get updates
- Balance tuning was cancelled: requires playtest feedback the assistant cannot perform; assistant asked user for specific "what feels off" reports or permission to do a labeled first pass

## Open questions & assumptions

- Gameplay balance (wave strength, enemy stats, difficulty curve) remains untuned — needs user feedback
- All visual/movement changes are syntax-checked but unverified in running play
- User has not yet provided specific balance targets or "go ahead" instruction
- Further perf optimization of draw loop possible if needed