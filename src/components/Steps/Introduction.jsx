import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Icon from "@mui/icons-material/Add"; // Example Material UI icon
import MySvgComponent from "../../utilities/MySvgComponent";
import { useState } from "react";
import "../../style/svg.sass";
function Introduction() {
  const [hover, setHover] = useState(false);
  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          overflow: "hidden",
          scrollSnapAlign: "start", // Snap to start of the section
          transition: "all 0.8s ease-out", // Smooth transition when scrolling to next section
        }}
      >
        <MySvgComponent />
        <Typography variant="h2" id="h-hap">
          Welcome to the AHP Calculator
        </Typography>
        <Button
          component={Link}
          to="/home"
          variant="contained"
          sx={{
            minWidth: "20rem",
            marginTop: "10rem",
            backgroundColor: "#fff",
            color: "#2E43FA",
            padding: "2rem 5rem",
            fontSize: "1.2rem",
            zIndex: "2",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "#fff",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
            },
            borderRadius: "4rem",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover ? <Icon fontSize="large" /> : "Start AHP"}
        </Button>
      </Box>
    </>
  );
}
export default Introduction;
