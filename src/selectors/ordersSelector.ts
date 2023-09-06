import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const isOrderSelectedSelector = (state: RootState) =>
  state.orders.isOrderSelected;

const selectedOrderSelector = (state: RootState) => state.orders.selectedOrder;

const productsForOrderSelector = (state: RootState) =>
  state.orders.productsForOrder;

export const selectisOrderSelected = createSelector(
  [isOrderSelectedSelector],
  (isOrderSelected) => isOrderSelected,
);

export const selectOrder = createSelector(
  [selectedOrderSelector],
  (isOrderSelected) => isOrderSelected,
);

export const selectProductsForOrder = createSelector(
  [productsForOrderSelector],
  (productsForOrder) => productsForOrder,
);
