import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductItem.module.scss';
import { orders } from '../../data/data';
import laptop from '../../imgs/laptop.jpg';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import cn from 'classnames';
import { formatDate } from '../../helpers/formatDate';
import { PriceInfo } from '../PriceInfo';
import { Button } from 'react-bootstrap';
import { getOrderById } from '../../helpers/getOrderById';
import { selectisOrderSelected } from '../../selectors/ordersSelector';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

interface ProductItemProps {
  product: Product;
}

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

  const isOrderSelected = useSelector(selectisOrderSelected);
  const isOrdersPage = useMatch('orders');
  const isShortForm = isOrderSelected && isOrdersPage;

  const orderTitle = foundOrder?.title || '';

  const condition = isNew ? 'New' : 'Used';
  const status = isRepairing ? 'Ready' : 'Repairing';
  const guaranteeStart = formatDate(guarantee.start);
  const guaranteeEnd = formatDate(guarantee.end);
  const creationDate = formatDate(date);
  const prices = { priceUSD: price[0].value, priceUAH: price[1].value };

  return (
    <article
      className={cn(styles.productItem, {
        [styles['productItem--shortForm']]: isShortForm,
      })}
    >
      <div
        className={cn(styles.productItem__indicator, {
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
        className={cn(styles.productItem__status, {
          [styles['productItem__status--active']]: isRepairing,
        })}
      >
        {status}
      </p>

      {!isShortForm && (
        <div className={styles.productItem__detailedInfo}>
          <div className={styles.productItem__garantee}>
            <p className={styles['productItem__garantee-start']}>
              <span className={styles['productItem__garantee-label']}>
                from
              </span>{' '}
              {guaranteeStart}
            </p>
            <p className={styles['productItem__garantee-end']}>
              <span className={styles['productItem__garantee-label']}>to</span>{' '}
              {guaranteeEnd}
            </p>
          </div>
          <p className={styles.productItem__condition}>{condition}</p>

          <div className={styles.productItem__price}>
            <PriceInfo prices={prices} />
          </div>

          <p className={styles.productItem__type}>{type}</p>
          <p className={styles.productItem__orderTitle}>{orderTitle}</p>
          <p className={styles.productItem__date}>{creationDate}</p>
        </div>
      )}

      <Button className={styles.productItem__deleteButton}>
        <DeleteForeverIcon className={styles.productItem__deleteIcon} />
      </Button>
    </article>
  );
};
