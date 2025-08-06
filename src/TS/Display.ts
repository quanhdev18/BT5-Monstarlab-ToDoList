import type { Todo } from '../TS/Enum';

export const renderDisplayTodos = (todos: Todo[], container: HTMLElement) => {
  if (!container) return;

  container.innerHTML = '';

  if (todos.length === 0) {
    const noTodoRow = document.createElement('tr');
    noTodoRow.innerHTML = `<td class="no-todos-text">Chưa có công việc nào!</td>`;
    container.appendChild(noTodoRow);
    return;
  }

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString();
  };

  todos.forEach((todo, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td>${todo.status}</td>
      <td>${formatDate(todo.createdAt)}</td>
      <td>${formatDate(todo.updatedAt)}</td>
    `;
    container.appendChild(row);
  });
};
