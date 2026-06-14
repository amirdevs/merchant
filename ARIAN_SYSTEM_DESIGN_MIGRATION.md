# Arian-Inspired React App Architecture Migration Guide

Use this document as an implementation brief for migrating a React-only app to
the same domain-driven structure used by `C:\Fanap\arian`, without using Next.js
features.

## Goal

Build a React app with thin route declarations, business features grouped by
domain, shared UI/infrastructure in one shared domain, and a clear data boundary
between views, use-cases, repositories, and API clients.

This guide intentionally excludes Next.js App Router, server components, server
actions, `next.config.ts`, Next middleware, route handlers, `Metadata`,
`revalidateTag`, and file-system routing.

## Target Stack

- Framework: React with TypeScript.
- Build tool: Vite or another React-only bundler.
- Routing: `react-router-dom`.
- Data fetching and mutations: TanStack Query.
- Styling: Tailwind CSS v4, Radix UI/shadcn-style primitives if needed.
- Formatting/linting: Biome as primary formatter/linter.
- Import alias: `@/*` maps to `./src/*`.
- Package manager: pnpm.

## Required Root Files

Use React/Vite equivalents:

- `package.json`: scripts for `dev`, `build`, `preview`, `lint`, `format`,
  `check`, and type checking.
- `vite.config.ts`: React plugin and `@/*` path alias.
- `tsconfig.json`: strict TypeScript and `@/*` path alias.
- `biome.json`: formatter/linter rules.
- `components.json`: if using shadcn, point aliases into
  `src/sub-domains/shared/components` and `src/sub-domains/shared/utils`.
- `.vscode/settings.json`: Biome formatter on save, ESLint disabled if Biome is
  authoritative.

Recommended VS Code settings:

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSaveMode": "file",
  "editor.formatOnSave": true,
  "eslint.enable": false,
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports.biome": "explicit",
      "source.fixAll.biome": "explicit"
    }
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports.biome": "explicit",
      "source.fixAll.biome": "explicit"
    }
  }
}
```

## Top-Level Source Layout

All application source lives under `src`.

```text
src/
  main.tsx
  app/
    app.tsx
    router.tsx
    routes/
      site.routes.tsx
      auth.routes.tsx
      admin-auth.routes.tsx
      panel.routes.tsx
      admin-panel.routes.tsx
    guards/
      protected-route.tsx
      admin-route.tsx
      guest-route.tsx
    layouts/
      app-layout.tsx
  sub-domains/
    shared/
    auth/
    acl/
    user/
    health/
    loan/
    ticket/
    ...
```

`src/app` owns app bootstrap, route declarations, route guards, and top-level
composition. Business logic, screens, hooks, repositories, and types live under
`src/sub-domains`.

## Routing Model

Use explicit React Router routes. Keep route elements small and route-shaped:

- Read `params` with `useParams`.
- Read query strings with `useSearchParams`.
- Render a domain view component.
- Fetch route data through domain hooks/use-cases, not inside large route files.
- Keep layout and auth rules in route wrappers/guards.

Main route groups:

- Public site routes.
- User auth routes.
- Admin auth routes.
- Authenticated user panel routes.
- Authenticated admin panel routes.

Representative URL map:

```text
/                         -> site home view
/about-us                 -> site about view
/blog                     -> blog list view
/blog/:id/:slug           -> blog detail view
/contact-us               -> contact-us view
/careers                  -> careers view
/careers/recruitment      -> recruitment form view

/auth/mobile              -> user mobile login view
/auth/otp                 -> user OTP view
/auth/processing          -> user processing view
/auth/upgrade             -> user upgrade view

/admin-auth/mobile        -> admin mobile login view
/admin-auth/otp           -> admin OTP view
/admin-auth/processing    -> admin processing view
/admin-auth/upgrade       -> admin upgrade view

