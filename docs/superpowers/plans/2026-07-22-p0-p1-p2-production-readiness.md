# Ontitled Production Readiness (P0 + P1 + P2) — Master Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement **one workstream at a time**. Checkbox (`- [ ]`) syntax tracks progress. Do **not** start Workstream N+1 until N’s acceptance criteria pass.

**Goal:** Take Ontitled from pre-alpha shell (Auth0 + marketing + JSON settings + mock playground) to a production-credible startup product: durable multi-user data, real Themis path, complete team/account lifecycle, honest marketing, and basic ops quality.

**Architecture:** Keep Auth0 as identity. Make **Supabase (service role, server-only)** the source of truth for profiles/workspaces/keys/invites/usage (replace JSON `withStore`). Product App Router stays behind session checks. Marketing remains static HTML + rewrites. Themis playground talks to a real authenticated API (session or API key). Billing stays Stripe-optional with a real portal path when `STRIPE_SECRET_KEY` is set.

**Tech Stack:** Next.js App Router, Auth0 (`@auth0/nextjs-auth0` v4), Supabase JS + existing migration, TypeScript, Vercel, optional Stripe, Vitest (new) + GitHub Actions CI (new).

**Timeline (aggressive but real):** ~4 weeks with 1–2 parallel agents after foundation lands.

| Phase | Duration | Outcome |
|-------|----------|---------|
| **W0 Foundation** | Days 1–3 | Supabase store + delete fix + CI |
| **W1 Core product** | Days 4–10 | Real playground API + key auth + invite accept |
| **W2 Marketing & trust** | Days 8–14 (parallel W1) | Legal pages, SEO, nav honesty, asset prune |
| **W3 Monetization & polish** | Days 11–20 | Stripe portal, usage hooks, a11y, pins, robots |

---

## Global Constraints

- **Never** put `SUPABASE_SERVICE_ROLE_KEY` or Auth0 secrets in client bundles.
- **Never** break marketing paths with Auth0 middleware (`proxy.ts` pass-through stays).
- Auth0 subject strings (`google-oauth2|…`, `auth0|…`) are primary keys in Supabase (`user_id text`).
- API keys: secret shown once; store **SHA-256 hash only** (`hashApiKey` in `lib/settings/ensure.ts`).
- Prefer adapting existing files over greenfield rewrites.
- Pin npm versions before prod hard-launch (end of W3).
- Each workstream ends with: `npm run typecheck` green + listed acceptance tests.
- Commit frequently with conventional commits (`feat:`, `fix:`, `chore:`).

---

## Current State (source of truth)

| Layer | Reality | Target |
|-------|---------|--------|
| Identity | Auth0 works | Keep |
| Settings data | `lib/settings/store.ts` JSON (`/tmp` on Vercel) | Supabase via service client |
| Schema | `supabase/migrations/20260720210000_ontitled_core.sql` ready | Use it |
| Playground | Mock string in `PlaygroundClient.tsx` | Real `/api/themis/chat` |
| API keys | CRUD only | Validate on Themis routes |
| Team invites | Create only | Accept + membership |
| Soft-delete | Broken (recreates user) | Hard gate + no recreate |
| Billing | Stub GET | Stripe portal when key set |
| Legal | `href="#"` | Real `/legal/*` pages |
| Tests/CI | None | Vitest + Actions |

---

## Dependency Graph (PR / workstream order)

```text
W0-A Supabase settings repository
  ├─► W0-B Soft-delete + session gate
  ├─► W0-C CI (typecheck + build)
  │
  ├─► W1-A Themis chat API (session)
  │     └─► W1-B API key auth on same route
  │           └─► W1-C Playground client wired
  │
  └─► W1-D Invite accept flow
        └─► W1-E Email optional (Resend/console fallback)

W2-* (marketing) parallel after W0-C
W3-* after W1-A minimum (billing can wait for pricing)
```

---

## File Map (units of ownership)

