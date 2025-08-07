import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from './TS/Storage';
import { renderDisplayTodos } from './TS/Display';
import { handleAddTodo } from './TS/Add';
import type { Todo, NewTodo } from './TS/Enum';
import { getTrimedValue } from './TS/Utils';

const main = () => {
  const todoForm = document.getElementById('todo-form') as HTMLFormElement;
  const todoTitleInput = document.getElementById('todo-title') as HTMLInputElement;
  const todoDescriptionInput = document.getElementById('todo-description') as HTMLTextAreaElement;
  const todoListContainer = document.getElementById('todo-list-body') as HTMLTableSectionElement;

  let todos: Todo[] = [];

  const initializeApp = () => {
    todos = loadTodosFromLocalStorage();
    renderDisplayTodos(todos, todoListContainer);
  };

  const updateApp = () => {
    saveTodosToLocalStorage(todos);
    renderDisplayTodos(todos, todoListContainer);
  };

  const handleFormSubmit = (event: Event) => {
    event.preventDefault();

    const title = getTrimedValue(todoTitleInput?.value);
    const description = getTrimedValue(todoDescriptionInput?.value);

    if (title) {
      const newTodoData: NewTodo = {
        title,
        description,
      };
      const newTodo = handleAddTodo(newTodoData);
      todos.push(newTodo);
      updateApp();

      todoTitleInput.value = '';
      todoDescriptionInput.value = '';
    }
  };

  todoForm?.addEventListener('submit', handleFormSubmit);
  document.addEventListener('DOMContentLoaded', initializeApp);
};

main();
