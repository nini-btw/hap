import { createSlice } from "@reduxjs/toolkit";

export const alternativeMatrixSlice = createSlice({
  name: "alternativeMatrix",
  initialState: [],
  reducers: {
    save: (state, action) => {
      return action.payload;
    },
  },
});

export const { save } = alternativeMatrixSlice.actions;
export default alternativeMatrixSlice.reducer;
