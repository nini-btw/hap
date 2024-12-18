import { createSlice } from "@reduxjs/toolkit";

export const valueSlice = createSlice({
  name: "valueSlice",
  initialState: {
    goal: "", // To store the goal data
    criteria: [], // To store the table data
    alternatives: [], // To store the Alternative
    subCriteria: {},
  },
  reducers: {
    save: (state, action) => {
      // Merge data based on the payload keys
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { save } = valueSlice.actions;
export default valueSlice.reducer;
