import React from 'react'
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import HelpIcon from '@mui/icons-material/Help';

export default function MealPortion({ mealPortion, changeSelect, changeServings }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  function handleFoodSelect(e) {
    const newSelect = e.target.value
    changeSelect(mealPortion.id, newSelect)
  }
  function handleServingInput(e) {
    const newServing = e.target.value
    changeServings(mealPortion.id, newServing)
  }
  return (
    <Box m="10px"
      p="10px"
      backgroundColor={colors.boxColor.main}
      display="flex"
      width="380px">
      <label style={{ color: "black", marginTop: "9px" }}>
	Select Food: 
	<select defaultValue={mealPortion.options[0].FoodName} 
	  onChange={handleFoodSelect}
	  style={{ 
	  ml: "50px",
	  color: "black",
	  "marginRight": "40px",
	  "marginTop": "8px"}}> 
	  {mealPortion.options.map((OptionList, key) => {
            return <option name="food" key={key} value={OptionList.FoodName}>{OptionList.FoodName}</option>;
          })}
	</select>
      </label>
      <label style={{ ml: "15px", color: "black" }}>
        Number of Servings: 
	  <IconButton color="primary" aria-label="get serving size">
	    <HelpIcon />
	  </IconButton>
	<input
       	  type="text"
	  id="servings"
	  name="servings" 
	  onChange={handleServingInput}/>
      </label>
    </Box>
  )
}
