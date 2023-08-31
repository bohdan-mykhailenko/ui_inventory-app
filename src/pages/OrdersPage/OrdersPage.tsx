import React from 'react';
import styles from './OrdersPage.module.scss';
import { orders } from '../../data/data';
import { OrderList } from '../../components/OrderList';
import { Button } from '@mui/material';

export const OrdersPage: React.FC = () => {
  const ordersFromServer = orders;
  const count = ordersFromServer.length;

  return (
    <section className={styles.ordersPage}>
      <div className={styles.ordersPage__topInfo}>
        <Button className={styles.ordersPage__addButton}>+</Button>

        <h1 className={styles.ordersPage__title}>Orders</h1>
        <span className={styles.ordersPage__count}>
          / {count > 0 ? count : ''}
        </span>
      </div>

      <OrderList orders={ordersFromServer} />
    </section>
  );
};
