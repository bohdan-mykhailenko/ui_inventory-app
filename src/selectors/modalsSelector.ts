import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const isProductAddModalOpenSelector = (state: RootState) =>
  state.modals.isProductAddModalOpen;

const isProductDeleteModalOpenSelector = (state: RootState) =>
  state.modals.isProductDeleteModalOpen;

const isOrderAddModalOpenSelector = (state: RootState) =>
  state.modals.isOrderAddModalOpen;

const isOrderDeleteModalOpenSelector = (state: RootState) =>
  state.modals.isOrderDeleteModalOpen;

export const selectIsProductAddModalOpen = createSelector(
  [isProductAddModalOpenSelector],
  (isProductAddModalOpen) => isProductAddModalOpen,
);

export const selectIsProductDeleteModalOpen = createSelector(
  [isProductDeleteModalOpenSelector],
  (isProductDeleteModalOpen) => isProductDeleteModalOpen,
);

export const selectIsOrderAddModalOpen = createSelector(
  [isOrderAddModalOpenSelector],
  (isOrderAddModalOpen) => isOrderAddModalOpen,
);

export const selectIsOrderDeleteModalOpen = createSelector(
  [isOrderDeleteModalOpenSelector],
  (isOrderDeleteModalOpen) => isOrderDeleteModalOpen,
);
