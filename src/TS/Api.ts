import type { Todo } from '../TS/Enum';

const API_URL = 'https://68a5335b2a3deed2960cac09.mockapi.io/tasks';

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Lỗi Api!');
  }
  const data: Todo[] = await response.json();
  return data;
};
