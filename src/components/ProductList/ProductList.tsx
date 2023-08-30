import React from 'react';
import { Product } from '../../types/Product';
import { products } from '../../data/data';
import { ProductItem } from '../ProductItem';

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = () => {
  return (
    <ul>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
};
