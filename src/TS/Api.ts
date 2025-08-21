import type { Todo } from '../TS/Enum';
import { API_URL } from './ApiUrl';

export const fetchTodos = async (
  page: number,
  limit: number,
  searchTerm: string,
  filterStatus: string
) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  if (searchTerm) {
    params.append('search', searchTerm);
  }

  if (filterStatus && filterStatus !== 'all') {
    params.append('status', filterStatus);
  }

  const url = `${API_URL}?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.error('Lỗi khi lấy danh sách.', response.statusText);
    return [];
  }

  const data: Todo[] = await response.json();
  return data;
};
