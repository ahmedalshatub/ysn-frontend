# Auth setup

The template ships **4 auth flows x 23 designs = 92 screens**. This reduces that
to exactly what your app needs: one design, applied to the flows you keep, with
everything else deleted.

> **This deletes files. Commit first.**

## Run it

```bash
node Scripts/auth-setup/auth-setup.mjs
```

or, from `app/`:

```bash
npm run auth-setup
```

Preview without changing anything:

```bash
node Scripts/auth-setup/auth-setup.mjs --dry-run
```

Non-interactive:

```bash
node Scripts/auth-setup/auth-setup.mjs \
  --design ModernSimple --login=yes --otp-login=no \
  --forgot-password=yes --register=yes --yes
```

## What it asks

1. **Which design** — once, for every flow. See the list below.
2. **Keep Login?** / **OTP Login?** / **Forgot Password?** / **Register?**

At least one of Login or OTP Login must survive, or nobody can sign in.

### Designs

| Classic | Modern |
|---|---|
| `Simple` | `ModernSimple` |
| `Minimal` | `ModernMinimal` |
| `TwoSide` | `ModernTwoSide` |
| `CardTwoSide` | `ModernCardTwoSide` |
| `ImageTwoSide` | `ModernImageTwoSide` |
| `ImageCardTwoSide` | `ModernImageCardTwoSide` |
| `FullPage` | `ModernFullPage` |
| `Carousel` | `ModernCarousel` |
| `CardCarousel` | `ModernCardCarousel` |
| `ImageCarousel` | `ModernImageCarousel` |
| `ImageCardCarousel` | `ModernImageCardCarousel` |
| | `Modern` |

## Why one design for all flows

A carousel login followed by a minimal reset screen looks like two different
products. Picking once also means the link markup between screens stays
consistent, which is what lets the script rewrite it reliably.

## What it does

**For every flow you keep**

- keeps the chosen variant and renames it — `ModernSimpleLogin.tsx` →
  `Login.tsx`, including the component identifier inside the file
- deletes the other 22 variants
- keeps the flow's step components in `features/auth/components/`
- collapses 23 routes into one: `/login`, `/otp-login`, `/forgot-password`,
  `/register`

**For every flow you remove**

- deletes the whole folder
- deletes its step components (`RegisterStep1-3`, `ForgotPasswordStep1-3`)
- removes its routes and lazy imports
- removes its endpoints and exported hooks from `redux/api/authApi.ts`
- removes its type file (`otpLogin.ts` / `passwordReset.ts` / `registration.ts`)
- removes its translation namespace from **every** locale — but only if nothing
  that survived still reads from it (see below)

**Always**

- deletes `pages/Home.tsx` (a gallery for browsing the 92 designs — pointless
  afterwards), its stylesheet and its `@import`
- deletes `features/auth/pages/Login.tsx`, the wrapper that made `/` render one chosen
  design, and points `/` straight at the surviving sign-in page
- rewrites the links between surviving screens: design-specific targets like
  `/register/modern-simple` collapse to `/register`, and a link to a flow you
  removed is deleted outright
- prunes named imports the link surgery orphaned (the build runs with
  `noUnusedLocals`, so a stray `Link` import is a hard error)
- deletes `.auth-*` / `.page-*` style rules no surviving screen references

## What it never touches

These are shared, and removing them would break unrelated screens:

- `revokeToken` — used by the navbar logout
- `changePassword` — used by the profile screen
- `redux/types/auth.ts` — `LoginResponseDto` is returned by OTP login and
  registration as well as login

Unused type *imports* in `authApi.ts` are pruned by checking real usage, so a
type shared with a surviving endpoint is never dropped.

### Translation namespaces are shared too

`login.email`, `login.password` and friends are reused by the **OTP login** and
**forgot password** screens, and `register.*` is reused by the users modal and
the stepper example. So a namespace is removed only when no surviving file reads
from it — measured against the files that actually survived, not from a
hardcoded list. When one is kept, the script says which and why.

## Notes

- **Not re-runnable.** It is a one-way cleanup: once the other 22 designs are
  gone there is nothing left to choose from. Run it once, early.
- **`--dry-run` cannot preview everything.** The translation, link and style
  steps work out what to do by inspecting the files that survived, so with
  nothing actually deleted they report nothing. Pages, routes, API and types
  preview correctly.
- Style pruning is **computed, not hardcoded**: the script scans every surviving
  `.tsx` for `auth-*` and `page-*` class names and drops the rule blocks nothing
  references. It scans the whole of `src`, not just `features/auth/pages`, because the
  layout wrapper and the navbars use some of those classes too. Nested overrides
  under `[data-theme="dark"]` and `[dir="rtl"]` are left alone.

## After running it

```bash
cd app
npx tsc -b
npm run dev
```
