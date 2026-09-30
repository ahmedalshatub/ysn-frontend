# Restructure Plan — Template → RAS Dashboard feature-based structure

**Repo:** `react-redux-template-tailwind-feature-base-slice`
**Reference app:** `d:\Projects\ras-dashboard-frontend\RASPM`
**Written:** 2026-09-17
**Status: executed.** Kept as the record of the migration and its reasoning.
The conventions it establishes now live in [`CLAUDE.md`](CLAUDE.md); read that
one to work in the codebase, this one to understand how it got here.

Two things differed from the plan in execution, both corrected in place below:

- §9.5 missed `remove-examples`' `lazyComponentsFor` regex, which hard-codes the
  number of `../` in a route's lazy import. It would have been a silent no-op.
- The codemod never flags the i18n `import.meta.glob` as unresolved — the
  specifier regex does not match `import.meta.glob(...)` at all, so the glob is
  simply left alone, which is the correct outcome. Expect **zero** unresolved
  entries, not one.

---

## 1. Goal

Re-shape the template's `app/src` from the current **layer-based** layout
(`components/`, `pages/`, `redux/`, `layout/`, …) into the **feature-based**
layout the RAS dashboard already uses (`app/`, `core/`, `features/<feature>/`,
`shared/`), so that:

- a template-generated project and RASPM are structurally interchangeable — the
  same conventions, the same import shapes, the same "where does this file go?"
  answer;
- the RAS `CLAUDE.md` "10 golden rules" and its canonical CRUD recipe apply to
  the template verbatim;
- everything the template adds on top of RASPM (23 sidebar variants, 92 auth
  screens, the 5 setup scripts, the auto-discovering i18n) keeps working.

**Non-goals.** No visual change, no dependency change, no behaviour change, no
renaming of exported symbols. This is a move-and-rewire refactor only.

### Scale

| Metric | Count |
|---|---|
| Tracked files in repo | 641 |
| Files under `app/src` | 585 |
| …of which move | 384 |
| …of which stay (199 `assets/**` + `App.tsx` + `main.tsx`) | 201 |
| `.ts` / `.tsx` under `app/src` | 484 (99 are icon components in `assets/`) |
| Relative import specifiers pointing at moving folders | ~1,956 |
| `Scripts/*.mjs` lines that hard-code `src/…` paths | ~30 |

The import count is why **§7 (the codemod) is mandatory**. Hand-editing ~2,000
relative specifiers across 484 files will not converge.

---

## 2. Current vs target, side by side

```
TEMPLATE (today)                     RAS DASHBOARD (target)
app/src/                             app/src/
├── App.tsx                          ├── App.tsx
├── main.tsx                         ├── main.tsx
│                                    ├── app/                  <- store + the one RTK Query API
│                                    │   ├── api/instanceApi.ts
│                                    │   └── store.ts
│                                    ├── core/                 <- app-wide shell, not a feature
│                                    │   ├── config/Menu.tsx
│                                    │   ├── i18n/
│                                    │   ├── layout/
│                                    │   ├── routes/
│                                    │   └── slices/
│                                    ├── features/<feature>/   <- one folder per domain
│                                    │   ├── api/
│                                    │   ├── components/
│                                    │   ├── hooks/
│                                    │   ├── pages/
│                                    │   ├── services/
│                                    │   ├── slices/
│                                    │   ├── types/
│                                    │   └── validation/
│                                    ├── shared/               <- used by 2+ features
│                                    │   ├── components/
│                                    │   ├── hooks/
│                                    │   ├── services/
│                                    │   ├── types/
│                                    │   └── utils/
├── assets/                          ├── assets/               <- unchanged, stays at src root
├── components/        ------------->│   shared/components (+ 9 feature components)
├── config/            ------------->│   core/config
├── hooks/             ------------->│   shared/hooks
├── i18n/              ------------->│   core/i18n
├── layout/            ------------->│   core/layout
├── pages/             ------------->│   features/*/pages + features/*/components
├── redux/             ------------->│   app/ + core/slices + features/*/{api,types,slices}
├── routes/            ------------->│   core/routes
├── services/          ------------->│   shared/services
└── utils/             ------------->│   shared/utils
```

### What is already identical (do not touch)

Verified by diffing both trees:

- `src/assets/**` — 68 shared SCSS partials, byte-for-byte in the same paths.
  RASPM's only extra is `components/buttons/_view-mode-toggle.scss`; the
  template's extras are the sidebar/navbar variants it ships. **SCSS never
  moves, and `app.scss` needs no edit.**
- `src/components/**` vs RASPM `src/shared/components/**` — 99 of 111 files
  match by path and name. Only 12 differ (§6.3).
- RASPM `core/layout/**` is a strict **subset** of the template's `layout/**`
  (RASPM has already made its layout choice). Same filenames, same folders.
- `eslint.config.js`, `tsconfig.app.json`, `.env*` and `vite.config.js` (apart
  from RASPM's `server.port`) are the same.

So the migration is genuinely just **relocation + import rewiring + tooling
updates**. Nothing has to be rewritten.

---

## 3. Target directory tree (what `app/src` looks like when done)

```
app/src/
├── App.tsx
├── main.tsx
├── app/
│   ├── api/
│   │   └── instanceApi.ts
│   └── store.ts
├── assets/                       (unchanged)
│   ├── css/  icons/  images/  scss/
├── core/
│   ├── config/
│   │   └── Menu.tsx
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── languages.ts
│   │   └── locales/{en.ts, ar.ts}
│   ├── layout/
│   │   ├── AuthLayout.tsx  DefaultLayout.tsx  UnAuthLayout.tsx
│   │   ├── HorizontalAuthLayout.tsx  HorizontalDarkAuthLayout.tsx
│   │   ├── Footer.tsx  RequireUser.tsx  SidebarItem.tsx  SidebarWrapper.tsx
│   │   ├── HorizontalNav.tsx  HorizontalNavDark.tsx
│   │   ├── navbars/   (8 files)
│   │   └── sidebars/  (21 variants + types.ts)
│   ├── routes/
│   │   ├── AllRoutes.tsx
│   │   └── index.tsx
│   └── slices/
│       ├── layout.slice.ts
│       └── theme.slice.ts
├── features/
│   ├── auth/            api components pages slices types validation
│   ├── users/           api components pages types
│   ├── payments/        api components pages types
│   ├── auditLogs/       api components pages types
│   ├── notifications/   api components services slices types
│   ├── profile/         pages components
│   ├── dashboard/       pages
│   ├── exceptions/      pages
│   ├── showcase/        pages components types      <- demo
│   ├── authGallery/     pages                       <- demo
│   ├── accountsExample/     pages components types  <- demo
│   ├── categoriesExample/   api types pages components   <- demo
│   ├── testTrExample/       api types pages components   <- demo
│   ├── testSubTrExample/    api types pages components   <- demo
│   ├── invoiceExample/      pages components types  <- demo
│   ├── productDetails/      pages components types  <- demo
│   ├── profileExample/      pages components types  <- demo
│   ├── publicCard/          pages types             <- demo
│   ├── stepperExample/      pages components types  <- demo
│   └── ticketExample/       pages components types  <- demo
└── shared/
    ├── components/   (badges buttons cards charts display editors feedback
    │                  inputs media modals navigation table)
    ├── hooks/        dateFormatter handleChange useDateFormatter
    │                 useSignalR useTitle useViewport
    ├── services/     signalRService.ts
    ├── types/        base.ts  Base.types.ts
    └── utils/        constants.ts errorHandler.ts formatCurrency.ts
```

---

## 4. Naming conventions (copied from RASPM, exactly as observed)

| Thing | Pattern | RASPM example |
|---|---|---|
| Feature folder | `camelCase`, plural for collections | `features/cities`, `features/auditLogs` |
| API slice | `<Entity>.api.ts` | `cities/api/Cities.api.ts` |
| Types | `<Entity>.types.ts` | `cities/types/Cities.types.ts` |
| Validation | `<Entity>.validation.ts` | `cities/validation/Cities.validation.ts` |
| Feature slice | `<Entity>.slice.ts` | `auth/slices/Auth.slice.ts` |
| Core slice | `<name>.slice.ts` (lowercase) | `core/slices/theme.slice.ts` |
| Page | `<Entity>Page.tsx` | `cities/pages/CitiesPage.tsx` |
| Feature component | `<Entity>Modal.tsx`, `Delete<Entity>Alert.tsx` | `cities/components/CityModal.tsx` |
| Multi-entity feature | `pages/<entity>/…` **and** `components/<entity>/…` | `structure/pages/companies/CompaniesPage.tsx` |
| Auth screens | lowercase folder + file | `auth/pages/login/login.tsx` |
| Imports | **relative only** — no `@/` alias anywhere | `../../../shared/components/...` |

> **Inherited inconsistency, flagged not fixed:** RASPM capitalises
> `Auth.slice.ts` but lowercases `theme.slice.ts`, `layout.slice.ts` and
> `notification.slice.ts`. This plan mirrors RASPM exactly so the two repos
> match. If you would rather normalise to `<Entity>.slice.ts` everywhere, do it
> in Phase 2 and change RASPM to match later — decide once, record it in
> `CLAUDE.md`.

### Import style decision

RASPM uses **deep relative imports** (`../../../shared/...`) and has **no path
alias** in `tsconfig.json`. The template currently declares
`"paths": { "@/*": ["src/*"] }` in `app/tsconfig.json` but **zero files use it**,
and `vite.config.js` has no matching `resolve.alias`, so it would fail at
runtime if anyone did.

**Decision: match RASPM — keep relative imports**, and delete the dead `paths`
entry so it stops misleading people (a 3-line edit in `app/tsconfig.json`).

*If you later want aliases, that is a separate, self-contained change: add
`resolve.alias` to `vite.config.js`, copy `paths` into `tsconfig.app.json` (the
file `tsc -b` actually reads — the current entry is in the wrong file), and
re-run the codemod with an alias-emitting flag. Do not mix it into this
migration.*

---

## 5. Feature boundaries — the decisions

A "feature" here means: a slice of the product that owns its own screens, its
own API endpoints, its own DTOs. The template ships 8 real ones and 12 demos.

### 5.1 Real features

| Feature | Why it is a feature | Owns |
|---|---|---|
| `auth` | login / OTP / forgot-password / register flows, the auth slice, the token | 92 screens, `Auth.api.ts`, `Auth.slice.ts`, 5 type files, step components |
| `users` | user CRUD screens | `Users.api.ts`, `Users.types.ts`, list + modals |
| `payments` | payment list + create modal | `Payments.api.ts`, `Payments.types.ts` |
| `auditLogs` | audit log list + details modal | `AuditLogs.api.ts`, `AuditLogs.types.ts` (RASPM has this same feature) |
| `notifications` | drawer, dropdown, SignalR-fed slice | `Notifications.api.ts`, `notification.slice.ts`, components |
| `profile` | the signed-in user's own profile + tabs | pages + tab components (no API of its own) |
| `dashboard` | the landing dashboard | one page |
| `exceptions` | 404 / 500 | two pages (RASPM has this same feature) |

### 5.2 Demo features (everything `remove-examples` can delete)

`showcase`, `authGallery`, `accountsExample`, `categoriesExample`,
`testTrExample`, `testSubTrExample`, `invoiceExample`, `productDetails`,
`profileExample`, `publicCard`, `stepperExample`, `ticketExample`.

Each becomes a **self-contained folder** — which is the single biggest win of
this migration: `remove-examples` goes from "delete 7 scattered things and hope"
to "delete one folder, then clean routes/menu/i18n".

### 5.3 Two judgement calls

**a) The three `categoriesExample1/2/3` folders → one `categoriesExample`
feature.** They are three presentations (modal / drawer / form page) of one
entity sharing one API slice. RASPM's rule for this exact shape is the
multi-entity layout: `pages/<variant>/` + `components/<variant>/`.

