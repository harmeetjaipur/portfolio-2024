# Harmeet's Frontend Portfolio

Personal site for Harmeet Singh, a JavaScript engineer in Toronto. The live site is [findharmeet.ca](https://findharmeet.ca).

The page is one sheet of paper with a kite on it, tied to a spool in the bottom-left corner. Visitors can grab the kite and throw it. Words lean as the string passes them, and timeline entries light up when the kite rests on them. A hidden kite fight sends one rival kite per job; cutting one shouts "Wo kata!" (Hindi for "that one's cut!"). Start it from the footer or by tapping "HS" four times.

## Run it locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

## Where things live

| Path | What it holds |
| --- | --- |
| `src/content.ts` | All the copy: jobs, craft, tools, the memory-bank sample, agent-cli steps |
| `src/kite/engine.ts` | The kite: rope physics, dragging, swaying words, lit tags, the kite fight |
| `src/kite/sky.tsx` | Mounts the engine's canvas and grab handle in React |
| `src/kite/sound.ts` | The string-snap sound, off until turned on in a fight |
| `src/components/` | Hero, thread (timeline), craft, AI workshop, contact |
| `src/styles.scss` | Colors, type, layout, light and dark themes |

Words the string can nudge are wrapped with `<Sway>`. Timeline entries carry `data-tag` so the engine can light them.

## Publish

The live site is the `gh-pages` branch on GitHub Pages. `public/CNAME` keeps the domain at `findharmeet.ca`.

```bash
pnpm deploy
```

That builds into `build/` and pushes that folder to `gh-pages`.

`.github/workflows/deploy.yml` runs the same publish when `main` is pushed. It stays inactive until that workflow file is on GitHub.
