import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Order } from '../../types/Order';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getFormatDateAndTime } from '../../helpers/getFormatDateAndTime';
import { PriceInfo } from '../PriceInfo';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsOrderSelected,
  setSelectedOrder,
  setProductsForOrder,
  setIsItemChanged,
} from '../../reducers/itemsSlice';
import {
  selectIsItemChanged,
  selectIsOrderSelected,
  selectOrder,
} from '../../selectors/itemsSelector';
import { setIsOrderDeleteModalOpen } from '../../reducers/modalsSlice';
import { getItemsFor } from '../../api/api';
import { Product } from '../../types/Product';
import { useErrorHandle } from '../../hooks/useErrorHandle';
import styles from './OrderItem.module.scss';
import { Button } from 'react-bootstrap';

interface OrderItemProps {
  order: Order;
}

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const dispatch = useDispatch();
  const { handleError } = useErrorHandle();
  const queryClient = useQueryClient();
  const isOrderChanged = useSelector(selectIsItemChanged);
  const isOrderSelected = useSelector(selectIsOrderSelected);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const selectedOrder = useSelector(selectOrder);

  const {
    id,
    title,
    date,
    sumOfPrice = [{ value: 0 }, { value: 0 }],
    productCount,
  } = order;

  const { error } = useQuery(
    ['orderProducts', id, isOrderChanged],
    () => {
      if (isFetchingData) {
        return getItemsFor<Product[]>('products', 'order', id);
      }
    },
    {
      enabled: isFetchingData,
      onSuccess: (data = []) => {
        dispatch(setProductsForOrder(data));
        dispatch(setIsItemChanged(false));
      },
    },
  );

  const { formattedDate: creationDate } = getFormatDateAndTime(date);
  const prices = {
    priceUSD: sumOfPrice[0].value,
    priceUAH: sumOfPrice[1].value,
  };

  const isSelectedOrder = id === selectedOrder?.id;

  if (error) {
    handleError(error);
  }

  const selectNewOrder = () => {
    dispatch(setSelectedOrder(order));
    setIsFetchingData(true);
    queryClient.invalidateQueries(['orderProducts', id]);
  };

  const handleSelectOrder = () => {
    selectNewOrder();
    dispatch(setIsOrderSelected(true));
  };

  const handleDeleteOrder = () => {
    selectNewOrder();
    dispatch(setIsOrderDeleteModalOpen(true));
  };

  return (
    <article
      className={cn(styles.orderItem, {
        [styles['orderItem--shortForm']]: isOrderSelected,
        [styles['orderItem--selected']]: isSelectedOrder,
      })}
    >
      {!isOrderSelected && <h2 className={styles.orderItem__title}>{title}</h2>}

      <Button
        onClick={handleSelectOrder}
        className={styles.orderItem__openDetailsButton}
      >
        <FormatListBulletedIcon className={styles.orderItem__listIcon} />
      </Button>

      <div
        className={cn(styles.orderItem__productsInfo, {
          [styles['orderItem__productsInfo--shortForm']]: isOrderSelected,
        })}
      >
        <span className={styles['orderItem__productsInfo-count']}>
          {productCount}
        </span>
        <span className={styles['orderItem__productsInfo-title']}>
          Products
        </span>
      </div>

      <span className={styles.orderItem__date}>{creationDate}</span>

      {!isOrderSelected && (
        <div className={styles.orderItem__price}>
          <PriceInfo prices={prices} />
        </div>
      )}

      {!isOrderSelected && (
        <Button
          onClick={handleDeleteOrder}
          className={styles.orderItem__deleteButton}
        >
          <DeleteForeverIcon className={styles.orderItem__deleteIcon} />
        </Button>
      )}
    </article>
  );
};
