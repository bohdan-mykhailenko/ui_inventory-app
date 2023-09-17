import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { CloseButton } from '../../CloseButton';
import {
  setIsOrderDeleteModalOpen,
  setIsProductDeleteModalOpen,
} from '../../../reducers/modalsSlice';
import { ProductList } from '../../ProductList';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Product } from '../../../types/Product';
import { deleteItem } from '../../../api/api';
import { useErrorHandle } from '../../../hooks/useErrorHandle';
import { useMutation, useQueryClient } from 'react-query';
import { selectOrder, selectProduct } from '../../../selectors/itemsSelector';
import { Loader } from '../../Loader';
import {
  setIsItemChanged,
  setSelectedOrder,
  setIsOrderSelected,
} from '../../../reducers/itemsSlice';
import styles from './DeleteModal.module.scss';
import { animated, useSpring } from 'react-spring';

interface DeleteModalProps {
  items: string;
  selectedProducts?: Product[];
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  items = '',
  selectedProducts = [],
}) => {
  const dispatch = useDispatch();
  const { handleError } = useErrorHandle();
  const queryClient = useQueryClient();
  const [modalAnimation, setModalAnimation] = useSpring(() => ({
    opacity: 0,
    config: {
      friction: 20,
      duration: 300,
    },
  }));

  const { id = 0 } =
    items === 'orders'
      ? useSelector(selectOrder) || {}
      : useSelector(selectProduct) || {};

  const isEmptyOrder = selectedProducts.length > 0;
  const isProductPage = items === 'products';
  const deletedItem = items.slice(0, -1);

  const mutation = useMutation((itemId: number) => deleteItem(items, itemId), {
    onSuccess: () => {
      queryClient.invalidateQueries('delete item');
      dispatch(setSelectedOrder(null));
      dispatch(setIsOrderSelected(false));
      dispatch(setIsItemChanged(true));
    },
  });

  const removeModal = useCallback(() => {
    if (isProductPage) {
      dispatch(setIsProductDeleteModalOpen(false));
    } else {
      dispatch(setIsOrderDeleteModalOpen(false));
    }
  }, [dispatch, isProductPage]);

  const handleCloseDeleteModal = () => {
    setModalAnimation({ opacity: 0 });

    setTimeout(() => {
      removeModal();
    }, 150);
  };

  const handleDeleteOrder = useCallback(async () => {
    try {
      mutation.mutate(id);
    } catch (error) {
      handleError(error);
    } finally {
      handleCloseDeleteModal();
    }
  }, [id, mutation, removeModal, handleError]);

  useEffect(() => {
    setModalAnimation({ opacity: 1 });
  }, [setModalAnimation]);

  return (
    <animated.div style={modalAnimation} className={styles.deleteModal}>
      <div className={styles.deleteModal__content}>
        <h3 className={styles.deleteModal__title}>
          {`Are you sure you want to delete this ${deletedItem}?`}
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
            <div className={styles['deleteModal__actions-button--delete-text']}>
              {mutation.isLoading ? <Loader size={15} /> : 'Delete'}
            </div>
          </Button>

          <CloseButton onClose={handleCloseDeleteModal} />
        </div>
      </div>
    </animated.div>
  );
};
