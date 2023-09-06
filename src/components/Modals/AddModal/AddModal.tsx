import React from 'react';
import styles from './AddModal.module.scss';
import { useDispatch } from 'react-redux';
import {
  setIsOrderAddModalOpen,
  setIsProductAddModalOpen,
} from '../../../reducers/modalsSlice';
import { OrderForm, ProductForm } from '../../Forms';
import cn from 'classnames';

interface AddModalProps {
  item: string;
}

export const AddModal: React.FC<AddModalProps> = ({ item }) => {
  const dispatch = useDispatch();

  const isProductPage = item === 'product';

  const removeModal = () => {
    if (isProductPage) {
      dispatch(setIsProductAddModalOpen(false));
    } else {
      dispatch(setIsOrderAddModalOpen(false));
    }
  };

  return (
    <div
      className={cn(styles.addModal, {
        [styles['addModal--product']]: isProductPage,
      })}
    >
      {isProductPage ? (
        <ProductForm onRemoveModal={removeModal} />
      ) : (
        <OrderForm onRemoveModal={removeModal} />
      )}
    </div>
  );
};
