import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setIsOrderAddModalOpen,
  setIsProductAddModalOpen,
} from '../../../reducers/modalsSlice';
import { OrderForm, ProductForm } from '../../Forms';
import styles from './AddModal.module.scss';
import { animated, useSpring } from 'react-spring';

interface AddModalProps {
  item: string;
}

export const AddModal: React.FC<AddModalProps> = ({ item }) => {
  const dispatch = useDispatch();

  const [modalAnimation, setModalAnimation] = useSpring(() => ({
    opacity: 0,
    config: {
      friction: 20,
      duration: 300,
    },
  }));

  const isProductItem = item === 'product';

  const removeModal = useCallback(() => {
    if (isProductItem) {
      dispatch(setIsProductAddModalOpen(false));
    } else {
      dispatch(setIsOrderAddModalOpen(false));
    }
  }, []);

  const closeDeleteModal = () => {
    setModalAnimation({ opacity: 0 });

    setTimeout(() => {
      removeModal();
    }, 300);
  };

  useEffect(() => {
    setModalAnimation({ opacity: 1 });
  }, [setModalAnimation]);

  return (
    <animated.div className={styles.addModal} style={modalAnimation}>
      {isProductItem ? (
        <ProductForm onRemoveModal={closeDeleteModal} />
      ) : (
        <OrderForm onRemoveModal={closeDeleteModal} />
      )}
    </animated.div>
  );
};
