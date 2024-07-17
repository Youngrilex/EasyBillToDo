import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlices';

export const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});
