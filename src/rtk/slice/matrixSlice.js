import { createSlice } from "@reduxjs/toolkit";

export const matrixSlice = createSlice({
  name: "matrix",
  initialState: [],
  reducers: {
    saveMatrix: (state, action) => {
      return action.payload; // Save the matrix to the state
    },
  },
});

export const { setMatrix, updateMatrix, saveMatrix } = matrixSlice.actions;

export default matrixSlice.reducer;
