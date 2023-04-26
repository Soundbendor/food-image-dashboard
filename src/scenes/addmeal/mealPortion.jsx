import React, { useState, useEffect } from 'react'
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import HelpIcon from '@mui/icons-material/Help';
import Fade from "@mui/material/Fade";
import Axios from 'axios';

export default function MealPortion({ mealPortion, changeSelect, changeServings }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [helpVisible, setHelpVisible] = useState(false);
  const [helpText, setHelpText] = useState("EMPTY");
  function handleFoodSelect(e) {
    const newSelect = e.target.value
    changeSelect(mealPortion.id, newSelect)
  }
  function handleServingInput(e) {
    const newServing = e.target.value
    changeServings(mealPortion.id, newServing)
  }
  function handleHelpClick() {
    let currFood = mealPortion.value;
    console.log(currFood);
        Axios.get("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/getServing?food=" + currFood
	).then((response) => {
            if(response.data.message){
                console.log(response.data.message);
            }else{
		console.log(response.data);
		let result = response.data[0].ServSize.toString();
	        setHelpText(result.concat(" ", response.data[0].ServMetric.toString()));
		setHelpVisible(true);
            }
        })

  }
  useEffect(()=>{
  },[]);
  return (
    <Box display="flex" p="0">
    <Box m="10px"
      p="10px"
      backgroundColor={colors.boxColor.main}
      display="flex"
      width="400px"
      sx={{"marginLeft": "20px"}}>
      <label style={{ color: colors.headingColor.main, "fontSize": "20px"}}>
	Select Food: 
	<select defaultValue={mealPortion.options[0].FoodName} 
	  onChange={handleFoodSelect}
	  style={{ 
	  ml: "50px",
	  color: "black",
	  "marginRight": "40px",
	  "marginTop": "16px",
	  "fontSize": "15px"}}> 
	  {mealPortion.options.map((OptionList, key) => {
            return <option name="food" key={key} value={OptionList.FoodName}>{OptionList.FoodName}</option>;
          })}
	</select>
      </label>
      <label style={{ ml: "15px", color: colors.headingColor.main, "fontSize": "20px"}}>
        Number of Servings: 
	  <IconButton sx={{color: colors.headingColor.main}} aria-label="get serving size"
	    onClick={handleHelpClick}>
	    <HelpIcon />
	  </IconButton>
	<input
       	  type="text"
	  id="servings"
	  name="servings"
	  style={{ "fontSize": "15px" }}
	  onChange={handleServingInput}/>
      </label>
    </Box>
      <Fade
	in={helpVisible}
	timeout={{ enter: 500, exit: 500 }}
	addEndListener={() => {
	  setTimeout(() => {
	    setHelpVisible(false)
	  }, 3000);
	}}>
      <Box sx={{backgroundColor: colors.boxColor.main, "marginTop": "10px", "marginBottom": "10px"}} p="5px">
	  Serving Size: 
	  <p>
	  {helpText}
	  </p>
      </Box>
    </Fade>
    </Box>
  )
}
