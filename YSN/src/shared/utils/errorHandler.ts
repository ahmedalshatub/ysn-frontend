import i18n from '../../core/i18n';

const translateKey = (key: string): string => {
  const trimmed = key.trim();
  if (!trimmed) return trimmed;
  const [name, ...details] = trimmed.split('|');
  const detail = details.join('|').trim();
  const translated = i18n.t(`errors.${name}`, { detail });
  if (translated === `errors.${name}` || !translated) return trimmed;
  return detail && !translated.includes(detail) ? `${translated}: ${detail}` : translated;
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
