import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  deleteModalTimer: NodeJS.Timeout | null;
}

const initialState: TimerState = {
  deleteModalTimer: null,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setDeleteModalTimer: (state, action: PayloadAction<NodeJS.Timeout>) => {
      state.deleteModalTimer = action.payload;
    },
    clearDeleteModalTimer: (state) => {
      if (state.deleteModalTimer) {
        clearTimeout(state.deleteModalTimer);

        state.deleteModalTimer = null;
      }
    },
  },
});

export const { setDeleteModalTimer, clearDeleteModalTimer } =
  timerSlice.actions;
export default timerSlice.reducer;
