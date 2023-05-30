import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Mypage from "./pages/Mypage";
import Anchor from "./components/Sidebar";
import { ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { themes } from "../src/themes";
import { QueryClient, QueryClientProvider } from "react-query";
// import settingCookie from "./util/settingCookie";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { themeState } from "./states/common";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });
  const theme = useRecoilValue(themeState);

  const isLogin = () => {
    // const token = settingCookie("get-access");
    // // 로그인이 되어있다면
    // if (token !== undefined) {
    //   const decode = jwt_decode(token);
    //   // dispatch(GET_NAME(decode.nickname));
    // }
  };

  useEffect(() => {
    isLogin();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme === "DARK" ? themes.dark : themes.light}>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/write" element={<Write />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/anchor" element={<Anchor />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
