# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run lint       # ESLint check
npm run preview    # Preview production build
```

No test runner is configured.

## Architecture

**TaskBridge** is a React 19 + Vite SPA for task management.

### Routing & Layouts

Two layout tiers defined in [src/App.jsx](src/App.jsx):

- **PublicLayout** (`src/layout/PublicLayout.jsx`) — Header + Footer wrapper for unauthenticated routes (Home, About, Services, Contact, Login, SignUp)
- **DashboardLayout** (`src/layout/DashboardLayout.jsx`) — DashboardNavbar + Footer wrapper for authenticated routes, always wrapped by `ProtectedRoute`

`ProtectedRoute` (`src/component/ProtectedRoute.jsx`) checks `AuthContext` and redirects to `/login` if unauthenticated.

### Authentication

[src/context/AuthContext.jsx](src/context/AuthContext.jsx) provides global auth state via React Context:
- User object `{ username, email }` is persisted to `localStorage`
- `login(user)` / `logout()` mutate both context state and localStorage
- Consumed via `useAuth()` custom hook throughout the app

### API Services

All API calls live in `src/services/` and use **Axios**. The base URL is read from the environment variable `VITE_API` (set in `.env` to `http://localhost:8080`).

- [LoginApi.js](src/services/LoginApi.js) — `POST /api/users/Login`
- [SignUpApi.js](src/services/SignUpApi.js) — `POST /api/users/SignUp`, `GET /api/users`
- [TaskApi.js](src/services/TaskApi.js) — CRUD for tasks scoped by `userEmail`

### Environment

Requires a `.env` file at the project root:

Deployed to Vercel; [vercel.json](vercel.json) contains a catch-all SPA rewrite rule.

### Known Issues

- `TaskApi.js` `getById(id)` hits `/api/tasks/user/{id}` which appears to be an endpoint naming inconsistency (should likely be `/api/tasks/{id}`).


## Security
 
- **Do NOT read or access the `.env` file** under any circumstances. It contains sensitive credentials and secrets that should remain private.
 
## Frontend Reference
 
- For any backend-related checks, questions, or context, refer to the GitHub repository:
  **D:ProjectFile/Task_Management_System/Task-Management-SystemBE**