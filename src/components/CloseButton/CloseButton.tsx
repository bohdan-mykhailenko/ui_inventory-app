import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from 'react-bootstrap';
import styles from './CloseButton.module.scss';

interface CloseButtonProps {
  onClose: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <Button onClick={onClose} className={styles.closeButton}>
      <CloseIcon />
    </Button>
  );
};