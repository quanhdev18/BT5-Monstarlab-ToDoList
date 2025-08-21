export type TodoStatus = 'todo' | 'progress' | 'done' | string;

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt: number;
  updatedAt: number;
}

export type NewTodo = Pick<Todo, 'title' | 'description'>;
