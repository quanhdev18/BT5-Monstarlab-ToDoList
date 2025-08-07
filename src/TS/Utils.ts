export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleString();
};

export const getTrimedValue = (input: string | undefined): string | undefined => {
  const sanitized = input?.trim();
  return sanitized === '' ? undefined : sanitized;
};
