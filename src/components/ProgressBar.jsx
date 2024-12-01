import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  { label: "Step One", description: `Set Your Goal`, id: "section1" },
  {
    label: "Step Two",
    description: `Add Criteria and Alternatives`,
    id: "section2",
  },
  { label: "Step Three", description: `Enter Data`, id: "section3" },
  { label: "Final Step", description: `Result`, id: "section4" },
];

export default function ProgressBar() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      const nextStep = prevActiveStep + 1;
      // Check if the next step exists before scrolling
      if (steps[nextStep]) scrollToSection(steps[nextStep]?.id);
      return nextStep;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      const previousStep = prevActiveStep - 1;
      // Check if the previous step exists before scrolling
      if (steps[previousStep]) scrollToSection(steps[previousStep]?.id);
      return previousStep;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    scrollToSection(steps[0]?.id);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          "& .MuiStep-root": {
            marginBottom: 2,
            paddingTop: 1,
          },
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent
              sx={{
                minHeight: "90vh", // Full viewport height
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // Center content vertically
              }}
            >
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  disabled={index === steps.length - 1}
                >
                  {index === steps.length - 1 ? "Finish" : "Continue"}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
