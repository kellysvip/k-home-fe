import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DarkModeContext } from "./contexts/darkModeContext";
import "./styles/dark.scss"
function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <AuthProvider>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
