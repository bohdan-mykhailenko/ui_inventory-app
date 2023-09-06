import React from 'react';
import styles from './AddModal.module.scss';
import { useDispatch } from 'react-redux';
import { clearDeleteModalTimer } from '../../../reducers/timerSlice';
import {
  setIsOrderAddModalOpen,
  setIsProductAddModalOpen,
} from '../../../reducers/modalsSlice';
import { OrderForm, ProductForm } from '../../Forms';

interface AddModalProps {
  item: string;
}

export const AddModal: React.FC<AddModalProps> = ({ item }) => {
  const dispatch = useDispatch();

  const isProductPage = item === 'product';

  const removeModal = () => {
    dispatch(clearDeleteModalTimer());

    if (isProductPage) {
      dispatch(setIsProductAddModalOpen(false));
    } else {
      dispatch(setIsOrderAddModalOpen(false));
    }
  };

  return (
    <div className={styles.addModal}>
      {isProductPage ? (
        <ProductForm onRemoveModal={removeModal} />
      ) : (
        <OrderForm onRemoveModal={removeModal} />
      )}
    </div>
  );
};
