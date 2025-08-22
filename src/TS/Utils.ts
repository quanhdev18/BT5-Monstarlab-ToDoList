export const getTrimedValue = (input?: string): string | undefined => {
  const sanitized = input?.trim();
  return sanitized || undefined;
};

export const formatDate = (timestamp: number): string => {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    return date.toLocaleString();
};
