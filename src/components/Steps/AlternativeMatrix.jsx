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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { save } from "../../rtk/slice/alternativeMatrixSlice"; // Import the dedicated action
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import MathJax from "react-mathjax2";

function AlternativeMatrix() {
  const alternatives = useSelector((state) => state.value.alternatives);
  const criteria = useSelector((state) => state.value.criteria);
  const dispatch = useDispatch();
  const [matrix, setMatrix] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCell, setCurrentCell] = useState({ row: null, col: null });
  const [newValue, setNewValue] = useState(1);
  // Initialize the matrix when alternatives change
  useEffect(() => {
    if (alternatives.length >= 2) {
      const newMatrix = alternatives.map(() =>
        Array(alternatives.length).fill(1)
      ); // Initialize matrix with '1'
      setMatrix(newMatrix);
    }
  }, [alternatives, criteria]);

  const handleCellClick = (row, col) => {
    if (row !== col) {
      setCurrentCell({ row, col });
      setNewValue(matrix[row][col]);
      setOpenDialog(true);
    }
  };

  const handleValueChange = (value) => {
    const newMatrix = [...matrix];

    // Set the selected value in cell [row, col]
    newMatrix[currentCell.row][currentCell.col] = value;

    // Update the reciprocal value in cell [col, row]
    if (value !== 0) {
      newMatrix[currentCell.col][currentCell.row] = 1 / value; // Reciprocal in [col, row]
    } else {
      newMatrix[currentCell.col][currentCell.row] = 0; // Handle zero case if needed
    }

    setMatrix(newMatrix);
    setOpenDialog(false);
  };

  const handleBlur = () => {
    if (newValue) {
      handleValueChange(newValue);
    }
  };

  // List of reciprocal fractions
  const fractions = [1 / 9, 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 1 / 3, 1 / 2];

  return (
    <section id="section4" className="section bg-light d-flex flex-column p-3">
      <Typography
        variant="h4"
        component="header"
        sx={{ color: "black", mb: 2 }}
      >
        Alternative Matrix
      </Typography>

      {alternatives.length < 2 ? (
        <Box sx={{ textAlign: "center", color: "#757575" }}>
          <Typography variant="body1">
            You need at least 2 alternatives to generate the matrix.
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
            {/* <Box
              sx={{
                backgroundColor: "#626262", // Dark background color
                color: "white", // White text color for contrast
                borderRadius: "8px",
                padding: "16px",
                flexBasis: "25%", // Takes 1/4 of the width
                boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                textAlign: "left",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                className="mb-5"
                sx={{ fontWeight: "bold" }}
              >
                AHP Scale:
              </Typography>
              <Typography
                className="mb-3"
                variant="body2"
                sx={{ marginTop: "8px" }}
              >
                <strong>1:</strong> Equal Importance
              </Typography>
              <Typography className="mb-3" variant="body2">
                <strong>3:</strong> Moderate Importance
              </Typography>
              <Typography className="mb-3" variant="body2">
                <strong>5:</strong> Strong Importance
              </Typography>
              <Typography className="mb-3" variant="body2">
                <strong>7:</strong> Very Strong Importance
              </Typography>
              <Typography variant="body2">
                <strong>9:</strong> Extreme Importance
              </Typography>
            </Box> */}
            {criteria.map((criterion, index) => (
              <>
                <Typography
                  key={index}
                  variant="h5"
                  sx={{
                    color: "black",
                    mb: 2,
                    textDecoration: "underline",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  {criterion}
                </Typography>
                <Box sx={{ display: "flex", width: "100%" }}>
                  {/* Table Container - takes 3/4 of the width */}
                  <TableContainer
                    component={Paper}
                    sx={{
                      backgroundColor: "#f3f6f9",
                      border: "1px solid #e0e0e0",
                      boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                      flexBasis: "75%", // Takes 3/4 of the width
                      marginRight: "16px", // Adds space between the table and instructions
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                          <TableCell
                            sx={{ fontWeight: "bold", color: "#1976d2" }}
                          ></TableCell>
                          {alternatives.map((criterion, index) => (
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
                        {matrix.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            <TableCell
                              sx={{ fontWeight: "bold", color: "#1976d2" }}
                            >
                              {alternatives[rowIndex]}
                            </TableCell>
                            {row.map((cellValue, colIndex) => (
                              <TableCell
                                key={colIndex}
                                sx={{
                                  color: "#424242",
                                  cursor:
                                    rowIndex !== colIndex
                                      ? "pointer"
                                      : "default",
                                  backgroundColor:
                                    rowIndex === colIndex ? "#e3f2fd" : "white",
                                }}
                                onClick={() =>
                                  handleCellClick(rowIndex, colIndex)
                                }
                              >
                                {rowIndex === colIndex ? (
                                  "1"
                                ) : (
                                  <MathJax.Context>
                                    <MathJax.Node>
                                      {Number.isInteger(cellValue)
                                        ? cellValue
                                        : `\\frac{1}{${(1 / cellValue).toFixed(
                                            0
                                          )}}`}
                                    </MathJax.Node>
                                  </MathJax.Context>
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </>
            ))}
          </Box>
        </>
      )}

      {/* Dialog for selecting values */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        {/* Update the title to show the names of the row and column */}
        <DialogTitle>
          How much do you prefer{" "}
          <strong>{alternatives[currentCell.row]}</strong> compared to{" "}
          <strong>{alternatives[currentCell.col]}</strong>?
        </DialogTitle>
        <DialogContent sx={{ minWidth: 200, minHeight: 150 }}>
          <FormControl fullWidth>
            <InputLabel className="pt-2"></InputLabel>
            <Select
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              label="Value"
              onBlur={handleBlur}
            >
              {fractions.map((fraction, index) => (
                <MenuItem key={index} value={fraction}>
                  {`1/${(1 / fraction).toFixed(0)}`}
                </MenuItem>
              ))}
              {Array.from({ length: 9 }, (_, index) => index + 1).map(
                (value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleValueChange(newValue)} color="primary">
            Set Value
          </Button>
        </DialogActions>
      </Dialog>

      {/* Save Matrix Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Dispatch action to save the matrix to the Redux store
            dispatch(save(matrix));
          }}
          sx={{ textTransform: "none", padding: "10px 20px" }}
        >
          Save Matrix
        </Button>
      </Box>
    </section>
  );
}

export default AlternativeMatrix;
