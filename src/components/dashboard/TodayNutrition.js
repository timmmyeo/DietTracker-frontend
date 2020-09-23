import React from "react"
import TodayNutritionCard from "./TodayNutritionCard"

export default function TodayNutrition(props) {
  return (
    <>
      <TodayNutritionCard title="Calories" cardData={props.data.calories} />
      <TodayNutritionCard title="Fat" cardData={props.data.fat} />
      <TodayNutritionCard title="Protein" cardData={props.data.protein} />
      <TodayNutritionCard title="Sodium" cardData={props.data.sodium} />
    </>
  )

}
