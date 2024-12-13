import { useSelector } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

const ResultsTable = () => {
  const { matrix, normalizedMatrix, weights, consistencyRatio } = useSelector(
    (state) => state.criteria
  );

  return (
    <Box
      sx={{
        margin: "20px auto",
        padding: "20px",
        width: "80%",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, color: "#1976d2", textAlign: "center" }}
      >
        AHP Calculation Results
      </Typography>

      {/* Original Matrix */}
      <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "#00051c" }}>
        Original Matrix
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              {matrix.length > 0 &&
                matrix[0].map((_, index) => (
                  <TableCell key={index}>C{index + 1}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {matrix.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((value, colIndex) => (
                  <TableCell key={colIndex}>{value.toFixed(3)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Normalized Matrix */}
      <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "#00051c" }}>
        Normalized Matrix
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              {normalizedMatrix.length > 0 &&
                normalizedMatrix[0].map((_, index) => (
                  <TableCell key={index}>C{index + 1}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {normalizedMatrix.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((value, colIndex) => (
                  <TableCell key={colIndex}>{value.toFixed(3)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Weights */}
      <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "#00051c" }}>
        Weights
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              {weights.map((_, index) => (
                <TableCell key={index}>C{index + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {weights.map((weight, index) => (
                <TableCell key={index}>{weight.toFixed(3)}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Consistency Ratio */}
      <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "#00051c" }}>
        Consistency Ratio
      </Typography>
      <Box
        sx={{
          padding: "10px",
          backgroundColor: "#e3f2fd",
          textAlign: "center",
          borderRadius: "4px",
        }}
      >
        <Typography variant="h5" sx={{ color: "#1976d2" }}>
          {consistencyRatio !== null
            ? `CR = ${consistencyRatio.toFixed(3)}`
            : "No data available"}
        </Typography>
      </Box>
    </Box>
  );
};

export default ResultsTable;
