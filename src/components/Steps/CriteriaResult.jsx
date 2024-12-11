import { useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { calculateWeights } from "../../rtk/slice/matrixSlice";

function CriteriaResult() {
  const dispatch = useDispatch();

  // Get data from Redux store
  const criteria = useSelector((state) => state.value.criteria);
  const matrix = useSelector((state) => state.matrix.matrix);
  const normalizedMatrix = useSelector(
    (state) => state.matrix.normalizedMatrix
  );
  const weights = useSelector((state) => state.matrix.weights);
  const consistencyRatio = useSelector(
    (state) => state.matrix.consistencyRatio
  );

  // Calculate weights and CR when the component loads
  useEffect(() => {
    if (matrix.length > 0) {
      console.log("Matrix:", matrix); // Debug
      dispatch(calculateWeights());
    }
  }, [matrix, dispatch]);

  return (
    <section id="section6" className="section bg-light d-flex flex-column p-3">
      <Typography
        variant="h4"
        component="header"
        sx={{ color: "black", mb: 2 }}
      >
        Section 6: RESULT
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {/* Display Normalized Matrix */}
        <Typography
          variant="h5"
          sx={{ color: "black", mb: 2, textDecoration: "underline" }}
        >
          Normalized Matrix
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#f3f6f9",
            border: "1px solid #e0e0e0",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
            marginBottom: "1rem",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#1976d2" }}
                ></TableCell>
                {criteria.map((criterion, index) => (
                  <TableCell
                    key={index}
                    sx={{ fontWeight: "bold", color: "#1976d2" }}
                  >
                    {criterion}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {normalizedMatrix.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    {criteria[rowIndex]}
                  </TableCell>
                  {row.map((value, colIndex) => (
                    <TableCell key={colIndex} sx={{ color: "#424242" }}>
                      {value.toFixed(3)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Display Final Weights */}
        <Typography
          variant="h5"
          sx={{ color: "black", mb: 2, textDecoration: "underline" }}
        >
          Final Weights
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#f3f6f9",
            border: "1px solid #e0e0e0",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
            marginBottom: "1rem",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                  Criterion
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                  Weight
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weights.map((weight, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    {criteria[index]}
                  </TableCell>
                  <TableCell sx={{ color: "#424242" }}>
                    {weight.toFixed(3)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Display Consistency Ratio */}
        <Typography variant="h6" sx={{ color: "black", mt: 3 }}>
          Consistency Ratio (CR):{" "}
          <span
            style={{
              color: consistencyRatio < 0.1 ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {consistencyRatio ? consistencyRatio.toFixed(3) : "N/A"}
          </span>{" "}
          ({consistencyRatio < 0.1 ? "Consistent" : "Inconsistent"})
        </Typography>
      </Box>
    </section>
  );
}

export default CriteriaResult;
