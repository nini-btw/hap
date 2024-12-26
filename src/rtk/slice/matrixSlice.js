import { createSlice } from "@reduxjs/toolkit";

export const matrixSlice = createSlice({
  name: "criteria",
  initialState: {
    matrix: [],
    normalizedMatrix: [],
    weights: [],
    consistencyRatio: null,
  },
  reducers: {
    saveMatrix: (state, action) => {
      state.matrix = action.payload;
    },
    calculateWeights: (state) => {
      const n = state.matrix.length; // Number of criteria

      if (n === 0) return;

      // Step 1: Normalize matrix
      const colSums = state.matrix[0].map((_, colIndex) =>
        state.matrix.reduce((sum, row) => sum + row[colIndex], 0)
      );
      state.normalizedMatrix = state.matrix.map((row) =>
        row.map((value, colIndex) => value / colSums[colIndex])
      );

      // Step 2: Compute weights
      state.weights = state.normalizedMatrix.map(
        (row) => row.reduce((sum, value) => sum + value, 0) / row.length
      );

      // Step 3: Calculate λ_max (weighted sum for consistency check)
      const weightedSums = state.matrix.map((row) =>
        row.reduce((sum, value, j) => sum + value * state.weights[j], 0)
      );
      const lambdaMax =
        weightedSums.reduce(
          (sum, value, i) => sum + value / state.weights[i],
          0
        ) / n;

      // Step 4: Compute Consistency Index (CI)
      const ci = (lambdaMax - n) / (n - 1);

      // Step 5: Compute Consistency Ratio (CR)
      const riTable = [0.0, 0.0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49]; // RI values for matrices of size 1 to 10
      const ri = riTable[n - 1] || 0; // Handle cases where RI is undefined
      state.consistencyRatio = ri ? ci / ri : 0;
    },
    reset: () => ({
      matrix: [],
      normalizedMatrix: [],
      weights: [],
      consistencyRatio: null,
    }), // Reset to initial state
  },
});

export const { saveMatrix, calculateWeights, reset } = matrixSlice.actions;

export default matrixSlice.reducer;
