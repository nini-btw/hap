import { Typography, TextField, Button, Box, Alert } from "@mui/material";
import { save } from "../../rtk/slice/valueSlice";
import { setStepValid } from "../../rtk/slice/stepValidationSlice"; // import the new action
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Debounce function
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function Goal() {
  const dispatch = useDispatch();
  const { goal } = useSelector((state) => state.value);
  const [goalValue, setGoalValue] = useState(goal || "car");
  const [isGoalConfirmed, setIsGoalConfirmed] = useState(false);
  const [error, setError] = useState("");

  // Debounced goal value
  const debouncedGoal = useDebounce(goalValue, 1000);

  // Handle goal confirmation
  const handleConfirmGoal = () => {
    if (!goalValue.trim()) {
      setError("Goal cannot be empty!");
      dispatch(setStepValid({ step: "goal", valid: false })); // Invalid when goal is empty
      return;
    }

    // Save the goal and mark it as confirmed
    dispatch(save({ goal: goalValue }));
    setIsGoalConfirmed(true);
    setError(""); // Reset error message

    // Now that the goal is confirmed, set the validity to true
    dispatch(setStepValid({ step: "goal", valid: true }));
  };

  const handleChangeGoal = () => {
    setIsGoalConfirmed(false); // Allow the user to change the goal again
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleConfirmGoal(); // Confirm the goal when Enter is pressed
    }
  };

  useEffect(() => {
    if (isGoalConfirmed && debouncedGoal !== goal) {
      dispatch(save({ goal: debouncedGoal }));
    }

    // We only update the validity after the goal is confirmed
    if (isGoalConfirmed) {
      dispatch(setStepValid({ step: "goal", valid: !!debouncedGoal.trim() }));
    }
  }, [debouncedGoal, dispatch, goal, isGoalConfirmed]); // Ensure `isGoalConfirmed` is in the dependency array

  const handleChange = (event) => {
    setGoalValue(event.target.value);
  };

  return (
    <section id="section1" className="section bg-light d-flex flex-column p-3">
      <Typography
        variant="h4"
        component="header"
        sx={{ color: "black", mb: 2 }}
      >
        Set Your Goal
      </Typography>

      {/* Goal input field */}
      <TextField
        onChange={handleChange}
        value={goalValue}
        label="Enter your goal"
        fullWidth
        margin="normal"
        disabled={isGoalConfirmed} // Disable input after confirmation
        onKeyDown={handleKeyPress} // Add key press event handler
        defaultValue={"car"}
        sx={{
          backgroundColor: "white",
          "& .MuiInputBase-input": {
            color: "black",
          },
          "& .MuiInputLabel-root": {
            color: "gray",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#1976d2",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "gray",
            },
            "&:hover fieldset": {
              borderColor: "#1976d2",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
            },
          },
          "& .MuiInputBase-input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px white inset",
            WebkitTextFillColor: "black",
            transition: "background-color 5000s ease-in-out 0s",
          },
        }}
      />

      {/* Success message after goal confirmation */}
      {isGoalConfirmed && (
        <Box
          sx={{
            mt: 2,
            backgroundColor: "#e0f7fa",
            padding: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="body1" sx={{ color: "#00796b" }}>
            Goal saved successfully!
          </Typography>
        </Box>
      )}

      {/* Error message */}
      {error && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Buttons */}
      <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
        {!isGoalConfirmed ? (
          <Button
            onClick={handleConfirmGoal}
            variant="contained"
            sx={{ backgroundColor: "#1976d2", color: "white" }}
          >
            Confirm Goal
          </Button>
        ) : (
          <Button
            onClick={handleChangeGoal}
            variant="outlined"
            sx={{ backgroundColor: "white", color: "#1976d2", marginLeft: 2 }}
          >
            Change Goal
          </Button>
        )}
      </Box>
    </section>
  );
}

export default Goal;
