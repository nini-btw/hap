import { Typography, TextField } from "@mui/material";
import { save } from "../../rtk/slice/valueSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function FirstStep() {
  const dispatch = useDispatch();
  // Access the value from the Redux store using useSelector
  const { goal, tableData } = useSelector((state) => state.value);

  console.log("Goal:", goal);
  console.log("Table Data:", tableData);

  // Log the value from Redux store
  useEffect(() => {
    console.log("Goal from Redux store:", goal);
  }, [goal]); // This will log whenever the goal value changes in the store

  const handleChange = (event) => {
    const goalValue = event.target.value;
    dispatch(save({ goal: goalValue })); // Save the goal data under the "goal" key
  };

  return (
    <section id="section1" className="section bg-light d-flex flex-column p-3">
      <Typography
        variant="h4"
        component="header"
        sx={{ color: "black", mb: 2 }}
      >
        Section 1: Set Your Goal
      </Typography>
      <TextField
        onChange={handleChange}
        label="Enter your goal"
        fullWidth
        margin="normal"
        sx={{
          backgroundColor: "white",
          "& .MuiInputBase-input": {
            color: "black", // Text color
          },
          "& .MuiInputLabel-root": {
            color: "gray", // Label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#1976d2", // Label color when focused
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "gray", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#1976d2", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2", // Border color when focused
            },
          },
          "& .MuiInputBase-input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px white inset", // Background color for autofill
            WebkitTextFillColor: "black", // Text color for autofill
            transition: "background-color 5000s ease-in-out 0s", // Prevent autofill background override
          },
        }}
      />
    </section>
  );
}

export default FirstStep;