| Path | Responsibility after plan |
|------|---------------------------|
| `lib/settings/store.ts` | Thin adapter → Supabase repository (or delete if fully replaced) |
| `lib/settings/repository.ts` | **New** Supabase-backed settings ops |
| `lib/settings/ensure.ts` | Bootstrap using repository; respect `deleted_at` |
| `lib/settings/auth.ts` | `requireUser` + optional `requireActiveUser` |
| `lib/supabase/server.ts` | Service client only |
| `lib/themis/*` | **New** chat provider interface + mock/real impl |
| `app/api/themis/chat/route.ts` | **New** authenticated chat |
| `app/api/settings/**` | Unchanged HTTP surface; swap store backend |
| `app/api/invites/accept/route.ts` | **New** invite acceptance |
| `app/invites/[token]/page.tsx` | **New** accept UI |
| `app/legal/**` | **New** privacy/terms/support |
| `app/playground/PlaygroundClient.tsx` | Call real API |
| `components/AppShell.tsx` | Fix dead nav items |
| `public/**` + `next.config.ts` + `vercel.json` | Marketing/SEO/cache |
| `.github/workflows/ci.yml` | **New** CI |
| `vitest.config.ts` + `tests/**` | **New** tests |

---

# Workstream W0 — Foundation (P0)

### Task W0-A: Supabase settings repository

**Files:**
- Create: `lib/settings/repository.ts`
- Create: `lib/settings/repository.types.ts` (if needed; else re-export from `types.ts`)
- Modify: `lib/settings/ensure.ts` — call repository, never recreate soft-deleted users
- Modify: `lib/settings/store.ts` — either delete or keep as `MemoryRepository` for tests only
- Modify: all `app/api/settings/**/route.ts` only if they import `withStore` directly (prefer centralizing in `ensure.ts`)
- Test: `tests/settings/repository.test.ts` (can mock Supabase or use integration flag)

**Interfaces:**
- Produces:
  - `getProfile(userId: string): Promise<Profile | null>`
  - `upsertProfile(profile: Profile): Promise<Profile>`
  - `getWorkspaceForUser(userId: string): Promise<WorkspaceBundle>`
  - `withUserWorkspace(user: AuthUser, fn): Promise<T>` equivalent of current `ensureUserWorkspace`
- Consumes: `createServiceClient()` from `lib/supabase/server.ts`, types from `lib/settings/types.ts` + `Database`

**Steps:**

- [ ] **Step 1: Confirm Supabase env + migration applied**

```bash
# Local or linked project
npx supabase status   # or: npm run supabase:status
# Ensure migration is pushed:
npm run supabase:push
```

Expected: migration applied without error; tables `profiles`, `workspaces`, `workspace_members`, `workspace_invites`, `api_keys`, `usage_periods` exist.

- [ ] **Step 2: Implement repository methods mapping 1:1 to current JSON store operations used by ensure.ts and API routes**

Map tables (from migration):
- `profiles` ← `store.profiles`
- `workspaces` + `user_workspaces` ← workspace + pointer
- `workspace_members` ← members
- `workspace_invites` ← invites
- `api_keys` ← apiKeys (hash only)
- `usage_periods` ← usage

- [ ] **Step 3: Change `ensureUserWorkspace` to use repository**

Critical behavior change:

```ts
// If profile.deleted_at is set → throw or return error code "ACCOUNT_DELETED"
// Do NOT recreate profile for deleted users
```

- [ ] **Step 4: Feature flag for local fallback (optional, delete by W1)**

```ts
// lib/settings/repository.ts
export function getSettingsBackend(): "supabase" | "json" {
  if (process.env.SETTINGS_BACKEND === "json") return "json";
  if (isSupabaseConfigured()) return "supabase";
  if (process.env.NODE_ENV === "development") return "json";
  throw new Error("Supabase required in production");
}
```

On Vercel without Supabase → **fail loud**, never silently use `/tmp`.

- [ ] **Step 5: Typecheck**

```bash
npm run typecheck
```

Expected: PASS

- [ ] **Step 6: Manual smoke**

1. Login with Google  
2. Load `/settings/profile` — data persists after refresh  
3. Create API key — appears after refresh  
4. Redeploy / new serverless instance — data still there  

- [ ] **Step 7: Commit**

```bash
git add lib/settings lib/supabase app/api/settings
git commit -m "feat(settings): Supabase-backed repository replaces JSON store"
```

**Acceptance:** Settings CRUD survives multi-instance; production refuses JSON fallback.

---

### Task W0-B: Soft-delete + active user gate

**Files:**
- Modify: `lib/settings/ensure.ts`
- Modify: `lib/settings/auth.ts` — add `requireActiveUser()`
- Modify: `app/dashboard/page.tsx`, `app/playground/page.tsx`, all `app/settings/**/page.tsx`
- Modify: `app/api/settings/account/delete/route.ts`
- Create: `app/account-deleted/page.tsx` (simple message + support link)

**Interfaces:**
- Produces: `requireActiveUser(): Promise<{ user } | { error: NextResponse } | { deleted: true }>`
- Consumes: repository `getProfile`