```
features/categoriesExample/
├── api/Categories.api.ts
├── types/Categories.types.ts
├── pages/
│   ├── example1/CategoriesExample1.tsx
│   ├── example2/CategoriesExample2.tsx
│   └── example3/{CategoriesExample3.tsx, CategoryFormPage.tsx}
└── components/
    ├── example1/{CategoryModal.tsx, DeleteRestoreAlerts.tsx}
    ├── example2/{CategoryDrawer.tsx, DeleteRestoreConfirms.tsx}
    └── example3/DeleteRestoreAlerts.tsx
```

Same treatment for `testTrExample` (3 variants). `testSubTrExample` has one
variant, so it stays flat. **If you prefer the examples to stay independently
deletable one-by-one**, keep them as three sibling features
(`categoriesExample1`, `…2`, `…3`) sharing `categoriesExample/api` — say so
before Phase 4 and the move map changes by three lines.

**b) `profile` as its own feature vs. living under `auth`.** RASPM puts its
single-file profile screen at `features/auth/pages/ProfilePage.tsx`. The
template's profile is 4 files and pulls from **two** APIs (`userApi` +
`notificationApi`), so a dedicated feature applies the rule more faithfully.
**This plan uses `features/profile/`.** Switching to RASPM's exact choice is a
2-line change to the move map — pick one and write it down.

---

## 6. Complete move manifest

Every path below is relative to `app/src/`. This is the authoritative list; the
codemod in §7 encodes it.

### 6.1 Store and the shared API

| From | To |
|---|---|
| `redux/store.ts` | `app/store.ts` |
| `redux/api/instanceApi.ts` | `app/api/instanceApi.ts` |

### 6.2 Core (app shell)

| From | To |
|---|---|
| `config/Menu.tsx` | `core/config/Menu.tsx` |
| `i18n/index.ts` | `core/i18n/index.ts` |
| `i18n/languages.ts` | `core/i18n/languages.ts` |
| `i18n/locales/*.ts` | `core/i18n/locales/*.ts` |
| `layout/**` (41 files) | `core/layout/**` (same sub-structure) |
| `routes/AllRoutes.tsx` | `core/routes/AllRoutes.tsx` |
| `routes/index.tsx` | `core/routes/index.tsx` |
| `redux/slices/themeSlice.ts` | `core/slices/theme.slice.ts` |
| `redux/slices/layoutSlice.ts` | `core/slices/layout.slice.ts` |

> `i18n/index.ts` uses `import.meta.glob("./locales/*.ts", { eager: true })`.
> Because `index.ts` and `locales/` move **together**, the glob is unchanged.
> The codemod cannot resolve a glob specifier and will list it under
> "unresolved" — that entry is expected and correct. **Do not edit it.**

### 6.3 Shared

| From | To | Note |
|---|---|---|
| `components/**` | `shared/components/**` | 102 of 111 files, path-for-path |
| `hooks/*` (6) | `shared/hooks/*` | mirrors RASPM's `shared/hooks` |
| `utils/*` (3) | `shared/utils/*` | RASPM has these 3 plus 5 more |
| `services/signalRService.ts` | `shared/services/signalRService.ts` | mirrors RASPM's `shared/services/firebaseService.ts` |
| `redux/types/base.ts` | `shared/types/base.ts` | |
| *(new file)* | `shared/types/Base.types.ts` | §6.7 |

**The 9 components that are NOT shared** — they belong to exactly one feature,
and RASPM already files them that way:

| From | To |
|---|---|
| `components/auth/ForgotPasswordStep1.tsx` | `features/auth/components/ForgotPasswordStep1.tsx` |
| `components/auth/ForgotPasswordStep2.tsx` | `features/auth/components/ForgotPasswordStep2.tsx` |
| `components/auth/ForgotPasswordStep3.tsx` | `features/auth/components/ForgotPasswordStep3.tsx` |
| `components/auth/RegisterStep1.tsx` | `features/auth/components/RegisterStep1.tsx` |
| `components/auth/RegisterStep2.tsx` | `features/auth/components/RegisterStep2.tsx` |
| `components/auth/RegisterStep3.tsx` | `features/auth/components/RegisterStep3.tsx` |
| `components/modals/ChangePasswordModal.tsx` | `features/auth/components/ChangePasswordModal.tsx` |
| `components/navigation/NotificationDrawer.tsx` | `features/notifications/components/NotificationDrawer.tsx` |
| `components/navigation/NotificationDropdown.tsx` | `features/notifications/components/NotificationDropdown.tsx` |

**Three template-only components that DO stay shared** (RASPM lacks them, but
they are generic and used by the shell): `components/navigation/LanguageSwitcher.tsx`,
`components/cards/InfoItem.tsx`, `components/media/FileImage.tsx`.

> `components/auth/` is emptied by this step — delete the folder.
> `core/layout/navbars/NavbarNotificationDropdown.tsx` is a *different* file and
> stays in `core/layout`, exactly as in RASPM.

### 6.4 API slices → features

| From | To |
|---|---|
| `redux/api/authApi.ts` | `features/auth/api/Auth.api.ts` |
| `redux/api/userApi.ts` | `features/users/api/Users.api.ts` |
| `redux/api/paymentApi.ts` | `features/payments/api/Payments.api.ts` |
| `redux/api/auditLogApi.ts` | `features/auditLogs/api/AuditLogs.api.ts` |
| `redux/api/notificationApi.ts` | `features/notifications/api/Notifications.api.ts` |
| `redux/api/categoryApi.ts` | `features/categoriesExample/api/Categories.api.ts` |
| `redux/api/testTrApi.ts` | `features/testTrExample/api/TestTr.api.ts` |
| `redux/api/testSubTrApi.ts` | `features/testSubTrExample/api/TestSubTr.api.ts` |

