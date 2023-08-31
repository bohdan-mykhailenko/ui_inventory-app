import React from 'react';
import styles from './ProductsPage.module.scss';
import { products } from '../../data/data';
import { ProductList } from '../../components/ProductList';
import { ProductSelect } from '../../components/ProductSelect';

export const ProductsPage: React.FC = () => {
  const productsFromServer = products;
  const count = productsFromServer.length;

  return (
    <section className={styles.productsPage}>
      <div className={styles.productsPage__topInfo}>
        <h1 className={styles.productsPage__title}>Products</h1>
        <span className={styles.productsPage__count}>
          / {count > 0 ? count : ''}
        </span>
        <ProductSelect />
      </div>

      <ProductList products={productsFromServer} />
    </section>
  );
};
