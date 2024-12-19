import { createSlice } from "@reduxjs/toolkit";

export const subCriteriaSlice = createSlice({
  name: "subCriteria",
  initialState: {
    matrices: {},
    normalizedMatrix: {},
  },
  reducers: {
    saveSubCriteriaMatrices: (state, action) => {
      state.matrices = action.payload;
    },
    calculateNormalizedMatrices: (state) => {
      const criteria = Object.keys(state.matrices);

      criteria.forEach((criterion) => {
        const matrix = state.matrices[criterion];

        // Normalize the matrix
        const colSums = matrix[0].map((_, colIndex) =>
          matrix.reduce((sum, row) => sum + row[colIndex], 0)
        );
        const normalizedMatrix = matrix.map((row) =>
          row.map((value, colIndex) => value / colSums[colIndex])
        );

        state.normalizedMatrices[criterion] = normalizedMatrix;
      });
    },
  },
});

export const { saveSubCriteriaMatrices, calculateNormalizedMatrices } =
  subCriteriaSlice.actions;
export default subCriteriaSlice.reducer;
