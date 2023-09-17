import React from 'react';
import { MenuLink } from '../MenuLink';
import avatar from '../../imgs/avatar.png';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './NavigationMenu.module.scss';
import { Link } from 'react-router-dom';

export const NavigationMenu: React.FC = () => {
  return (
    <aside className={styles.navigationMenu}>
      <div className={styles.navigationMenu__profile}>
        <img
          className={styles['navigationMenu__profile-avatar']}
          src={avatar}
          alt="avatar"
        />
        <Link
          to="settings"
          className={styles['navigationMenu__profile-settings']}
        >
          <SettingsIcon className={styles['navigationMenu__profile-icon']} />
        </Link>
      </div>

      <ul className={styles.navigationMenu__list}>
        <MenuLink to="/orders" />
        <MenuLink to="/groups" />
        <MenuLink to="/products" />
        <MenuLink to="/users" />
        <MenuLink to="/settings" />
      </ul>
    </aside>
  );
};
