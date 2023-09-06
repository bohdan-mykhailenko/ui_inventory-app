import React from 'react';
import styles from './DeleteModal.module.scss';
import { OrderItem } from '../../OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrder,
  selectProductsForOrder,
} from '../../../selectors/ordersSelector';
import { Button } from 'react-bootstrap';
import { CloseButton } from '../../CloseButton';
import {
  setIsOrderDeleteModalOpen,
  setIsProductDeleteModalOpen,
} from '../../../reducers/modalsSlice';
import { ProductList } from '../../ProductList';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Product } from '../../../types/Product';

interface DeleteModalProps {
  item: string;
  selectedProducts?: Product[];
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  item,
  selectedProducts = [],
}) => {
  const dispatch = useDispatch();
  const isEmptyOrder = selectedProducts.length > 0;

  const isProductPage = item === 'product';

  const removeModal = () => {
    if (isProductPage) {
      dispatch(setIsProductDeleteModalOpen(false));
    } else {
      dispatch(setIsOrderDeleteModalOpen(false));
    }
  };

  const handleCloseDeleteModal = () => {
    removeModal();
  };

  const handleDeleteOrder = () => {
    removeModal();

    alert('DELETED');
  };

  return (
    <div className={styles.deleteModal}>
      <h3 className={styles.deleteModal__title}>
        {`Are you sure you want to delete this ${item}?`}
      </h3>

      {!isProductPage ? (
        isEmptyOrder ? (
          <ProductList products={selectedProducts} />
        ) : (
          <h5 className={styles.deleteModal__emptyList}>Empty order...</h5>
        )
      ) : null}

      <div className={styles.deleteModal__actions}>
        <Button
          onClick={handleCloseDeleteModal}
          className={`${styles['deleteModal__actions-button']} ${styles['deleteModal__actions-button--cancel']}`}
        >
          Cancel
        </Button>

        <Button
          onClick={handleDeleteOrder}
          className={`${styles['deleteModal__actions-button']} ${styles['deleteModal__actions-button--delete']}`}
        >
          <DeleteForeverIcon
            className={styles['deleteModal__actions-button--delete-binIcon']}
          />
          <span className={styles['deleteModal__actions-button--delete-text']}>
            Delete
          </span>
        </Button>

        <CloseButton onClose={handleCloseDeleteModal} />
      </div>
    </div>
  );
};
