# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, port 5173)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

No test runner is configured in this project.

## Environment

Create a `.env` file in the project root (already present locally):

```
VITE_API=http://localhost:8080
```

All API service files read the backend URL from `import.meta.env.VITE_API`. The backend is a separate Spring Boot service running on port 8080.

## Architecture

**Two layouts, two navigation systems:**
- `PublicLayout` — `Header` + `Footer`, used for marketing/auth pages (`/`, `/about`, `/services`, `/contact`, `/login`, `/signup`)
- `DashboardLayout` — `DashboardNavbar` + `Footer`, used for authenticated app pages (`/dashboard`, `/projects`, `/tasks`, `/tasks/:id`, `/team`)

There is no auth guard on the `DashboardLayout` routes — any user can navigate there directly.

**Routing** is defined entirely in `src/App.jsx` using React Router v7 nested routes with `<Outlet />`.

**API layer** lives in `src/services/`:
- `LoginApi.js` — `login(user)` → POST `/api/users/login`
- `SignUpApi.js` — `createUser(user)`, `getUser()` → `/api/users/create`, `/api/users`
- `TaskApi.js` — `createTask(task, userEmail)`, `getById(id)` → `/api/task/...`

All service functions use the native `fetch` API (not axios, despite axios being listed as a dependency).

**Static nav data** is in `src/data/navbar.js` — exports `NAV_LINKS` (public header) and `NAV_LINKS2` (dashboard navbar).

**CSS** is per-component in `src/css/`, imported directly in each page/component file.

**React Compiler** (`babel-plugin-react-compiler`) is enabled via `vite.config.js` — manual `useMemo`/`useCallback` optimizations are unnecessary.

**Task navigation pattern:** `Dashboard` fetches a task by ID and navigates to `/tasks/:id` passing the task object via `location.state`. `TaskDetails` reads from `location.state?.task` first, falling back to a fresh API fetch if not present (e.g. on direct URL load).
