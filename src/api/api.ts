import { API_URL } from '../consts/api';
import axios from 'axios';
import { ProductType } from '../types/ProductType';
import { Order } from '../types/Order';
import { Product } from '../types/Product';

export const getItemById = async <T>(items: string, id: number) => {
  try {
    const response = await axios.get<T>(`${API_URL}/${items}/${id}`);

    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch ${items} by ID: ${error.message}`);
  }
};

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

export const postProduct = async (data: Partial<Product>) => {
  try {
    const formData = new FormData();

    for (const key in data) {
      if (key in data) {
        const typedKey = key as keyof Partial<Product>;

        if (typedKey === 'guarantee' || typedKey === 'price') {
          formData.append(typedKey, JSON.stringify(data[typedKey]));
        } else if (typedKey === 'photo') {
          const photoBlob = data[typedKey] as Blob;

          formData.append('photo', photoBlob, 'product-image.jpg');
        } else {
          formData.append(typedKey, data[typedKey] as string);
        }
      }
    }

    await axios.post(`${API_URL}/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to post product: ${error.message}`);
  }
};
