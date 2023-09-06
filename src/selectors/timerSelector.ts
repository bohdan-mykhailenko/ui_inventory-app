import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const deleteModalTimerSelector = (state: RootState) =>
  state.timer.deleteModalTimer;

export const selectDeleteModalTimer = createSelector(
  [deleteModalTimerSelector],
  (deleteModalTimer) => deleteModalTimer,
);
