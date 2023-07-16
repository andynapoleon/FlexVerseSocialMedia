import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // create theme based on state.mode (dark or light) ONLY when needed (useMemo())
  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline /* this resets css, resets the styling of all HTML elements to a consistent baseline */
        />
        <ThemeProvider
          theme={
            theme
          } /* we're gonna use this theme throughout our application using useTheme() from mui*/
        >
          {/* this is how we set routes for different scences of our application */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
