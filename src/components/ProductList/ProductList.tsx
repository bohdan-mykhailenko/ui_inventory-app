import React from 'react';
import { Product } from '../../types/Product';
import { ProductItem } from '../ProductItem';
import cn from 'classnames';
import { selectIsOrderSelected } from '../../selectors/itemsSelector';
import { useSelector } from 'react-redux';
import styles from './ProductList.module.scss';

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
