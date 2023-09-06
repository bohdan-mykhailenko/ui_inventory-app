import React from 'react';
import styles from './OrdersPage.module.scss';
import { orders } from '../../data/data';
import { OrderList } from '../../components/OrderList';
import { Button } from 'react-bootstrap';
import { DetailedOrder } from '../../components/Modals/DetailedOrder';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsOrderSelected,
  selectProductsForOrder,
} from '../../selectors/ordersSelector';
import cn from 'classnames';
import { DeleteModal } from '../../components/Modals/DeleteModal';
import {
  selectIsOrderAddModalOpen,
  selectIsOrderDeleteModalOpen,
} from '../../selectors/modalsSelector';
import {
  clearDeleteModalTimer,
  setDeleteModalTimer,
} from '../../reducers/timerSlice';
import { setIsOrderAddModalOpen } from '../../reducers/modalsSlice';
import { AddModal } from '../../components/Modals/AddModal';

export const OrdersPage: React.FC = () => {
  const dispatch = useDispatch();

  const isOrderSelected = useSelector(selectIsOrderSelected);
  const isOrderDeleteModalOpen = useSelector(selectIsOrderDeleteModalOpen);
  const isOrderAddModalOpen = useSelector(selectIsOrderAddModalOpen);
  const productsForOrder = useSelector(selectProductsForOrder);

  const ordersFromServer = orders;
  const count = ordersFromServer.length;

  const isModalOpenned = isOrderAddModalOpen || isOrderDeleteModalOpen;

  const handleAddOrder = () => {
    dispatch(clearDeleteModalTimer());

    dispatch(setIsOrderAddModalOpen(true));

    const timerId = setTimeout(() => {
      dispatch(setIsOrderAddModalOpen(false));
    }, 50000000);

    dispatch(setDeleteModalTimer(timerId));
  };

  return (
    <section className={styles.ordersPage}>
      {isModalOpenned && <div className={styles.ordersPage__overlay} />}

      <div className={styles.ordersPage__topInfo}>
        <Button
          onClick={handleAddOrder}
          className={styles.ordersPage__addButton}
        >
          +
        </Button>

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

      {isOrderAddModalOpen && <AddModal item="order" />}

      {isOrderDeleteModalOpen && (
        <DeleteModal item="order" selectedProducts={productsForOrder} />
      )}
    </section>
  );
};
