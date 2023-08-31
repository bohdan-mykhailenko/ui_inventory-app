import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductItem.module.scss';
import { orders } from '../../data/data';
import laptop from '../../imgs/laptop.jpg';
import { Order } from '../../types/Order';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import classNames from 'classnames';
import { formatDate } from '../../helpers/formatDate';
import { Button } from '@mui/material';

interface ProductItemProps {
  product: Product;
}

const getOrderById = (orderId: number, orders: Order[]) => {
  const foundOrder = orders.find((order: Order) => order.id === orderId);

  return foundOrder;
};

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const {
    title,
    specification,
    guarantee,
    isNew,
    isRepairing,
    price,
    type,
    order,
    date,
  } = product;
  const foundOrder = getOrderById(order, orders);

  const orderTitle = foundOrder?.title || '';

  const condition = isNew ? 'New' : 'Used';
  const status = isRepairing ? 'Ready' : 'Repairing';
  const guaranteeStart = formatDate(guarantee.start);
  const guaranteeEnd = formatDate(guarantee.end);
  const creationDate = formatDate(date);

  return (
    <article className={styles.productItem}>
      <div
        className={classNames(styles.productItem__indicator, {
          [styles['productItem__indicator--active']]: isRepairing,
        })}
      />
      <img
        className={styles.productItem__img}
        src={laptop}
        alt="device photo"
      />
      <div className={styles.productItem__nameInfo}>
        <h2 className={styles['productItem__nameInfo-title']}>{title}</h2>
        <p className={styles['productItem__nameInfo-specification']}>
          {specification}
        </p>
      </div>
      <p
        className={classNames(styles.productItem__status, {
          [styles['productItem__status--active']]: isRepairing,
        })}
      >
        {status}
      </p>
      <div className={styles.productItem__garantee}>
        <p className={styles['productItem__garantee-start']}>
          <span className={styles['productItem__garantee-label']}>from</span>{' '}
          {guaranteeStart}
        </p>
        <p className={styles['productItem__garantee-end']}>
          <span className={styles['productItem__garantee-label']}>to</span>{' '}
          {guaranteeEnd}
        </p>
      </div>
      <p className={styles.productItem__condition}>{condition}</p>
      <div className={styles.productItem__price}>
        <p className={styles['productItem__price-USD']}>
          {price[0].value}{' '}
          <span className={styles['productItem__price-USD-label']}>$</span>
        </p>
        <p className={styles['productItem__price-UAH']}>
          {price[1].value}{' '}
          <span className={styles['productItem__price-UAH-label']}>UAH</span>
        </p>
      </div>
      <p className={styles.productItem__type}>{type}</p>
      <p className={styles.productItem__orderTitle}>{orderTitle}</p>
      <p className={styles.productItem__date}>{creationDate}</p>

      <Button className={styles.productItem__deleteButton}>
        <DeleteForeverIcon className={styles.productItem__deleteIcon} />
      </Button>
    </article>
  );
};
