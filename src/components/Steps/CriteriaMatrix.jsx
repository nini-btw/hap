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
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import MathJax from "react-mathjax2";
import { saveMatrix } from "../../rtk/slice/matrixSlice"; // import the saveMatrix action
import { setStepValid } from "../../rtk/slice/stepValidationSlice"; // Assuming you're using this for validation
import { useMediaQuery } from "@mui/material"; // For responsive screen size handling

function CriteriaMatrix() {
  const criteria = useSelector((state) => state.value.criteria);
  const storedCriteria = useSelector((state) => state.value.criteria.matrix);
  const dispatch = useDispatch();
  const [matrix, setMatrix] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCell, setCurrentCell] = useState({ row: null, col: null });
  const [newValue, setNewValue] = useState(1);
  const isSmallScreen = useMediaQuery("(max-width:960px)"); // Check screen size

  useEffect(() => {
    if (criteria.length >= 2) {
      if (storedCriteria && storedCriteria.length === criteria.length) {
        // Use the stored matrix if it matches the criteria length
        setMatrix(storedCriteria);
      } else {
        // Create a new matrix with diagonal elements as 1
        const newMatrix = criteria.map((_, rowIndex) =>
          criteria.map((_, colIndex) => (rowIndex === colIndex ? 1 : 1))
        );
        setMatrix(newMatrix);
      }
    }
  }, [criteria, storedCriteria]);

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
    <section
      id="section4"
      className="section bg-light d-flex flex-column p-3 gap-4"
    >
      <Typography
        variant="h4"
        component="header"
        sx={{ color: "black", mb: 5 }}
      >
        CRITERIA PAIRWISE
      </Typography>

      {criteria.length < 2 ? (
        <Box sx={{ textAlign: "center", color: "#757575" }}>
          <Typography variant="body1">
            You need at least 2 criteria to generate the matrix.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            gap: "2rem",
            display: "flex",
            width: "100%",
            flexDirection: isSmallScreen ? "column-reverse" : "row",
          }}
        >
          {/* Table Container - takes 3/4 of the width */}
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#f3f6f9",
              border: "1px solid #e0e0e0",
              boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
              flexBasis: isSmallScreen ? "100%" : "75%", // Takes 3/4 of the width
              marginRight: "16px", // Adds space between the table and instructions
              height: "100%",
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
                {matrix.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                      {criteria[rowIndex]}
                    </TableCell>
                    {row.map((cellValue, colIndex) => (
                      <TableCell
                        key={colIndex}
                        sx={{
                          color: "#424242",
                          cursor: rowIndex !== colIndex ? "pointer" : "default",
                          backgroundColor:
                            rowIndex === colIndex ? "#e3f2fd" : "white",
                        }}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                      >
                        {rowIndex === colIndex ? (
                          "1"
                        ) : (
                          <MathJax.Context>
                            <MathJax.Node>
                              {Number.isInteger(cellValue)
                                ? cellValue
                                : `\\frac{1}{${(1 / cellValue).toFixed(0)}}`}
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

          {/* Instruction Box - takes 1/4 of the width */}
          <Box
            sx={{
              backgroundColor: "#626262", // Dark background color
              color: "white", // White text color for contrast
              borderRadius: "8px",
              padding: "16px",
              flexBasis: isSmallScreen ? "100%" : "25%",
              boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
              textAlign: "left",
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
          </Box>
        </Box>
      )}

      {/* Dialog for selecting values */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        {/* Update the title to show the names of the row and column */}
        <DialogTitle>
          How much do you prefer <strong>{criteria[currentCell.row]}</strong>{" "}
          compared to <strong>{criteria[currentCell.col]}</strong>?
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
            dispatch(saveMatrix(matrix));
            dispatch(setStepValid({ step: "criteriaMatrix", valid: true }));
          }}
          sx={{ textTransform: "none", padding: "10px 20px" }}
        >
          Save Matrix
        </Button>
      </Box>
    </section>
  );
}

export default CriteriaMatrix;
