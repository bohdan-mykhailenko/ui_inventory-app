import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ProductsPage.module.scss';
import { ProductList } from '../../components/ProductList';
import { ProductSelect } from '../../components/ProductSelect';
import { DeleteModal } from '../../components/Modals/DeleteModal';
import { selectIsProductDeleteModalOpen } from '../../selectors/modalsSelector';
import { useErrorHandle } from '../../hooks/useErrorHandle';
import { useQuery } from 'react-query';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { ProductType } from '../../types/ProductType';
import { getFilteredItems } from '../../api/api';

export const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get('query') || '';
  const filterValue = searchParams.get('type') || ProductType.ALL;

  const { data, error, isLoading } = useQuery(
    ['products', queryValue, filterValue],
    () =>
      getFilteredItems<Product[]>(
        'products',
        queryValue,
        filterValue as ProductType,
      ),
  );

  const { handleError } = useErrorHandle();

  if (error) {
    handleError(error);
  }

  const products = data || [];
  const count = products?.length || 0;

  const isProductDeleteModalOpen = useSelector(selectIsProductDeleteModalOpen);

  return (
    <section className={styles.productsPage}>
      {isProductDeleteModalOpen && (
        <div className={styles.productsPage__overlay} />
      )}

      <div className={styles.productsPage__topInfo}>
        <h1 className={styles.productsPage__title}>Products</h1>
        <span className={styles.productsPage__count}>
          / {count > 0 ? count : 'Empty list...'}
        </span>
        <ProductSelect filterValue={filterValue} />
      </div>

      {isLoading ? <Loader /> : <ProductList products={products} />}

      {isProductDeleteModalOpen && <DeleteModal items="products" />}
    </section>
  );
};
