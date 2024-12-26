import { configureStore } from "@reduxjs/toolkit";
import valueReducer from "./slice/valueSlice";
import matrixReducer from "./slice/matrixSlice";
import alternativeMatrixSlice from "./slice/alternativeMatrixSlice";
import stepValidationReducer from "./slice/stepValidationSlice";
import subCriteriaReducer from "./slice/subCriteriaSlice";
import subAlternativeSlice from "./slice/subAlternativeSlice";
import { reset as resetV } from "./slice/valueSlice";
import { reset as resetMs } from "./slice/matrixSlice";
import { reset as resetAms } from "./slice/alternativeMatrixSlice";
import { reset as resetSc } from "./slice/subCriteriaSlice";
import { reset as resetSas } from "./slice/subAlternativeSlice";
import { reset as resetStep } from "./slice/stepValidationSlice";

export const store = configureStore({
  reducer: {
    value: valueReducer,
    criteria: matrixReducer,
    alternatives: alternativeMatrixSlice,
    subAlternatives: subAlternativeSlice,
    stepValidation: stepValidationReducer,
    subCriteria: subCriteriaReducer,
  },
});

export const resetAll = () => (dispatch) => {
  dispatch(resetV());
  dispatch(resetMs());
  dispatch(resetAms());
  dispatch(resetSc());
  dispatch(resetSas());
  dispatch(resetStep());

  // Dispatch reset for other slices here
};
