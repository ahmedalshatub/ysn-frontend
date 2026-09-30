export const isPasswordAutoGenerateEnabled = (): boolean =>
  import.meta.env.VITE_PASSWORD_AUTO_GENERATE === 'true';
