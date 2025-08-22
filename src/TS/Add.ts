import type { NewTodo } from '../TS/Enum';
import { API_URL } from './ApiUrl';

export const handleAddTodo = async (newTodoData: NewTodo) => {
  const now = new Date().getTime();
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...newTodoData,
      status: 'todo',
      createdAt: now,
      updatedAt: now,
    }),
  });

  if (!response.ok) {
    throw new Error('Lỗi khi thêm công việc mới!');
  }
};

