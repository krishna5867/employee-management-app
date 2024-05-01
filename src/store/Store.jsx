import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from '@/store/employeeSlice';

export const Store = configureStore({
  reducer: {
    employee: employeeSlice
  },
});


export default Store