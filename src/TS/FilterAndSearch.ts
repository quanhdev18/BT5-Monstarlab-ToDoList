import type { Todo } from './Enum';

export const filterAndSearchTodos = (
  todos: Todo[],
  searchTerm: string,
  filterStatus: string
): Todo[] => {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  return todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(normalizedSearchTerm);
    const matchesStatus = filterStatus === 'all' || todo.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
};
