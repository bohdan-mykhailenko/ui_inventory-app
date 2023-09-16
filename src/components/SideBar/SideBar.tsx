import React from 'react';
import { MenuLink } from '../MenuLink';
import styles from './SideBar.module.scss';
import avatar from '../../imgs/1.jpg';
import SettingsIcon from '@mui/icons-material/Settings';

export const SideBar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__profile}>
        <img
          className={styles['sidebar__profile-avatar']}
          src={avatar}
          alt="avatar"
        />
        <div className={styles['sidebar__profile-settings']}>
          <SettingsIcon className={styles['sidebar__profile-icon']} />
        </div>
      </div>

      <ul className={styles.sidebar__list}>
        <MenuLink to="/" />
        <MenuLink to="/Orders" />
        <MenuLink to="/groups" />
        <MenuLink to="/products" />
        <MenuLink to="/users" />
        <MenuLink to="/settings" />
      </ul>
    </aside>
  );
};
