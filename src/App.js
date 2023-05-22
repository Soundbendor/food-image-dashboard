import { useState } from "react";
import { Routes, Route, useLocation, Navigate} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Profile from "./scenes/profile";
import Patients from "./scenes/patients";
import Login from "./scenes/login"
import Register from "./scenes/register"
import Meals from "./scenes/meals";
import AddMeal from "./scenes/addmeal";
import About from "./scenes/about"
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
  const isAuthenticated = localStorage.getItem('loginStatus');
    
const PrivateRoute = ({ children }) => {
 	if(isAuthenticated === null){
		return <Navigate to="/login" />;
	}
	else {
		return children
	}
};
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {showSidebar && <Sidebar isSidebar={isSidebar} />}
          <main className="content" style={{ flexGrow: 1, paddingLeft: "300px" }}>
            {showSidebar && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
	      <Route path="/dashboardnpm" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
              // <Route path="/dashboardnpm" element={<Dashboard />} />
	  	<Route path="/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
              <Route path="/patients" element={<PrivateRoute> <Patients /> </PrivateRoute>} />
              <Route path="/calendar" element={<PrivateRoute> <Calendar /> </PrivateRoute>} />
              <Route path="/meals" element={<PrivateRoute> <Meals /> </PrivateRoute>} />
              <Route path="/addmeal" element={<PrivateRoute> <AddMeal /> </PrivateRoute>} />
              <Route path="/about" element={<PrivateRoute> <About /> </PrivateRoute>} />
	  </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

