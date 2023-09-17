import React from 'react';
import styles from './Header.module.scss';
import DiamondIcon from '@mui/icons-material/Diamond';
import { TopMenu } from '../TopMenu';
import { Search } from '../Search/Search';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="orders" className={styles.header__logo}>
        <DiamondIcon className={styles.header__icon} />
        <h2 className={styles.header__companyName}>Inventory</h2>
      </Link>

      <Search />

      <TopMenu />
    </header>
  );
};
