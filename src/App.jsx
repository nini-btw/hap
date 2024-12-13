import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/Home";
import Landing from "./components/Landing";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/Home" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
