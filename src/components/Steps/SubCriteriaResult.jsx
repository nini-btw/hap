import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

function SubCriteriaResult() {
  const nm = useSelector((state) => state.subCriteria.normalizedMatrix); //get normalized matrices from redux store
  const w = useSelector((state) => state.subCriteria.weights); //get weights
  const subCriteria = useSelector((state) => state.value.subCriteria); //get weights

  return (
    <>
      <section
        id="section11"
        className="section bg-light d-flex flex-column p-3"
      >
        <Typography component="header" sx={{ color: "black" }} variant="h4">
          Sub Criteria Result
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mt: "3rem",
          }}
        >
          <Box
            className="norms"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography
              component="h2"
              sx={{ color: "black", mb: 2, textDecoration: "underline" }}
              variant="h5"
            >
              Normalized Matrices
            </Typography>
            {Object.keys(nm).map((e, i) => {
              return (
                <>
                  <TableContainer
                    component={Paper}
                    sx={{
                      backgroundColor: "#f3f6f9",
                      border: "1px solid #e0e0e0",
                      boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                      marginRight: "16px",
                      width: "100%",
                      marginBottom: "1rem",
                    }}
                  >
                    <h3
                      style={{
                        textAlign: "center",
                        color: "#1976d2",
                        fontWeight: "bold",
                        marginTop: "16px",
                      }}
                    >
                      {e}
                    </h3>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                          <TableCell
                            sx={{ fontWeight: "bold", color: "#1976d2" }}
                          ></TableCell>
                          {subCriteria[e].map((s) => {
                            return (
                              <>
                                <TableCell
                                  sx={{ fontWeight: "bold", color: "#1976d2" }}
                                >
                                  {s}
                                </TableCell>
                              </>
                            );
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.values(nm)[i].map((row, rowIndex) => {
                          return (
                            <>
                              <TableRow key={rowIndex}>
                                <TableCell>
                                  {subCriteria[e][rowIndex]}
                                </TableCell>
                                {row.map((col) => {
                                  return (
                                    <>
                                      <TableCell>{col.toFixed(3)}</TableCell>
                                    </>
                                  );
                                })}
                              </TableRow>
                            </>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              );
            })}
          </Box>
          <Box
            className="weights"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              mt: "2rem",
            }}
          >
            <Typography
              component="h2"
              sx={{ color: "black", mb: 2, textDecoration: "underline" }}
              variant="h5"
            >
              Weights
            </Typography>
            {Object.keys(w).map((e) => {
              return (
                <>
                  <TableContainer
                    component={Paper}
                    sx={{
                      backgroundColor: "#f3f6f9",
                      border: "1px solid #e0e0e0",
                      boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                      marginRight: "16px",
                      width: "100%",
                      marginBottom: "1rem",
                    }}
                  >
                    <h3
                      style={{
                        textAlign: "center",
                        color: "#1976d2",
                        fontWeight: "bold",
                        marginTop: "16px",
                      }}
                    >
                      {e}
                    </h3>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                          <TableCell
                            sx={{ fontWeight: "bold", color: "#1976d2" }}
                          >
                            Sub Criteria
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", color: "#1976d2" }}
                          >
                            Weights
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {subCriteria[e].map((s, i) => {
                          return (
                            <>
                              <TableRow>
                                <TableCell>{s}</TableCell>
                                <TableCell>{w[e][i].toFixed(3)}</TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              );
            })}
          </Box>
        </Box>
      </section>
    </>
  );
}
export default SubCriteriaResult;
