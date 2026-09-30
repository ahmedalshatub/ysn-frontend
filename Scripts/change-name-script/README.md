# Change name script

Rebrands the frontend for a new project: sets the application name and swaps in
your logos and favicons.

## 1. Put your images here

Drop the replacement files into the `assets/` folder next to this script, using
**exactly these file names**:

| File | Goes to | Used for |
|---|---|---|
| `logo-light-landscape.png` | `app/src/assets/images/` | wide logo, light theme |
| `logo-dark-landscape.png` | `app/src/assets/images/` | wide logo, dark theme |
| `logo-light-portrait.png` | `app/src/assets/images/` | tall logo, light theme |
| `logo-dark-portrait.png` | `app/src/assets/images/` | tall logo, dark theme |
| `favicon.ico` | `app/public/` | browser tab |
| `favicon-16x16.png` | `app/public/` | browser tab |
| `favicon-32x32.png` | `app/public/` | browser tab |
| `apple-touch-icon.png` | `app/public/` | iOS home screen (180x180) |
| `logo192.png` | `app/public/` | web manifest (192x192) |
| `logo512.png` | `app/public/` | web manifest (512x512) |
| `logo.png` | `app/public/` | general purpose |

Anything you leave out is skipped and the existing file is kept, so you can
replace only the logos and deal with favicons later.

All four logo variants are needed for the app to look right: `Logo.tsx` picks one
by theme (light/dark) and orientation (landscape/portrait).

The favicons live in `public/` rather than `src/`, because `index.html`
references them from the web root — they never go through the bundler.

## 2. Run it

From the repository root:

```bash
node Scripts/change-name-script/rename.mjs
```

or, from `app/`:

```bash
npm run rename
```

It asks for the **application name**, then for the name in each language the app
ships — press Enter to reuse the same name.

Non-interactive, for CI or a setup script:

```bash
node Scripts/change-name-script/rename.mjs --name "Acme Portal" --yes
node Scripts/change-name-script/rename.mjs --name "Acme Portal" --name-ar "بوابة أكمي" --yes
```

With `--yes` and no `--name-<code>`, every language gets the same name.

## 3. Restart the dev server

Vite reads `.env` files and `public/` **only at startup**, so the new name and
favicons will not appear until you restart.

## What it changes

| File | Change |
|---|---|
| `app/src/core/i18n/locales/*.ts` | `common.appName`, per language |
| `app/.env`, `.env.development`, `.env.production` | `VITE_APP_NAME` |
| `app/index.html` | `<title>` |
| `app/package.json` | `"name"` (slugified: `Acme Portal` → `acme-portal`) |
| `app/public/manifest.json` | `name`, `short_name`, `description` |

### The name is a translation, not an environment variable

`common.appName` is what users actually see — it is read in 60+ places (footers,
navbars, every auth screen) through `t("common.appName")`. Because it is a
translation it can differ per language, which is why the script asks per
language rather than writing one Latin name into the Arabic locale.

`VITE_APP_NAME` is kept in step, but nothing in the template currently reads it.

The `<title>` and the manifest use the name for `DEFAULT_LANGUAGE` from
`src/core/i18n/languages.ts`, since those are set once and cannot follow the user's
language.

### No copyright holder

Unlike the Ant Design template, this one has no separate copyright name: the
footer renders `© {year} {t("common.appName")}`. The script does not invent a
`VITE_COPYRIGHT_NAME` that nothing would read. If you want one, add a
`common.copyright` key to the locales and use it in `layout/Footer.tsx`.

## Notes

- **Re-runnable.** Every edit is anchored on the config *key*, never on the old
  value, so you can rename as many times as you like without corrupting a file
  or duplicating an `.env` line.
- **Nothing is deleted.** Images are overwritten in place; commit first if you
  want to be able to go back.
- `short_name` for the manifest is derived from the first word of the
  application name, capped at 12 characters. Edit the manifest by hand if you
  want something different.
- This script covers the **frontend only**. The backend has its own naming
  (namespaces, `API.sln`, JWT issuer/audience, `API_*` environment variables).
