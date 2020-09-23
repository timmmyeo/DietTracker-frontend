import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid'
import { PieChart, Pie, Tooltip, Cell } from "recharts"
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line
} from "recharts"

export default function Last7DaysNutritionCard(props) {
  const data = props.cardData.map((dayData, index) => {
    return (
      {
        "name": index.toString(),
        "value": dayData[props.name]
      }
    )
  })


  return (
    <Grid item xs={12} sm={6} md={3} align="center">
      <Card>
        <CardContent>

          <Typography variant="h5" components="h2" gutterBottom>
            {props.title}
          </Typography>

          <LineChart width={400} height={300} data={data}>
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