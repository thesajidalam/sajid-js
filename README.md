# sajid.js.org

Static deployment repository for **[sajid.js.org](https://sajid.js.org)**.

## How it works

This repository holds the **compiled static output** of the website published at `sajid.js.org`. It is maintained entirely by an automated GitHub Actions workflow and is not edited by hand.

- **Content is generated** — every file here is produced by a build pipeline. Manual changes are overwritten on the next deployment.
- **Deployments** — triggered automatically on updates from the source pipeline.
- **Hosting** — served via GitHub Pages from the `main` branch.

## Structure

| Path | Purpose |
| --- | --- |
| `.nojekyll` | Disables Jekyll processing so all static assets are served as-is |
| `index.html` | Site entry point |
| `404.html` | SPA fallback so client-side routes (`/about`, `/skills`, ...) load correctly |
| `assets/` | Compiled CSS, JavaScript and media |

## Reporting issues

If the site is not loading or a route is broken, please open an issue in this repository.
