import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ProductsPage.module.scss';
import { ProductList } from '../../components/ProductList';
import { ProductSelect } from '../../components/ProductSelect';
import { selectFilteredProducts } from '../../selectors/filterSelector';
import { DeleteModal } from '../../components/Modals/DeleteModal';
import { selectIsProductDeleteModalOpen } from '../../selectors/modalsSelector';

export const ProductsPage: React.FC = () => {
  const isProductDeleteModalOpen = useSelector(selectIsProductDeleteModalOpen);
  const products = useSelector(selectFilteredProducts);
  const count = products.length;

  return (
    <section className={styles.productsPage}>
      {isProductDeleteModalOpen && (
        <div className={styles.productsPage__overlay} />
      )}
      <div className={styles.productsPage__topInfo}>
        <h1 className={styles.productsPage__title}>Products</h1>
        <span className={styles.productsPage__count}>
          / {count > 0 ? count : ''}
        </span>
        <ProductSelect />
      </div>

      <ProductList products={products} />

      {isProductDeleteModalOpen && <DeleteModal item="product" />}
    </section>
  );
};
