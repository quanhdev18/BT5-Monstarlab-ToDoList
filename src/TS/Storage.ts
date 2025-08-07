import type { Todo } from '../TS/Enum';

const LOCAL_STORAGE_KEY = 'my-todo-list';

export const saveTodosToLocalStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Không thể lưu vào LocalStorage:', error);
  }
};

export const loadTodosFromLocalStorage = (): Todo[] => {
  try {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error('Lỗi LocalStorage:', error);
    return [];
  }
};
