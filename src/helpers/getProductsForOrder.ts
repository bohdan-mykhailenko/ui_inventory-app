import { Product } from '../types/Product';

export const getProductsForOrder = (orderId: number, products: Product[]) => {
  const foundProducts = products.filter((product) => product.order === orderId);

  return foundProducts;
};