### 6.5 Slices → features

| From | To |
|---|---|
| `redux/slices/authSlice.ts` | `features/auth/slices/Auth.slice.ts` |
| `redux/slices/notificationSlice.ts` | `features/notifications/slices/notification.slice.ts` |

### 6.6 Types → features

| From | To |
|---|---|
| `redux/types/auth.ts` | `features/auth/types/Auth.types.ts` |
| `redux/types/otpLogin.ts` | `features/auth/types/OtpLogin.types.ts` |
| `redux/types/passwordReset.ts` | `features/auth/types/PasswordReset.types.ts` |
| `redux/types/registration.ts` | `features/auth/types/Registration.types.ts` |
| `redux/types/role.ts` | `features/auth/types/Roles.types.ts` |
| `redux/types/user.ts` | `features/users/types/Users.types.ts` |
| `redux/types/payment.ts` | `features/payments/types/Payments.types.ts` |
| `redux/types/auditLog.ts` | `features/auditLogs/types/AuditLogs.types.ts` |
| `redux/types/notification.ts` | `features/notifications/types/Notifications.types.ts` |
| `redux/types/category.ts` | `features/categoriesExample/types/Categories.types.ts` |
| `redux/types/testTr.ts` | `features/testTrExample/types/TestTr.types.ts` |
| `redux/types/testSubTr.ts` | `features/testSubTrExample/types/TestSubTr.types.ts` |

`redux/` is now empty — delete it.

### 6.7 New file: `shared/types/Base.types.ts`

RASPM features import `PaginatedResponse<T>`, `BaseListRequest` and `CreatorDto`
from `shared/types/Base.types.ts`. Add the same façade so RASPM-style feature
code compiles unchanged in a template project. **It only adds aliases — it does
not change the template's existing `BaseDto` (numeric `id`; RASPM's is a
string).**

```ts
// app/src/shared/types/Base.types.ts
// Re-export the template's base types under the names RASPM features use.
export type { BaseDto, BaseRequest, BaseListResponse } from "./base";

export interface PaginatedList<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export type PaginatedResponse<T> = PaginatedList<T>;

export interface BaseListRequest {
  sortBy?: string;
  isAscending?: boolean;
  pageNumber?: number | null;
  pageSize?: number | null;
}

export interface CreatorDto {
  id: number;
  userName?: string;
}
```

### 6.8 Pages → features

Real features:

| From | To |
|---|---|
| `pages/auth/Login.tsx` | `features/auth/pages/Login.tsx` |
| `pages/auth/login/*.tsx` (23) | `features/auth/pages/login/*.tsx` |
| `pages/auth/otp-login/*.tsx` (23) | `features/auth/pages/otp-login/*.tsx` |
| `pages/auth/forgot-password/*.tsx` (23) | `features/auth/pages/forgot-password/*.tsx` |
| `pages/auth/register/*.tsx` (23) | `features/auth/pages/register/*.tsx` |
| `pages/users/Users.tsx` | `features/users/pages/UsersPage.tsx` |
| `pages/users/{UserModal,ResetPasswordModal,DeleteRestoreAlerts}.tsx` | `features/users/components/` |
| `pages/payments/Payments.tsx` | `features/payments/pages/PaymentsPage.tsx` |
| `pages/payments/CreatePaymentModal.tsx` | `features/payments/components/CreatePaymentModal.tsx` |
| `pages/auditLogs/AuditLogs.tsx` | `features/auditLogs/pages/AuditLogsPage.tsx` |
| `pages/auditLogs/AuditLogDetailsModal.tsx` | `features/auditLogs/components/AuditLogDetailsModal.tsx` |
| `pages/profile/Profile.tsx` | `features/profile/pages/ProfilePage.tsx` |
| `pages/profile/Profile*Tab.tsx` (3) | `features/profile/components/` |
| `pages/dashboard.tsx` | `features/dashboard/pages/DashboardPage.tsx` |
| `pages/exceptions/{NotFound,ServerError}.tsx` | `features/exceptions/pages/` |

Demo features:

| From | To |
|---|---|
| `pages/Home.tsx` | `features/authGallery/pages/HomePage.tsx` |
| `pages/ComponentExamples.tsx` | `features/showcase/pages/ComponentExamplesPage.tsx` |
| `pages/ComponentShowcase.tsx` | `features/showcase/pages/ComponentShowcasePage.tsx` |
| `pages/showcase/*Tab.tsx` (11) | `features/showcase/components/` |
| `pages/showcase/showcaseData.tsx` | `features/showcase/types/showcaseData.tsx` |
| `pages/categoriesExample1/CategoriesExample1.tsx` | `features/categoriesExample/pages/example1/CategoriesExample1.tsx` |
| `pages/categoriesExample1/{CategoryModal,DeleteRestoreAlerts}.tsx` | `features/categoriesExample/components/example1/` |
| `pages/categoriesExample2/CategoriesExample2.tsx` | `features/categoriesExample/pages/example2/CategoriesExample2.tsx` |
| `pages/categoriesExample2/{CategoryDrawer,DeleteRestoreConfirms}.tsx` | `features/categoriesExample/components/example2/` |
| `pages/categoriesExample3/{CategoriesExample3,CategoryFormPage}.tsx` | `features/categoriesExample/pages/example3/` |
| `pages/categoriesExample3/DeleteRestoreAlerts.tsx` | `features/categoriesExample/components/example3/` |
| `pages/testTrExample1/TestTrExample1.tsx` | `features/testTrExample/pages/example1/TestTrExample1.tsx` |
| `pages/testTrExample1/{TestTrModal,DeleteRestoreAlerts}.tsx` | `features/testTrExample/components/example1/` |
| `pages/testTrExample2/TestTrExample2.tsx` | `features/testTrExample/pages/example2/TestTrExample2.tsx` |
| `pages/testTrExample2/{TestTrDrawer,DeleteRestoreConfirms}.tsx` | `features/testTrExample/components/example2/` |
| `pages/testTrExample3/{TestTrExample3,TestTrFormPage}.tsx` | `features/testTrExample/pages/example3/` |
| `pages/testTrExample3/DeleteRestoreAlerts.tsx` | `features/testTrExample/components/example3/` |
| `pages/testSubTrExample1/TestSubTrExample1.tsx` | `features/testSubTrExample/pages/TestSubTrExample1.tsx` |
| `pages/testSubTrExample1/{TestSubTrModal,DeleteRestoreAlerts}.tsx` | `features/testSubTrExample/components/` |
| `pages/accountsExample/AccountsExample.tsx` | `features/accountsExample/pages/AccountsExamplePage.tsx` |
| `pages/accountsExample/{AccountModal,DeleteRestoreAlerts}.tsx` | `features/accountsExample/components/` |
| `pages/accountsExample/{accounts.json,accountsData.ts}` | `features/accountsExample/types/` |
| `pages/invoiceExample/InvoiceExample.tsx` | `features/invoiceExample/pages/InvoiceExamplePage.tsx` |
| `pages/invoiceExample/{HotItems,InvoiceHeader,InvoiceItems,InvoiceTable,InvoiceTotals}.tsx` | `features/invoiceExample/components/` |
| `pages/invoiceExample/invoiceData.ts` | `features/invoiceExample/types/invoiceData.ts` |
| `pages/productDetails/ProductDetails.tsx` | `features/productDetails/pages/ProductDetailsPage.tsx` |
| `pages/productDetails/ProductExtras.tsx` | `features/productDetails/components/ProductExtras.tsx` |
| `pages/productDetails/productData.ts` | `features/productDetails/types/productData.ts` |
| `pages/profileExample/ProfileExample.tsx` | `features/profileExample/pages/ProfileExamplePage.tsx` |
| `pages/profileExample/*Tab.tsx` + `ProfileHeader.tsx` | `features/profileExample/components/` |
| `pages/profileExample/{profileData.ts,profileUtils.ts}` | `features/profileExample/types/` |
| `pages/publicCard/PublicCard.tsx` | `features/publicCard/pages/PublicCardPage.tsx` |
| `pages/publicCard/publicCardData.ts` | `features/publicCard/types/publicCardData.ts` |
| `pages/stepperExample/CustomerStepperExample.tsx` | `features/stepperExample/pages/CustomerStepperExamplePage.tsx` |
| `pages/stepperExample/Customer*Step.tsx` + `StepHeading.tsx` | `features/stepperExample/components/` |
| `pages/stepperExample/types.ts` | `features/stepperExample/types/Stepper.types.ts` |
| `pages/ticketExample/{TicketList,TicketDetails}.tsx` | `features/ticketExample/pages/` |
| `pages/ticketExample/{AssignmentActions,AttachmentsTab,CommentsTab,HistoryTab,TicketInfoCard}.tsx` | `features/ticketExample/components/` |
| `pages/ticketExample/{ticketData.ts,ticketUtils.ts}` | `features/ticketExample/types/` |

