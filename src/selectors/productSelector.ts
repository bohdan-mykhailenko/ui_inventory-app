import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getFilteredProducts = (state: RootState) => state.filter.filteredProducts;

export const getProducts = createSelector(
  [getFilteredProducts],
  (filteredProducts) => filteredProducts,
);
