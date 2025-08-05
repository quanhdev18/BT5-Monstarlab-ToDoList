import { useTodo } from '../Hooks/useTodo';
import TodoItem from '../components/components-function/TodoItem';
import TodoForm from '../components/components-function/TodoForm';

import styles from './TodoList.module.css';

const TodoList = () => {
  const { todos, handleAddTodo } = useTodo();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>

      <TodoForm onAdd={handleAddTodo} />

      <div className={styles.todoList}>
        {todos.length === 0 ? (
          <p className={styles.noTodosText}>Chưa có công việc nào!</p>
        ) : (
          <table className={styles.todoTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Ngày cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <TodoItem key={todo.id} todo={todo} index={index} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TodoList;
