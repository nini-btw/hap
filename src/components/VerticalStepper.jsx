import { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";

const VerticalStepper = () => {
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {activeStep === steps.length ? (
          <Typography>All steps completed - you&apos;re finished!</Typography>
        ) : (
          <>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">{`Step ${
                activeStep + 1
              } content`}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default VerticalStepper;
