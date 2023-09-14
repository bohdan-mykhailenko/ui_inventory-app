import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Loader.module.scss';

interface LoaderProps {
  size?: number;
}

export const Loader: React.FC<LoaderProps> = ({ size = 70 }) => {
  return (
    <div className={styles.loader}>
      <CircularProgress
        className={styles.loader__muiLoader}
        color="info"
        size={size}
      />
    </div>
  );
};
