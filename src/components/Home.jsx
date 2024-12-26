import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style/home.sass";
import ProgressBar from "./ProgressBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Light Theme for ProgressBar customization
const lightTheme = createTheme({
  components: {
    MuiStep: {
      styleOverrides: {
        root: {
          "& .MuiStepLabel-root": {
            color: "blue", // Change step label color
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
        <Col xs={12} md={12} className="p-0">
          <div className="bar text-black" style={{}}>
            <ThemeProvider theme={lightTheme}>
              <ProgressBar />
            </ThemeProvider>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