**Steps:**

- [ ] **Step 1: On delete, set `deleted_at`, revoke keys, do not destroy Auth0 yet (document optional Management API later)**

- [ ] **Step 2: `ensureUserWorkspace` if `deleted_at` → throw `AccountDeletedError`**

- [ ] **Step 3: Product pages:**

```ts
const session = await auth0.getSession();
if (!session?.user) redirect("/login");
const profile = await getProfile(session.user.sub);
if (profile?.deletedAt) redirect("/account-deleted");
```

- [ ] **Step 4: APIs return 403 `{ error: "account_deleted" }` for deleted users**

- [ ] **Step 5: Commit**

```bash
git commit -m "fix(auth): honor soft-delete; block deleted accounts"
```

**Acceptance:** Deleted account cannot open dashboard; re-login does not recreate workspace.

---

### Task W0-C: CI + typecheck gate

**Files:**
- Create: `.github/workflows/ci.yml`
- Modify: `package.json` — pin is later; for now add `"test": "vitest run"` when tests land
- Create: `vitest.config.ts` (minimal)

**Steps:**

- [ ] **Step 1: Add workflow**

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run build
        env:
          APP_BASE_URL: http://localhost:3000
          AUTH0_DOMAIN: example.auth0.com
          AUTH0_CLIENT_ID: dummy
          AUTH0_CLIENT_SECRET: dummy
          AUTH0_SECRET: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
```

- [ ] **Step 2: Ensure build does not require real Supabase if `SETTINGS_BACKEND=json` for CI only**

- [ ] **Step 3: Commit**

```bash
git commit -m "ci: typecheck and build on PR"
```

**Acceptance:** PR cannot merge red typecheck/build (branch protection recommended manually on GitHub).

---

# Workstream W1 — Core product (P0/P1)

### Task W1-A: Themis chat API (session auth)

**Files:**
- Create: `lib/themis/types.ts`
- Create: `lib/themis/provider.ts` — interface
- Create: `lib/themis/providers/echo.ts` — deterministic stub for tests
- Create: `lib/themis/providers/openai-compatible.ts` — optional env-driven real model
- Create: `app/api/themis/chat/route.ts`
- Create: `tests/themis/chat-route.test.ts` (logic unit tests on provider selection)

**Interfaces:**

```ts
// lib/themis/types.ts
export type ThemisMessage = { role: "system" | "user" | "assistant"; content: string };
export type ThemisChatRequest = {
  messages: ThemisMessage[];
  model?: string;
  systemPrompt?: string;
};
export type ThemisChatResponse = {
  id: string;
  message: ThemisMessage;
  model: string;
  usage?: { inputTokens: number; outputTokens: number };
};

export interface ThemisProvider {
  chat(req: ThemisChatRequest, ctx: { userId: string; workspaceId: string }): Promise<ThemisChatResponse>;
}
```

**Route contract:**
- `POST /api/themis/chat`
- Auth: session via `requireActiveUser` **or** API key (W1-B)
- Body: `ThemisChatRequest`
- 401 no auth; 400 bad body; 200 response

**Steps:**

- [ ] **Step 1: Implement echo provider** (always works offline)

```ts
// Returns assistant message summarizing last user turn — for CI/dev without API keys
```

- [ ] **Step 2: If `THEMIS_API_BASE` + `THEMIS_API_KEY` set, use OpenAI-compatible chat completions**

- [ ] **Step 3: Route uses session user + ensureUserWorkspace for workspaceId**

- [ ] **Step 4: Increment usage counters via repository (best-effort)**

- [ ] **Step 5: Typecheck + manual curl with session cookie or temporary test harness**

- [ ] **Step 6: Commit**

```bash
git commit -m "feat(themis): session-authenticated chat API"
```

**Acceptance:** Authenticated `POST /api/themis/chat` returns assistant message; unauthenticated → 401.

---

### Task W1-B: API key authentication on Themis

**Files:**
- Create: `lib/settings/api-key-auth.ts`
- Modify: `app/api/themis/chat/route.ts`
- Modify: repository — `findApiKeyByHash`, `touchApiKeyLastUsed`

**Interfaces:**

```ts
export async function authenticateRequest(req: Request): Promise<
  | { mode: "session"; user: AuthUser; workspaceId: string }
  | { mode: "apiKey"; userId: string; workspaceId: string; scopes: string[] }
  | { error: NextResponse }
