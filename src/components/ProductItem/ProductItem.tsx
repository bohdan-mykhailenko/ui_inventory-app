import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductItem.module.scss';
import { orders } from '../../data/data';
import laptop from '../../imgs/laptop.jpg';
import { Order } from '../../types/Order';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface ProductItemProps {
  product: Product;
}

const getOrderById = (orderId: number, orders: Order[]) => {
  const foundOrder = orders.find((order: Order) => order.id === orderId);

  return foundOrder;
};

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { title, specification, guarantee, isNew, price, type, order, date } =
    product;
  const foundOrder = getOrderById(order, orders);

  const orderTitle = foundOrder?.title || '';

  const condition = isNew > 0 ? 'New' : 'Used';
  return (
    <article className={styles.productItem}>
      <div className={styles.productItem__indicator}></div>
      <img
        className={styles.productItem__img}
        src={laptop}
        alt="device photo"
      />
      <div className={styles.productItem__nameInfo}>
        <h2 className={styles.productItem__title}>{title}</h2>
        <span className={styles.productItem__specification}>
          {specification}
        </span>
      </div>
      <span className={styles.productItem__status}>STATUS?</span>
      <div className={styles.productItem__garanteeInfo}>
        <span className={styles.productItem__garanteeStart}>
          from {guarantee.start}
        </span>
        <span className={styles.productItem__garanteeEnd}>
          to {guarantee.end}
        </span>
      </div>
      <span className={styles.productItem__condition}>{condition}</span>
      <div className={styles.productItem__priceInfo}>
        <span className={styles.productItem__priceUSD}>{price[0].value} $</span>
        <span className={styles.productItem__priceUAH}>
          {price[1].value} UAH
        </span>
      </div>
      <span className={styles.productItem__type}>{type}</span>
      <span className={styles.productItem__orderTitle}>{orderTitle}</span>
      <span className={styles.productItem__date}>{date}</span>

      <button className={styles.productItem__deleteButton}>
        <DeleteForeverIcon className={styles.productItem__deleteIcon} />
      </button>
    </article>
  );
};
