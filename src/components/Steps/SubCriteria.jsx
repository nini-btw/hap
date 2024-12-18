import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const SubCriteria = () => {
  // Accessing subCriteria from Redux state
  const subCriteria = useSelector((state) => state.value.subCriteria);

  // Render a matrix for each criterion
  const renderMatrix = (criterion, subCriteriaList) => {
    return (
      <TableContainer
        component={Paper}
        key={criterion}
        style={{ marginBottom: "20px" }}
      >
        <h3 style={{ textAlign: "center" }}>{criterion}</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell> {/* Empty corner cell */}
              {subCriteriaList.map((sub, index) => (
                <TableCell key={index} align="center">
                  {sub}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {subCriteriaList.map((rowSub, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell align="center">{rowSub}</TableCell>
                {subCriteriaList.map((colSub, colIndex) => (
                  <TableCell key={colIndex} align="center">
                    {/* Editable Input or Placeholder */}
                    <input
                      type="text"
                      style={{
                        width: "50px",
                        textAlign: "center",
                      }}
                      defaultValue={rowSub === colSub ? "1" : ""}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div>
      {Object.keys(subCriteria).map((criterion) =>
        renderMatrix(criterion, subCriteria[criterion])
      )}
    </div>
  );
};

export default SubCriteria;
