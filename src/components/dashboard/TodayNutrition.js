import React from "react"
import TodayNutritionCard from "./TodayNutritionCard"

export default function TodayNutrition(props) {
  console.log(props.data)
  return (
    <>
      <TodayNutritionCard title="Calories" maxDailyIntake={2000} unit="kcal" cardData={props.data.calories} />
      <TodayNutritionCard title="Fat" maxDailyIntake={70} unit="g" cardData={props.data.fat} />
      <TodayNutritionCard title="Protein" maxDailyIntake={50} unit="g" cardData={props.data.protein} />
      <TodayNutritionCard title="Sodium" maxDailyIntake={6000} unit="mg" cardData={props.data.sodium} />
    </>
  )

}
