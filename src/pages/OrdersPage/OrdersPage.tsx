import React from 'react';
import styles from './OrdersPage.module.scss';
import { OrderList } from '../../components/OrderList';
import { Button } from 'react-bootstrap';
import { DetailedOrder } from '../../components/DetailedOrder';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsItemChanged,
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
import { getFilteredItems } from '../../api/api';
import { Order } from '../../types/Order';
import { useQuery } from 'react-query';
import { Loader } from '../../components/Loader';
import { useErrorHandle } from '../../hooks/useErrorHandle';
import { useSearchParams } from 'react-router-dom';
import { setIsItemChanged } from '../../reducers/itemsSlice';

export const OrdersPage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get('query') || '';
  const isOrderChanged = useSelector(selectIsItemChanged);

  const { data, error, isLoading } = useQuery(
    ['orders', queryValue, isOrderChanged],
    () => getFilteredItems<Order[]>('orders', queryValue),
    {
      onSuccess: () => dispatch(setIsItemChanged(false)),
    },
  );

  const { handleError } = useErrorHandle();

  if (error) {
    handleError(error);
  }

  const orders = data || [];

  const count = orders?.length || 0;

  const isOrderSelected = useSelector(selectIsOrderSelected);
  const isOrderDeleteModalOpen = useSelector(selectIsOrderDeleteModalOpen);
  const isOrderAddModalOpen = useSelector(selectIsOrderAddModalOpen);
  const isProductDeleteModalOpen = useSelector(selectIsProductDeleteModalOpen);
  const isProductAddModalOpen = useSelector(selectIsProductAddModalOpen);
  const productsForOrder = useSelector(selectProductsForOrder);

  const isModalOpenned =
    isOrderAddModalOpen ||
    isOrderDeleteModalOpen ||
    isProductAddModalOpen ||
    isProductDeleteModalOpen;

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

        <h1 className={styles.ordersPage__title}>
          Orders{' '}
          <span className={styles.ordersPage__count}>
            / {count > 0 ? count : 'Empty list...'}
          </span>
        </h1>
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
