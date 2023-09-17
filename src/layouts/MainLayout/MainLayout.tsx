import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../../components/Header';
import { useDispatch } from 'react-redux';
import {
  setIsOrderAddModalOpen,
  setIsOrderDeleteModalOpen,
  setIsProductAddModalOpen,
  setIsProductDeleteModalOpen,
} from '../../reducers/modalsSlice';
import {
  setIsItemChanged,
  setIsOrderSelected,
  setSelectedOrder,
} from '../../reducers/itemsSlice';
import styles from './MainLayout.module.scss';
import { NavigationMenu } from '../../components/NavigationMenu';

export const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;

  const resetOpenModals = () => {
    dispatch(setIsProductAddModalOpen(false));
    dispatch(setIsProductDeleteModalOpen(false));
    dispatch(setIsOrderDeleteModalOpen(false));
    dispatch(setIsOrderAddModalOpen(false));
  };

  const resetSelectedItem = () => {
    dispatch(setIsItemChanged(false));
    dispatch(setIsOrderSelected(false));
    dispatch(setSelectedOrder(null));
  };

  useEffect(() => {
    resetOpenModals();
    resetSelectedItem();
  }, [pathname]);

  return (
    <div className={styles.mainLayout}>
      <Header />

      <NavigationMenu />

      <main className={styles.mainLayout__content}>
        <Outlet />
      </main>
    </div>
  );
};
