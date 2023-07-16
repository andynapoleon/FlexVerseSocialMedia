import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux"; // grab state
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode); // grab a property of state (here is mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // create theme based on state.mode (dark or light) ONLY when needed (useMemo())
  const isAuth = Boolean(useSelector((state) => state.token)); // set to True if the token exists

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
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
