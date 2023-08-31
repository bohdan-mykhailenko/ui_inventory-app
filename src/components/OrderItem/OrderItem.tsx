import React from 'react';
import { Order } from '../../types/Order';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from './OrderItem.module.scss';
import { Product } from '../../types/Product';
import { products } from '../../data/data';

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

      <button className={styles.orderItem__openDetailsButton}>
        <FormatListBulletedIcon className={styles.orderItem__listIcon} />
      </button>

      <div className={styles.orderItem__productsInfo}>
        <span className={styles.orderItem__productsCount}>{productsCount}</span>
        <span className={styles.orderItem__productsTitle}>Products</span>
      </div>

      <span className={styles.orderItem__date}>{date}</span>

      <button className={styles.orderItem__deleteButton}>
        <DeleteForeverIcon className={styles.orderItem__deleteIcon} />
      </button>
    </article>
  );
};