`pages/` is now empty — delete it.

> **Rule used for splitting a page folder:** anything reachable as a **route**
> goes to `pages/`; anything a page renders (modal, drawer, tab, card, step)
> goes to `components/`; static seed data and local types go to `types/`. That
> is RASPM's split — e.g. `powerStations/pages/PowerStationDetailPage.tsx` vs
> `powerStations/components/station-detail/*`.

---

## 7. The codemod

### 7.1 Why

Every import in the template is relative. Moving a file changes both its own
depth and the depth of everything pointing at it: `pages/users/Users.tsx`
imports `../../components/...`; as `features/users/pages/UsersPage.tsx` it must
import `../../../shared/components/...`. Roughly 1,956 specifiers change.
Find-and-replace cannot do this — the correct new specifier depends on *both*
endpoints of each edge.

### 7.2 The algorithm

1. Build a **manifest** of every file under `src`, mapping old path → new path.
   Files that do not move (all of `assets/`, `App.tsx`, `main.tsx`) map to
   themselves. **This is essential**: a non-moving file still needs its imports
   rewritten, and a moving file still needs correct paths to non-moving targets.
2. `git mv` every changed entry (so history follows the file).
3. For **every** `.ts`/`.tsx` file in the manifest, walk its relative import
   specifiers. For each one:
   - resolve it against the file's **old** directory, trying
     `''`, `.ts`, `.tsx`, `/index.ts`, `/index.tsx` — giving the old target;
   - look the old target up in the manifest to get the new target;
   - re-relativise from the file's **new** directory;
   - preserve the author's extension style (explicit `.tsx` stays explicit;
     extensionless stays extensionless; `/index` collapses back to the folder).
4. Report anything that did not resolve. Expect exactly one: the
   `import.meta.glob` in `core/i18n/index.ts`.

### 7.3 The script

Save as `Scripts/restructure/restructure.mjs`. Run `--dry-run` first — it writes
`Scripts/restructure/manifest.json` and prints the unresolved list without
touching a single file.

