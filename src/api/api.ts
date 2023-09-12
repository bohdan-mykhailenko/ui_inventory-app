import { API_URL } from '../consts/api';
import axios from 'axios';

export const getAllItems = async <T>(items: string) => {
  const response = await axios.get<T>(`${API_URL}/${items}`);

  return response.data;
};
