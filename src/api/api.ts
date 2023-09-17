import axios from 'axios';
import { ProductType } from '../types/ProductType';
import { Order } from '../types/Order';
import { Product } from '../types/Product';
import { API_URL } from '../consts/api';

export const getAllItems = async <T>(items: string) => {
  try {
    const response = await axios.get<T>(`${API_URL}/${items}`);

    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch all ${items}: ${error.message}`);
  }
};

export const getItemsFor = async <T>(
  items: string,
  forItem: string,
  forItemId: number,
) => {
  try {
    const response = await axios.get<T>(
      `${API_URL}/${items}/${forItem}/${forItemId}`,
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to fetch ${items} for ${forItem} with ID ${forItemId}: ${error.message}`,
    );
  }
};

export const getFilteredItems = async <T>(
  items: string,
  query?: string,
  type?: ProductType,
) => {
  try {
    const params: Record<string, string> = {};

    if (type !== undefined) {
      params.type = type;
    }

    if (query !== undefined) {
      params.query = query;
    }
    const queryString = new URLSearchParams(params).toString();

    const apiUrl = queryString
      ? `${API_URL}/${items}?${queryString}`
      : `${API_URL}/${items}`;

    const response = await axios.get<T>(apiUrl);

    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to fetch ${items} for type ${type}: ${error.message}`,
    );
  }
};

export const deleteItem = async (items: string, id: number) => {
  try {
    await axios.delete(`${API_URL}/${items}/${id}`);
  } catch (error: any) {
    throw new Error(
      `Failed to delete ${items} with ID ${id}: ${error.message}`,
    );
  }
};

export const postOrder = async <T>(data: Partial<Order>) => {
  try {
    await axios.post<T>(`${API_URL}/orders`, data);
  } catch (error: any) {
    throw new Error(`Failed to post order: ${error.message}`);
  }
};

export const postProduct = async <T>(data: Partial<Product>) => {
  try {
    const formData = new FormData();

    for (const key in data) {
      if (key in data) {
        const typedKey = key as keyof Partial<Product>;

        if (typedKey === 'guarantee' || typedKey === 'price') {
          const jsonData = JSON.stringify(data[typedKey]);

          formData.append(typedKey, jsonData);
        } else if (typedKey === 'photo') {
          const photoBlob = data[typedKey] as Blob;

          formData.append('photo', photoBlob, 'product-image.jpg');
        } else {
          formData.append(typedKey, data[typedKey] as string);
        }
      }
    }

    await axios.post<T>(`${API_URL}/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to post product: ${error.message}`);
  }
};
