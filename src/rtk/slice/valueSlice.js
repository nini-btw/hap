import { createSlice } from "@reduxjs/toolkit";

export const valueSlice = createSlice({
  name: "valueSlice",
  initialState: {
    goal: "", // To store the goal data
    tableData: [], // To store the table data
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