```js
#!/usr/bin/env node
/**
 * One-shot migration: layer-based src/ -> RASPM feature-based src/.
 *
 *   node Scripts/restructure/restructure.mjs --dry-run   # inspect only
 *   node Scripts/restructure/restructure.mjs             # move + rewrite
 *
 * THIS MOVES FILES AND EDITS IMPORTS. Commit first.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..', '..');
const SRC = path.join(REPO_ROOT, 'app', 'src');
const DRY = process.argv.includes('--dry-run');

// ------------------------------------------------------------------ the map ---
// Exact-file moves are checked first, then directory-prefix moves in order.
// Everything unmatched keeps its path (assets, App.tsx, main.tsx).

const FILE_MOVES = {
  'redux/store.ts': 'app/store.ts',
  'redux/api/instanceApi.ts': 'app/api/instanceApi.ts',

  'config/Menu.tsx': 'core/config/Menu.tsx',
  'routes/AllRoutes.tsx': 'core/routes/AllRoutes.tsx',
  'routes/index.tsx': 'core/routes/index.tsx',
  'redux/slices/themeSlice.ts': 'core/slices/theme.slice.ts',
  'redux/slices/layoutSlice.ts': 'core/slices/layout.slice.ts',

  'services/signalRService.ts': 'shared/services/signalRService.ts',
  'redux/types/base.ts': 'shared/types/base.ts',

  // auth
  'redux/api/authApi.ts': 'features/auth/api/Auth.api.ts',
  'redux/slices/authSlice.ts': 'features/auth/slices/Auth.slice.ts',
  'redux/types/auth.ts': 'features/auth/types/Auth.types.ts',
  'redux/types/otpLogin.ts': 'features/auth/types/OtpLogin.types.ts',
  'redux/types/passwordReset.ts': 'features/auth/types/PasswordReset.types.ts',
  'redux/types/registration.ts': 'features/auth/types/Registration.types.ts',
  'redux/types/role.ts': 'features/auth/types/Roles.types.ts',
  'components/modals/ChangePasswordModal.tsx': 'features/auth/components/ChangePasswordModal.tsx',
  'pages/auth/Login.tsx': 'features/auth/pages/Login.tsx',

  // users
  'redux/api/userApi.ts': 'features/users/api/Users.api.ts',
  'redux/types/user.ts': 'features/users/types/Users.types.ts',
  'pages/users/Users.tsx': 'features/users/pages/UsersPage.tsx',
  'pages/users/UserModal.tsx': 'features/users/components/UserModal.tsx',
  'pages/users/ResetPasswordModal.tsx': 'features/users/components/ResetPasswordModal.tsx',
  'pages/users/DeleteRestoreAlerts.tsx': 'features/users/components/DeleteRestoreAlerts.tsx',

  // payments
  'redux/api/paymentApi.ts': 'features/payments/api/Payments.api.ts',
  'redux/types/payment.ts': 'features/payments/types/Payments.types.ts',
  'pages/payments/Payments.tsx': 'features/payments/pages/PaymentsPage.tsx',
  'pages/payments/CreatePaymentModal.tsx': 'features/payments/components/CreatePaymentModal.tsx',

  // auditLogs
  'redux/api/auditLogApi.ts': 'features/auditLogs/api/AuditLogs.api.ts',
  'redux/types/auditLog.ts': 'features/auditLogs/types/AuditLogs.types.ts',
  'pages/auditLogs/AuditLogs.tsx': 'features/auditLogs/pages/AuditLogsPage.tsx',
  'pages/auditLogs/AuditLogDetailsModal.tsx': 'features/auditLogs/components/AuditLogDetailsModal.tsx',

  // notifications
  'redux/api/notificationApi.ts': 'features/notifications/api/Notifications.api.ts',
  'redux/slices/notificationSlice.ts': 'features/notifications/slices/notification.slice.ts',
  'redux/types/notification.ts': 'features/notifications/types/Notifications.types.ts',
  'components/navigation/NotificationDrawer.tsx': 'features/notifications/components/NotificationDrawer.tsx',
  'components/navigation/NotificationDropdown.tsx': 'features/notifications/components/NotificationDropdown.tsx',

  // profile / dashboard / gallery / showcase
  'pages/profile/Profile.tsx': 'features/profile/pages/ProfilePage.tsx',
  'pages/profile/ProfileInfoTab.tsx': 'features/profile/components/ProfileInfoTab.tsx',
  'pages/profile/ProfileSettingsTab.tsx': 'features/profile/components/ProfileSettingsTab.tsx',
  'pages/profile/ProfileNotificationsTab.tsx': 'features/profile/components/ProfileNotificationsTab.tsx',
  'pages/dashboard.tsx': 'features/dashboard/pages/DashboardPage.tsx',
  'pages/Home.tsx': 'features/authGallery/pages/HomePage.tsx',
  'pages/ComponentExamples.tsx': 'features/showcase/pages/ComponentExamplesPage.tsx',
  'pages/ComponentShowcase.tsx': 'features/showcase/pages/ComponentShowcasePage.tsx',

  // demo APIs + types
  'redux/api/categoryApi.ts': 'features/categoriesExample/api/Categories.api.ts',
  'redux/types/category.ts': 'features/categoriesExample/types/Categories.types.ts',
  'redux/api/testTrApi.ts': 'features/testTrExample/api/TestTr.api.ts',
  'redux/types/testTr.ts': 'features/testTrExample/types/TestTr.types.ts',
  'redux/api/testSubTrApi.ts': 'features/testSubTrExample/api/TestSubTr.api.ts',
  'redux/types/testSubTr.ts': 'features/testSubTrExample/types/TestSubTr.types.ts',

  // demo pages that get a Page suffix
  'pages/accountsExample/AccountsExample.tsx': 'features/accountsExample/pages/AccountsExamplePage.tsx',
  'pages/invoiceExample/InvoiceExample.tsx': 'features/invoiceExample/pages/InvoiceExamplePage.tsx',
  'pages/productDetails/ProductDetails.tsx': 'features/productDetails/pages/ProductDetailsPage.tsx',
  'pages/profileExample/ProfileExample.tsx': 'features/profileExample/pages/ProfileExamplePage.tsx',
  'pages/publicCard/PublicCard.tsx': 'features/publicCard/pages/PublicCardPage.tsx',
  'pages/stepperExample/CustomerStepperExample.tsx': 'features/stepperExample/pages/CustomerStepperExamplePage.tsx',
  'pages/stepperExample/types.ts': 'features/stepperExample/types/Stepper.types.ts',
  'pages/ticketExample/TicketList.tsx': 'features/ticketExample/pages/TicketList.tsx',
  'pages/ticketExample/TicketDetails.tsx': 'features/ticketExample/pages/TicketDetails.tsx',

  // categories / testTr variant pages
  'pages/categoriesExample1/CategoriesExample1.tsx': 'features/categoriesExample/pages/example1/CategoriesExample1.tsx',
  'pages/categoriesExample2/CategoriesExample2.tsx': 'features/categoriesExample/pages/example2/CategoriesExample2.tsx',
  'pages/categoriesExample3/CategoriesExample3.tsx': 'features/categoriesExample/pages/example3/CategoriesExample3.tsx',
  'pages/categoriesExample3/CategoryFormPage.tsx': 'features/categoriesExample/pages/example3/CategoryFormPage.tsx',
  'pages/testTrExample1/TestTrExample1.tsx': 'features/testTrExample/pages/example1/TestTrExample1.tsx',
  'pages/testTrExample2/TestTrExample2.tsx': 'features/testTrExample/pages/example2/TestTrExample2.tsx',
  'pages/testTrExample3/TestTrExample3.tsx': 'features/testTrExample/pages/example3/TestTrExample3.tsx',
  'pages/testTrExample3/TestTrFormPage.tsx': 'features/testTrExample/pages/example3/TestTrFormPage.tsx',
  'pages/testSubTrExample1/TestSubTrExample1.tsx': 'features/testSubTrExample/pages/TestSubTrExample1.tsx',
};

const DIR_MOVES = [
  // feature components/data — most specific first
  ['components/auth/',            'features/auth/components/'],
  ['pages/auth/',                 'features/auth/pages/'],
  ['pages/exceptions/',           'features/exceptions/pages/'],
  ['pages/showcase/',             'features/showcase/components/'],
  ['pages/categoriesExample1/',   'features/categoriesExample/components/example1/'],
  ['pages/categoriesExample2/',   'features/categoriesExample/components/example2/'],
  ['pages/categoriesExample3/',   'features/categoriesExample/components/example3/'],
  ['pages/testTrExample1/',       'features/testTrExample/components/example1/'],
  ['pages/testTrExample2/',       'features/testTrExample/components/example2/'],
  ['pages/testTrExample3/',       'features/testTrExample/components/example3/'],
  ['pages/testSubTrExample1/',    'features/testSubTrExample/components/'],
  ['pages/accountsExample/',      'features/accountsExample/components/'],
  ['pages/invoiceExample/',       'features/invoiceExample/components/'],
  ['pages/productDetails/',       'features/productDetails/components/'],
  ['pages/profileExample/',       'features/profileExample/components/'],
  ['pages/publicCard/',           'features/publicCard/components/'],
  ['pages/stepperExample/',       'features/stepperExample/components/'],
  ['pages/ticketExample/',        'features/ticketExample/components/'],
  // layers
  ['components/',                 'shared/components/'],
  ['hooks/',                      'shared/hooks/'],
  ['utils/',                      'shared/utils/'],
  ['services/',                   'shared/services/'],
  ['i18n/',                       'core/i18n/'],
  ['layout/',                     'core/layout/'],
];

// Seed data that landed in components/ by the prefix rule but belongs in types/.
const DATA_FILES = {
  'features/accountsExample/components/accounts.json': 'features/accountsExample/types/accounts.json',
  'features/accountsExample/components/accountsData.ts': 'features/accountsExample/types/accountsData.ts',
  'features/invoiceExample/components/invoiceData.ts': 'features/invoiceExample/types/invoiceData.ts',
  'features/productDetails/components/productData.ts': 'features/productDetails/types/productData.ts',
  'features/profileExample/components/profileData.ts': 'features/profileExample/types/profileData.ts',
  'features/profileExample/components/profileUtils.ts': 'features/profileExample/types/profileUtils.ts',
  'features/publicCard/components/publicCardData.ts': 'features/publicCard/types/publicCardData.ts',
  'features/ticketExample/components/ticketData.ts': 'features/ticketExample/types/ticketData.ts',
  'features/ticketExample/components/ticketUtils.ts': 'features/ticketExample/types/ticketUtils.ts',
  'features/showcase/components/showcaseData.tsx': 'features/showcase/types/showcaseData.tsx',
};

// ------------------------------------------------------------------- helpers ---
const c = { reset: '\x1b[0m', dim: '\x1b[2m', green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m' };
const toPosix = (p) => p.split(path.sep).join('/');

function listFiles(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) listFiles(full, acc);
    else acc.push(toPosix(path.relative(SRC, full)));
  }
  return acc;
}

function mapPath(rel) {
  if (FILE_MOVES[rel]) return FILE_MOVES[rel];
  for (const [from, to] of DIR_MOVES) {
    if (rel.startsWith(from)) {
      const moved = to + rel.slice(from.length);
      return DATA_FILES[moved] || moved;
    }
  }
  return rel;
}

// `from "x"`, `import("x")`, `require("x")`, and bare `import "x"` side effects.
const SPEC_RE = /(\bfrom\s*|\bimport\s*\(\s*|\brequire\s*\(\s*|\bimport\s+)(['"])(\.[^'"]*)\2/g;
const CODE_RE = /\.(ts|tsx)$/;
const EXTS = ['', '.ts', '.tsx', '/index.ts', '/index.tsx'];
const KEEPS_EXT = /\.(tsx?|json|css|scss|png|jpe?g|svg|webp|gif|mp4|woff2?)$/;

const manifest = new Map();
const unresolved = [];

function resolveOld(oldDir, spec) {
  const guess = path.posix.normalize(path.posix.join(oldDir, spec));
  for (const ext of EXTS) if (manifest.has(guess + ext)) return guess + ext;
  return null;
}

function rewriteImports(oldRel, newRel, body) {
  const oldDir = path.posix.dirname(oldRel);
  const newDir = path.posix.dirname(newRel);
  return body.replace(SPEC_RE, (whole, head, q, spec) => {
    const target = resolveOld(oldDir, spec);
    if (!target) { unresolved.push(`${newRel}  ->  ${spec}`); return whole; }
    const newTarget = manifest.get(target);
    const out = KEEPS_EXT.test(spec) ? newTarget : newTarget.replace(/(\/index)?\.tsx?$/, '');
    let next = path.posix.relative(newDir, out);
    if (!next.startsWith('.')) next = './' + next;
    return `${head}${q}${next}${q}`;
  });
}

// ---------------------------------------------------------------------- run ---
for (const f of listFiles(SRC)) manifest.set(f, mapPath(f));

const moves = [...manifest].filter(([o, n]) => o !== n);
console.log(`${moves.length} files move, ${manifest.size - moves.length} stay put`);

if (DRY) {
  fs.writeFileSync(
    path.join(SCRIPT_DIR, 'manifest.json'),
    JSON.stringify(Object.fromEntries(manifest), null, 2),
  );
  // dry-run still computes rewrites so the unresolved list is real
  for (const [o, n] of manifest) {
    if (!CODE_RE.test(n)) continue;
    rewriteImports(o, n, fs.readFileSync(path.join(SRC, o), 'utf8'));
  }
} else {
  for (const [o, n] of moves) {
    const dest = path.join(SRC, n);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    execFileSync('git', ['mv', path.join(SRC, o), dest], { cwd: REPO_ROOT });
  }
  let touched = 0;
  for (const [o, n] of manifest) {
    if (!CODE_RE.test(n)) continue;
    const p = path.join(SRC, n);
    const before = fs.readFileSync(p, 'utf8');
    const after = rewriteImports(o, n, before);
    if (after !== before) { fs.writeFileSync(p, after, 'utf8'); touched++; }
  }
  console.log(`${c.green}rewrote imports in ${touched} files${c.reset}`);
  // prune the folders the moves emptied (git leaves them behind, and they nest)
  const pruneEmpty = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) pruneEmpty(path.join(dir, e.name));
    }
    if (dir !== SRC && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
  };
  pruneEmpty(SRC);
}

if (unresolved.length) {
  console.log(`\n${c.yellow}unresolved specifiers (check each one):${c.reset}`);
  for (const u of unresolved) console.log('  ' + u);
}
```

### 7.4 Expected output

