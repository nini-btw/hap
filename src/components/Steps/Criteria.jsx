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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../../rtk/slice/valueSlice";
import { saveSubCriteria } from "../../rtk/slice/subCriteriaSlice";
import { setStepValid } from "../../rtk/slice/stepValidationSlice";

function Criteria() {
  const [rows, setRows] = useState([]); // Local state for rows
  const [newCriteria, setNewCriteria] = useState(""); // Input field value
  const [editIndex, setEditIndex] = useState(null); // Edit mode index
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for sub-criteria
  const [selectedCriterion, setSelectedCriterion] = useState(null); // Currently selected criterion for sub-criteria
  const [newSubCriterion, setNewSubCriterion] = useState(""); // Input value for sub-criteria
  const [subCriteria, setSubCriteria] = useState({}); // Local state for sub-criteria
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

  // Update Redux state whenever rows or sub-criteria change
  useEffect(() => {
    dispatch(save({ criteria: rows }));
    dispatch(saveSubCriteria(subCriteria));
    dispatch(setStepValid({ step: "criteria", valid: rows.length >= 2 }));
  }, [rows, subCriteria, dispatch]);

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
    // Remove sub-criteria for the removed criterion
    setSubCriteria((prev) => {
      const updatedSubCriteria = { ...prev };
      delete updatedSubCriteria[rows[index]];
      return updatedSubCriteria;
    });
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

  // Sub-Criteria Management
  const handleOpenDialog = (criterion) => {
    setSelectedCriterion(criterion);
    setNewSubCriterion("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCriterion(null);
    setOpenDialog(false);
  };

  const handleAddSubCriterion = () => {
    if (newSubCriterion.trim()) {
      // Check if the sub-criterion already exists for the selected criterion
      const subList = subCriteria[selectedCriterion] || [];
      if (!subList.includes(newSubCriterion)) {
        // If it doesn't exist, add it to the list
        setSubCriteria((prev) => ({
          ...prev,
          [selectedCriterion]: [...subList, newSubCriterion],
        }));
        setNewSubCriterion(""); // Clear the input field
      } else {
        // Optionally, you can show an alert or message indicating the sub-criterion already exists
        alert("This sub-criterion already exists!");
      }
    }
  };

  const handleRemoveSubCriterion = (criterion, index) => {
    setSubCriteria((prev) => ({
      ...prev,
      [criterion]: prev[criterion].filter((_, i) => i !== index),
    }));
  };

  const renderSubCriteria = (criterion) => {
    const subList = subCriteria[criterion] || [];
    return (
      <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {subList.map((sub, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "40px",
              height: "40px",
              borderRadius: "8px", // Make it a square with rounded corners
              backgroundColor: "#7096bd",
              color: "white",
              textAlign: "center",
              padding: "5px",
            }}
          >
            {sub}
          </Box>
        ))}
      </Box>
    );
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

      <Typography
        variant="caption"
        sx={{ color: "#ccc", mb: 5, mt: 2 }}
        align="center"
      >
        * You have to add 2 criteria at least
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
        component={Paper}
        sx={{
          backgroundColor: "#f3f6f9",
          border: "1px solid #e0e0e0",
          boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          margin: "0 auto",
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
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Sub Criteria
              </TableCell>
              <TableCell
                width={"5rem"}
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  sx={{ textAlign: "center", color: "#757575" }}
                >
                  You have to add data.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#424242" }}>{row}</TableCell>
                  <TableCell>{renderSubCriteria(row)}</TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", gap: "0.5rem", minWidth: "3rem" }}
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
                      <IconButton
                        color="secondary"
                        onClick={() => handleOpenDialog(row)}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Sub-Criteria Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Manage Sub-Criteria for {selectedCriterion}</DialogTitle>
        <DialogContent>
          <TextField
            label="Add Sub-Criterion"
            value={newSubCriterion}
            onChange={(e) => setNewSubCriterion(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            sx={{ marginBottom: "1rem", marginTop: "1rem" }}
            onKeyDown={(e) => e.key === "Enter" && handleAddSubCriterion()}
          />
          <List>
            {(subCriteria[selectedCriterion] || []).map((sub, index) => (
              <ListItem key={index}>
                <ListItemText primary={sub} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() =>
                      handleRemoveSubCriterion(selectedCriterion, index)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default Criteria;
