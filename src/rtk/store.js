import { configureStore } from "@reduxjs/toolkit";
import valueReducer from "./slice/valueSlice";
import matrixReducer from "./slice/matrixSlice";

export const store = configureStore({
  reducer: {
    value: valueReducer,
    matrix: matrixReducer, // Add matrix reducer here
  },
});
