// src/rtk/slice/stepValidationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  steps: {
    goal: { valid: false, skippable: false, label: "goal" },
    criteria: { valid: false, skippable: false, label: "Set Criteria" },
    criteriaMatrix: {
      valid: false,
      skippable: false,
      label: "Criteria PairWise",
    },
    criteriaResult: { valid: true, skippable: false, label: "Criteria Result" },
    alternative: { valid: false, skippable: false, label: "Set Alternatives" },
    subCriteria: {
      valid: false,
      skippable: false,
      label: "Sub Criteria Pairwise",
    },
    subCriteriaResult: {
      valid: true,
      skippable: false,
      label: "Sub Criteria Result",
    },
    subCriteriaAlternative: {
      valid: false,
      skippable: false,
      label: "Alternative Pairwise For Sub Criteria",
    },
    alternativeMatrix: {
      valid: false,
      skippable: false,
      label: "Alternatives Pairwise",
    },
    alternativeResult: { valid: true, skippable: false, label: "Result" },
  },
};

const stepValidationSlice = createSlice({
  name: "stepValidation",
  initialState,
  reducers: {
    setStepValid: (state, action) => {
      const { step, valid } = action.payload;
      state.steps[step].valid = valid;
    },
    setStepSkippable: (state, action) => {
      const { step, skippable } = action.payload;
      state.steps[step].skippable = skippable;
    },
    reset: () => initialState,
  },
});

export const { setStepValid, setStepSkippable, reset } =
  stepValidationSlice.actions;
export default stepValidationSlice.reducer;
