import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Order } from '../../types/Order';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from './OrderItem.module.scss';
import { Button } from 'react-bootstrap';
import { getFormatDateAndTime } from '../../helpers/getFormatDateAndTime';
import { PriceInfo } from '../PriceInfo';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsOrderSelected,
  setSelectedOrder,
  setProductsForOrder,
} from '../../reducers/itemsSlice';
import { selectIsOrderSelected } from '../../selectors/itemsSelector';
import { setIsOrderDeleteModalOpen } from '../../reducers/modalsSlice';
import { getItemsFor } from '../../api/api';
import { Product } from '../../types/Product';
import { useErrorHandle } from '../../hooks/useErrorHandle';

interface OrderItemProps {
  order: Order;
}

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const {
    id,
    title,
    date,
    sumOfPrice = [{ value: 0 }, { value: 0 }],
    productCount,
  } = order;

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { formattedDate: creationDate } = getFormatDateAndTime(date);
  const isOrderSelected = useSelector(selectIsOrderSelected);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const { isLoading } = useQuery(
    ['orderProducts', id],
    () => {
      if (isFetchingData) {
        return getItemsFor<Product[]>('products', 'order', id);
      }
    },
    {
      enabled: isFetchingData,
      onSuccess: (data = []) => {
        dispatch(setProductsForOrder(data));
      },
    },
  );

  const selectOrder = () => {
    dispatch(setSelectedOrder(order));
    setIsFetchingData(true);
    queryClient.invalidateQueries(['orderProducts', id]);
  };

  const handleSelectOrder = () => {
    selectOrder();
    dispatch(setIsOrderSelected(true));
  };

  const handleDeleteOrder = () => {
    selectOrder();
    dispatch(setIsOrderDeleteModalOpen(true));
  };

  const prices = {
    priceUSD: sumOfPrice[0].value,
    priceUAH: sumOfPrice[1].value,
  };

  return (
    <article
      className={cn(styles.orderItem, {
        [styles['orderItem--shortForm']]: isOrderSelected,
      })}
    >
      {!isOrderSelected && <h2 className={styles.orderItem__title}>{title}</h2>}

      <Button
        onClick={handleSelectOrder}
        className={styles.orderItem__openDetailsButton}
      >
        <FormatListBulletedIcon className={styles.orderItem__listIcon} />
      </Button>

      <div className={styles.orderItem__productsInfo}>
        <span className={styles.orderItem__productsCount}>{productCount}</span>
        <span className={styles.orderItem__productsTitle}>Products</span>
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
