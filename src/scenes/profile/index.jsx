import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import P_img from "../../assets/profile.png"
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  alignItems: "stretch"
}));
const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userList,setUserList]=useState([]);
const navigate = useNavigate()
	useEffect(()=>{
    Axios.get("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/getUsers").then((data)=>{
      console.log(data)
      setUserList(data.data)
    });
  },[]);
  
  console.log(userList);
  return (
    <>
      <div className="container emp-profile" m="20px">
        <form method="">
          <div paddingLeft={10}>
          </div>
          <div className="col-md-2">
            <Box display="flex" justifyContent="center">
              <img
                width="200px"
                height="200px"
                src = {P_img}
	  	alt="profile-user"
                style={{ cursor: "pointer", borderRadius: "75%" }}
              />
            </Box>
            <Box className="name" display="flex" justifyContent="center">
              
              <Typography
                color={colors.headingColor.main}
                variant="h2"
                fontWeight="600"
              >
                <h1> {userData[0].FName} {userData[0].LName} </h1>
          	       <Button variant="contained" size = 'large' onClick={() => navigate('/editProfile')}  sx={{ width: 150}}>Edit</Button>    
	  </Typography>
                
            </Box>
            <Box className="title" display="flex" justifyContent="center">
            
            <Typography
                color={colors.headingColor.main}
                variant="h5"
                fontWeight="600"
              >
              </Typography>
            </Box>
            
            <Box className="bio" display="flex" justifyContent="center" paddingLeft={10} paddingRight={10}>
              
            </Box>
          </div>
          <div className="col-md-6">

            <Grid margin={5} rowSpacing={1} container spacing={2}>
	      <Grid xs={4}>
                <Item>Username: {userData[0].UserName}</Item>
              </Grid>
              <Grid xs={4}>
                <Item> Email: {userData[0].Email}</Item>
              </Grid>
              <Grid xs={4}>
                <Item>Age: {userData[0].age}</Item>
              </Grid>
              <Grid xs={4}>
                <Item>Birthday: {userData[0].Birthday.slice(0,10)}</Item>
              </Grid>
              <Grid xs={4}>
                <Item>Phone: ({userData[0].PhoneNumber.slice(0,3)}){userData[0].PhoneNumber.slice(3)}</Item>
              </Grid>
              <Grid xs={4}>
                <Item>Location: {userData[0].City + ", " + userData[0].State}</Item>
              </Grid>
            </Grid>

          </div>
        </form>

      </div>
    </>
  );
};

export default Profile;