/panel/profile            -> user profile view
/panel/health/list        -> health list view
/panel/health/:id         -> health detail view
/panel/loan/list          -> loan list view
/panel/loan/:id           -> loan detail view
/panel/ticket/list        -> ticket list view
/panel/ticket/:id         -> ticket detail view
/panel/lms                -> LMS list view
/panel/lms/:courseId      -> course detail view

/admin-panel/profile      -> admin profile view
/admin-panel/users        -> user management view
/admin-panel/users/:id    -> user detail view
/admin-panel/roles        -> roles view
/admin-panel/health/list  -> admin health list view
/admin-panel/health/:id   -> admin health detail view
/admin-panel/ticket/list  -> admin ticket list view
/admin-panel/ticket/:id   -> admin ticket detail view
```

Redirect parent panel URLs in the router:

- `/panel` -> `/panel/profile`
- `/admin-panel` -> `/admin-panel/profile`
- `/panel/health` -> `/panel/health/list`
- `/admin-panel/health` -> `/admin-panel/health/list`

Example router shape:

```tsx
import { Navigate, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layouts/app-layout";
import { AdminRoute } from "./guards/admin-route";
import { ProtectedRoute } from "./guards/protected-route";
import { PanelLayout } from "@/sub-domains/shared/layouts/panel-layout";
import { AuthLayout } from "@/sub-domains/auth/layouts/auth-layout";
import HealthListView from "@/sub-domains/health/views/health-list.view";
import ProfileView from "@/sub-domains/user/views/profile.view";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <SiteHomeView /> },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [{ path: "mobile", element: <MobileLoginView /> }],
      },
      {
        path: "panel",
        element: (
          <ProtectedRoute>
            <PanelLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", element: <ProfileView /> },
          { path: "health", element: <Navigate to="health/list" replace /> },
          { path: "health/list", element: <HealthListView /> },
          { path: "health/:id", element: <HealthDetailView /> },
        ],
      },
      {
        path: "admin-panel",
        element: (
          <AdminRoute>
            <PanelLayout isAdmin />
          </AdminRoute>
        ),
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", element: <AdminProfileView /> },
        ],
      },
    ],
  },
]);
```

## App Composition

React-only root flow:

```text
src/main.tsx
  -> src/app/app.tsx
  -> src/sub-domains/shared/providers/index.tsx
  -> RouterProvider
```

Recommended `main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/app";
import "@/sub-domains/shared/assets/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Recommended app shell:

```tsx
import { RouterProvider } from "react-router-dom";
import { Providers } from "@/sub-domains/shared/providers";
import { router } from "./router";

export function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
```

Shared providers wrap the app in this order:

```text
AuthProvider
  ReactQueryProvider
    AclProvider
      ThemeProvider if needed
        children
        Toaster
```

Set document language/direction once in `index.html` or in an app layout effect:

```html
<html lang="fa" dir="rtl">
```

## Layout Composition

Use layout components with React Router `<Outlet />`.

`PanelLayout` should:

- Build user/admin navigation lists.
- Read auth and ACL state from providers or hooks.
- Filter nav items by `access: { resource, permission }`.
- Render desktop/mobile sidebars, top bar, and `<Outlet />`.
- Accept `isAdmin?: boolean`.

`AuthLayout` should:

- Render the auth frame/shell.
- Render `<Outlet />` for mobile, OTP, processing, and upgrade steps.

`AppLayout` should:

- Provide global document shell behavior.
- Render `<Outlet />`.
- Avoid domain-specific logic.

## Domain Module Structure

Each business feature is a folder under `src/sub-domains/<domain>`.

Use this structure when a domain needs the full pattern:

```text
src/sub-domains/<domain>/
  views/
    <domain>.view.tsx
    <domain>-list.view.tsx
    <domain>-id.view.tsx
  components/
    <domain>-filter.component.tsx
    <domain>-table.component.tsx
    <domain>-form-dialog.component.tsx
  hooks/
    use-<domain>-management.hook.tsx
  use-cases/
    <domain>.key.ts
    <domain>.use-case.ts
    <domain>-admin.use-case.ts
    <domain>-query.use-case.ts
  repositories/
    <domain>-api.ts
    index.ts
  types/
    <domain>.type.ts
    <domain>-filter.type.ts
    <domain>-form.type.ts
    <domain>-management.type.ts
  constants/
    dictionary.constant.ts
    <domain>-form.constant.ts
  utils/
    <domain>.utils.ts
```