- `384 files move, 201 stay put` — the 201 are `assets/**` (199, including the
  99 icon components) plus `App.tsx` and `main.tsx`. If your numbers differ, the
  map has a gap: something under `pages/` or `components/` matched no rule.
- **Zero unresolved entries.** The specifier regex matches `from "…"`,
  `import("…")`, `require("…")` and bare `import "…"`, but not
  `import.meta.glob("…")` — so the i18n glob is never rewritten and never
  reported, which is what we want (it moves with its own `locales/` folder).
  Anything that *does* appear in that list is a real problem; fix the map and
  re-run from a clean tree.

---

## 8. Execution phases

Run everything from the repo root on a branch. Each phase ends with a **gate**
that must pass before the next one starts.

```
git switch -c chore/feature-based-structure
```

The standard gate:

```
cd app
npx tsc -b tsconfig.json --noEmit     # must be silent
npm run lint                          # no new errors
npm run dev                           # click through: login, dashboard, a list, a modal
```

### Phase 0 — Baseline (30 min)

1. Confirm a clean tree: `git status` → nothing to commit.
2. Record the current state so you can prove nothing regressed:
   ```
   cd app && npx tsc -b tsconfig.json --noEmit 2>&1 | tee ../baseline-tsc.txt
   npm run build 2>&1 | tail -20
   ```
3. Note the built bundle size — it should be within a few KB after the move.
4. Create `Scripts/restructure/` and drop in the §7.3 script.
5. `node Scripts/restructure/restructure.mjs --dry-run` and **read
   `manifest.json` end to end**. Every line is a decision; this is the cheapest
   place to catch a wrong one.

**Gate:** dry run reports exactly one unresolved specifier (the i18n glob).

### Phase 1 — The move (1 call, then fix-ups)

```
node Scripts/restructure/restructure.mjs
cd app && npx tsc -b tsconfig.json --noEmit
```

Then the handful of things the codemod deliberately does not do:

1. **Add `shared/types/Base.types.ts`** (§6.7).
2. **Delete the dead alias** in `app/tsconfig.json`:
   ```diff
   -    "baseUrl": ".",
   -    "paths": {
   -      "@/*": ["src/*"]
   -    }
   ```
   (Remove the trailing comma on the line above it.)
3. **Check `main.tsx`** reads:
   ```ts
   import { store } from './app/store'
   import './core/i18n'
   import './assets/css/tailwind.css'
   import './assets/scss/app.scss'
   ```
   These are side-effect imports; the codemod handles them, but they are the
   ones that fail loudest, so eyeball them.
4. **Check `App.tsx`** points at `./shared/components/feedback/Toast` and
   `./core/routes/AllRoutes`.
5. **Delete empty folders** git leaves behind (`git status` will not show them;
   the script prunes the known ones).

**Gate:** `tsc` silent, `npm run dev` boots, login → dashboard → a CRUD list →
open a modal → switch language → switch theme all work.

**Commit:** `refactor: move src to feature-based structure`

> Do this as **one commit**. Splitting the move across commits leaves the repo
> un-buildable in between, which makes bisecting later worse, not better.
> The phases below are separate commits because they are separate concerns.

### Phase 2 — Conventions pass (2–3 h)

Now that files are in place, apply the RASPM naming details the move map
already encoded, and verify nothing was missed:

1. `grep -rn "redux/\|from \"\.\./pages/\|from \"\.\./components/" app/src`
   → must return **nothing**.
2. Confirm slice filenames match §4 and that `app/store.ts` imports read:
   ```ts
   import authReducer from '../features/auth/slices/Auth.slice';
   import themeReducer from '../core/slices/theme.slice';
   import notificationReducer from '../features/notifications/slices/notification.slice';
   import layoutReducer from '../core/slices/layout.slice';
   import { instanceApi } from './api/instanceApi';
   ```
3. **Optional, recommended — port RASPM's session-boundary middleware** into
   `app/store.ts`. It resets RTK Query cache on login/logout so one user's
   cached data never surfaces under the next user's token. It is 8 lines, it is
   a real bug fix, and it makes the two stores identical:
   ```ts
   const sessionBoundaryMiddleware: Middleware = (storeApi) => (next) => (action) => {
     const result = next(action);
     if (logout.match(action) || login.match(action)) {
       storeApi.dispatch(instanceApi.util.resetApiState());
     }
     return result;
   };
   ```
   (Import `login, logout` from `Auth.slice`, add the middleware to `.concat()`.)

**Gate:** standard gate + log in as two different users in sequence and confirm
no stale data.

**Commit:** `refactor: adopt RASPM naming for slices, apis and types`

### Phase 3 — Setup scripts (3–4 h) — **the highest-risk phase**

The five `Scripts/*.mjs` are the template's product. They hard-code `src/…`
paths and will silently no-op after the move — a `remove-examples` run that
"succeeds" while deleting nothing is worse than one that crashes. Full detail in
§9.

**Gate for each script:** run it with `--dry-run` on a scratch clone, then for
real, then `tsc -b` clean and `npm run dev` boots. Test in this order:
`add-language`, `rename`, `layout-setup`, `auth-setup`, `remove-examples`.

**Commit:** `chore(scripts): update setup scripts for feature-based structure`

### Phase 4 — Docs (1–2 h)

See §10 and §11.

**Commit:** `docs: document the feature-based structure`

### Phase 5 — End-to-end validation (2 h)

See §12.

---

## 9. Updating `Scripts/*.mjs`

All five scripts build their paths from constants at the top of the file, which
is what makes this tractable. Line numbers below are from the current files.

### 9.1 `add-system-language/add-language.mjs`

| Line | Change |
|---|---|
| 31 | `path.join(APP, 'src', 'i18n')` → `path.join(APP, 'src', 'core', 'i18n')` |

Nothing else — `LOCALES` and `REGISTRY` derive from `I18N`. **1 line.**

### 9.2 `change-name-script/rename.mjs`

| Line | Change |
|---|---|
| 29 | `path.join(APP, 'src', 'i18n', 'locales')` → `…, 'src', 'core', 'i18n', 'locales')` |
| 30 | `path.join(APP, 'src', 'i18n', 'languages.ts')` → `…, 'src', 'core', 'i18n', 'languages.ts')` |

The image/favicon targets (`src/assets/images/**`, `public/**`) are unchanged.
**2 lines.** Also update the path table in its `README.md`.

### 9.3 `layout-setup/layout-setup.mjs`

| Line | Change |
|---|---|
| 38 | `LAYOUT_DIR` → `path.join(SRC, 'core', 'layout')` |
| 45 | `ALL_ROUTES` → `path.join(SRC, 'core', 'routes', 'AllRoutes.tsx')` |
| 161 | the literal it writes into `AllRoutes.tsx`: `` `import ${layoutComponent} from "../layout/${layoutComponent}.tsx";` `` → `"../layout/…"` is still correct, because `AllRoutes.tsx` now lives in `core/routes/` and the layouts in `core/layout/` — **verify, do not assume**: from `core/routes/` to `core/layout/` is `../layout/`, the same string as before. **No change needed.** |
| 157 | the comment above it mentions `../layout/` — still accurate. |
| 288, 300 | `@import "layout/${family}/…"` — SCSS paths, **unchanged**. |

`SIDEBARS`, `NAVBARS`, `SIDEBAR_WRAPPER`, `AUTH_LAYOUT` all derive from
`LAYOUT_DIR`. `SIDEBAR_SCSS`, `NAVBAR_SCSS`, `APP_SCSS`, `VARIABLES` are all
under `assets/` and unchanged. **2 lines.**

> The `../layout/` coincidence is the kind of thing that looks like a bug six
> months from now. Add a one-line comment at line 161 saying *why* it is still
> right: `AllRoutes.tsx` and the layouts are siblings under `core/`.

### 9.4 `auth-setup/auth-setup.mjs`

| Line | Current | New |
|---|---|---|
| 28 | `path.join(SRC, 'pages', 'auth')` | `path.join(SRC, 'features', 'auth', 'pages')` |
| 29 | `path.join(SRC, 'components', 'auth')` | `path.join(SRC, 'features', 'auth', 'components')` |
| 30 | `path.join(SRC, 'routes', 'index.tsx')` | `path.join(SRC, 'core', 'routes', 'index.tsx')` |
| 31 | `path.join(SRC, 'redux', 'api', 'authApi.ts')` | `path.join(SRC, 'features', 'auth', 'api', 'Auth.api.ts')` |
| 33 | `path.join(SRC, 'i18n', 'locales')` | `path.join(SRC, 'core', 'i18n', 'locales')` |
| 286 | `path.join(SRC, 'redux', 'types', flow.typeFile)` | `path.join(SRC, 'features', 'auth', 'types', flow.typeFile)` |
| 341 | `path.join(SRC, 'pages', 'Home.tsx')` | `path.join(SRC, 'features', 'authGallery', 'pages', 'HomePage.tsx')` |

