import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SingleCat from "./components/SingleCat";
import { CssBaseline, Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", margin: 0 }}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<SingleCat />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
