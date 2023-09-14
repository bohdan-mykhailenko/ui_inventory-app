import React from 'react';
import { Product } from '../../types/Product';
import { ProductItem } from '../ProductItem';
import styles from './ProductList.module.scss';
import cn from 'classnames';
import { selectIsOrderSelected } from '../../selectors/itemsSelector';
import { useSelector } from 'react-redux';

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const isOrderSelected = useSelector(selectIsOrderSelected);

  return (
    <ul
      className={cn(styles.productList, {
        [styles['productList--shortForm']]: isOrderSelected,
      })}
    >
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
};
