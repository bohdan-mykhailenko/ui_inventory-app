import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const filteredProducts = (state: RootState) => state.filter.filteredProducts;

export const selectFilteredProducts = createSelector(
  [filteredProducts],
  (filteredProducts) => filteredProducts,
);
