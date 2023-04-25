import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Profile from "./scenes/profile";
import Patients from "./scenes/patients";
import Login from "./scenes/login"
import Register from "./scenes/register"
import Meals from "./scenes/meals";
import AddMeal from "./scenes/addmeal";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const showSidebar = 
  location.pathname !== "/login" &&
  location.pathname !== "/" &&
  location.pathname !== "/register";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {showSidebar && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {showSidebar && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/dashboardnpm" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/meals" element={<Meals />} />
              <Route path="/addmeal" element={<AddMeal />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

