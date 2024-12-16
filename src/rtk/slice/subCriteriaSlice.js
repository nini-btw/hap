import { createSlice } from "@reduxjs/toolkit";

export const subCriteriaSlice = createSlice({
  name: "subCriteria",
  initialState: {},
  reducers: {
    saveSubCriteria: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { saveSubCriteria } = subCriteriaSlice.actions;
export default subCriteriaSlice.reducer;
