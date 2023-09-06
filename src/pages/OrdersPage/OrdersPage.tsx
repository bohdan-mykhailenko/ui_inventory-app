import React from 'react';
import styles from './OrdersPage.module.scss';
import { orders } from '../../data/data';
import { OrderList } from '../../components/OrderList';
import { Button } from 'react-bootstrap';
import { DetailedOrder } from '../../components/Modals/DetailedOrder';
import { useSelector } from 'react-redux';
import { selectIsOrderSelected } from '../../selectors/ordersSelector';
import cn from 'classnames';
import { DeleteModal } from '../../components/Modals/DeleteModal';
import { selectIsOrderDeleteModalOpen } from '../../selectors/modalsSelector';

export const OrdersPage: React.FC = () => {
  const isOrderSelected = useSelector(selectIsOrderSelected);
  const isOrderDeleteModalOpen = useSelector(selectIsOrderDeleteModalOpen);
  const ordersFromServer = orders;
  const count = ordersFromServer.length;

  return (
    <section className={styles.ordersPage}>
      {isOrderDeleteModalOpen && <div className={styles.ordersPage__overlay} />}

      <div className={styles.ordersPage__topInfo}>
        <Button className={styles.ordersPage__addButton}>+</Button>

        <h1 className={styles.ordersPage__title}>Orders</h1>
        <span className={styles.ordersPage__count}>
          / {count > 0 ? count : ''}
        </span>
      </div>

      <div
        className={cn(styles.ordersPage__mainInfo, {
          [styles['ordersPage__mainInfo--row']]: isOrderSelected,
        })}
      >
        <OrderList orders={ordersFromServer} />

        {isOrderSelected && !isOrderDeleteModalOpen && <DetailedOrder />}
      </div>

      {isOrderDeleteModalOpen && <DeleteModal item="order" />}
    </section>
  );
};
