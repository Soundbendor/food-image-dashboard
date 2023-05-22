import * as React from 'react';
import { Box, Button, useTheme, CircularProgress, Fade } from "@mui/material";
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
  const [image, setImage] = useState([]);
  const [responseImage, setResponseImage] = useState([]);
  const [loadAI, setLoadAI] = useState(false);
  const navigate = useNavigate();
  var numPortions = mealPortions.length;

  useEffect(()=>{
    Axios.get("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/getFoodNames").then((data)=>{
      setMealOptions(data.data)
      //console.log(data.data)
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

  function removePortion(id) {
    const newPorts = [...mealPortions]
    const port = newPorts.find(mealPortion => mealPortion.id === id)
    const toRemoveIndex = newPorts.indexOf(port);
    console.log(toRemoveIndex);
    newPorts.splice(toRemoveIndex, 1);
    setMealPortions(newPorts);
  }

   function onImageSubmit(e) {
      const reqImage = new FormData();
      reqImage.append('img_file', image);
      setLoadAI(true);
      fetch("http://ec2-54-244-119-45.us-west-2.compute.amazonaws.com/api/model/detect", {
      method: 'POST',
      body: reqImage,
      mode: 'cors',
        headers: {
	  'Token': 'Capstone-Team'
	}
      }).then((response) => {
      const bboxes = JSON.parse(response.headers.get('bboxes'));
      const labels = bboxes.map(bbox => bbox.class_name);
      console.log(labels);
      const goodLabels = []
      labels.forEach(label => {
	mealOptions.every(option => {
          if (label.localeCompare(option.FoodName) == 0) {
	    goodLabels.push(label);
	    return false;
	    
	  }
	  return true;
	})
      })
      response.blob()
      .then((blob) => {
        setLoadAI(false);
	console.log("Labels: ", goodLabels);
	const name = "AIPort";
	goodLabels.forEach(label => {
	  setMealPortions(prevPorts => {
            return [ ...prevPorts, 
{ id: numPortions, name: name, value: label, servVal: 0, options: mealOptions}]
          })
          numPortions += 1;
        })
	console.log(mealPortions);
	console.log(blob)
	setResponseImage(URL.createObjectURL(blob));
      });
      });

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
    const mealUser = JSON.parse(localStorage.getItem('user'))
    console.log(mealUser);
    const mealUserID = mealUser[0].UserID;
    console.log("Meal User ID: ", mealUserID);
    const portionsList = []
    mealPortions.forEach(ports => { 
      portionsList.push({foodID: ports.value, servings: parseInt(ports.servVal)})
    })
    console.log(portionsList)
    Axios.post("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/AddMeal",
      { portionArray: portionsList,
        userID: mealUserID }
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
	 <Box m="10px"
   sx={{ borderBottom: 3, borderRight: 5, borderColor: 'primary.main', borderRadius: '13px' }}
             backgroundColor={colors.boxColor.main}
             display="flex"
             alignItems="center"
             justifyContent="center"
           >
      <Header
        title="Add a Meal"
	subtitle="Use this page to add a meal to your account"
	color={colors.headingColor.main}
	sx={{"ml": "30px"}}>
      </Header>
    </Box>
    <Box display="flex"
      alignItems="center">
    <Box m="20px"
      p="10px"
      width="300px"
      backgroundColor={colors.boxColor.main}>
      *BETA* Try our Food Detector AI
      <br />
        <input 
	  type="file" 
	  accept="image/*" 
	  name="image"
	  onChange={e => setImage(e.target.files[0])} />
	<Button onClick={e => onImageSubmit(e)} sx={{ color: colors.headingColor.main }}>
	  Detect Food
	</Button>
    </Box>
	<Fade
	  in={loadAI} m="10px"
	  sx={{ color: colors.backgroundColor.main}}>
	  <CircularProgress m="10px" color="secondary" />
	</Fade>
    <img src={responseImage} />
    </Box>
      
    <MealPortionList mealPortions={mealPortions} changeSelect={changeSelect} changeServings={changeServings} removePortion={removePortion}/>
    <Box display="flex">
    <Box m="10px"
      width="150px"
      height="60px"
      backgroundColor={colors.boxColor.main}>
      <Button onClick={handleAddPortion} sx={{ width: 1, height: 1, borderBottom: 3, borderRight: 5, borderColor: 'primary.main', borderRadius: '13px', color: colors.headingColor.main }}>
	Add another Item
        <AddCircleOutlineIcon sx={{ mr: "5px", ml: "10px" }} />

      </Button>
    </Box>
    <Box m="10px"
      width="150px"
      height= "60px"
      backgroundColor={colors.boxColor.main}
      sx={{
	'&:hover': {
	  backgroundColor: 'green'
	}, }}>
	<Button sx={{ width: 1, height: 1, "fontSize": "20px", color: colors.headingColor.main}} onClick={submit}>
	Submit
	<CheckCircleOutlineIcon sx={{ mr:"5px", ml: "5px" }} />
	</Button>
    </Box>
    </Box>
    </>
	);

}
export default AddMeal;
