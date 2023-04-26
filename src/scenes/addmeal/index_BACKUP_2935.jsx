import * as React from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Axios from 'axios'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useState,useEffect} from 'react'
import Header from "../../components/Header";
import MealPortionList from './mealPortionList';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useNavigate} from 'react-router-dom';
import FormData from 'form-data';

const AddMeal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mealPortions, setMealPortions] = useState([])
  const [mealOptions, setMealOptions] = useState([])
  const navigate = useNavigate();
  var numPortions = mealPortions.length;

  useEffect(()=>{
    Axios.get("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/getFoodNames").then((data)=>{
      setMealOptions(data.data)
      console.log(data.data)
    });
  },[]);

  function handleAddPortion(e) {
    const name = "addedPort";
    if (name === '') return;
    if (mealOptions === []) return;
    setMealPortions(prevPorts => {
      return [...prevPorts, { id: numPortions, name: name, value: "Apple", servVal: 0, options: mealOptions}]
    })
    numPortions = numPortions + 1;
  }

  function onImageUpload(e) {
    let image = new FormData();
    image.append('file', e.target.file, e.target.file.name);
    console.log("Got Image!");
    /*Axios.post("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/detectFood",
      image,
      headers: {
	'accept': 'application/json',
	'Accept-Language': 'en-US,en;q=0.8',
	'Content-Type': `multipart/form-data; bondary=${image._boundary}`,
      }
    ).then((response) => {
	    console.log(response);
    }); */
  } 

  function changeSelect(id, newSelect) {
    const newPorts = [...mealPortions]
    const port = newPorts.find(mealPortion => mealPortion.id === id)
    port.value = newSelect
    setMealPortions(newPorts)
  }

  function changeServings(id, newServing) {
    const newPorts = [...mealPortions]
    const port = newPorts.find(mealPortion => mealPortion.id === id)
    port.servVal = newServing
    setMealPortions(newPorts)
  }

  const submit = (e) => {
    const portionsList = []
    mealPortions.forEach(ports => { 
      portionsList.push({foodID: ports.value, servings: parseInt(ports.servVal)})
    })
    console.log(portionsList)
    Axios.post("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/AddMeal",
      { portionArray: portionsList }
    ).then((response) => {
      if(response.data.message) {
        console.log(response.data.message)
      }
      else {
	navigate('/dashboardnpm')
      }
    })
  }
	return (
	<>
<<<<<<< HEAD
    <Box m="20px">
=======
	 <Box m="10px"
   sx={{ borderBottom: 3, borderRight: 5, borderColor: 'primary.main', borderRadius: '13px' }}
             backgroundColor={colors.boxColor.main}
             display="flex"
             alignItems="center"
             justifyContent="center"
           >
>>>>>>> 236ccc78f11d9efc1d97c8728f874867ed6ebb6c
      <Header
        title="Add a Meal"
	subtitle="Use this page to add a meal to your account"
	color={colors.headingColor.main}
	sx={{"ml": "30px"}}>
      </Header>
    </Box>
    <Box m="20px"
      p="10px"
      width="300px"
      backgroundColor={colors.boxColor.main}>
      *BETA* Try our Food Detector AI
      <br />
      <input type="file" accept="image/*" onChange={onImageUpload} />
    </Box>
      
    <MealPortionList mealPortions={mealPortions} changeSelect={changeSelect} changeServings={changeServings}/>
    <Box display="flex">
<<<<<<< HEAD
    <Box m="20px"
      width="200px"
      height="80px"
      backgroundColor={colors.boxColor.main}>
      <Button onClick={handleAddPortion} sx={{ width: 1, height: 1 , "font-size": "20px", color: colors.headingColor.main}}>
=======
    <Box m="10px"
      width="150px"
      height="60px"
      backgroundColor={colors.boxColor.main}>
      <Button onClick={handleAddPortion} sx={{ width: 1, height: 1, borderBottom: 3, borderRight: 5, borderColor: 'primary.main', borderRadius: '13px' }}>
>>>>>>> 236ccc78f11d9efc1d97c8728f874867ed6ebb6c
	Add another Item
        <AddCircleOutlineIcon sx={{ mr: "5px", ml: "10px" }} />

      </Button>
    </Box>
<<<<<<< HEAD
    <Box m="20px"
      width="200px"
      height= "80px"
=======
    <Box m="10px"
      width="150px"
      height= "60px"
>>>>>>> 236ccc78f11d9efc1d97c8728f874867ed6ebb6c
      backgroundColor={colors.boxColor.main}
      sx={{
	'&:hover': {
	  backgroundColor: 'green'
	}, }}>
<<<<<<< HEAD
	<Button sx={{ width: 1, height: 1, "font-size": "20px", color: colors.headingColor.main}} onClick={submit}>
=======
	<Button sx={{ width: 1, height: 1, borderBottom: 3, borderRight: 5, borderColor: 'primary.main', borderRadius: '13px'  }} onClick={submit}>
>>>>>>> 236ccc78f11d9efc1d97c8728f874867ed6ebb6c
	Submit
	<CheckCircleOutlineIcon sx={{ mr:"5px", ml: "5px" }} />
	</Button>
    </Box>
    </Box>
    </>
	);

}
export default AddMeal;
