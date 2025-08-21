import type { NewTodo, Todo } from '../TS/Enum';

const API_URL = 'https://68a5335b2a3deed2960cac09.mockapi.io/tasks';

export const handleAddTodo = async (newTodoData: NewTodo): Promise<Todo> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...newTodoData,
      status: 'todo',
    }),
  });

  if (!response.ok) {
    throw new Error('Lỗi khi thêm công việc mới!');
  }

  const newTodo: Todo = await response.json();
  return newTodo;
};
