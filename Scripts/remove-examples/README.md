# Remove examples

Deletes the example features you do not need — the pages **and** everything
wired to them.

> **This deletes files. Commit first.**

## Run it

```bash
node Scripts/remove-examples/remove-examples.mjs
```

or, from `app/`:

```bash
npm run remove-examples
```

Preview without changing anything:

```bash
node Scripts/remove-examples/remove-examples.mjs --dry-run
```

Non-interactive:

```bash
node Scripts/remove-examples/remove-examples.mjs --examples ticket,invoice --yes
node Scripts/remove-examples/remove-examples.mjs --examples all --yes
```

## What it asks

One question: which examples to remove.

```
Still installed
   1. Categories examples  categories
      3 list variants - modal, drawer, form page - on the Categories API
   2. TestTr examples  test-tr
   ...
  12. Auth design gallery  auth-gallery

Remove which? (blank to cancel):
```

Answer with numbers (`1,3`), a range (`2-4`), an id (`ticket`), any mix of
those (`5-7, invoice`), or `all`. Blank cancels.

**You do not have to decide everything at once.** The list only shows what is
still installed, so removing two today and the rest next month works fine — run
it again and the ones you already deleted are gone from the menu. When there is
nothing left it says so and exits.

## What can be removed

| id | what it is |
|---|---|
| `categories` | 3 Categories list variants — modal, drawer, form page |
| `test-tr` | 3 TestTr list variants, with translation tables |
| `sub-test-tr` | the TestSubTrs list |
| `accounts` | chart of accounts — tree table seeded from JSON |
| `product-details` | icon / title / value sections plus a collapse of extra data |
| `stepper` | multi-step customer form with a review step |
| `profile-example` | tabbed customer profile |
| `invoice` | invoice builder |
| `ticket` | ticket list and detail view |
| `public-card` | the public page at `/card/:id` |
| `components` | ComponentExamples and the tabbed ComponentShowcase |
| `auth-gallery` | the `/home` page that lists all 92 auth screens |

Your own pages, the auth screens, Users, Audit Logs, Payments, Profile and the
`/dashboard` landing page are never touched.

## What it removes for each one

1. **The feature folder** under `src/features/` — which carries the
   example's `api/` and `types/` with it, so its RTK Query slice and DTOs go
   with the pages instead of having to be hunted down separately
2. **Routes** — the `lazy()` import and every route object that rendered it,
   commented-out ones included
3. **The sidebar entry** in `core/config/Menu.tsx`
4. **Now-unused icon imports** in the files it edited. The build runs with
   `noUnusedLocals`, so skipping this would turn a clean removal into a broken
   build
5. **Translations** — the feature's blocks plus its scattered `sidebar.*` and
   `breadcrumb.*` keys, in **every** locale file, so `en` and `ar` stay in step
6. **The stylesheet** and its `@import` in `app.scss`
7. **Quick links** on the `/home` gallery that pointed at a page it deleted

Then it scans what is left for imports of anything it deleted, and lists any it
finds. A clean run reports `no dangling references`.

## Most examples here have no stylesheet

Unlike the Ant Design template, the pages in this one are styled with Tailwind
utilities plus the shared `ce-*` classes, so only the component galleries and
the auth gallery own a stylesheet. For everything else the `scss` list is empty
and the styles step simply reports that nothing matched — that is expected, not
a failure.

## Shared modules

`sharedFiles` are deleted only once nothing else imports them, checked for real
on every run:

```
Redux
  !    src/features/testTrExample/api/TestTr.api.ts  kept - still imported elsewhere
```

Since the move to a feature-based `src`, each example's API slice lives inside
its own folder and is deleted with it, so this section is normally empty. The
check still matters if you wire one of them into a page of your own — it will
then be kept, and deleted later by whichever run finally orphans it. Removing
two examples in two runs ends at
exactly the same place as removing both at once.

## After it runs

```bash
cd app
npx tsc -b
npm run build
```

## Flags

| flag | |
|---|---|
| `--dry-run` | print the plan, write nothing |
| `--examples <list>` | skip the question — same syntax as the prompt |
| `--yes`, `-y` | skip the confirmation |

## Adding your own examples to the list

`EXAMPLES` near the top of the script is the whole configuration — one entry per
feature, listing its pages, sidebar entries, translation blocks and stylesheets.
Add an entry and it appears in the menu.

`pages` does double duty: it is how the script tells whether a feature is still
installed, and it is how routes are discovered. Any `lazy()` import pointing
into one of those folders is found automatically, along with the route objects
that use it — so you do not have to list route paths that follow the normal
pattern. `routePaths` is only there for the commented-out routes that name a
path but import nothing.
