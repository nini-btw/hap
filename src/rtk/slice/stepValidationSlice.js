// src/rtk/slice/stepValidationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goal: true, // track the validity of goal input
  criteria: true, // track the validity of criteria input
  criteriaMatrix: true,
  criteriaResult: true,
  alternative: true,
  alternativeMatrix: true,
};

const stepValidationSlice = createSlice({
  name: "stepValidation",
  initialState,
  reducers: {
    setStepValid: (state, action) => {
      const { step, valid } = action.payload;
      state[step] = valid;
    },
  },
});

export const { setStepValid } = stepValidationSlice.actions;
export default stepValidationSlice.reducer;
