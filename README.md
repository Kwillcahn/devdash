# DevDashboard

A modern, dark-themed developer/operations dashboard built with React + Vite and TypeScript.  
This repository provides a frontend Single-Page Application (SPA) with reusable UI components, mock data, and real-time visualizations (charts) designed for monitoring infrastructure, containers, VMs, users, alerts, and business metrics.

Key goals:
- Provide a visually-appealing, accessible dashboard shell that can be connected to real data sources.
- Demonstrate reusable components, charts, and UI patterns (cards, toasts, modals, drag-and-drop dashboard layout).
- Ship a compact, easy-to-run developer experience using Vite.

Status: Prototype / UI-focused (mock data bundled). Replace mocks with your APIs to integrate with real systems.

---

Table of contents
- [Features](#features)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
  - [Install](#install)
  - [Run (dev)](#run-dev)
  - [Build & preview](#build--preview)
- [Environment / Configuration](#environment--configuration)
- [Project structure](#project-structure)
- [How to replace mock data with real APIs](#how-to-replace-mock-data-with-real-apis)
- [Accessibility & keyboard support](#accessibility--keyboard-support)
- [Development notes](#development-notes)
- [Testing](#testing)
- [Deployments](#deployments)
- [Contributing](#contributing)
- [License & attribution](#license--attribution)
- [Contact](#contact)

---

Features
- Dashboard layout with draggable cards (reorder widgets).
- Cards for:
  - System info (host, CPU, memory, live charts)
  - Server Health (status, CPU/RAM/DISK)
  - Virtual Machines overview
  - Docker containers overview
  - Network throughput and history
  - Recent alerts and reports
- Reusable components:
  - Card (expand/collapse)
  - Line / Bar / Pie charts (Recharts)
  - Toast notifications
  - Theme provider + toggle (light/dark)
  - Accessible modals and keyboard interactions
- Mock data shipped in `mockData.ts` to get started without external services.

Tech stack
- Framework: React 19 (function components + hooks)
- Bundler / dev server: Vite
- Language: TypeScript
- Charts: Recharts
- Styling: Tailwind CSS (via CDN config in index.html)
- Tooling: Vite + @vitejs/plugin-react
- No backend included — frontend-only demo with mock data.

Quick start

Prerequisites
- Node.js 18+ recommended
- npm (or yarn/pnpm)

Install
1. Clone the repository
   git clone https://github.com/Kwillcahn/devdash.git
   cd devdash

2. Install dependencies
   npm install

Run (dev)
- Start the dev server:
  npm run dev
- Open http://localhost:3000

Build & preview
- Build a production bundle:
  npm run build
- Preview the production build locally:
  npm run preview

Available npm scripts (from package.json)
- dev — run Vite development server
- build — build for production
- preview — preview the built app

Environment / Configuration
- This project reads environment variables via Vite. A `.env.local` file exists with a placeholder API key variable. Replace the placeholder with your provider key or other configuration.
- Current pattern in `vite.config.ts` maps an env value into `process.env.API_KEY` via define; if you rename variables, update `vite.config.ts` accordingly.

Suggested environment variables
- EXTERNAL_API_KEY — your external API key (update `vite.config.ts` to pass this into the app as needed)
- PORT — optional port override for Vite (dev server)

Important: For production deployments, never commit secrets. Use your hosting provider's secret management or CI secrets.

Project structure (key files)
- index.html — app entry HTML, Tailwind via CDN is configured here
- index.tsx — React entry file
- App.tsx — top-level app and view routing (SPA)
- vite.config.ts — Vite config and env loading
- package.json — dependencies & scripts
- tsconfig.json — TypeScript configuration
- .env.local — local environment placeholder (remove or update)
- src/components/ — UI components (cards, charts, pages, lists, modal, toast, etc.)
- src/contexts/ — Theme and Toast providers
- src/mockData.ts — bundled mock data used across components
- src/types.ts — TypeScript model definitions

How to replace mock data with real APIs
1. Identify the data source you want to integrate (REST API, GraphQL, WebSocket).
2. Replace imports that reference `mockData` with a data layer:
   - Create an `api/` module that fetches data from your backend.
   - Use React hooks (useEffect / useState / useSWR / React Query) to fetch and cache data.
3. Update components to accept async data or to show loading/error states.
4. For real-time streams, use WebSockets or Server-Sent Events and push updates into the existing charts/state.
5. Remove or guard any demo randomness when using production data.

Notes about the environment variable currently included
- The repository contains a `.env.local` file with a placeholder API key variable. The UI and build pipeline expect you to supply a valid key (or remove inbound references if not needed). For clarity and maintainability, consider:
  - Using a neutral name such as EXTERNAL_API_KEY or API_KEY.
  - Updating `vite.config.ts` define mappings to pass only the variables your app needs (do not expose secrets publicly).

Accessibility & keyboard support
- Cards are interactive and support keyboard toggling (Enter / Space).
- Modals close on Escape.
- Buttons and form controls include appropriate roles and labels; review with an accessibility audit (axe or Lighthouse) to harden further.

Development notes / patterns observed
- The app uses Tailwind via CDN (configured in index.html). For production or tighter control, you may want to switch to a PostCSS/Tailwind local setup.
- Theme is persisted in localStorage (`ThemeContext`).
- Chart colors adapt to light/dark using ThemeContext.
- Drag-and-drop on the Dashboard is implemented with native HTML5 drag events — consider moving to a library (react-beautiful-dnd or dnd-kit) if you need more robust behavior.
- The mock data files (mockData.ts) are comprehensive and demonstrate the UI and charting behaviour.

Testing
- There are no test suites included in the current codebase.
- Suggested first steps:
  - Add unit tests for pure utilities and small components using Jest + React Testing Library.
  - Add E2E tests for flows using Playwright or Cypress (login, dashboard interactions, drag-and-drop).

Deployment
- This is a static frontend app; it can be hosted on any static hosting service (Netlify, Vercel, GitHub Pages, S3 + CloudFront, Render static sites, etc.)
- Build artifacts are produced to `dist/` with `npm run build`.
- Make sure to inject runtime configuration or secrets using your hosting provider's environment/secret settings. Avoid committing secrets to the repo.

Example Vite production build + serve
- Build:
  npm run build
- Serve locally (preview):
  npm run preview

Contributing
- Contributions welcome — open issues for bugs, feature requests, or UI/UX suggestions.
- Suggested workflow:
  - Fork -> feature branch -> open PR -> request review.
  - Keep changes scoped and include screenshots for UI changes.
- Add a CONTRIBUTING.md if you want to enforce contribution rules.

License & attribution
- No license file detected in repository. If you plan to open-source this project, add a LICENSE (MIT / Apache-2.0 / etc.).
- Third-party libraries used (React, Recharts, Vite) are subject to their respective licenses.

Troubleshooting
- If Vite fails to start:
  - Ensure Node version is compatible (18+ recommended).
  - Remove node_modules and reinstall: rm -rf node_modules package-lock.json && npm install
- If charts or components look broken:
  - Confirm Tailwind CDN is loaded in index.html (the project uses the CDN configuration).
  - Verify that components importing mock data haven't been modified.


Contact / author
- Maintainer: Kwillcahn
- Repo: https://github.com/Kwillcahn/devdash
