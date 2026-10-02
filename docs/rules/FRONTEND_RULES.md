# Frontend rules - Yanabee Sumer (YSN)

These rules are mandatory for every change in `ysn-frontend`. They sit on top of
[`CLAUDE.md`](../../CLAUDE.md), which describes the structure, the shared
components and the reference feature (`YSN/src/features/categoriesExample`).
Where the two disagree, **this file wins**.

The app folder is `YSN/` (the template called it `app/`).

---

## 1. Languages

The UI has **four** languages. Stored data has two (`en`, `ar`).

| Code | Language | Direction |
|---|---|---|
| `ar` | Arabic (default) | rtl |
| `en` | English | ltr |
| `ckb` | Kurdish Sorani | rtl |
| `kmr` | Kurdish Badini | rtl |

- Every new translation key is added to **all four** files in `YSN/src/core/i18n/locales/`, with a real translation in each. A key missing from one file shows the raw key to that language's users.
- Never write visible text directly in a component. Always `t("<feature>.<key>")`.
- Never compare a language code in a component. Use `getDirection`, `isRtl` and `getLanguage` from `core/i18n/languages.ts`.
- Forms for translated data show exactly two inputs per field: English and Arabic.
- Page titles use `useTitle(t("<feature>.pageTitle"))`. The hook adds the translated app name.

## 2. Backend exceptions and validation messages are translated

- The backend returns a dotted key such as `Categories.NotFound` or `CategoryName.IsRequired`.
- Every key a feature's endpoints can return is added under `errors.<Domain>.<Code>` in all four locales. That covers both the exception keys and the validation keys.
- Show errors only through `showError(getErrorMessage(error))`. Show success only through `showSuccess(t("<feature>.<action>Success"))`.
- A raw key reaching the screen is a bug.

## 3. No inline styles

- Never use `style={{ ... }}`.
- Styling goes in SCSS partials: `YSN/src/assets/scss/{components|layout|pages}/_<name>.scss`, registered with one `@import` line in `app.scss`.
- Never import a `.scss` file from a `.tsx` file.
- Tailwind utilities are for layout only. Colours come from the SCSS variables; the primary colour is `$color-primary` (`#158881`).

## 4. Only shared components - never raw HTML controls

- Never use a raw `<button>`, `<input>`, `<select>`, `<textarea>`, `<table>` or a hand-made modal, card or dropdown in a feature.
- Do not use `Drawer` or `FilterDrawer` (see 13 and 14). The notifications drawer is the only exception.
- Always use what exists in `YSN/src/shared/components/`: buttons, `Form*` inputs, `Select`, `DataTable`, `Modal` / `FormModal` / `AlertModal`, cards, `PageBreadcrumb`, filters, `Toast`, `Message`, `Stepper`.
- Keep the existing design: the floating-glass sidebar, the floating navbar and the modern-simple look. Do not introduce a new visual style.
- If a primitive is genuinely missing, add it once to `shared/components/<category>/` and reuse it. Never build one inside a feature.

## 5. Never touch the instance API, and add no tags

- Never edit `YSN/src/app/api/instanceApi.ts`. That includes `tagTypes`.
- Feature endpoints go in `features/<feature>/api/<Entity>.api.ts` with `instanceApi.injectEndpoints`, as `categoriesExample` does.
- Do not use `providesTags` or `invalidatesTags`. Data stays fresh because every query is called with `{ refetchOnMountOrArgChange: true }` at the call site.
- After a create, update or delete, refetch the list with the `refetch` returned by its query hook.

## 6. Selects and options

- A select loads its options with the **same** list query the table uses. There is no separate dropdown endpoint.
- **Never send `pageSize` or `pageNumber`** for a select. Pass `{}`, or only the filter the select really needs, such as `{ isDeleted: false }` or `{ parentId }`.
- **No mapping.** Pass the array straight in and name the fields:

```tsx
<FormSelect
  name="categoryId" control={control} label={`${t("products.category")} *`}
  options={categoriesData?.items || []} valueKey="id" labelKey="name" searchable
  error={!!errors.categoryId?.message}
  errorMessage={errors.categoryId?.message ? t(errors.categoryId.message) : ""}
/>
```

- Map or filter the options only when there is a real condition: a label built from several fields, rows that must be hidden, or labels that are themselves translation keys.

## 7. One component per file, split big components

- Never put two components in one file. Small helpers used by one component still get their own file in `components/`.
- When a component grows too big (as a guide, over about 250 lines, or more than one clear responsibility), split it: tabs, sections, cards, modals and table column definitions become their own components.
- A table, form section or card repeated in two places becomes one component with props.

## 8. Enums and constants live in types files

- Every enum, status list, fixed option list or constant goes in `features/<feature>/types/<Entity>.types.ts`, or in `shared/types/` when two or more features use it.
- Use a `const` object plus a derived union, never a TypeScript `enum`:

```ts
export const OrderStatus = {
  Pending: 1,
  Paid: 2,
  Cancelled: 3,
} as const;

export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];
```

- The numbers match the backend enum exactly.
- The label of each value is a translation key, never a hard-coded string.

## 9. Routes, menu and buttons follow the backend permissions

Internal users have **roles made of permissions** (backend plan 03). The
signed-in user's permission codes come with the sign-in and `me` responses.

