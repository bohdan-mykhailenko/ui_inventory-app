// CloseButton.tsx
import React, { useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setSelectedOrder } from '../../reducers/itemsSlice';
import styles from './CloseButton.module.scss';

interface CloseButtonProps {
  onClose: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setSelectedOrder(null));
    onClose();
  }, [dispatch, onClose]);

  return (
    <Button onClick={handleCloseModal} className={styles.closeButton}>
      <CloseIcon />
    </Button>
  );
};
