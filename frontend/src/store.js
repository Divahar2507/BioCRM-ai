import { configureStore } from '@reduxjs/toolkit';
import hcpReducer from './features/hcpSlice';

export const store = configureStore({
    reducer: {
        hcp: hcpReducer,
    },
});