Not every domain needs every folder. Keep the same names when the concept
exists.

Example domains:

```text
absent, acl, admins, auth, banks, blog, contact-us, faq, guide-documents,
health, health-cost, help, hotel, hotel-lottery, hotel-package, insurers, lms,
loan, loan-plan, loan-status, loan-type, log, notice, notice-category,
notification, order, personnel, recruitment, relationship-types, salary,
settings, shared, site, space, ticket, ticket-operators, user
```

## Shared Domain

Put cross-cutting infrastructure under `src/sub-domains/shared`.

Important shared areas:

```text
shared/assets/
  globals.css
  fonts.ts
shared/components/
  icons/
  router/
  panel/
  schema/
  ui/
shared/hooks/
shared/layouts/
  panel-layout.tsx
shared/providers/
shared/repositories/
shared/services/
shared/types/
shared/utils/
```

Shared UI primitives live in `shared/components/ui`. Router wrappers such as
`CustomLink` live in `shared/components/router`.

## Use-Case Pattern

Use-cases are the main application boundary between UI and data access.

Use-case files should:

- Validate payloads with Zod schemas from domain types.
- Call repositories or shared repositories.
- Normalize responses with `ok()` and `fail()`.
- Return `Promise<IRes<T>>`.
- Avoid direct React rendering concerns.

Query/mutation hook files should:

- Wrap use-cases in TanStack Query hooks.
- Define query keys from `<domain>.key.ts`.
- Display success/error feedback with `sonner` toasts when appropriate.
- Invalidate relevant query keys after mutations.
- Keep auth and ACL decisions centralized in providers/guards/use-cases.

Key files:

- `<domain>.key.ts` defines TanStack Query keys.
- `<domain>.use-case.ts` contains user-facing async operations.
- `<domain>-admin.use-case.ts` contains admin-only async operations.
- `<domain>-query.use-case.ts` contains `useQuery` and `useMutation` hooks.

## View Pattern

Route elements render domain views. Views can use hooks to read params/query
values and fetch data.

List view pattern:

```tsx
import { useSearchParams } from "react-router-dom";
import { useEntityList } from "@/sub-domains/entity/use-cases/entity-query.use-case";

export default function EntityListView() {
  const [searchParams] = useSearchParams();
  const offset = searchParams.get("offset") ?? "0";
  const size = searchParams.get("size") ?? "10";

  const query = useEntityList({ offset, size });

  return <EntityListTable data={query.data?.data ?? []} />;
}
```

Detail view pattern:

```tsx
import { useParams } from "react-router-dom";
import { useEntityById } from "@/sub-domains/entity/use-cases/entity-query.use-case";

export default function EntityIdView() {
  const { id } = useParams<{ id: string }>();
  const query = useEntityById(Number(id));

  return <EntityDetails data={query.data} />;
}
```

## Response and Error Handling

Use `IRes<T>` as the standard response envelope:

```ts
interface IRes<T = unknown> {
  success: boolean;
  status: number;
  data: T;
  meta: { message: string };
}
```

Rules:

- Return `ok(data)` for success.
- Return `fail(error, status)` for failures.
- Let query hooks throw or return normalized failures consistently.
- Use router guards for `401` and `403` redirects.
- Avoid throwing raw API responses from components.

## Repository and HTTP Pattern

Repositories hide external APIs and raw fetch details.

Use `shared/utils/http-client.utils.ts` for HTTP clients. It should support:

- base URL configuration
- JSON, text, form-data, and url-encoded payloads
- query string creation
- request/response/error middleware
- custom `HttpResponse<T, E>` with `data`, `error`, and `meta`

