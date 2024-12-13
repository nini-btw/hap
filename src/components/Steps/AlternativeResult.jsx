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

const AlternativeResult = () => {
  const p = useSelector((state) => state.alternatives.overallPriorities);
  const w = useSelector((state) => state.alternatives.weights);
  const n = useSelector((state) => state.alternatives.normalizedMatrices);
  const a = useSelector((state) => state.alternatives.bestAlternative);

  const criteria = useSelector((state) => state.value.criteria); // Array of criterion names
  const alternatives = useSelector((state) => state.value.alternatives); // Array of alternative names

  return (
    <Box
      sx={{
        margin: "20px auto",
        padding: "20px",
        width: "90%",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Alternative Results
      </Typography>

      {/* Display Overall Priorities */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Overall Priorities
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {alternatives.map((alt, index) => (
                  <TableCell key={index}>{alt}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {p.map((value, index) => (
                  <TableCell key={index}>{value.toFixed(3)}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Display Weights */}
      {Object.keys(w).length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Weights for Criteria
          </Typography>
          {Object.entries(w).map(([criteria, matrix], idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {criteria[idx]} {/* Match criterion name with index */}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {alternatives.map((alt, colIndex) => (
                        <TableCell key={colIndex}>{alt}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {matrix.map((value, colIndex) => (
                        <TableCell key={colIndex}>{value.toFixed(3)}</TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </Box>
      )}

      {/* Display Normalized Matrices */}
      {Object.keys(n).length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Normalized Matrices
          </Typography>
          {Object.entries(n).map(([criteria, matrix], idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {criteria[idx]} {/* Match criterion name with index */}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {alternatives.map((alt, colIndex) => (
                        <TableCell key={colIndex}>{alt}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {matrix.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((value, colIndex) => (
                          <TableCell key={colIndex}>
                            {value.toFixed(3)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </Box>
      )}

      {/* Display Best Alternative */}
      <Box
        sx={{
          padding: "10px",
          backgroundColor: "#e3f2fd",
          textAlign: "center",
          borderRadius: "4px",
        }}
      >
        <Typography variant="h5">
          {a !== undefined
            ? `Best Alternative: ${alternatives[a]}`
            : "No best alternative determined yet"}
        </Typography>
      </Box>
    </Box>
  );
};

export default AlternativeResult;
