import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const isDetailedOrderSelector = (state: RootState) =>
  state.orders.isDetailedOrder;
const productsForOrderSelector = (state: RootState) =>
  state.orders.productsForOrder;

export const selectIsDetailedOrder = createSelector(
  [isDetailedOrderSelector],
  (isDetailedOrder) => isDetailedOrder,
);

export const selectProductsForOrder = createSelector(
  [productsForOrderSelector],
  (productsForOrder) => productsForOrder,
);
