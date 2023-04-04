import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import { createTheme, ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import MyPage from "./pages/Mypage";
import ChangePassword from "./pages/ChangePassword";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/write" element={<Write />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
