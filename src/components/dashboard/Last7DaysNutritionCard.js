import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip
} from "recharts"

export default function Last7DaysNutritionCard(props) {
  function convertDayToString(day) {
    switch(day) {
      case 0:
        return "Today"
      case 1:
        return "Yesterday"
      default:
        return "-" + day.toString() + " days"
    }
  }

  const data = props.cardData.map((dayData, index) => {
    return (
      {
        "name": convertDayToString(index),
        "value": dayData[props.name]
      }
    )
  })

  data.reverse();


  return (
    <Grid item xs={12} sm={6} align="center">
      <Card>
        <CardContent>

          <Typography variant="h5" components="h2" gutterBottom>
            {props.title}
          </Typography>

          <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <Tooltip />
          </LineChart>


        </CardContent>
      </Card>
    </Grid>
  )
}