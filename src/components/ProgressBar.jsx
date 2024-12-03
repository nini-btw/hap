import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";

// Define the steps with their associated section IDs
const steps = [
  { label: "Step One", description: "Set Your Goal", id: "section1" },
  {
    label: "Step Two",
    description: "Add Criteria and Alternatives",
    id: "section2",
  },
  { label: "Step Three", description: "Enter Data", id: "section3" },
  { label: "Final Step", description: "Result", id: "section4" },
];

export default function ProgressBar() {
  const [activeStep, setActiveStep] = React.useState(0);

  // Create a reference for each section
  const sectionRefs = {
    section1: useRef(null),
    section2: useRef(null),
    section3: useRef(null),
    section4: useRef(null),
  };

  // Function to scroll to a specific section
  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId]?.current) {
      sectionRefs[sectionId].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    if (steps[nextStep]) scrollToSection(steps[nextStep].id);
  };

  const handleBack = () => {
    const previousStep = activeStep - 1;
    setActiveStep(previousStep);
    if (steps[previousStep]) scrollToSection(steps[previousStep].id);
  };

  const handleReset = () => {
    setActiveStep(0);
    scrollToSection(steps[0].id);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
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
        <Box sx={{ p: 3 }}>
          <Typography>All steps completed - you are finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Box>
      )}

      {/* Invisible sections */}
      <div
        ref={sectionRefs.section1}
        id="section1"
        style={{
          height: "100vh",
          backgroundColor: "#f0f0f0",
          visibility: "hidden", // Makes it invisible but still takes space
        }}
      >
        <h2>Step 1: Set Your Goal</h2>
      </div>
      <div
        ref={sectionRefs.section2}
        id="section2"
        style={{
          height: "100vh",
          backgroundColor: "#d0d0d0",
          visibility: "hidden",
        }}
      >
        <h2>Step 2: Add Criteria and Alternatives</h2>
      </div>
      <div
        ref={sectionRefs.section3}
        id="section3"
        style={{
          height: "100vh",
          backgroundColor: "#b0b0b0",
          visibility: "hidden",
        }}
      >
        <h2>Step 3: Enter Data</h2>
      </div>
      <div
        ref={sectionRefs.section4}
        id="section4"
        style={{
          height: "100vh",
          backgroundColor: "#909090",
          visibility: "hidden",
        }}
      >
        <h2>Final Step: Result</h2>
      </div>
    </Box>
  );
}
