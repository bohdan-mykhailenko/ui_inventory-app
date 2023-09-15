import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { SideBar } from '../../components/SideBar';
import { Header } from '../../components/Header';
import { useDispatch } from 'react-redux';
import {
  setIsOrderAddModalOpen,
  setIsProductAddModalOpen,
  setIsProductDeleteModalOpen,
} from '../../reducers/modalsSlice';
import { setQuery } from '../../reducers/itemsSlice';

export const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;

  useEffect(() => {
    dispatch(setIsProductAddModalOpen(false));
    dispatch(setIsOrderAddModalOpen(false));
    dispatch(setIsProductDeleteModalOpen(false));
    dispatch(setIsOrderAddModalOpen(false));
    dispatch(setQuery(''));
  }, [pathname]);

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
