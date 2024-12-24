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
import {
  saveMatrix,
  calculateNormalizedMatrices,
  calculateAlternativeWeights,
  calculateOverallPriorities,
  addW,
} from "../../rtk/slice/alternativeMatrixSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import MathJax from "react-mathjax2";

function AlternativeMatrix() {
  const criteriaWeights = useSelector((state) => state.criteria.weights);
  const alternatives = useSelector((state) => state.value.alternatives);
  const criteria = useSelector((state) => state.value.criteria);
  const dispatch = useDispatch();

  const subCriteria = useSelector((state) => state.value.subCriteria);
  const [matrices, setMatrices] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCell, setCurrentCell] = useState({ row: null, col: null });
  const [currentCriterion, setCurrentCriterion] = useState(null);
  const [newValue, setNewValue] = useState(1);

  useEffect(() => {
    if (alternatives.length >= 2 && criteria.length > 0) {
      const initialMatrices = {};
      criteria.forEach((criterion) => {
        if (!(criterion in subCriteria)) {
          initialMatrices[criterion] = alternatives.map(() =>
            Array(alternatives.length).fill(1)
          );
        }
      });

      setMatrices({
        b: [
          [1, 3, 4],
          [1 / 3, 1, 2],
          [1 / 4, 1 / 2, 1],
        ],
        c: [
          [1, 1 / 2, 1 / 3],
          [2, 1, 1 / 2],
          [3, 2, 1],
        ],
      });
    }
  }, [alternatives, criteria, subCriteria]);

  const calcSubWeight = (sw, asw) => {};

  const handleCellClick = (criterion, row, col) => {
    if (row !== col) {
      setCurrentCriterion(criterion);
      setCurrentCell({ row, col });
      setNewValue(matrices[criterion][row][col]);
      setOpenDialog(true);
    }
  };

  const handleValueChange = (value) => {
    const updatedMatrices = { ...matrices };

    const matrix = updatedMatrices[currentCriterion];
    matrix[currentCell.row][currentCell.col] = value;
    matrix[currentCell.col][currentCell.row] = value !== 0 ? 1 / value : 0; // Handle reciprocal

    updatedMatrices[currentCriterion] = matrix;
    setMatrices(updatedMatrices);
    setOpenDialog(false);
  };

  const handleSaveMatrices = () => {
    Object.keys(matrices).forEach((criterion) => {
      dispatch(
        saveMatrix({
          criterion,
          matrix: matrices[criterion],
        })
      );
    });
    dispatch(calculateNormalizedMatrices());
    dispatch(calculateAlternativeWeights());
    dispatch(calculateOverallPriorities(criteriaWeights));
    dispatch(addW({ key: "a", data: [1, 1, 1] }));
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
        sx={{
          color: "black",
          marginBottom: "3rem !important",
          marginTop: "1rem !important",
        }}
      >
        Alternative Pairwise
      </Typography>

      {alternatives.length < 2 ? (
        <Box sx={{ textAlign: "center", color: "#757575" }}>
          <Typography variant="body1">
            You need at least 2 alternatives to generate the matrix.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 4,
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          {criteria.map((criterion, index) => {
            if (!(criterion in subCriteria)) {
              return (
                <>
                  <div key={index}>
                    <TableContainer
                      component={Paper}
                      sx={{
                        backgroundColor: "#f3f6f9",
                        border: "1px solid #e0e0e0",
                        boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                        flexBasis: "75%",
                        marginRight: "16px",
                        width: "60vw",
                        marginBottom: "1rem",
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
                            {alternatives.map((alt, altIndex) => (
                              <TableCell
                                key={altIndex}
                                sx={{ fontWeight: "bold", color: "#1976d2" }}
                              >
                                {alt}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {matrices[criterion]?.map((row, rowIndex) => {
                            return (
                              <>
                                <TableRow key={rowIndex}>
                                  <TableCell
                                    sx={{
                                      fontWeight: "bold",
                                      color: "#1976d2",
                                    }}
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
                                          rowIndex === colIndex
                                            ? "#e3f2fd"
                                            : "white",
                                        textAlign: "center",
                                      }}
                                      onClick={() =>
                                        handleCellClick(
                                          criterion,
                                          rowIndex,
                                          colIndex
                                        )
                                      }
                                    >
                                      {rowIndex === colIndex ? (
                                        "1"
                                      ) : (
                                        <MathJax.Context>
                                          <MathJax.Node>
                                            {Number.isInteger(cellValue)
                                              ? cellValue
                                              : `\\frac{1}{${(
                                                  1 / cellValue
                                                ).toFixed(0)}}`}
                                          </MathJax.Node>
                                        </MathJax.Context>
                                      )}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              </>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </>
              );
            }
          })}
        </Box>
      )}

      {/* Value Selecting Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
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
          <Box
            sx={{
              backgroundColor: "#fff", // Dark background color
              color: "ccc", // White text color for contrast
              textAlign: "left",
            }}
          >
            <Typography
              variant="body2"
              className="mt-4 mb-2"
              sx={{ fontWeight: "bold" }}
            >
              AHP Scale:
            </Typography>
            <Typography
              className="mb-3"
              variant="caption"
              sx={{ marginRight: "1rem" }}
            >
              <strong>1:</strong> Equal Importance
            </Typography>
            <Typography
              className="mb-3"
              variant="caption"
              sx={{ marginRight: "1rem" }}
            >
              <strong>3:</strong> Moderate Importance
            </Typography>
            <Typography
              sx={{ marginRight: "1rem" }}
              className="mb-3"
              variant="caption"
            >
              <strong>5:</strong> Strong Importance
            </Typography>
            <br />
            <Typography
              sx={{ marginRight: "1rem" }}
              className="mb-3"
              variant="caption"
            >
              <strong>7:</strong> Very Strong Importance
            </Typography>
            <Typography sx={{ marginRight: "1rem" }} variant="caption">
              <strong>9:</strong> Extreme Importance
            </Typography>
          </Box>
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

      {/* Save Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveMatrices}
          sx={{ textTransform: "none", padding: "10px 20px" }}
        >
          Save All Matrices
        </Button>
      </Box>
    </section>
  );
}

export default AlternativeMatrix;
