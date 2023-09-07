import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './reducers/filterSlice';
import ordersReducer from './reducers/ordersSlice';
import modalsReducer from './reducers/modalsSlice';

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    filter: filterReducer,
    modals: modalsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
