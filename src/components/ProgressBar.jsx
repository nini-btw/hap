import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux"; // For accessing Redux state
import { Link } from "react-router-dom"; // For navigation
import HomeIcon from "@mui/icons-material/Home"; // Home icon for the button
import { useMediaQuery } from "@mui/material"; // For responsive screen size handling

// Your custom step components
import Goal from "./Steps/Goal";
import Criteria from "./Steps/Criteria";
import CriteriaMatrix from "./Steps/CriteriaMatrix";
import CriteriaResult from "./Steps/CriteriaResult";
import Alternative from "./Steps/Alternative";
import AlternativeMatrix from "./Steps/AlternativeMatrix";
import AlternativeResult from "./Steps/AlternativeResult";
import SubCriteria from "./Steps/SubCriteria";

// Import your custom SASS styles
import "../style/calc.sass";

const steps = [
  { key: "goal", label: "Define Goal" },
  { key: "criteria", label: "Set Criteria" },
  { key: "criteriaMatrix", label: "Criteria Pairwise" },
  { key: "subCriteria", label: "Sub Criteria" },
  { key: "criteriaResult", label: "Criteria Result" },
  { key: "alternative", label: "Add Alternatives" },
  { key: "alternativeMatrix", label: "Alternative Pairwise" },
  { key: "alternativeResult", label: "Alternative Result" },
];

const stepComponents = [
  <Goal key="goal" />,
  <Criteria key="criteria" />,
  <CriteriaMatrix key="criteriaMatrix" />,
  <SubCriteria key="SubCriteria" />,
  <CriteriaResult key="criteriaResult" />,
  <Alternative key="alternative" />,
  <AlternativeMatrix key="alternativeMatrix" />,
  <AlternativeResult key="alternativeResult" />,
];

export default function ProgressBar() {
  const [activeStep, setActiveStep] = React.useState(0);
  const stepValidation = useSelector((state) => state.stepValidation);

  const isSmallScreen = useMediaQuery("(max-width:960px)"); // Check screen size

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isStepValid = stepValidation[steps[activeStep].key];
  const isLastStep = activeStep === steps.length - 1;

  return (
    <Box sx={{ display: "flex", width: "100%" }} className="mainBox">
      <Box
        className="barBox"
        sx={{
          width: isSmallScreen ? "100%" : 250,
          position: "sticky",
          top: 0,
          height: isSmallScreen ? "auto" : "100vh",
          display: "flex",
          flexDirection: isSmallScreen ? "row" : "column",
          alignItems: "center",
          justifyContent: isSmallScreen ? "space-between" : "space-around",
          padding: isSmallScreen ? "10px 0" : "16px 0",
        }}
      >
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            scale: isSmallScreen ? "100%" : "150%",
            zIndex: "2",
            boxShadow: 0,
            marginRight: isSmallScreen ? "1rem" : "0",
          }}
        >
          <HomeIcon />
        </Button>

        {/* Render Stepper or Progress Bar based on screen size */}
        {isSmallScreen ? (
          <Box
            className="progressBar"
            sx={{
              width: "80%",
              height: "10px",
              backgroundColor: "#ddd",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
                height: "100%",
                backgroundColor: "#1976d2",
                borderRadius: "5px",
                transition: "width 0.3s ease",
              }}
            />
          </Box>
        ) : (
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className="stepper"
          >
            {steps.map((step) => (
              <Step key={step.key}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        <Box
          className="navBtn"
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: isSmallScreen ? 0 : 2,
            width: "10rem",
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
          {isLastStep ? (
            <Button onClick={handleReset}>Reset</Button>
          ) : (
            <Button onClick={handleNext} disabled={!isStepValid}>
              Next
            </Button>
          )}
        </Box>
      </Box>

      <Box
        className="matrixes"
        sx={{
          flexGrow: 1,
          padding: 0,
          height: isSmallScreen ? "90vh" : "100%",
          overflow: isSmallScreen ? "auto" : "unset",
        }}
      >
        <Box sx={{ margin: 0 }}>{stepComponents[activeStep]}</Box>
      </Box>
    </Box>
  );
}
