import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style/home.sass";
import ProgressBar from "./ProgressBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ThirdStep from "./Steps/ThirdStep";
import FourthStep from "./Steps/FourthStep";
import FifthStep from "./Steps/FifthStep";
import StepSix from "./Steps/StepSix";

// Light Theme for ProgressBar customization
const lightTheme = createTheme({
  components: {
    MuiStep: {
      styleOverrides: {
        root: {
          "& .MuiStepLabel-root": {
            color: "blue", // Change step label color
          },
          "&.Mui-completed": {
            color: "green", // Completed step color
          },
        },
      },
    },
  },
});

function Home() {
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col xs={12} md={3}>
          <div
            className="bar text-black"
            style={{
              visibility: "hidden",
            }}
          >
            <ThemeProvider theme={lightTheme}>
              <ProgressBar />
            </ThemeProvider>
          </div>
        </Col>

        {/* Main Content */}
        <Col xs={12} md={9}>
          <div className="hap">
            <FirstStep />
            <SecondStep />
            <ThirdStep />
            <FourthStep />
            <FifthStep />
            <StepSix />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
