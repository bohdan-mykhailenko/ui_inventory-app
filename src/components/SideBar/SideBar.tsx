import React from 'react';
import { MenuLink } from '../MenuLink';
import avatar from '../../imgs/avatar.png';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './SideBar.module.scss';
import { Link } from 'react-router-dom';

export const SideBar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__profile}>
        <img
          className={styles['sidebar__profile-avatar']}
          src={avatar}
          alt="avatar"
        />
        <Link to="settings" className={styles['sidebar__profile-settings']}>
          <SettingsIcon className={styles['sidebar__profile-icon']} />
        </Link>
      </div>

      <ul className={styles.sidebar__list}>
        <MenuLink to="/orders" />
        <MenuLink to="/groups" />
        <MenuLink to="/products" />
        <MenuLink to="/users" />
        <MenuLink to="/settings" />
      </ul>
    </aside>
  );
};
