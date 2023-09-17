import React from 'react';
import { Order } from '../../types/Order';
import { OrderItem } from '../OrderItem';
import styles from './OrderList.module.scss';

interface OrderListProps {
  orders: Order[];
}

export const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <ul className={styles.orderList} data-aos="fade-right">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </ul>
  );
};
