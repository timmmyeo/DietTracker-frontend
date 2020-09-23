import React from "react"
import Last7DaysNutritionCard from "./Last7DaysNutritionCard"

export default function TodayNutrition(props) {
  return (
    <>
      <Last7DaysNutritionCard title="Calories" name="calories" cardData={props.data} />
      <Last7DaysNutritionCard title="Fat" name="fat" cardData={props.data} />
      <Last7DaysNutritionCard title="Protein" name="protein" cardData={props.data} />
      <Last7DaysNutritionCard title="Sodium" name="sodium" cardData={props.data} />
    </>
  )

}
