import { useState, useEffect, useRef } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../../rtk/slice/valueSlice";
import { setStepValid } from "../../rtk/slice/stepValidationSlice";

function Criteria() {
  const [rows, setRows] = useState(["c1", "c2", "c3"]); // Local state for rows
  const [newCriteria, setNewCriteria] = useState(""); // Input field value
  const [editIndex, setEditIndex] = useState(null); // Edit mode index
  const dispatch = useDispatch();
  const inputRef = useRef(null); // Ref for input field

  // Get stored data from Redux
  const storedCriteria = useSelector((state) => state.value.criteria);

  // Load data from Redux when component mounts
  useEffect(() => {
    if (Array.isArray(storedCriteria) && storedCriteria.length > 0) {
      setRows(storedCriteria);
    }
  }, [storedCriteria]);

  // Update Redux state whenever rows change
  useEffect(() => {
    dispatch(save({ criteria: rows }));

    // Validate the step
    dispatch(setStepValid({ step: "criteria", valid: rows.length >= 2 }));
  }, [rows, dispatch]);

  const handleAddRow = () => {
    if (newCriteria.trim()) {
      if (editIndex !== null) {
        // Update existing row
        const updatedRows = rows.map((row, index) =>
          index === editIndex ? newCriteria : row
        );
        setRows(updatedRows);
        setEditIndex(null);
      } else {
        // Add new row
        setRows([...rows, newCriteria]);
      }
      setNewCriteria("");
      inputRef.current.focus(); // Refocus input
    }
  };

  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleEditRow = (index) => {
    setNewCriteria(rows[index]);
    setEditIndex(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddRow();
    }
  };

  return (
    <section
      id="section2"
      className="section bg-light d-flex flex-column p-3 justify-content-start"
    >
      <Typography
        variant="h4"
        component="header"
        sx={{ color: "black", mb: 5, mt: 2 }}
        align="center"
      >
        Set Your Criteria
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <TextField
          label={editIndex !== null ? "Edit Criterion" : "Add Criterion"}
          value={newCriteria}
          onChange={(e) => setNewCriteria(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "white",
            "& .MuiInputBase-input": { color: "black" },
          }}
          inputRef={inputRef}
        />
        <Button
          variant="contained"
          onClick={handleAddRow}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          {editIndex !== null ? "Update" : "Add"}
        </Button>
      </Box>

      <TableContainer
        id="table-container"
        component={Paper}
        sx={{
          backgroundColor: "#f3f6f9",
          border: "1px solid #e0e0e0",
          boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          margin: "0 auto",
          paddingBottom: "0",
          maxHeight: "400px", // Add a max height to make scrolling work
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Criteria
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  width: "1px",
                  whiteSpace: "nowrap",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{ textAlign: "center", color: "#757575" }}
                >
                  You have to add data.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#424242" }}>{row}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => handleEditRow(index)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveRow(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}

export default Criteria;
