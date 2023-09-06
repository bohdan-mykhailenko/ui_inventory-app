import React from 'react';
import { ProductList } from '../../ProductList';
import { useSelector } from 'react-redux';
import {
  selectOrder,
  selectProductsForOrder,
} from '../../../selectors/ordersSelector';
import styles from './DetailedOrder.module.scss';
import { Button } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';

export const DetailedOrder: React.FC = () => {
  const productsForOrder = useSelector(selectProductsForOrder);
  const selectedOrder = useSelector(selectOrder);

  const isEmptyOrder = productsForOrder.length > 0;

  const { title = '' } = selectedOrder || {};

  return (
    <section className={styles.detailedOrder}>
      <h2 className={styles.detailedOrder__title}>{title}</h2>
      <div className={styles.detailedOrder__addProduct}>
        <Button className={styles['detailedOrder__addProduct-button']}>
          +
        </Button>
        <span className={styles['detailedOrder__addProduct-label']}>
          Add product
        </span>
      </div>

      {isEmptyOrder ? (
        <ProductList products={productsForOrder} />
      ) : (
        <h5 className={styles.detailedOrder__empty}>Empty order...</h5>
      )}

      <Button className={styles.detailedOrder__closeButton}>
        <CloseIcon />
      </Button>
    </section>
  );
};
