# Repository Guidelines & Workflow Rules

## Version Control & GitHub Synchronization
- **Automatic Git Push Requirement**: Whenever code, component, configuration, or visual asset changes are made to complete a task or request, the assistant must automatically stage, commit, and push the changes to GitHub (`git add . && git commit -m "..." && git push origin main`).
- **Commit Messages**: Use concise, descriptive commit messages summarizing the updates (e.g. `feat: update logo and configure auto-push rule`).

## Architecture & Code Quality
- **SPA Middleware Mode**: Server routing in `server.ts` must maintain SPA catch-all fallback handling.
- **Visual & Brand Quality**: Maintain the high-contrast luxury aesthetic of Flame International. All brand logo references should resolve correctly to `/images/flame-logo.png` with fallback support.
