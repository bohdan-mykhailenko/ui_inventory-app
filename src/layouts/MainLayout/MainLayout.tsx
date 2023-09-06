import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { SideBar } from '../../components/SideBar';
import { Header } from '../../components/Header';
import { useDispatch } from 'react-redux';
import {
  setIsOrderAddModalOpen,
  setIsProductAddModalOpen,
} from '../../reducers/modalsSlice';

export const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (pathname !== '/order') {
      dispatch(setIsProductAddModalOpen(false));
      dispatch(setIsOrderAddModalOpen(false));
    }
  }, [dispatch, pathname]);

  return (
    <div className={styles.mainLayout}>
      <Header />

      <SideBar />

      <main className={styles.mainLayout__content}>
        <Outlet />
      </main>
    </div>
  );
};
