import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './reducers/itemsSlice';
import modalsReducer from './reducers/modalsSlice';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    modals: modalsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
