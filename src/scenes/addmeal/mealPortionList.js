import React from 'react'
import MealPortion from'./mealPortion'

export default function MealPortionList({ mealPortions, changeSelect, changeServings, removePortion }) {
  return (
    mealPortions.map(mealPortion => {
      return <MealPortion key={mealPortion.id} changeSelect={changeSelect} mealPortion={mealPortion} changeServings={changeServings} removePortion={removePortion} />
    })
  )
}
