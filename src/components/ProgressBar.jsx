import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Goal from "./Steps/Goal";
import Criteria from "./Steps/Criteria";
import CriteriaMatrix from "./Steps/CriteriaMatrix";
import CriteriaResult from "./Steps/CriteriaResult";
import Alternative from "./Steps/Alternative";
import AlternativeMatrix from "./Steps/AlternativeMatrix";

const steps = [
  { key: "goal", label: "Define Goal" },
  { key: "criteria", label: "Set Criteria" },
  { key: "alternative", label: "Add Alternatives" },
  { key: "criteriaMatrix", label: "Criteria Matrix" },
  { key: "criteriaResult", label: "Criteria Result" },
  { key: "alternativeMatrix", label: "Alternative Matrix" },
];

const stepComponents = [
  <Goal key="goal" />,
  <Criteria key="criteria" />,
  <Alternative key="alternative" />,
  <CriteriaMatrix key="criteriaMatrix" />,
  <CriteriaResult key="criteriaResult" />,
  <AlternativeMatrix key="alternativeMatrix" />,
];

export default function ProgressBar() {
  const [activeStep, setActiveStep] = React.useState(0);
  const stepValidation = useSelector((state) => state.stepValidation);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepValid = stepValidation[steps[activeStep].key];

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box
        sx={{
          width: 250,
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          pt: 2,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step) => (
            <Step key={step.key}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: 2,
          }}
        >
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleNext} disabled={!isStepValid}>
            Next
          </Button>
        </Box>
      </Box>

      <Box
        sx={{ flexGrow: 1, padding: 0, height: "100vh", overflow: "hidden" }}
      >
        <Box sx={{ margin: 0 }}>{stepComponents[activeStep]}</Box>
      </Box>
    </Box>
  );
}
