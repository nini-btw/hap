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
    reset: () => ({
      goal: "",
      criteria: [],
      alternatives: [],
      subCriteria: {},
    }), // Reset to initial state
  },
});

export const { save, reset } = valueSlice.actions;
export default valueSlice.reducer;
