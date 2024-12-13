import { createSlice } from "@reduxjs/toolkit";

export const alternativeMatrixSlice = createSlice({
  name: "alternativeMatrix",
  initialState: {
    matrices: {}, // Stores pairwise matrices for each criterion
    weights: {}, // Stores normalized weights for each criterion's alternatives
    normalizedMatrices: {}, // Stores the normalized matrix for each criterion
    overallPriorities: [], // Overall priorities for alternatives
    bestAlternative: null, // The best alternative based on overall priorities
  },
  reducers: {
    saveMatrix: (state, action) => {
      const { criterion, matrix } = action.payload;
      state.matrices[criterion] = matrix; // Save the matrix for the given criterion
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

    calculateAlternativeWeights: (state) => {
      const criteria = Object.keys(state.normalizedMatrices);

      criteria.forEach((criterion) => {
        const normalizedMatrix = state.normalizedMatrices[criterion];

        // Calculate weights for alternatives (row averages)
        const weights = normalizedMatrix.map(
          (row) => row.reduce((sum, value) => sum + value, 0) / row.length
        );

        // Normalize the weights
        const sumOfWeights = weights.reduce((sum, weight) => sum + weight, 0);
        const normalizedWeights = weights.map(
          (weight) => weight / sumOfWeights
        );

        state.weights[criterion] = normalizedWeights;
      });
    },

    calculateOverallPriorities: (state, action) => {
      const criteriaWeights = action.payload; // Criteria weights passed as an array
      const criteria = Object.keys(state.weights);

      if (!criteria.length) return;

      const numAlternatives = state.weights[criteria[0]].length;

      // Initialize overall priorities for alternatives
      state.overallPriorities = Array(numAlternatives).fill(0);

      criteria.forEach((criterion, index) => {
        state.weights[criterion].forEach((weight, altIndex) => {
          state.overallPriorities[altIndex] += weight * criteriaWeights[index];
        });
      });

      // Determine the best alternative
      const maxPriority = Math.max(...state.overallPriorities);
      state.bestAlternative =
        state.overallPriorities.findIndex(
          (priority) => priority === maxPriority
        ) + 1;
    },
  },
});

export const {
  saveMatrix,
  calculateNormalizedMatrices,
  calculateAlternativeWeights,
  calculateOverallPriorities,
} = alternativeMatrixSlice.actions;

export default alternativeMatrixSlice.reducer;
