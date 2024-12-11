// src/rtk/slice/stepValidationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goal: false, // track the validity of goal input
  criteria: false, // track the validity of criteria input
  alternative: false,
  // Add more steps as needed
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
