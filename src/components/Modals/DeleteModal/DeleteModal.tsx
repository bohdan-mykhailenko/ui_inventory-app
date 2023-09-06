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
import { setIsOrderDeleteModalOpen } from '../../../reducers/modalsSlice';
import { ProductList } from '../../ProductList';
import { clearDeleteModalTimer } from '../../../reducers/timerSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface DeleteModalProps {
  item: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ item }) => {
  const dispatch = useDispatch();
  const selectedOrder = useSelector(selectOrder);
  const productsForOrder = useSelector(selectProductsForOrder);
  const isEmptyOrder = productsForOrder.length > 0;

  const closeDeleteModal = () => {
    dispatch(clearDeleteModalTimer());
    dispatch(setIsOrderDeleteModalOpen(false));
  };

  const deleteModal = () => {
    dispatch(clearDeleteModalTimer());
    dispatch(setIsOrderDeleteModalOpen(false));

    alert('DELETED');
  };

  return (
    <div className={styles.deleteModal}>
      <h3 className={styles.deleteModal__title}>
        {selectedOrder
          ? `Are you sure you want to delete this ${item}`
          : 'No order selected'}
      </h3>

      {isEmptyOrder ? (
        <ProductList products={productsForOrder} />
      ) : (
        <h5 className={styles.deleteModal__emptyList}>Empty order...</h5>
      )}

      <div className={styles.deleteModal__actions}>
        <Button
          onClick={closeDeleteModal}
          className={`${styles['deleteModal__actions-button']} ${styles['deleteModal__actions-button--cancel']}`}
        >
          Cancel
        </Button>

        <Button
          onClick={deleteModal}
          className={`${styles['deleteModal__actions-button']} ${styles['deleteModal__actions-button--delete']}`}
        >
          <DeleteForeverIcon
            className={styles['deleteModal__actions-button--delete-binIcon']}
          />
          <span className={styles['deleteModal__actions-button--delete-text']}>
            Delete
          </span>
        </Button>

        <CloseButton onClose={closeDeleteModal} />
      </div>
    </div>
  );
};
