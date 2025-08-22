import type { Todo } from '../TS/Enum';
import { formatDate } from './Utils';

export const renderDisplayTodos = (todos: Todo[], container: HTMLElement) => {
  if (!container) return;

  container.innerHTML = '';

  if (!todos || todos.length === 0) {
    const noTodoRow = document.createElement('tr');
    noTodoRow.innerHTML = `<td colspan="8" class="no-todos-text">Chưa có công việc nào!</td>`;
    container.appendChild(noTodoRow);
    return;
  }

  todos.forEach((todo, index) => {
    const row = document.createElement('tr');
    row.dataset.id = todo.id;

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${todo.title}</td>
      <td>${todo.description ?? ''}</td>
      <td>${todo.status}</td>
      <td>${formatDate(todo.createdAt)}</td>
      <td>${formatDate(todo.updatedAt)}</td>
      <td><button class="edit-button">Chỉnh sửa</button></td>
      <td><button class="delete-button">Xóa</button></td>
    `;
    container.appendChild(row);
  });
};
