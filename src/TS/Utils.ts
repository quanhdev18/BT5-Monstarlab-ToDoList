export const getTrimedValue = (input: string | undefined): string | undefined => {
  const sanitized = input?.trim();
  return sanitized === '' ? undefined : sanitized;
};

export const formatDate = (timestamp: number): string => {
  if (!timestamp) return '';
  return new Date(timestamp * 1000).toLocaleString();
};
