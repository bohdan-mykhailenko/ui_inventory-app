import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { products } from '../data/data';
import { Product } from '../types/Product';

interface FilterState {
  selectedValue: string;
  filteredProducts: Product[];
}

const initialState: FilterState = {
  selectedValue: 'default',
  filteredProducts: products,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedValue: (state, action: PayloadAction<string>) => {
      state.selectedValue = action.payload;

      state.filteredProducts = products.filter(
        (product) => product.type === action.payload,
      );
    },
  },
});

export const { setSelectedValue } = filterSlice.actions;
export default filterSlice.reducer;
