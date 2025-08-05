import type { Todo } from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  index: number;
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString();
};

const TodoItem = ({ todo, index }: TodoItemProps) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{todo.title}</td>
      <td>{todo.description || 'N/A'}</td>
      <td>{todo.status}</td>
      <td>{formatDate(todo.createdAt)}</td>
      <td>{formatDate(todo.updatedAt)}</td>
    </tr>
  );
};

export default TodoItem;
