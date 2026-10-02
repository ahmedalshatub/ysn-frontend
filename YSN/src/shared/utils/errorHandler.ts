import i18n from '../../core/i18n';

const translateKey = (key: string): string => {
  const trimmed = key.trim();
  if (!trimmed) return trimmed;
  const translated = i18n.t(`errors.${trimmed}`);
  return translated === `errors.${trimmed}` || !translated ? trimmed : translated;
};

export const getErrorMessage = (error: any): string => {
  const message: string = error?.data?.Message || error?.data?.message || 'An error occurred';

  const segments = message.split(';').map((segment) => segment.trim()).filter(Boolean);

  const translated = segments.flatMap((segment) => {
    const separatorIndex = segment.indexOf(':');
    const keys = separatorIndex === -1 ? segment : segment.slice(separatorIndex + 1);
    return keys.split(',').map(translateKey).filter(Boolean);
  });

  const unique = Array.from(new Set(translated));

  return unique.length > 0 ? unique.join(' - ') : translateKey(message);
};
