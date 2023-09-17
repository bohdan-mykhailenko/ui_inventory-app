import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { NotFoundPage } from './pages/NotFoundPage';
import { OrdersPage } from './pages/OrdersPage';
import { ErrorPage } from './pages/ErrorPage';
import './styles/main.scss';
import { ProductsPage } from './pages/ProductsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<OrdersPage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="orders" element={<OrdersPage />} />
        <Route path="products" element={<ProductsPage />} />
        {/* <Route path="groups" element={<GroupsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings" element={<SettingsPage />} /> */}

        <Route path="error" element={<ErrorPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
