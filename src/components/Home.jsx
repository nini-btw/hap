import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Typography } from "@mui/material";
import "../style/home.sass";
import ProgressBar from "./ProgressBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

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
          <div className="bar text-black">
            <ThemeProvider theme={lightTheme}>
              <ProgressBar />
            </ThemeProvider>
          </div>
        </Col>

        {/* Main Content */}
        <Col xs={12} md={9}>
          <div className="hap">
            <section
              id="section1"
              className="section bg-primary d-flex flex-column p-3"
            >
              <Typography variant="h2">Section 1: Set Your Goal</Typography>
              <TextField
                sx={{ mt: 1, mr: 1 }}
                label="Enter your text"
                variant="outlined" // Can also use 'filled' or 'standard'
                fullWidth // Optional, makes the text field take up full width
                margin="normal" // Adds spacing around the text field
              />
            </section>
            <section id="section2" className="section bg-secondary">
              <Typography variant="h2">Section 2: Add Criteria</Typography>
            </section>
            <section id="section3" className="section bg-danger">
              <Typography variant="h2">Section 3: Enter Data</Typography>
            </section>
            <section id="section4" className="section bg-success">
              <Typography variant="h2">Section 4: Result</Typography>
            </section>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
