import { useState, useEffect } from 'react';
import type { Todo, NewTodo } from '../types/todo';

const LOCAL_STORAGE_KEY = 'my-todo-list';

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error('Lỗi LocalStrorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Không thể lưu vào LocalStorage:', error);
    }
  }, [todos]);

  const handleAddTodo = (newTodoData: NewTodo) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: newTodoData.title,
      description: newTodoData.description,
      status: 'todo',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return {
    todos,
    handleAddTodo,
  };
};
