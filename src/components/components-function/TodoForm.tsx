import type { NewTodo } from '../../types/todo';
import styles from '../TodoList.module.css';
import { useState } from 'react';

interface TodoFormProps {
  onAdd: (newTodo: NewTodo) => void;
}

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tiêu đề công việc"
        className={styles.input}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Mô tả công việc "
        className={styles.input}
      />
      <button type="submit" className={styles.addButton}>
        Thêm mới
      </button>
    </form>
  );
};

export default TodoForm;