Plus the `FLOWS` registry `typeFile` values (lines ~95–110):

| Flow | Current | New |
|---|---|---|
| `otpLogin` | `'otpLogin.ts'` | `'OtpLogin.types.ts'` |
| `forgotPassword` | `'passwordReset.ts'` | `'PasswordReset.types.ts'` |
| `register` | `'registration.ts'` | `'Registration.types.ts'` |
| `login` | `null` | `null` (unchanged) |

And the lazy-import template it writes into `core/routes/index.tsx` (line 228):

```diff
-    .map((f) => `const ${f.component} = lazy(() => import("../pages/auth/${f.dir}/${f.component}"));`)
+    .map((f) => `const ${f.component} = lazy(() => import("../../features/auth/pages/${f.dir}/${f.component}"));`)
```

Line 38–39 (`assets/scss/layout/_auth.scss`, `_pages.scss`), 344
(`assets/scss/pages/_home.scss`) and 354 (`AUTH/Login.tsx`, which follows
`AUTH`) need no change.

**~12 lines.** Also update the docblock at lines 8–20 of its `README.md`, which
describes the folder layout.

### 9.5 `remove-examples/remove-examples.mjs` — the big one

**`lazyComponentsFor` (line ~461) — the trap this plan originally missed.**
The regex that finds a route's lazy import hard-codes a single `../`:

```diff
-  const re = /^const (\w+) = lazy\(\(\) => import\("\.\.\/([^"]+)"\)\);/gm;
+  const re = /^const (\w+) = lazy\(\(\) => import\("\.\.\/\.\.\/([^"]+)"\)\);/gm;
```

`core/routes/index.tsx` is one level deeper than `routes/index.tsx` was, so its
specifiers now start `../../`. Left alone, the regex matches nothing: the script
runs, reports success, and removes **zero** routes — exactly the silent no-op
this phase exists to prevent. Found by reading the file rather than trusting the
constants; check the whole script, not just its head.

**Constants (lines 37–41):**

| Current | New |
|---|---|
| `ROUTES = SRC/routes/index.tsx` | `SRC/core/routes/index.tsx` |
| `SIDEBAR = SRC/config/Menu.tsx` | `SRC/core/config/Menu.tsx` |
| `LOCALES = SRC/i18n/locales` | `SRC/core/i18n/locales` |
| `HOME = SRC/pages/Home.tsx` | `SRC/features/authGallery/pages/HomePage.tsx` |
| `APP_SCSS` | unchanged |

**The `EXAMPLES` registry (lines 83–235)** — every `pages:` and `sharedFiles:`
entry. This is where the migration actually pays off: most become a single
folder.

| id | `pages:` now | `pages:` after |
|---|---|---|
| `categories` | 3 folders | `['features/categoriesExample']` |
| `test-tr` | 3 folders | `['features/testTrExample']` |
| `sub-test-tr` | `['pages/testSubTrExample1']` | `['features/testSubTrExample']` |
| `accounts` | `['pages/accountsExample']` | `['features/accountsExample']` |
| `product-details` | `['pages/productDetails']` | `['features/productDetails']` |
| `stepper` | `['pages/stepperExample']` | `['features/stepperExample']` |
| `profile-example` | `['pages/profileExample']` | `['features/profileExample']` |
| `invoice` | `['pages/invoiceExample']` | `['features/invoiceExample']` |
| `ticket` | `['pages/ticketExample']` | `['features/ticketExample']` |
| `public-card` | `['pages/publicCard']` | `['features/publicCard']` |
| `components` | 3 entries | `['features/showcase']` |
| `auth-gallery` | `['pages/Home.tsx']` | `['features/authGallery']` |

`sharedFiles:` — now **empty for every example**, because each API slice and
type file lives inside its own feature folder and is deleted with it:

| id | `sharedFiles:` now | after |
|---|---|---|
| `categories` | `['redux/api/categoryApi.ts', 'redux/types/category.ts']` | `[]` |
| `test-tr` | `['redux/api/testTrApi.ts', 'redux/types/testTr.ts']` | `[]` |
| `sub-test-tr` | `['redux/api/testSubTrApi.ts', 'redux/types/testSubTr.ts']` | `[]` |

