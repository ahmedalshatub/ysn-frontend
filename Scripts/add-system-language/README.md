# Add system language

Adds a new language to the app, copying every translation value from a language
you choose so the new locale starts **complete**.

## Run it

From the repository root:

```bash
node Scripts/add-system-language/add-language.mjs
```

or, from `app/`:

```bash
npm run add-language
```

It asks for five things:

| Prompt | Example | Notes |
|---|---|---|
| Language code | `ku` | ISO code. Becomes the filename `locales/ku.ts` |
| English name | `Kurdish` | for developer-facing lists |
| Native name | `کوردی` | what users see |
| Text direction | `rtl` | suggested automatically for known RTL codes |
| Copy values from | `ar` | which existing language to seed from |

Non-interactive:

```bash
node Scripts/add-system-language/add-language.mjs \
  --code ku --name Kurdish --native "کوردی" --dir rtl --from ar --yes
```

## Why it copies instead of leaving values blank

`fallbackLng` is the default language, so a **missing key renders as the raw key**
(`auditLogs.pageTitle` instead of a title). Copying from an existing language
means every key exists from the start: the app stays usable while you translate,
and you can never ship a half-empty locale by accident.

Choose the source you can translate from most easily — usually `en`.

## What it changes

| File | Change |
|---|---|
| `app/src/core/i18n/locales/<code>.ts` | **created**, a full copy of the source language |
| `app/src/core/i18n/languages.ts` | one entry appended to `LANGUAGES` |

That is all. `app/src/core/i18n/index.ts` is **never** edited: it discovers locale
files with `import.meta.glob`, so the new file is picked up automatically. The
glob is resolved by Vite at build time, so locales are still statically bundled.

## After running it

1. **Translate the values** in `app/src/core/i18n/locales/<code>.ts`. Every value is
   still in the source language — change the values, never the keys.
2. **Restart the dev server.**
3. Switch with the globe button in the navbar or on the auth screens.
4. For an RTL language, **check the layout** — direction flips app-wide.

## How the language system works

`app/src/core/i18n/languages.ts` is the single source of truth:

```ts
{ code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", label: "AR" }
```

Everything reads from it:

- `i18n/index.ts` — resources, default language, `supportedLngs`, and the
  `<html lang>` / `dir` attributes
- `components/navigation/LanguageSwitcher.tsx` — the switcher in every navbar
  and on every auth screen

**Never compare a language code directly.** Use `getDirection(code)`,
`isRtl(code)` or `getLanguage(code)` from `languages.ts` so a new language works
without touching component code. Tailwind's logical utilities (`ms-*`, `pe-*`,
`start-*`, `end-*`) and the `rtl:` variant already follow `<html dir>`, so most
layout needs no change either.

## The switcher

`components/navigation/LanguageSwitcher.tsx` is a dropdown listing every
language by its **native name**, with the current one marked. It is driven
entirely by `LANGUAGES`, so a new language appears with no component change. The
button shows the language you are currently on.

It takes `buttonClass` so each host can keep its own styling — that is how the
navbars and the auth screens share one component while looking different.

A toggle was deliberately not used: a toggle only works for exactly two
languages, and shows the *next* language rather than the current one.

## Not covered

Entity translations are a separate thing. `TestTr` and `TestSubTr` store their
own per-language rows and the API's validators currently require **exactly two**
(`en` and `ar`). Adding a UI language does not change that; extending it means
changing those validators, the translation tables, and the add/edit forms.
