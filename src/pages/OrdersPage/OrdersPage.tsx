import React, { useEffect } from 'react';
import styles from './OrdersPage.module.scss';
import { OrderList } from '../../components/OrderList';
import { Button } from 'react-bootstrap';
import { DetailedOrder } from '../../components/DetailedOrder';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsOrderSelected,
  selectProductsForOrder,
} from '../../selectors/itemsSelector';
import cn from 'classnames';
import { DeleteModal } from '../../components/Modals/DeleteModal';
import {
  selectIsOrderAddModalOpen,
  selectIsOrderDeleteModalOpen,
  selectIsProductAddModalOpen,
  selectIsProductDeleteModalOpen,
} from '../../selectors/modalsSelector';
import { setIsOrderAddModalOpen } from '../../reducers/modalsSlice';
import { AddModal } from '../../components/Modals/AddModal';
import { getAllItems } from '../../api/api';
import { Order } from '../../types/Order';
import { useQuery } from 'react-query';
import { Loader } from '../../components/Loader';
import { useErrorHandle } from '../../hooks/useErrorHandle';

export const OrdersPage: React.FC = () => {
  const { data, error, isLoading } = useQuery(['orders'], () =>
    getAllItems<Order[]>('orders'),
  );

  const { handleError } = useErrorHandle();

  if (error) {
    handleError(error);
  }

  const orders = data || [];

  const count = orders?.length || 0;

  const dispatch = useDispatch();

  const isOrderSelected = useSelector(selectIsOrderSelected);
  const isOrderDeleteModalOpen = useSelector(selectIsOrderDeleteModalOpen);
  const isOrderAddModalOpen = useSelector(selectIsOrderAddModalOpen);
  const isProductDeleteModalOpen = useSelector(selectIsProductDeleteModalOpen);
  const isProductAddModalOpen = useSelector(selectIsProductAddModalOpen);
  const productsForOrder = useSelector(selectProductsForOrder);

  const isModalOpenned =
    isOrderAddModalOpen || isOrderDeleteModalOpen || isProductAddModalOpen;

  const isAddModalOppened = isOrderAddModalOpen || isProductAddModalOpen;
  const newItem = isOrderAddModalOpen ? 'order' : 'product';

  const isDeleteModalOppened =
    isOrderDeleteModalOpen || isProductDeleteModalOpen;
  const deletedItem = isOrderDeleteModalOpen ? 'orders' : 'products';

  const handleAddOrder = () => {
    dispatch(setIsOrderAddModalOpen(true));
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

      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={cn(styles.ordersPage__mainInfo, {
            [styles['ordersPage__mainInfo--row']]: isOrderSelected,
          })}
        >
          <OrderList orders={orders} />

          {isOrderSelected && !isOrderDeleteModalOpen && <DetailedOrder />}
        </div>
      )}

      {isAddModalOppened && <AddModal item={newItem} />}

      {isDeleteModalOppened && (
        <DeleteModal items={deletedItem} selectedProducts={productsForOrder} />
      )}
    </section>
  );
};
