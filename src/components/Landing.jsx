import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        overflow: "hidden", // Ensures the SVG fits neatly within the box
        backgroundColor: "#fff",
      }}
    >
      {/* SVG Background */}
      <svg
        id="wave"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transform: "rotate(180deg)",
          zIndex: -1,
          backgroundColor: "#fff",
        }}
        viewBox="0 0 1440 360"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="rgba(62, 162.669, 243, 1)" offset="0%" />
            <stop stopColor="rgba(38.084, 85.24, 255, 1)" offset="100%" />
          </linearGradient>
        </defs>
        <path
          style={{ transform: "translate(0, 0px)", opacity: 1 }}
          fill="url(#sw-gradient-0)"
          d="M0,288L30,288C60,288,120,288,180,276C240,264,300,240,360,204C420,168,480,120,540,120C600,120,660,168,720,168C780,168,840,120,900,108C960,96,1020,120,1080,162C1140,204,1200,264,1260,258C1320,252,1380,180,1440,126C1500,72,1560,36,1620,72C1680,108,1740,216,1800,216C1860,216,1920,108,1980,60C2040,12,2100,24,2160,24C2220,24,2280,12,2340,36C2400,60,2460,120,2520,126C2580,132,2640,84,2700,90C2760,96,2820,156,2880,192C2940,228,3000,240,3060,258C3120,276,3180,300,3240,276C3300,252,3360,180,3420,174C3480,168,3540,228,3600,246C3660,264,3720,240,3780,204C3840,168,3900,120,3960,126C4020,132,4080,192,4140,186C4200,180,4260,108,4290,72L4320,36L4320,360L4290,360C4260,360,4200,360,4140,360C4080,360,4020,360,3960,360C3900,360,3840,360,3780,360C3720,360,3660,360,3600,360C3540,360,3480,360,3420,360C3360,360,3300,360,3240,360C3180,360,3120,360,3060,360C3000,360,2940,360,2880,360C2820,360,2760,360,2700,360C2640,360,2580,360,2520,360C2460,360,2400,360,2340,360C2280,360,2220,360,2160,360C2100,360,2040,360,1980,360C1920,360,1860,360,1800,360C1740,360,1680,360,1620,360C1560,360,1500,360,1440,360C1380,360,1320,360,1260,360C1200,360,1140,360,1080,360C1020,360,960,360,900,360C840,360,780,360,720,360C660,360,600,360,540,360C480,360,420,360,360,360C300,360,240,360,180,360C120,360,60,360,30,360L0,360Z"
        ></path>
      </svg>

      {/* Content */}
      <Typography variant="h2" sx={{ mb: 4, color: "#00051c", zIndex: "2" }}>
        Welcome to Our AHP Application
      </Typography>
      <Button
        component={Link}
        to="/home"
        variant="contained"
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "12px 24px",
          fontSize: "16px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "#3776E6",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        Go to AHP Application
      </Button>
    </Box>
  );
}

export default Landing;
