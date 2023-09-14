import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './reducers/filterSlice';
import itemsReducer from './reducers/itemsSlice';
import modalsReducer from './reducers/modalsSlice';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    filter: filterReducer,
    modals: modalsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
