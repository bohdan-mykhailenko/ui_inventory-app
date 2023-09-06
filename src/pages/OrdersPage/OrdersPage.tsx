import React from 'react';
import styles from './OrdersPage.module.scss';
import { orders } from '../../data/data';
import { OrderList } from '../../components/OrderList';
import { Button } from 'react-bootstrap';
import { DetailedOrder } from '../../components/DetailedOrder';
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
  selectIsProductAddModalOpen,
  selectIsProductDeleteModalOpen,
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
  const isProductDeleteModalOpen = useSelector(selectIsProductDeleteModalOpen);
  const isProductAddModalOpen = useSelector(selectIsProductAddModalOpen);
  const productsForOrder = useSelector(selectProductsForOrder);

  const ordersFromServer = orders;
  const count = ordersFromServer.length;

  const isModalOpenned =
    isOrderAddModalOpen || isOrderDeleteModalOpen || isProductAddModalOpen;
  const isAddModalOppened = isOrderAddModalOpen || isProductAddModalOpen;
  const newItem = isOrderAddModalOpen ? 'order' : 'product';

  const isDeleteModalOppened =
    isOrderDeleteModalOpen || isProductDeleteModalOpen;
  const deletedItem = isOrderDeleteModalOpen ? 'order' : 'product';

  const handleAddOrder = () => {
    dispatch(clearDeleteModalTimer());

    dispatch(setIsOrderAddModalOpen(true));

    const timerId = setTimeout(() => {
      dispatch(setIsOrderAddModalOpen(false));
    }, 50000);

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

      {isAddModalOppened && <AddModal item={newItem} />}

      {isDeleteModalOppened && (
        <DeleteModal item={deletedItem} selectedProducts={productsForOrder} />
      )}
    </section>
  );
};
