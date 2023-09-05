import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ProductsPage.module.scss';
import { ProductList } from '../../components/ProductList';
import { ProductSelect } from '../../components/ProductSelect';
import { selectFilteredProducts } from '../../selectors/filterSelector';

export const ProductsPage: React.FC = () => {
  const products = useSelector(selectFilteredProducts);
  const count = products.length;

  return (
    <section className={styles.productsPage}>
      <div className={styles.productsPage__topInfo}>
        <h1 className={styles.productsPage__title}>Products</h1>
        <span className={styles.productsPage__count}>
          / {count > 0 ? count : ''}
        </span>
        <ProductSelect />
      </div>

      <ProductList products={products} />
    </section>
  );
};
