import i18n from '../../core/i18n';

export const getErrorMessage = (error: any): string => {
  const errorKey = error?.data?.Message || error?.data?.message || 'An error occurred';
  
  console.log('Error Key:', errorKey);
  console.log('Current Language:', i18n.language);
  
  const translatedError = i18n.t(`errors.${errorKey}`);
  
  console.log('Translated Error:', translatedError);
  
  if (translatedError === `errors.${errorKey}` || !translatedError) {
    return errorKey;
  }
  
  return translatedError;
};
