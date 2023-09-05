import React from 'react';
import { ProductList } from '../../ProductList';
import { useSelector } from 'react-redux';
import { selectProductsForOrder } from '../../../selectors/ordersSelector';
import styles from './DetailedOrder.module.scss';

export const DetailedOrder: React.FC = () => {
  const productsForOrder = useSelector(selectProductsForOrder);

  const isEmptyOrder = productsForOrder.length > 0;

  return (
    <section className={styles.detailedOrder}>
      {isEmptyOrder ? (
        <ProductList products={productsForOrder} />
      ) : (
        <h5 className={styles.detailedOrder__empty}>Empty order...</h5>
      )}
    </section>
  );
};
