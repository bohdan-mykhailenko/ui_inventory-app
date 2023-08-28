import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { SideBar } from '../../components/SideBar';
import { Header } from '../../components/Header';

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.mainLayout}>
      <Header />

      <SideBar />

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
