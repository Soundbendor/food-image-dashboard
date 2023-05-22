import React from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MealSpotterLogoDarkMode from "../../assets/mealspotterdarkmode.svg";
import MealSpotterLogoLightMode from "../../assets/mealspotterlightmode.svg";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Profile from "../../assets/profile.png"
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


/*const PrivateRoute = ({ children }) => {
        if(isAuthenticated === null){
                return <Navigate to="/login" />;
        }
        else {
                return children
        }
};*/

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.headingColor.main,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);  
const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
   const userData = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = localStorage.getItem('loginStatus');
	 if(isAuthenticated != null){
	return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        bottom: "0",
        zIndex: "1",
        overflow: "auto",
        "& .pro-sidebar-inner": {
          background: `${colors.sidebarColor.main} !important`,

        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#F97B22 !important",
        },
        "& .pro-menu-item.active": {
          color: "#F97B22 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.sidebarColor.main,
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >

                <div>
                  {theme.palette.mode === "dark" ? (
                    <img src={MealSpotterLogoDarkMode} alt="mealspotter.svg" width="90%" />
                  ) : (
                    <img src={MealSpotterLogoLightMode} alt="mealspotter.svg" width="90%" />
                  )}
                </div>

                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">

                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  href="../profile"
                  src={Profile}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />

              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.headingColor.main}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
		  {userData[0].FName} {userData[0].LName}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboardnpm"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Profile"
              to="/profile"
              icon={<AccountCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Patients Information"
              to="/patients"
              icon={<HealingOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Meals"
              to="/meals"
              icon={<RestaurantIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="About Us"
              to="/about"
              icon={<PeopleAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
	 } else{
		 return <Navigate to="/login" />;
	 }
};

export default Sidebar;
