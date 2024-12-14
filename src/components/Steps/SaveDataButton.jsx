import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const SaveDataButton = () => {
  // Access data from Redux store
  const value = useSelector((state) => state.value); // valueSlice
  const criteria = useSelector((state) => state.criteria);
  const alternatives = useSelector((state) => state.alternatives);

  // Function to save data as a JSON file
  const handleSaveData = () => {
    const allData = {
      value,
      criteria,
      alternatives,
    };

    // Convert data to JSON string
    const jsonData = JSON.stringify(allData, null, 2);

    // Create a blob object
    const blob = new Blob([jsonData], { type: "application/json" });

    // Create a temporary anchor element to trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "store_data.json";
    a.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveData}
        sx={{
          textTransform: "none",
          padding: "10px 20px",
          textAlign: "center",
          width: "100%",
        }}
      >
        Save Data as JSON
      </Button>
    </>
  );
};

export default SaveDataButton;
