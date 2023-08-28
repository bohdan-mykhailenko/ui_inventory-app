import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from './TopMenu.module.scss';

export const TopMenu: React.FC = () => {
  const date: Date = new Date();

  const weekday = date.toLocaleString('en-US', { weekday: 'long' });
  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return (
    <div className={styles.TopMenu}>
      <span className={styles.TopMenu__weekday}>{weekday}</span>

      <div className={styles.TopMenu__dateWrapper}>
        <span
          className={styles.TopMenu__date}
        >{`${day} ${month}, ${year}`}</span>

        <div className={styles.TopMenu__timeWrapper}>
          <AccessTimeIcon className={styles.TopMenu__timeIcon} />
          <span className={styles.TopMenu__time}>{`${hours}:${minutes}`}</span>
        </div>
      </div>
    </div>
  );
};
