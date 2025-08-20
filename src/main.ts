import { renderDisplayTodos } from './TS/Display';
import { getTrimedValue } from './TS/Utils';
import type { Todo, NewTodo } from './TS/Enum';
import { fetchTodos } from './TS/Api';
import { handleAddTodo } from './TS/Add';

const main = () => {
  const todoForm = document.getElementById('todo-form') as HTMLFormElement;
  const todoTitleInput = document.getElementById('todo-title') as HTMLInputElement;
  const todoDescriptionInput = document.getElementById('todo-description') as HTMLTextAreaElement;
  const todoListContainer = document.getElementById('todo-list-body') as HTMLTableSectionElement;

  let todos: Todo[] = [];

  const initializeApp = async () => {
    try {
      todos = await fetchTodos();
      renderDisplayTodos(todos, todoListContainer);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu từ API:', error);
      alert('Không thể tải dữ liệu.');
    }
  };

  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();

    const title = getTrimedValue(todoTitleInput?.value);
    const description = getTrimedValue(todoDescriptionInput?.value);

    if (title) {
      const newTodoData: NewTodo = {
        title,
        description,
      };
      try {
        const newTodo = await handleAddTodo(newTodoData);
        todos.push(newTodo);
        renderDisplayTodos(todos, todoListContainer);

        todoTitleInput.value = '';
        todoDescriptionInput.value = '';
      } catch (error) {
        console.error('Lỗi khi thêm công việc mới:', error);
        alert('Không thể thêm công việc mới.');
      }
    }
  };

  todoForm?.addEventListener('submit', handleFormSubmit);
  document.addEventListener('DOMContentLoaded', initializeApp);
};

main();
