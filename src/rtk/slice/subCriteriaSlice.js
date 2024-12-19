import { createSlice } from "@reduxjs/toolkit";

export const subCriteriaSlice = createSlice({
  name: "subCriteria",
  initialState: {
    matrices: {}, // Original matrices
    normalizedMatrix: {}, // Normalized matrices
    weights: {}, // Weight vectors
  },
  reducers: {
    saveSubCriteriaMatrices: (state, action) => {
      state.matrices = action.payload;
    },
    calculateNormalizedMatrices: (state) => {
      const matrices = state.matrices;
      const normalizedMatrix = {};
      const weights = {};

      for (const key in matrices) {
        const matrix = matrices[key];
        const numRows = matrix.length;
        const numCols = matrix[0]?.length || 0;

        // Initialize sums for each column
        const columnSums = new Array(numCols).fill(0);

        // Calculate column sums
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            columnSums[j] += matrix[i][j];
          }
        }

        // Normalize the matrix and calculate row averages (weights)
        const normalized = [];
        const rowWeights = new Array(numRows).fill(0);

        for (let i = 0; i < numRows; i++) {
          normalized[i] = [];
          for (let j = 0; j < numCols; j++) {
            const value = matrix[i][j] / columnSums[j];
            normalized[i][j] = value;
            rowWeights[i] += value;
          }
          // Calculate the weight for the current row (average of normalized values)
          rowWeights[i] /= numCols;
        }

        // Save the normalized matrix and weights for the current key
        normalizedMatrix[key] = normalized;
        weights[key] = rowWeights;
      }

      state.normalizedMatrix = normalizedMatrix;
      state.weights = weights;
    },
  },
});

export const { saveSubCriteriaMatrices, calculateNormalizedMatrices } =
  subCriteriaSlice.actions;
export default subCriteriaSlice.reducer;
