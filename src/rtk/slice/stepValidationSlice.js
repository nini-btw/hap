// src/rtk/slice/stepValidationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goal: false,
  criteria: false,
  criteriaMatrix: false,
  criteriaResult: true,
  alternative: false,
  alternativeMatrix: true,
  subCriteria: false,
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
