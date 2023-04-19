import { Box } from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Header from "../../components/Header";
import { mockDataTeam } from "../../data/mockData";
import React,{useState,useEffect} from 'react'
import Axios from 'axios'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  alignItems: "stretch"
}));

const Profile = () => {
  const [data] = React.useState(mockDataTeam);
  const index = 0;

  const [userList,setUserList]=useState([]);
  
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
                alt="profile-user"
                width="200px"
                height="200px"
                src={`../../assets/user.jpg`}
                style={{ cursor: "pointer", borderRadius: "75%" }}
              />
            </Box>
            <Box className="name" display="flex" justifyContent="center">
              <h1> {data[index].name}</h1>
            </Box>
            <Box className="title" display="flex" justifyContent="center">
            <h3> {data[index].title}</h3>
            </Box>
            
            <Box className="bio" display="flex" justifyContent="center" paddingLeft={10} paddingRight={10}>
              
            </Box>
          </div>
          <div className="col-md-6">

            <Grid margin={5} rowSpacing={1} container spacing={2}>
              <Grid xs={4}>
                <Item> Email: {data[index].email}</Item>
              </Grid>
              <Grid xs={4}>
                <Item>Age: {data[index].age}</Item>
              </Grid>
              <Grid xs={4}>
                <Item>Birthday: {data[index].birthday}</Item>
              </Grid>
              <Grid xs={4}>
                <Item>Phone: {data[index].phone}</Item>
              </Grid>
              <Grid xs={4}>
                <Item>Location: {data[index].city + ", " + data[index].state}</Item>
              </Grid>
              <Grid xs={4}>
                <Item>Access: {data[index].access}</Item>
              </Grid>
              
            </Grid>

          </div>
        </form>

      </div>
    </>
    // <Box m="20px">
    // <Header title="Profile" subtitle="Your Account" />
    // <Header title="default_user"/>
    // <Box display="flex" justifyContent="left" alignItems="left">
    //   <img
    //       alt="profile-user"
    //       width="300px"
    //       height="300px"
    //       src={`../../assets/user.jpg`}
    //       style={{ cursor: "pointer", borderRadius: "75%" }}
    //   />
    //   </Box>
    //     <Header title="Bio"/>

    // </Box>
  );
};

export default Profile;
