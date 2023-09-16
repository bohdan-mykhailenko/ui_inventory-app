import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from 'react-bootstrap';
import styles from './CloseButton.module.scss';
import { useDispatch } from 'react-redux';
import { setSelectedOrder } from '../../reducers/itemsSlice';

interface CloseButtonProps {
  onClose: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setSelectedOrder(null));
    onClose();
  };

  return (
    <Button onClick={handleCloseModal} className={styles.closeButton}>
      <CloseIcon />
    </Button>
  );
};