Use shared middleware/utilities for headers, tokens, language, client id/secret,
response normalization, and error normalization.

Components should not call `fetch` directly. Preferred flow:

```text
View/component
  -> query hook
  -> use-case
  -> repository
  -> http client
```

## Authentication and Authorization

React-only apps do not have Next middleware. Use client-side guards and API
error handling.

Protected route prefixes:

```ts
const PROTECTED_PATHS = ["/panel"];
const PROTECTED_ADMIN_PATHS = ["/admin-panel"];
const PROTECTED_ADMIN_AUTH_PATHS = ["/admin-auth"];
```

Guard responsibilities:

- `ProtectedRoute`: require a valid logged-in user/token.
- `AdminRoute`: require a valid logged-in admin and admin ACL state.
- `GuestRoute`: redirect authenticated users away from login pages if needed.
- Query auth state from `AuthProvider`.
- Query permissions from `AclProvider`.
- Redirect with `<Navigate />` when access is invalid.

ACL flow:

- `AuthProvider` owns token/session state.
- `AclProvider` fetches and stores current user access grants after login.
- Navigation items can declare `access: { resource, permission }`.
- `filterNavItemsByAccess()` removes unauthorized navigation items.
- Admin routes reject users whose `userType` is not `admin`.

Example guard:

```tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/sub-domains/auth/providers";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <FullPageSpinner />;
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
```

## UI and Styling Rules

- Tailwind classes are used directly in components.
- Global CSS and font setup live in `shared/assets`.
- Shared reusable primitives live under `shared/components/ui`.
- Panel navigation components live under `shared/components/panel`.
- Route-specific UI lives in the owning domain `components` and `views` folders.
- Keep router declarations free of large JSX layouts.

## Naming Conventions

Use these suffixes consistently:

- Views: `*.view.tsx`
- Components: `*.component.tsx`
- Hooks: `use-*.hook.ts` or `use-*.hook.tsx`
- Use-cases: `*.use-case.ts`
- Admin use-cases: `*-admin.use-case.ts`
- Query hooks: `*-query.use-case.ts`
- Cache/query keys: `*.key.ts`
- Types: `*.type.ts`
- Constants: `*.constant.ts`
- Utilities: `*.utils.ts`
- Services: `*-service.ts`
- Repositories: `*-repository.ts` or `*-api.ts`
- Route files: `*.routes.tsx`
- Guards: `*-route.tsx`

## Migration Checklist

1. Create `src/app` for bootstrap, router declarations, guards, and app-level
   layouts.
2. Create route groups for public site, user auth, admin auth, user panel, and
   admin panel using React Router.
3. Create `src/sub-domains/shared` first: providers, UI primitives, layouts,
   utils, response helpers, HTTP client, repositories, services, and types.
4. Add `AuthProvider`, `ReactQueryProvider`, `AclProvider`, and toaster setup.
5. Add `ProtectedRoute`, `AdminRoute`, and `GuestRoute`.
6. Add `PanelLayout` and `AuthLayout` using `<Outlet />`.
7. Move every feature into `src/sub-domains/<domain>` instead of colocating
   feature logic in router files.
8. For each feature, create views, use-cases, query hooks, repositories, types,
   constants, and utils as needed.
9. Put API/external service details in repositories, not components.
10. Put validation, mutation, and response shaping in use-cases.
11. Put TanStack Query keys and invalidation in query hook/use-case files.
12. Configure Biome, TypeScript aliases, shadcn aliases, and VS Code formatting.
13. Run `pnpm check` or equivalent type/lint validation after migration.

## What To Avoid

- Do not use Next.js-only concepts in the React-only app.
- Do not put domain business logic directly under router files.
- Do not make route declarations large UI components.
- Do not let components call raw repositories or `fetch` directly.
- Do not scatter shared UI primitives across domains.
- Do not bypass `IRes<T>`, `ok()`, and `fail()` for app-level data flows.
- Do not mix formatter ownership. Biome should be the default formatter.
