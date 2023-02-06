import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Profile" subtitle="Your Account" />
      <Header title="default_user"/>
      <Box display="flex" justifyContent="left" alignItems="left">
        <img
            alt="profile-user"
            width="300px"
            height="300px"
            src={`../../assets/user.jpg`}
            style={{ cursor: "pointer", borderRadius: "75%" }}
        />
        </Box>
        <Header title="Bio"/>
      
    </Box>
  );
};

export default Profile;