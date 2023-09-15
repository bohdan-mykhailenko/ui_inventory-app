import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const isItemChangedSelector = (state: RootState) => state.items.isItemChanged;

const isOrderSelectedSelector = (state: RootState) =>
  state.items.isOrderSelected;

const selectedOrderSelector = (state: RootState) => state.items.selectedOrder;

const selectedProductSelector = (state: RootState) =>
  state.items.selectedProduct;

const productsForItemselector = (state: RootState) =>
  state.items.productsForOrder;

export const selectIsItemChanged = createSelector(
  [isItemChangedSelector],
  (isItemChanged) => isItemChanged,
);

export const selectIsOrderSelected = createSelector(
  [isOrderSelectedSelector],
  (isOrderSelected) => isOrderSelected,
);

export const selectOrder = createSelector(
  [selectedOrderSelector],
  (isItemselected) => isItemselected,
);

export const selectProduct = createSelector(
  [selectedProductSelector],
  (isItemselected) => isItemselected,
);

export const selectProductsForOrder = createSelector(
  [productsForItemselector],
  (productsForOrder) => productsForOrder,
);
