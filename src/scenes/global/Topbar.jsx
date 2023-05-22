import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate } from "react-router-dom";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
	    const navigate = useNavigate();
const Logout = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('loginStatus')
	localStorage.clear()
	navigate('/login')
};



  return (
    <Box display="flex" justifyContent="space-between" p={2}>

  {/* ICONS */ }
  < Box display = "flex" >
    <IconButton onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === "dark" ? (
        <DarkModeOutlinedIcon />
      ) : (
        <LightModeOutlinedIcon />
      )}
    </IconButton>
	  <IconButton onClick={Logout}>
	  	<LogoutIcon/> 
	  	<p style={{fontSize: "10px"}}>log out </p>
	  </IconButton>
</Box >
    </Box >
  );
};

export default Topbar;
