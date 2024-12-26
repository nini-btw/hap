import { useSelector } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import SaveDataButton from "./SaveDataButton";

const AlternativeResult = () => {
  const p = useSelector((state) => state.alternatives.overallPriorities);
  const w = useSelector((state) => state.alternatives.weights);
  const n = useSelector((state) => state.alternatives.normalizedMatrices);
  const a = useSelector((state) => state.alternatives.bestAlternative);
  const g = useSelector((state) => state.value.goal);
  const criteria = useSelector((state) => state.value.criteria); // Array of criterion names
  const alternatives = useSelector((state) => state.value.alternatives); // Array of alternative names
  console.log(a, n, w, p);

  return (
    <>
      <Box
        sx={{
          margin: "20px auto",
          padding: "20px",
          width: "90%",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Alternative Results
        </Typography>

        {/* Display Goal */}
        <Card
          sx={{
            mb: 4,
            padding: "10px",
            backgroundColor: "#19AFD1",
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography variant="h5" color="fff">
              Goal:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              {g || "No goal has been set"}
            </Typography>
          </CardContent>
        </Card>

        {/* Display Best Alternative */}
        <Box
          sx={{
            padding: "10px",
            backgroundColor: "#19D1B7",
            textAlign: "center",
            borderRadius: "4px",
            mb: 4,
          }}
        >
          <Typography variant="h5" color="fff">
            Best Alternative
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
            {alternatives[a] || "No goal has been set"}
          </Typography>
        </Box>

        {/* Display Overall Priorities */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Overall Priorities
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {alternatives.map((alt, index) => (
                    <TableCell key={index}>{alt}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {p.map((value, index) => (
                    <TableCell key={index}>{value.toFixed(3)}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Display Weights */}
        {Object.keys(w).length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Weights for Criteria
            </Typography>
            {criteria.map((criterion, idx) => (
              <Box key={idx} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {criterion}
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {alternatives.map((alt, colIndex) => (
                          <TableCell key={colIndex}>{alt}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {w[criterion]?.map((value, colIndex) => (
                          <TableCell key={colIndex}>
                            {value.toFixed(3)}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))}
          </Box>
        )}

        <SaveDataButton />
      </Box>
    </>
  );
};

export default AlternativeResult;
