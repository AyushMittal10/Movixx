import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './homeSlice';

// homeslice ko key deke -- store krwa dena hai
export const store = configureStore({
  reducer: {
    home: homeSlice,
  },
});