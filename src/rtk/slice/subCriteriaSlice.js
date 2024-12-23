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
      // Calculate normalized matrices

      const norm = (m) => {
        let r = m.length;
        let c = m[0].length;

        let colRes = [];

        //column sum
        for (let i = 0; i < c; i++) {
          let s = 0;
          for (let j = 0; j < r; j++) {
            s += m[j][i];
          }
          colRes.push(s);
        }

        let nm = [];

        for (let i = 0; i < r; i++) {
          const row = [];
          for (let j = 0; j < c; j++) {
            row.push(m[i][j] / colRes[j]);
          }
          nm.push(row);
        }
        return nm;
      };
      const weight = (nm) => {
        let r = nm.length;
        let c = nm[0].length;

        let w = [];
        let s = 0;
        for (let i = 0; i < r; i++) {
          s = 0;
          for (let j = 0; j < c; j++) {
            s += nm[i][j];
          }
          w.push(s / c);
        }
        return w;
      };
      let normalized = Object.entries(state.matrices).map(([key, value]) => {
        return [key, norm(value)];
      });
      let w = normalized.map(([key, value]) => {
        return [key, weight(value)];
      });

      normalized = Object.fromEntries(normalized); // Convert back to an object
      w = Object.fromEntries(w); // Convert back to an object

      state.weights = w;
      state.normalizedMatrix = normalized;
    },
  },
});

export const { saveSubCriteriaMatrices, calculateNormalizedMatrices } =
  subCriteriaSlice.actions;
export default subCriteriaSlice.reducer;
