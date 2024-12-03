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
import { useDispatch } from "react-redux";
import { save } from "../../rtk/slice/valueSlice";

function SecondStep() {
  const [rows, setRows] = useState([]);
  const [newCriteria, setNewCriteria] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const dispatch = useDispatch();
  const inputRef = useRef(null); // To keep track of the input field reference

  const handleAddRow = () => {
    if (newCriteria.trim()) {
      const tableContainer = document.querySelector("#table-container");

      // Save the current scroll position before adding a new row
      const scrollPosition = tableContainer.scrollTop;

      if (editIndex !== null) {
        const updatedRows = rows.map((row, index) =>
          index === editIndex ? newCriteria : row
        );
        setRows(updatedRows);
        setEditIndex(null);
      } else {
        setRows([...rows, newCriteria]);
      }
      setNewCriteria("");

      // Restore the scroll position after updating rows
      setTimeout(() => {
        tableContainer.scrollTop = scrollPosition;
      }, 0);

      // Refocus on the input field after adding an item
      inputRef.current.focus();
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

  // Save table data to Redux store whenever it changes
  useEffect(() => {
    dispatch(
      save({
        tableData: rows, // Save the table data under the "tableData" key
      })
    );
  }, [rows, dispatch]);

  // Handle Enter key press to submit the value
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddRow();
    }
  };

  return (
    <section id="section2" className="section bg-light d-flex flex-column p-3">
      <Typography
        variant="h4"
        component="header"
        sx={{ color: "black", mb: 2 }}
        align="center"
      >
        Section 2: Set Your Criteria
      </Typography>

      <div
        style={{
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
          onKeyDown={handleKeyDown} // Handle Enter key
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "white",
            "& .MuiInputBase-input": { color: "black" },
            "& .MuiInputLabel-root": { color: "gray" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#1976d2" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "gray" },
              "&:hover fieldset": { borderColor: "#1976d2" },
              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
            },
          }}
          inputRef={inputRef} // Set the reference to input
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
      </div>

      <TableContainer
        id="table-container"
        component={Paper}
        sx={{
          backgroundColor: "#f3f6f9",
          border: "1px solid #e0e0e0",
          boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          margin: "0 auto",
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
                <TableRow
                  key={index}
                  sx={
                    index === rows.length - 1
                      ? { "& td": { borderBottom: "none" } }
                      : {}
                  }
                >
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

export default SecondStep;