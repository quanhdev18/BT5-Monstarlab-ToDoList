import type { Todo } from '../TS/Enum';
import { API_URL } from './ApiUrl';

export const handleEditTodo = async (todo: Todo) => {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error('Lỗi khi cập nhật công việc!');
  }

  return await response.json();
};

export const handleDeleteTodo = async (todoId: string) => {
  const response = await fetch(`${API_URL}/${todoId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Lỗi khi xóa công việc!');
  }

  return await response.json();
};