>;
// Header: Authorization: Bearer ot_live_...
```

**Steps:**

- [ ] **Step 1: Parse Bearer token; hash; lookup; reject revoked/missing**

- [ ] **Step 2: Require `write` scope for chat (or `read` only if you later add read-only endpoints)**

- [ ] **Step 3: Tests for hash match / revoked / wrong scope**

- [ ] **Step 4: Commit**

```bash
git commit -m "feat(themis): API key auth for chat endpoint"
```

**Acceptance:** Valid key chats; revoked key 401; session still works.

---

### Task W1-C: Wire PlaygroundClient to API

**Files:**
- Modify: `app/playground/PlaygroundClient.tsx`
- Modify: empty/error states copy

**Steps:**

- [ ] **Step 1: Replace mock reply with `fetch("/api/themis/chat", { method: "POST", ... credentials: "include" })`**

- [ ] **Step 2: Streaming optional later; first ship non-streaming JSON**

- [ ] **Step 3: Show errors (401 → suggest login; 500 → toast)**

- [ ] **Step 4: Commit**

```bash
git commit -m "feat(playground): call Themis chat API"
```

**Acceptance:** Logged-in user gets real (or echo) model reply in UI; no hardcoded joke string.

---

### Task W1-D: Team invite accept flow

**Files:**
- Create: `app/api/invites/accept/route.ts` — `POST { token }`
- Create: `app/invites/[token]/page.tsx`
- Modify: `app/settings/team/TeamClient.tsx` — copyable accept URL `${APP_BASE_URL}/invites/${token}`
- Modify: repository invite methods

**Steps:**

- [ ] **Step 1: Accept requires logged-in user; email should match invite email (case-insensitive) OR allow any logged-in user in pre-alpha with warning — pick strict match for production**

- [ ] **Step 2: On accept: set `accepted_at`, insert `workspace_members`, set active workspace pointer optional**

- [ ] **Step 3: Expired invite → 410**

- [ ] **Step 4: Commit**

```bash
git commit -m "feat(team): invite accept page and API"
```

**Acceptance:** Admin creates invite → other user opens link → becomes member → appears in Team list.

---

### Task W1-E: Invite email (optional but P1)

**Files:**
- Create: `lib/email/send.ts` — if `RESEND_API_KEY` send; else `console.info` in dev
- Modify: invite create route to call send

**Acceptance:** Creating invite logs or emails a link; no crash without Resend.

---

# Workstream W2 — Marketing & trust (P0/P1)

### Task W2-A: Legal pages + auth footer

**Files:**
- Create: `app/legal/privacy/page.tsx`
- Create: `app/legal/terms/page.tsx`
- Create: `app/legal/support/page.tsx`
- Create: `app/legal/electronic-communications/page.tsx` (or fold into terms)
- Modify: `app/auth/AuthScreen.tsx` — real hrefs
- Modify: `proxy.ts` if needed so `/legal/*` is public (should already pass non-AUTH_MATCHERS)

**Acceptance:** Auth footer links resolve 200; no `#`.

---

### Task W2-B: SEO + routing fixes

**Files:**
- Modify: `next.config.ts` — `/index.html` → `/index` not `/`
- Modify: `public/index.html` — canonical + og:url → `https://www.ontitled.com/index` (or chosen final URL)
- Modify: `public/themis.html` — absolute canonical
- Create: `public/robots.txt`, `public/sitemap.xml`
- Modify: `public/home.html` meta — remove unverifiable Contra-scale claims (“1.5M+…”)

**Acceptance:** `curl -I /index.html` redirects to `/index`; View Source shows correct canonical.

---

### Task W2-C: Nav honesty + company page

**Files:**
- Modify: `public/marketing/nav.js` — hide Jobs/Dike or mark “Soon”; only ship real destinations
- Modify: `public/company.html` — real social URLs or remove icons
- Modify: `components/AppShell.tsx` — remove dead Projects/Sessions/Docs **or** link to coming-soon pages under `/app/*`

**Acceptance:** No nav item silently dumps to home without label; no `href="/ontitled"` socials.

---

### Task W2-D: Asset prune + cache

**Files:**
- Script: `scripts/prune-contra-assets.mjs` — keep only assets referenced by `public/*.html` + nav
- Modify: `vercel.json` — hashed assets long cache:

```json
{
  "source": "/contra-assets/(.*)",
  "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
}
```

- Delete: GitHub UI chunks, `*.map`, profiling bundles, unreferenced woff2 if safe

**Acceptance:** Deploy size drops materially; marketing pages still 200 in `npm run marketing:smoke`.

---

### Task W2-E: Themis marketing CTA stable

**Files:**
- Keep: clean sibling button approach in `public/themis.html` (`ot-themis-clean` / `ot-themis-ghost`)
- Verify: no purple double text; Get in touch untouched
- Smoke: hard-refresh desktop + mobile widths

**Acceptance:** Single white-on-dark “Try Themis * Pre Alpha” → `/login`.

---

# Workstream W3 — Monetization & polish (P1/P2)

### Task W3-A: Stripe customer portal

**Files:**
- Create: `app/api/settings/billing/portal/route.ts` — POST creates portal session
- Modify: `app/api/settings/billing/route.ts`
- Modify: `BillingClient.tsx` — wire button to portal route
- Env: `STRIPE_SECRET_KEY`, `STRIPE_CUSTOMER_PORTAL_RETURN_URL`

**Acceptance:** With Stripe key, button opens portal; without key, honest “coming soon”.

---

### Task W3-B: Usage metering hooks

**Files:**
- Modify: repository usage upsert on each Themis chat
- Modify: `UsageClient.tsx` — show real numbers from API

**Acceptance:** After N chats, usage page shows non-zero tokens/requests.

---

### Task W3-C: Auth + product polish

**Files:**
- Modify: `AuthScreen.tsx` — use `login-visual.jpg` on login mode
- Modify: error map for Auth0 `error` query params
- Modify: `AppShell` a11y labels on icon-only controls
- Modify: playground focus rings (no bare `outline: none` without replacement)

---

### Task W3-D: Pin dependencies + README

**Files:**
- Modify: `package.json` — pin `next`, `react`, `react-dom`, `typescript` to current resolved versions from lockfile
- Modify: `README.md` — env matrix, deploy notes, architecture diagram, “JSON store is dev-only”

---

### Task W3-E: Observability (lightweight)

**Files:**
- Optional: `@sentry/nextjs` or log `console.error` with request ids in API routes
- At minimum: structured `console.error` on Themis/provider failures

---

# Testing Strategy

| Layer | What | Command |
|-------|------|---------|
| Typecheck | Always | `npm run typecheck` |
| Unit | repository mappers, api-key hash, provider | `npm test` |
| Marketing | routes 200 | `npm run dev` + `npm run marketing:smoke` |
| Manual auth | login → dashboard → logout → login | browser |
| Manual team | invite → accept → member list | two browsers/accounts |
| Manual themis | playground chat + API key curl | curl + UI |

**API key curl example:**

```bash
curl -sS -X POST http://localhost:3000/api/themis/chat \
  -H "Authorization: Bearer ot_live_XXX" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"hello"}]}'
```

---

# Out of Scope (explicit YAGNI for this plan)

- Multi-region Auth0 / enterprise SSO
- Full design system extraction
- Rewriting Framer pages into React
- Real-time collaboration
- Mobile native apps
- Auth0 Management API user wipe (document as follow-up)
- GraphQL

---

# Risk Register

| Risk | Mitigation |
|------|------------|
| Supabase not linked on prod | Fail boot if missing; checklist in README |
| Framer rehydration breaks CTAs | Clean sibling buttons (W2-E), not DOM fights |
| Model costs | Env-gated provider; echo default in CI |
| Data migration from JSON | One-shot script `scripts/migrate-json-to-supabase.mjs` for local `data/settings-store.json` |
| Scope creep | Ship W0 fully before W1 UI polish |

---

# Definition of Done (whole program)

- [ ] Settings data durable on Supabase in production  
- [ ] Deleted accounts stay deleted  
- [ ] CI green on main  
- [ ] Playground uses `/api/themis/chat`  
- [ ] API keys authorize Themis  
- [ ] Invites can be accepted  
- [ ] Legal links real  
- [ ] Marketing SEO/nav honest; assets pruned/cached  
- [ ] Themis CTA clean on `/themis`  
- [ ] Billing portal path exists when Stripe configured  
- [ ] Deps pinned; README accurate  

---

# Execution Handoff

**Plan complete and saved to** `docs/superpowers/plans/2026-07-22-p0-p1-p2-production-readiness.md`.

## Two execution options

1. **Subagent-Driven (recommended)** — Fresh subagent per task (start **W0-A**), review between tasks, parallel W2 after W0-C  
2. **Inline Execution** — Same session, batch W0 then W1 with checkpoints  

**Recommended first command to the swarm:**  
“Execute Workstream W0 starting at Task W0-A (Supabase settings repository). Stop after W0 acceptance criteria.”

**Which approach?**
