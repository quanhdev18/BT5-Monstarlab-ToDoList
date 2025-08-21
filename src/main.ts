import { renderDisplayTodos } from './TS/Display';
import { getTrimedValue } from './TS/Utils';
import type { Todo, NewTodo } from './TS/Enum';
import { fetchTodos } from './TS/Api';
import { handleAddTodo } from './TS/Add';
import { filterAndSearchTodos } from './TS/FilterAndSearch';

const main = () => {
  const todoForm = document.getElementById('todo-form') as HTMLFormElement;
  const todoTitleInput = document.getElementById('todo-title') as HTMLInputElement;
  const todoDescriptionInput = document.getElementById('todo-description') as HTMLTextAreaElement;
  const todoListContainer = document.getElementById('todo-list-body') as HTMLTableSectionElement;
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const statusFilter = document.getElementById('filter-status') as HTMLSelectElement;
  const searchButton = document.getElementById('search-button') as HTMLButtonElement;
  const prevButton = document.getElementById('prev-page') as HTMLButtonElement;
  const nextButton = document.getElementById('next-page') as HTMLButtonElement;
  const pageText = document.getElementById('current-page-text') as HTMLSpanElement;

  // let todos: Todo[] = [];
  let allTodos: Todo[] = [];

  let currentPage = 1;
  const ITEMS_PAGE = 20;

  const updatePaginationButtons = (dataLength: number) => {
    if (prevButton) {
      prevButton.disabled = currentPage === 1;
    }
    if (nextButton) {
      nextButton.disabled = dataLength < ITEMS_PAGE;
    }
    if (pageText) {
      pageText.textContent = `Trang ${currentPage}`;
    }
  };

  const updateDisplay = () => {
    const searchTerm = searchInput.value;
    const filterStatus = statusFilter.value;
    const filteredTodos = filterAndSearchTodos(allTodos, searchTerm, filterStatus);

    const startIndex = (currentPage - 1) * ITEMS_PAGE;
    const paginatedTodos = filteredTodos.slice(startIndex, startIndex + ITEMS_PAGE);

    renderDisplayTodos(paginatedTodos, todoListContainer);
    updatePaginationButtons(paginatedTodos.length);
  };

  const initializeApp = async () => {
    try {
      allTodos = await fetchTodos(1, 100);

      updateDisplay();
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
        allTodos.push(newTodo);
        currentPage = 1;
        updateDisplay();
        todoTitleInput.value = '';
        todoDescriptionInput.value = '';
      } catch (error) {
        console.error('Lỗi khi thêm công việc mới:', error);
        alert('Không thể thêm công việc mới.');
      }
    }
  };

  if (todoForm) {
    todoForm.addEventListener('submit', handleFormSubmit);
  }
  document.addEventListener('DOMContentLoaded', initializeApp);

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      currentPage = 1;
      updateDisplay();
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        updateDisplay();
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentPage++;
      updateDisplay();
    });
  }
};

main();
