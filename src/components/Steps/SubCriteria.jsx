import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useMediaQuery,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem,
} from "@mui/material";
import MathJax from "react-mathjax2";
import { setStepValid } from "../../rtk/slice/stepValidationSlice"; // Assuming you're using this for validation
import { useSelector, useDispatch } from "react-redux";
import {
  calculateNormalizedMatrices,
  saveSubCriteriaMatrices,
} from "../../rtk/slice/subCriteriaSlice";
const SubCriteria = () => {
  const subCriteria = useSelector((state) => state.value.subCriteria);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();

  const createMatrix = (size) =>
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(1));

  const [matrices, setMatrices] = useState(
    Object.keys(subCriteria).reduce((acc, criterion) => {
      acc[criterion] = createMatrix(subCriteria[criterion].length);
      return acc;
    }, {})
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [currentCell, setCurrentCell] = useState({
    criterion: "",
    row: null,
    col: null,
  });
  const [newValue, setNewValue] = useState("");

  const fractions = [1 / 9, 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 1 / 3, 1 / 2];

  const handleCellClick = (criterion, row, col) => {
    setCurrentCell({ criterion, row, col });
    setNewValue(matrices[criterion][row][col] || "");
    setOpenDialog(true);
  };

  const handleValueChange = (value) => {
    const { criterion, row, col } = currentCell;

    setMatrices((prev) => {
      const updatedMatrix = [...prev[criterion]];
      updatedMatrix[row][col] = value;
      updatedMatrix[col][row] = (1 / value).toFixed(2); // Reciprocal
      return { ...prev, [criterion]: updatedMatrix };
    });

    setOpenDialog(false);
  };

  const renderMatrix = (criterion, subCriteriaList) => {
    if (subCriteriaList.length < 2) {
      return (
        <Typography
          key={criterion}
          sx={{
            color: "#d32f2f",
            fontWeight: "bold",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          {`"${criterion}" must have at least 2 sub-criteria to create a matrix.`}
        </Typography>
      );
    }

    return (
      <>
        <TableContainer
          component={Paper}
          key={criterion}
          sx={{
            marginTop: "1rem",
            backgroundColor: "#f3f6f9",
            border: "1px solid #e0e0e0",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
            flexBasis: isSmallScreen ? "100%" : "75%",
            marginBottom: "3rem",
            height: "auto",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              color: "#1976d2",
              fontWeight: "bold",
              marginTop: "16px",
            }}
          >
            {criterion}
          </h3>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#1976d2" }}
                ></TableCell>
                {subCriteriaList.map((sub, index) => (
                  <TableCell
                    key={index}
                    sx={{ fontWeight: "bold", color: "#1976d2" }}
                  >
                    {sub}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {subCriteriaList.map((rowSub, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    {rowSub}
                  </TableCell>
                  {subCriteriaList.map((colSub, colIndex) => (
                    <TableCell
                      key={colIndex}
                      sx={{
                        color: "#424242",
                        cursor: rowIndex !== colIndex ? "pointer" : "default",
                        backgroundColor:
                          rowIndex === colIndex ? "#e3f2fd" : "white",
                      }}
                      onClick={() =>
                        rowIndex !== colIndex &&
                        handleCellClick(criterion, rowIndex, colIndex)
                      }
                    >
                      {rowIndex === colIndex ? (
                        "1"
                      ) : (
                        <MathJax.Context>
                          <MathJax.Node>
                            {matrices[criterion][rowIndex][colIndex] &&
                            Number.isInteger(
                              matrices[criterion][rowIndex][colIndex]
                            )
                              ? matrices[criterion][rowIndex][colIndex]
                              : matrices[criterion][rowIndex][colIndex] &&
                                matrices[criterion][rowIndex][colIndex] < 1
                              ? // Render as a fraction for values less than 1
                                `\\frac{1}{${(
                                  1 / matrices[criterion][rowIndex][colIndex]
                                ).toFixed(0)}}`
                              : // Render the value as an integer if it's a whole number (even if it's a float)
                                Math.floor(
                                  matrices[criterion][rowIndex][colIndex]
                                )}
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
      </>
    );
  };

  return (
    <div>
      <Typography
        variant="h4"
        component="header"
        align="center"
        style={{
          textAlign: "center",
          color: "#000c27",
          marginTop: "2rem",
          marginBottom: "4rem",
        }}
      >
        Sub Criteria PairWise
      </Typography>
      {Object.keys(subCriteria).map((criterion) =>
        renderMatrix(criterion, subCriteria[criterion])
      )}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Dispatch action to save the matrix to the Redux store
            dispatch(setStepValid({ step: "subCriteria", valid: true }));
            dispatch(saveSubCriteriaMatrices(matrices));
            dispatch(calculateNormalizedMatrices());
          }}
          sx={{ textTransform: "none", padding: "10px 20px" }}
        >
          Save Matrix
        </Button>
      </Box>
      {/* Dialog for setting cell value */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          How much do you prefer{" "}
          <strong>
            {subCriteria[currentCell.criterion]?.[currentCell.row]}
          </strong>{" "}
          compared to{" "}
          <strong>
            {subCriteria[currentCell.criterion]?.[currentCell.col]}
          </strong>
          ?
        </DialogTitle>
        <DialogContent sx={{ minWidth: 200, minHeight: 150 }}>
          <FormControl fullWidth>
            <InputLabel sx={{ paddingTop: "1rem" }}>Select Value</InputLabel>
            <Select
              value={newValue}
              onChange={(e) => setNewValue(parseFloat(e.target.value))}
            >
              {/* Fractional Values */}
              {fractions.map((fraction, index) => (
                <MenuItem key={index} value={fraction}>
                  {`1/${(1 / fraction).toFixed(0)}`}
                </MenuItem>
              ))}
              {/* Integer Values */}
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
          <Button
            onClick={() => handleValueChange(newValue)}
            color="primary"
            disabled={!newValue}
          >
            Set Value
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubCriteria;
