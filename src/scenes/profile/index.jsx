import { Box } from "@mui/material";
import Header from "../../components/Header";

const Profile = () => {
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