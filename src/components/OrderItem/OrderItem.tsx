import React from 'react';
import { Order } from '../../types/Order';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from './OrderItem.module.scss';
import { products } from '../../data/data';
import { Button } from 'react-bootstrap';
import { formatDate } from '../../helpers/formatDate';
import { PriceInfo } from '../PriceInfo';
import { getProductsPrice } from '../../helpers/getProductsPrice';
import { getProductsForOrder } from '../../helpers/getProductsForOrder';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsDetailedOrder,
  setProductsForOrder,
} from '../../reducers/ordersSlice';
import { selectIsDetailedOrder } from '../../selectors/ordersSelector';

interface OrderItemProps {
  order: Order;
}

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const isDetailedOrder = useSelector(selectIsDetailedOrder);
  const dispatch = useDispatch();

  const { id, title, date } = order;
  const productsForOrder = getProductsForOrder(id, products);
  const productsCount = productsForOrder.length;
  const creationDate = formatDate(date);

  const prices = getProductsPrice(productsForOrder);

  const handleOpenDetailedOrder = () => {
    dispatch(setIsDetailedOrder(true));
    dispatch(setProductsForOrder(productsForOrder));
  };

  return (
    <article
      className={cn(styles.orderItem, {
        [styles['orderItem--active']]: isDetailedOrder,
      })}
    >
      {!isDetailedOrder && <h2 className={styles.orderItem__title}>{title}</h2>}

      <Button
        onClick={handleOpenDetailedOrder}
        className={styles.orderItem__openDetailsButton}
      >
        <FormatListBulletedIcon className={styles.orderItem__listIcon} />
      </Button>

      <div className={styles.orderItem__productsInfo}>
        <span className={styles.orderItem__productsCount}>{productsCount}</span>
        <span className={styles.orderItem__productsTitle}>Products</span>
      </div>

      <span className={styles.orderItem__date}>{creationDate}</span>

      {!isDetailedOrder && (
        <div className={styles.orderItem__price}>
          <PriceInfo prices={prices} />
        </div>
      )}

      {!isDetailedOrder && (
        <Button className={styles.orderItem__deleteButton}>
          <DeleteForeverIcon className={styles.orderItem__deleteIcon} />
        </Button>
      )}
    </article>
  );
};
