import React from 'react';
import { Order } from '../../types/Order';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from './OrderItem.module.scss';
import { Product } from '../../types/Product';
import { products } from '../../data/data';
import { Button } from '@mui/material';

interface OrderItemProps {
  order: Order;
}

const getProductsForOrderId = (orderId: number, products: Product[]) => {
  const foundProducts = products.filter((product) => product.order === orderId);

  return foundProducts;
};

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const { id, title, date } = order;
  const productsForOrder = getProductsForOrderId(id, products);
  const productsCount = productsForOrder.length;

  return (
    <article className={styles.orderItem}>
      <h2 className={styles.orderItem__title}>{title}</h2>

      <Button className={styles.orderItem__openDetailsButton}>
        <FormatListBulletedIcon className={styles.orderItem__listIcon} />
      </Button>

      <div className={styles.orderItem__productsInfo}>
        <span className={styles.orderItem__productsCount}>{productsCount}</span>
        <span className={styles.orderItem__productsTitle}>Products</span>
      </div>

      <span className={styles.orderItem__date}>{date}</span>

      <Button className={styles.orderItem__deleteButton}>
        <DeleteForeverIcon className={styles.orderItem__deleteIcon} />
      </Button>
    </article>
  );
};
