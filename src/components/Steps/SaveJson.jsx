import { useDispatch, useSelector } from "react-redux";
import { saveMatrix } from "../../rtk/slice/matrixSlice"; // Import the saveMatrix action for the matrixSlice
import Button from "@mui/material/Button";

// Function to export the combined data to JSON
const exportToJson = (valueState, matrixState) => {
  const combinedData = {
    goal: valueState.goal,
    criteria: valueState.criteria,
    alternatives: valueState.alternatives,
    matrix: matrixState,
  };

  const jsonData = JSON.stringify(combinedData, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json"; // File name for the exported JSON file
  link.click();
};

function SaveJson() {
  const dispatch = useDispatch();

  // Get the current state from both slices
  const valueState = useSelector((state) => state.value);
  const matrixState = useSelector((state) => state.matrix);

  // Handle the click event
  const handleSaveAndExport = () => {
    // Dispatch action to save the matrix to the Redux store
    dispatch(saveMatrix(matrixState));

    // Trigger the export to JSON
    exportToJson(valueState, matrixState);
  };

  return (
    <>
      <h1>Fifth Step</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveAndExport}
        sx={{ textTransform: "none", padding: "10px 20px", marginTop: "20px" }}
      >
        Save Data and Export to JSON
      </Button>
    </>
  );
}

export default SaveJson;
