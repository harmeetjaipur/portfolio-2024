# Harmeet's Frontend Portfolio

Personal site for Harmeet Singh, a JavaScript engineer in Toronto. The live site is [findharmeet.ca](https://findharmeet.ca).

## Run it locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

## Publish

The live site is the `gh-pages` branch on GitHub Pages. `public/CNAME` keeps the domain at `findharmeet.ca`.

```bash
pnpm deploy
```

That builds into `build/` and pushes that folder to `gh-pages`.

`.github/workflows/deploy.yml` runs the same publish when `main` is pushed. It stays inactive until that workflow file is on GitHub.