- The backend's `[HasPermission("...")]` on each endpoint is the source of truth.
- **Routes**: each entry in `core/routes/index.tsx` declares the `permission` of the backend list endpoint it calls.
- **Menu**: each entry in `core/config/Menu.tsx` has the same `permission` as its route.
- **Buttons and actions**: every action is shown only with the permission of the endpoint it calls. A user must never see a button that returns 403.
- **Customer types**: Agents, SubAgents and Clients each have their own permissions (`Agents.*`, `SubAgents.*`, `Clients.*`). A shared customer component takes the type as a prop and checks that type's permission.
- **Cities**: an employee may be limited to some cities. Every city select and city filter lists only their cities.
- Permission checks go through **one shared hook** in `shared/hooks/`. Never compare role ids or repeat checks inline.
- `Permission` codes live in one shared types file, matching the backend seed.

## 10. Forms, validation and requests

- Forms use react-hook-form with yup, `mode: "onBlur"`, and a schema in `features/<feature>/validation/<Entity>.validation.ts`.
- The frontend schema mirrors the backend validator. The backend stays the real validation; the frontend only gives early feedback.
- Every schema message is an `errors.*` key resolved with `t()`.
- Every mutation uses `.unwrap()` inside `try / catch`.
- Every query uses `{ refetchOnMountOrArgChange: true }` at the call site.
- Files are sent inline as `multipart/form-data`. On update, leaving the file empty keeps the stored one.
- Lists filter by every filter the backend offers. Dates are always a from / to pair.

## 11. Excel export on every list

- Every list page (and every list inside a modal or tab) has an **Export** button.
- It calls the feature's backend `GET api/<Entities>/export` endpoint with the **current filters**, and downloads the file the backend returns. The frontend never builds the Excel file itself.
- The button is shown only with the feature's `<Module>.Export` permission.
- Use the shared `ExportButton` (`shared/components/buttons/ExportButton.tsx`). The export endpoint is a mutation in the feature API with `responseHandler: excelResponseHandler("<Name>")` from `shared/utils/fileDownload.ts`, which saves the file and keeps it out of the store.

## 12. Clean design and reusable components

- Follow the current design: the floating-glass sidebar, floating navbar, the shared cards, tables, badges and spacing. Keep pages clean; no new visual styles.
- Anything that opens from more than one place (a customer's messages, transactions, invoices, cards, discounts, details) is **one dynamic component** that takes props such as `customerId` or a fixed filter. It is used by the page, the modal and the tab alike. Never copy it.

## 13. Modals, not drawers

- **Do not use drawers.** Create, edit, details and every other side content open in a **modal** (`Modal`, `FormModal`, `AlertModal`).
- Large content (long forms, details with tables, review lists) uses the big modal sizes: `size="xl"` or `size="full"`.
- The **notifications drawer** is the only drawer and stays as it is.

## 14. Filters

- Every list's filters sit in the shared **`FilterAccordion`**. Never `FilterDrawer`.
- Offer most of the filters the backend supports: text searches, every select (status, type, city, category and so on), booleans, and a from / to pair for every date and every amount or count range.

## 15. Actions

- When an item has **more than one action**, the actions go in the shared **dropdown** (`TableActionDropdown`): in the table row, on the card, and in the `PageBreadcrumb` of a details page.
- A single action may stay a single button.
- Each action in the dropdown is shown only with its permission.

## 16. Notifications

- Every notification is **clickable** and navigates to its entity: a customer message opens the message, a transaction opens it, an invoice opens it, and so on.
- Navigation is decided from the notification's `type` and `referenceId` through one shared map (type -> route or modal). A new notification type adds one entry to that map.
- A notification is marked read when it is opened.

## 17. Dashboard

- Every internal user lands on a dashboard built from **their permissions**. A widget shows only if the user has the permission for its data (see feature 14 in the backend plan).

## 18. Error messages

- The API returns every error as a **category and code** key, `<Category>.<Code>` (for example `Customers.NotFound`).
- The dashboard and the mobile apps translate it with `errors.<Category>.<Code>` in all four languages. A raw key on screen is a bug.

## 19. Sign-in codes

- Customers receive one-time codes by **WhatsApp** (Twilio). The mobile screens say "sent by WhatsApp".
- Internal users receive one-time codes by **e-mail**.

## 20. Checklist for a new feature

1. `features/<feature>/` with `api/`, `types/`, `validation/`, `components/`, `pages/`.
2. Types file with DTOs, request shapes, enums and constants.
3. API slice via `injectEndpoints`, with no tags.
4. Page: `PageBreadcrumb`, `FilterAccordion` with most filters, `DataTable` card (and card view where the plan asks), modals only, actions dropdown, Export button.
5. Selects without paging and without mapping.
6. Route in `core/routes/index.tsx` and menu entry in `core/config/Menu.tsx`, both with the backend's roles.
7. Buttons shown only to the backend's roles.
8. Translations, plus every backend exception and validation key, in all four locales.
9. No inline styles; SCSS partial only when needed.
10. Notifications of the feature navigate to their entity; dashboard widgets added for the feature.
11. `cd YSN && npx tsc -b tsconfig.json --noEmit` clean, then click through every action for every permission.
