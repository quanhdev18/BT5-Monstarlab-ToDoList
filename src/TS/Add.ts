import type { NewTodo, Todo } from '../TS/Enum';

export const handleAddTodo = (newTodoData: NewTodo): Todo => {
  return {
    id: crypto.randomUUID(),
    title: newTodoData.title,
    description: newTodoData.description,
    status: 'todo',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
