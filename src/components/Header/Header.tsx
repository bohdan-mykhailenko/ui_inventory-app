import React from 'react';
import styles from './Header.module.scss';
import DiamondIcon from '@mui/icons-material/Diamond';
import { DateInfo } from '../DateInfo';
import { Search } from '../Search/Search';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <a href="#" className={styles.header__logo}>
        <DiamondIcon className={styles.header__icon} />
        <h2 className={styles.header__companyName}>Inventory</h2>
      </a>

      <Search />

      <DateInfo />
    </header>
  );
};
