import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Anchor from "./components/Sidebar";
import { ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import { RecoilRoot } from "recoil";
import { themes } from "../src/themes";

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={themes.light}>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/write" element={<Write />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/anchor" element={<Anchor />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
