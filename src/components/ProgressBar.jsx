import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useMediaQuery } from "@mui/material";
import { resetAll } from "../rtk/store";

// Your custom step components
import Goal from "./Steps/Goal";
import Criteria from "./Steps/Criteria";
import CriteriaMatrix from "./Steps/CriteriaMatrix";
import CriteriaResult from "./Steps/CriteriaResult";
import Alternative from "./Steps/Alternative";
import AlternativeMatrix from "./Steps/AlternativeMatrix";
import AlternativeResult from "./Steps/AlternativeResult";
import SubCriteria from "./Steps/SubCriteria";
import SubCriteriaResult from "./Steps/SubCriteriaResult";
import SubCriteriaAlternative from "./Steps/SubCriteriaAlternative";
import { useDispatch } from "react-redux";

// Import your custom SASS styles
import "../style/calc.sass";

export default function ProgressBar() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const steps = useSelector((state) => state.stepValidation.steps);
  const isSmallScreen = useMediaQuery("(max-width:960px)");

  const stepKeys = Object.keys(steps);
  const isLastStep = activeStep === stepKeys.length - 1;
  const currentStep = steps[stepKeys[activeStep]];
  const isStepValid = currentStep.valid;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      let nextStep = prevActiveStep + 1;
      while (
        nextStep < stepKeys.length &&
        steps[stepKeys[nextStep]].skippable
      ) {
        nextStep++;
      }
      return nextStep;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      let prevStep = prevActiveStep - 1;
      while (prevStep >= 0 && steps[stepKeys[prevStep]].skippable) {
        prevStep--;
      }
      return prevStep;
    });
  };

  const handleReset = () => {
    dispatch(resetAll());
    setActiveStep(0);
  };

  const stepComponents = {
    goal: <Goal />,
    criteria: <Criteria />,
    criteriaMatrix: <CriteriaMatrix />,
    criteriaResult: <CriteriaResult />,
    subCriteria: <SubCriteria />,
    subCriteriaResult: <SubCriteriaResult />,
    alternative: <Alternative />,
    subCriteriaAlternative: <SubCriteriaAlternative />,
    alternativeMatrix: <AlternativeMatrix />,
    alternativeResult: <AlternativeResult />,
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: isSmallScreen ? "column-reverse" : "",
      }}
      className="mainBox"
    >
      <Box
        className="matrixes"
        sx={{
          flexGrow: 1,
          padding: 0,
          height: isSmallScreen ? "90vh" : "100%",
          overflow: isSmallScreen ? "auto" : "unset",
        }}
      >
        <Box sx={{ margin: 0 }}>{stepComponents[stepKeys[activeStep]]}</Box>
      </Box>

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
          id="homeBtn"
          component={Link}
          to="/"
          onClick={handleReset}
          variant="contained"
          sx={{
            clipPath: isSmallScreen
              ? "none"
              : "polygon(100% 0, 100% 100%, 0 0)", // Apply triangle shape only for larger screens
            zIndex: "2",
            boxShadow: 0,
            marginRight: isSmallScreen ? "1rem" : "0",
            marginLeft: isSmallScreen ? "1rem" : "0",
            width: isSmallScreen ? "5rem" : "7rem", // Adjust size based on screen
            height: isSmallScreen ? "3rem" : "7rem", // Ensure square base for triangle
            marginBottom: !isSmallScreen ? "1rem" : "",
            position: !isSmallScreen ? "absolute" : "",
            top: !isSmallScreen ? "0rem" : "",
            right: !isSmallScreen ? "0rem" : "",
            backgroundColor: "primary.main",
            borderRadius: isSmallScreen ? ".5rem" : "0",
          }}
        >
          <HomeIcon
            sx={{
              scale: "130%",
              position: !isSmallScreen ? "absolute" : "",
              top: !isSmallScreen ? "22px" : "",
              right: !isSmallScreen ? "22px" : "",
            }}
          />
        </Button>

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
                width: `${((activeStep + 1) / stepKeys.length) * 100}%`,
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
            {stepKeys.map((key) => (
              <Step key={key}>
                <StepLabel sx={{ width: "11rem" }}>
                  {steps[key].label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        <Box
          className="navBtn"
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: isSmallScreen ? 0 : 1,
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
    </Box>
  );
}
