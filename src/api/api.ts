import { API_URL } from '../consts/api';
import axios from 'axios';
import { ProductType } from '../types/ProductType';

export const getItemById = async <T>(items: string, id: number) => {
  const response = await axios.get<T>(`${API_URL}/${items}/${id}`);

  return response.data;
};

export const getAllItems = async <T>(items: string) => {
  const response = await axios.get<T>(`${API_URL}/${items}`);

  return response.data;
};

export const getItemsFor = async <T>(
  items: string,
  forItem: string,
  forItemId: number,
) => {
  const response = await axios.get<T>(
    `${API_URL}/${items}/${forItem}/${forItemId}`,
  );

  return response.data;
};

export const getItemsForType = async <T>(items: string, type: ProductType) => {
  const response = await axios.get<T>(`${API_URL}/${items}?type=${type}`);

  return response.data;
};

export const deleteItem = async (items: string, id: number) => {
  await axios.delete(`${API_URL}/${items}/${id}`);
};
