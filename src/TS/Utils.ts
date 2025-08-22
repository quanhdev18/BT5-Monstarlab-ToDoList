// export const formatDate = (timestamp: number): string => {
//   if (!timestamp) return '';
//   return new Date(timestamp * 1000).toLocaleString();
// };

export const getTrimedValue = (input?: string): string | undefined => {
  const sanitized = input?.trim();
  return sanitized || undefined;
};


// src/TS/Utils.ts

export const formatDate = (timestamp: number): string => {
    // Nếu timestamp là 0 hoặc không phải số, trả về chuỗi rỗng
    if (!timestamp) return '';

    // new Date() nhận timestamp theo milliseconds, nên không cần nhân thêm 1000
    // Nếu API của bạn trả về seconds, hãy đổi lại là new Date(timestamp * 1000)
    const date = new Date(timestamp);
    return date.toLocaleString();
};
