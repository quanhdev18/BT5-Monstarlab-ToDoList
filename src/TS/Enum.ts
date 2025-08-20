export type TodoStatus = 'todo' | 'in_progress' | 'done' | string;

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt: number;
  updatedAt: number;
}

export type NewTodo = Pick<Todo, 'title' | 'description'>;
