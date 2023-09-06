import React from 'react';
import { ProductList } from '../ProductList';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrder,
  selectProductsForOrder,
} from '../../selectors/ordersSelector';
import styles from './DetailedOrder.module.scss';
import { Button } from 'react-bootstrap';
import { setIsOrderSelected } from '../../reducers/ordersSlice';
import { CloseButton } from '../CloseButton';

import { setIsProductAddModalOpen } from '../../reducers/modalsSlice';

export const DetailedOrder: React.FC = () => {
  const dispatch = useDispatch();

  const productsForOrder = useSelector(selectProductsForOrder);
  const selectedOrder = useSelector(selectOrder);

  const isEmptyOrder = productsForOrder.length > 0;

  const { title = '' } = selectedOrder || {};

  const closeDetailedOrder = () => {
    dispatch(setIsOrderSelected(false));
  };

  const handleAddProduct = () => {
    dispatch(setIsProductAddModalOpen(true));
  };

  return (
    <section className={styles.detailedOrder}>
      <h2 className={styles.detailedOrder__title}>{title}</h2>
      <div className={styles.detailedOrder__addProduct}>
        <Button
          onClick={handleAddProduct}
          className={styles['detailedOrder__addProduct-button']}
        >
          +
        </Button>
        <span className={styles['detailedOrder__addProduct-label']}>
          Add product
        </span>
      </div>

      {isEmptyOrder ? (
        <ProductList products={productsForOrder} />
      ) : (
        <h5 className={styles.detailedOrder__emptyList}>Empty order...</h5>
      )}

      <CloseButton onClose={closeDetailedOrder} />
    </section>
  );
};