> **Do not delete the `sharedFiles` machinery** (the "is anything still
> importing this?" check around lines 640–670). It is still the right guard for
> a project that later wires a demo API into a real page. Leave the arrays
> empty and the code intact.

**`reportDangling` (line ~672):**

```diff
-  const needles = chosen.flatMap((ex) => ex.pages.map((p) => p.replace(/^pages\//, '').replace(/\.tsx$/, '')));
+  const needles = chosen.flatMap((ex) => ex.pages.map((p) => p.replace(/\.tsx$/, '')));
```
```diff
-        if (new RegExp(`pages/${needle}\\b`).test(body)) hits.push(`${rel(full)} -> pages/${needle}`);
+        if (new RegExp(`${needle}\\b`).test(body)) hits.push(`${rel(full)} -> ${needle}`);
```

Needles are now full paths like `features/categoriesExample`, which is both
simpler and stricter than the old prefix-stripping.

**`updateHome` (line 596):**

```diff
-  if (chosen.some((ex) => ex.pages.includes('pages/Home.tsx'))) return;
+  if (chosen.some((ex) => ex.pages.includes('features/authGallery'))) return;
```

**`updateStyles` (line 563)** — `scss:` entries are `pages/_home.scss` etc.
under `assets/scss/`; **unchanged**.

**The docblock (lines 10–20)** lists the seven places a removal touches. Rewrite
it: it is now five (folder, routes, menu, i18n, scss), because the API slice and
types come free with the folder. That paragraph is the clearest single
explanation of why this migration was worth doing — make it say so.

**~40 lines.** Re-read the whole file after editing; it is the one script where
a wrong path fails silently.

---

## 10. Docs to update

### `app/docs/sidebar-variants/*.md` (24 files)

Every one instructs the reader to edit these paths:

| Occurrences | Current | New |
|---|---|---|
| 25 | `src/layout/AuthLayout.tsx` | `src/core/layout/AuthLayout.tsx` |
| 24 | `src/layout/SidebarWrapper.tsx` | `src/core/layout/SidebarWrapper.tsx` |
| 24 | `src/routes/AllRoutes.tsx` | `src/core/routes/AllRoutes.tsx` |
| 25 | `src/assets/scss/app.scss` | unchanged |
| 24 | `src/assets/scss/_variables.scss` | unchanged |

A scoped `sed` is safe here (these are prose files, and the two SCSS paths are
untouched by the pattern):

```bash
cd app/docs/sidebar-variants
sed -i 's|src/layout/|src/core/layout/|g; s|src/routes/|src/core/routes/|g' *.md
grep -rn "src/layout/\|src/routes/" . && echo "LEFTOVERS" || echo "clean"
```

### `Scripts/*/README.md` (5 files)

- `change-name-script/README.md` — the file-destination table.
- `auth-setup/README.md` — the "what it deletes" description (`src/pages/auth`,
  `src/components/auth`).
- `layout-setup/README.md` — any `src/layout` mention.
- `remove-examples/README.md` — the "seven places" list → five, matching §9.5.
- `add-system-language/README.md` — the `src/i18n` path.

---

## 11. New file: `CLAUDE.md` at the repo root

The template has no conventions doc. RASPM's is the reason its structure held
together across 30 features — port it, adapted. It is the deliverable that makes
the restructure *stick*; without it the next feature lands back in `pages/`.

Write `CLAUDE.md` covering, in this order:

1. **Structure map** — §3 of this document, verbatim.
2. **The 10 golden rules** — copy RASPM's `RASPM/CLAUDE.md` §"The 10 golden
   rules" and change only the examples that name RAS entities. All ten apply
   unchanged:
   1. always use `shared/**`, never rebuild a primitive;
   2. `.unwrap()` in `try/catch` → `showSuccess(t(...))` / `showError(getErrorMessage(e))`;
   3. backend error keys must exist under `errors.*` in **every** locale;
   4. every GET passes `refetchOnMountOrArgChange: true` at the call site;
   5. dropdowns call the same list hook with `{}` — no pagination, no second endpoint;
   6. `FormSelect` takes `options` + `valueKey`/`labelKey`; map only when the label is composed;
   7. yup schema per entity in `validation/`, messages are i18n keys, `mode: "onBlur"`;
   8. file uploads are `multipart/form-data` with the file inline, built by a `xToFormData` helper in `types/`;
   9. a table/view used twice becomes one prop-driven component;
   10. no inline styles — a partial in `assets/scss/**` plus one `@import` in `app.scss`.
3. **The canonical CRUD feature recipe** — RASPM's 7-step recipe. The template's
   reference implementation is `features/categoriesExample` (RASPM points at
   `features/cities`); say so explicitly, the way RASPM does.
4. **Template-specific additions RASPM has no equivalent for:**
   - the five `Scripts/` commands and when to run them (`rename` first,
     `layout-setup` and `auth-setup` once, `remove-examples` as you go);
   - i18n is **auto-discovered** (`import.meta.glob` over `core/i18n/locales/*.ts`)
     and driven by `core/i18n/languages.ts` — adding a language means
     `npm run add-language`, never hand-editing `index.ts`;
   - SignalR lives in `shared/services/signalRService.ts` + `shared/hooks/useSignalR.ts`,
     gated by `VITE_ENABLE_SIGNALR` (RASPM uses Firebase in the same two slots);
   - the template ships 21 sidebar + 8 navbar variants under `core/layout/`;
     `layout-setup` deletes the ones you did not pick.
5. **Where things go** — a short decision table:

| You are adding… | It goes in |
|---|---|
| a screen at a route | `features/<feature>/pages/` |
| something a screen renders | `features/<feature>/components/` |
| RTK Query endpoints | `features/<feature>/api/<Entity>.api.ts` (+ a tag in `app/api/instanceApi.ts`) |
| a DTO / request shape | `features/<feature>/types/<Entity>.types.ts` |
| a yup schema | `features/<feature>/validation/<Entity>.validation.ts` |
| local redux state for one feature | `features/<feature>/slices/<Entity>.slice.ts` |
| a UI primitive used by 2+ features | `shared/components/<category>/` |
| a hook/util used by 2+ features | `shared/hooks/` or `shared/utils/` |
| a sidebar entry | `core/config/Menu.tsx` |
| a route | `core/routes/index.tsx` |
| app-wide state (theme, layout) | `core/slices/` |

---

## 12. Verification checklist

### Static

- [ ] `cd app && npx tsc -b tsconfig.json --noEmit` — silent.
- [ ] `npm run lint` — no new errors vs. `baseline-tsc.txt`.
- [ ] `npm run build` — succeeds; bundle size within a few KB of Phase 0.
- [ ] `grep -rn "from \"\.\./\(redux\|pages\|config\|utils\|hooks\|services\)/" app/src` — empty.
- [ ] `grep -rn "redux/" app/src --include=*.ts --include=*.tsx` — empty.
- [ ] `ls app/src` — exactly: `App.tsx main.tsx app assets core features shared`.
- [ ] `git log --follow` on a moved file (e.g. `app/src/features/users/pages/UsersPage.tsx`)
      shows history through the rename.

### Runtime (`npm run dev`)

- [ ] Login → dashboard.
- [ ] Sidebar renders; every menu item routes; no blank screens.
- [ ] A CRUD list: filter, sort, paginate, create, edit, delete.
- [ ] A modal, a drawer and a form page variant each open.
- [ ] Language switch EN ⇄ AR flips `dir` and all strings.
- [ ] Theme switch light ⇄ dark persists across reload.
- [ ] Notification dropdown + drawer load; with `VITE_ENABLE_SIGNALR=true`, a
      pushed notification still lands.
- [ ] 404 and 500 pages render.
- [ ] Token refresh: expire the JWT and confirm the 401 → refresh → retry path.
- [ ] Log out, log in as a different role — menu and routes change correctly.

### Scripts (on a scratch clone, one per clone)

- [ ] `npm run add-language` → new locale file, `languages.ts` updated, app boots in it.
- [ ] `npm run rename` → name + logos + favicon swapped.
- [ ] `npm run layout-setup` → one sidebar kept, others gone, app boots.
- [ ] `npm run auth-setup` → one design per kept flow, others gone, login works.
- [ ] `npm run remove-examples` → picked features gone; `tsc` clean; no dead
      menu entries; no raw i18n keys on screen.
- [ ] Every script's `--dry-run` reports the same set of paths it then acts on.

### Cross-repo

- [ ] Open `RASPM/src/features/cities` and `app/src/features/categoriesExample`
      side by side. Folder names, file names and import shapes should match. If
      you have to explain a difference, it belongs in `CLAUDE.md` — or it is a
      miss.

---

## 13. Risks and rollback

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Codemod mis-resolves a specifier | low | build break | `tsc` catches every one; `--dry-run` manifest reviewed first |
| A **runtime-only** path breaks (side-effect import, dynamic `import()`) | medium | white screen, no compile error | The regex covers bare `import "x"` and `import("x")`; Phase 1 gate includes an actual browser click-through, not just `tsc` |
| A setup script silently no-ops after the move | **high** | a "successful" run that deletes nothing | §9 is per-line; Phase 3 tests each script on a scratch clone, dry-run then real |
| `git mv` loses history | low | annoyance | `git mv` (not `rm`+`add`); verify with `git log --follow` |
| Case-only rename on Windows (`dashboard.tsx` → `DashboardPage.tsx`) | low | ghost file | The name changes substantively, so this is safe; for any pure case change use `git mv -f` via a temp name |
| The i18n glob silently matches nothing | low | all strings turn into keys | It moves with its `locales/` folder; the Phase 1 gate includes a language switch |
| Merge conflicts with in-flight work | medium | painful | Do the whole move in one commit, on a short-lived branch, merged fast. Ask for a freeze on `app/src` for the day. |

**Rollback:** the move is one commit. `git revert <sha>` or
`git reset --hard <sha-before>` restores everything, including the scripts.
Nothing here is irreversible and nothing touches `node_modules` or lockfiles.

---

## 14. Effort estimate

| Phase | Work | Time |
|---|---|---|
| 0 | Baseline + write and dry-run the codemod | 2–3 h |
| 1 | Run it, fix-ups, browser gate | 2–3 h |
| 2 | Conventions pass + store middleware | 2–3 h |
| 3 | Five setup scripts + testing each on a clone | 3–4 h |
| 4 | Docs + `CLAUDE.md` | 2–3 h |
| 5 | Full verification sweep | 2 h |
| | **Total** | **~2 working days** |

Phase 3 is the one that slips. It is also the one that, done badly, ships a
broken template to whoever generates the next project from it.

---

## Appendix A — Adding a feature after the migration

```
app/src/features/invoices/
├── api/Invoices.api.ts          instanceApi.injectEndpoints; tags added to app/api/instanceApi.ts
├── types/Invoices.types.ts      DTOs; extends BaseListRequest / PaginatedResponse
├── validation/Invoices.validation.ts   yup; messages are errors.* i18n keys
├── components/
│   ├── InvoiceModal.tsx         wraps FormModal, holds the RHF form
│   └── DeleteInvoiceAlert.tsx   AlertModal type="delete"
└── pages/InvoicesPage.tsx       PageBreadcrumb -> Card(FilterAccordion) -> Card(DataTable)
```

Then register it:

1. `core/routes/index.tsx` — lazy import + an `allAdminRoutes` entry with `allowedRoles`.
2. `core/config/Menu.tsx` — sidebar entry with matching `allowedRoles`.
3. `core/i18n/locales/{en,ar}.ts` — the `invoices.*` block and every `errors.Invoice.*` key.
4. `app/api/instanceApi.ts` — add `"Invoices"` to `tagTypes`.

Nothing outside those four files, plus the feature folder, should change. If
your feature needs to touch something else, that is the signal it belongs in
`shared/` or `core/`.

## Appendix B — Deliberate differences from RASPM

| Difference | Why |
|---|---|
| `features/profile/` instead of `features/auth/pages/ProfilePage.tsx` | 4 files across 2 APIs; §5.3(b). Flip it if you want an exact match. |
| `shared/services/signalRService.ts` where RASPM has `firebaseService.ts` | Same slot, different transport. The structure is identical. |
| `core/i18n/index.ts` uses `import.meta.glob` | The template's auto-discovery is strictly better than RASPM's hand-listed imports, and `add-language` depends on it. **Consider back-porting it to RASPM.** |
| `core/layout/` keeps 21 sidebars + 8 navbars | That is the template's product. RASPM has already picked one. |
| No `core/config/permissions.ts` | RASPM's per-action CRUD permission map is domain-specific. The template keeps role checks on routes and menu entries. Add the file when a project needs it. |
| `BaseDto.id` is `number` | RASPM's backend uses string GUIDs. `Base.types.ts` adds the aliases without changing the id type; a project on a GUID backend edits `shared/types/base.ts`. |
