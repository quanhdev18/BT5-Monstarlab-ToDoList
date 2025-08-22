import { renderDisplayTodos } from './TS/Display';
import { getTrimedValue } from './TS/Utils';
import type { Todo, NewTodo } from './TS/Enum';
import { fetchTodos } from './TS/Api';
import { handleAddTodo } from './TS/Add';
import { handleEditTodo, handleDeleteTodo } from './TS/EditAndDelete';

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

  let todos: Todo[] = [];
  let editingTodo: Todo | null = null;

  let currentPage = 1;
  const ITEMS_PER_PAGE = 20;

  const updatePaginationButtons = (dataLength: number) => {
    if (prevButton && nextButton && pageText) {
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = dataLength < ITEMS_PER_PAGE;
      pageText.textContent = `Trang ${currentPage}`;
    }
  };

  const updateDisplay = async () => {
    try {
      const searchTerm = searchInput.value;
      const filterStatus = statusFilter.value;

      todos = await fetchTodos(currentPage, ITEMS_PER_PAGE, searchTerm, filterStatus);

      renderDisplayTodos(todos, todoListContainer);
      updatePaginationButtons(todos.length);
    } catch (error) {
      console.error('Lỗi khi cập nhật hiển thị:', error);
      alert('Không thể cập nhật danh sách.');
    }
  };

  const initializeApp = async () => {
    try {
      await updateDisplay();
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu từ API:', error);
      alert('Không thể tải dữ liệu.');
    }
  };

  const cleanForm = () => {
    todoTitleInput.value = '';
    todoDescriptionInput.value = '';
    if (todoForm.querySelector('button')) {
      (todoForm.querySelector('button') as HTMLButtonElement).textContent = 'Thêm mới';
    }
    editingTodo = null;
  };

  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();
    const title = getTrimedValue(todoTitleInput?.value);
    const description = getTrimedValue(todoDescriptionInput?.value);
    if (title) {
      try {
        if (editingTodo) {
          const updatedTodo = {
            ...editingTodo,
            title: title,
            description: description,
            updatedAt: new Date().getTime(),
          };
          await handleEditTodo(updatedTodo);
        } else {
          const newTodoData: NewTodo = {
            title,
            description,
          };
          await handleAddTodo(newTodoData);
        }

        currentPage = 1;
        await updateDisplay();
        cleanForm();
      } catch (error) {
        console.error('Lỗi khi thêm công việc mới:', error);
        alert('Không thể thêm công việc mới.');
      }
    }
  };

  const handleTodoListClick = async (event: Event) => {
    const target = event.target as HTMLElement;
    const row = target.closest('tr');
    if (!row) return;

    const todoId = row.dataset.id;
    if (!todoId) return;

    if (target.classList.contains('delete-button')) {
      if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
        try {
          await handleDeleteTodo(todoId);
          await updateDisplay();
        } catch (error) {
          console.error('Lỗi khi xóa công việc:', error);
          alert('Không thể xóa công việc.');
        }
      }
    } else if (target.classList.contains('edit-button')) {
      const todoToEdit = todos.find((t) => t.id === todoId);
      if (todoToEdit) {
        editingTodo = todoToEdit;
        todoTitleInput.value = editingTodo.title;
        todoDescriptionInput.value = editingTodo.description || '';
        (todoForm.querySelector('button') as HTMLButtonElement).textContent = 'Cập nhật';
      }
    }
  };

  if (todoForm) {
    todoForm.addEventListener('submit', handleFormSubmit);
  }
  document.addEventListener('DOMContentLoaded', initializeApp);

  if (todoListContainer) {
    todoListContainer.addEventListener('click', handleTodoListClick);
  }

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
