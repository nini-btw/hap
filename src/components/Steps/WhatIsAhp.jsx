import { Typography, Box, Paper } from "@mui/material";

function WhatIsAhp() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f7f9fc",
        padding: "4rem",
        scrollSnapAlign: "start", // Snap to start of this section
        transition: "all 0.8s ease-out", // Smooth transition
      }}
    >
      <Typography variant="h3" sx={{ color: "#2E43FA", marginBottom: "2rem" }}>
        What is AHP?
      </Typography>
      <Typography
        variant="h6"
        sx={{
          marginBottom: "3rem",
          maxWidth: "80%",
          textAlign: "center",
        }}
      >
        The Analytic Hierarchy Process (AHP) is a structured technique for
        organizing and analyzing complex decisions, based on mathematics and
        psychology. It helps decision-makers set priorities and make the best
        decision by comparing various options in a multi-criteria environment.
      </Typography>

      {/* Container for the cards */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch", // Ensures equal height
          gap: "1.5rem", // Space between cards
          flexWrap: "wrap", // Wraps cards on smaller screens
          width: "100%",
        }}
      >
        {/* Step 1 Card */}
        <Paper
          sx={{
            padding: "2rem",
            flex: "1 1 calc(33.33% - 1rem)", // Takes up one-third of the row
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "1rem",
            minWidth: "300px", // Minimum width for smaller screens
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#2E43FA", marginBottom: "1rem" }}
          >
            Step 1: Define Criteria
          </Typography>
          <Typography>
            In the first step, identify the criteria and sub-criteria that will
            help in evaluating the alternatives.
          </Typography>
        </Paper>

        {/* Step 2 Card */}
        <Paper
          sx={{
            padding: "2rem",
            flex: "1 1 calc(33.33% - 1rem)", // Takes up one-third of the row
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "1rem",
            minWidth: "300px", // Minimum width for smaller screens
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#2E43FA", marginBottom: "1rem" }}
          >
            Step 2: Rate Alternatives
          </Typography>
          <Typography>
            Rate the alternatives based on each criterion, considering their
            relative importance or performance.
          </Typography>
        </Paper>

        {/* Step 3 Card */}
        <Paper
          sx={{
            padding: "2rem",
            flex: "1 1 calc(33.33% - 1rem)", // Takes up one-third of the row
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "1rem",
            minWidth: "300px", // Minimum width for smaller screens
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#2E43FA", marginBottom: "1rem" }}
          >
            Step 3: Analyze and Make Decision
          </Typography>
          <Typography>
            The final step is to calculate the weight of each alternative based
            on the ratings and make a final decision.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default WhatIsAhp;
