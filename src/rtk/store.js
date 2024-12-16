import { configureStore } from "@reduxjs/toolkit";
import valueReducer from "./slice/valueSlice";
import matrixReducer from "./slice/matrixSlice";
import alternativeMatrixSlice from "./slice/alternativeMatrixSlice";
import stepValidationReducer from "./slice/stepValidationSlice";
import subCriteriaReducer from "./slice/subCriteriaSlice";

export const store = configureStore({
  reducer: {
    value: valueReducer,
    criteria: matrixReducer,
    alternatives: alternativeMatrixSlice,
    stepValidation: stepValidationReducer,
    subCriteria: subCriteriaReducer,
  },
});
