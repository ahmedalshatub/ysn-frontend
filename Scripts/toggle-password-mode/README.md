# Toggle password mode

Switches the frontend between password fields the user fills in themselves
(the default) and hiding them because the API is generating and e-mailing
passwords instead. Mirrors the backend's own `Password:AutoGenerate` toggle
(`Scripts/toggle-password-mode/toggle-password-mode.mjs` in the API repo) -
turn both on together, or the frontend will stop asking for a password while
the API still requires one.

Not destructive - this only flips one value (`VITE_PASSWORD_AUTO_GENERATE`)
in every `app/.env*` file that has it. Every code path for both modes already
ships in the app; nothing needs deleting or regenerating to switch.

## Run it

```bash
node Scripts/toggle-password-mode/toggle-password-mode.mjs on
node Scripts/toggle-password-mode/toggle-password-mode.mjs off
```

With no arguments, it just prints the current state of every `.env*` file:

```bash
node Scripts/toggle-password-mode/toggle-password-mode.mjs
```

Vite only reads `.env` files at startup - restart `npm run dev` for a change
to take effect.

## What "on" actually changes

- The admin "add user" modal, the final step of self-registration, the final
  step of "forgot password", and the admin "reset password" dialog all hide
  their password/confirm-password fields and show an "a password will be
  e-mailed" notice instead (`src/utils/passwordPolicy.ts` is what each of
  them reads).
- After logging in, an account whose password was server-generated
  (`forcePasswordChange` in the login response) is locked to a forced "set
  your password" dialog - rendered by `layout/RequireUser.tsx` in place of
  the normal page content - until it submits its own password through the
  existing self-service change-password form. Every other page is
  unreachable while this is pending, matching the API's own
  `JwtValidationMiddleware` enforcement.

## Reverting

```bash
node Scripts/toggle-password-mode/toggle-password-mode.mjs off
```

An account still carrying a pending generated password stays locked to the
forced change-password dialog after turning this off - the flag only
controls whether new password fields are hidden, not the backend's own
`ForcePasswordChange` state on existing accounts.
