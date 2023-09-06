import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalsState {
  isProductAddModalOpen: boolean;
  isProductDeleteModalOpen: boolean;
  isOrderAddModalOpen: boolean;
  isOrderDeleteModalOpen: boolean;
}

const initialState: ModalsState = {
  isProductAddModalOpen: false,
  isProductDeleteModalOpen: false,
  isOrderAddModalOpen: false,
  isOrderDeleteModalOpen: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setIsProductAddModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isProductAddModalOpen = action.payload;
    },

    setIsProductDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isProductDeleteModalOpen = action.payload;
    },

    setIsOrderAddModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isOrderAddModalOpen = action.payload;
    },
    setIsOrderDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isOrderDeleteModalOpen = action.payload;
    },
  },
});

export const {
  setIsOrderAddModalOpen,
  setIsOrderDeleteModalOpen,
  setIsProductAddModalOpen,
  setIsProductDeleteModalOpen,
} = modalsSlice.actions;
export default modalsSlice.reducer;
