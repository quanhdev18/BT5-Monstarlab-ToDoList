export type TodoStatus = 'todo' | 'in_progress' | 'done';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewTodo {
  title: string;
  description?: string;
}

// export interface CreatTodo {

// }
