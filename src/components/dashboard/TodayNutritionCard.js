import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid'
import { PieChart, Pie, Tooltip, Cell } from "recharts"
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function todayNutritionCard(props) {
  return (
    <Grid item xs={12} sm={6} md={3} align="center">
      <Card>
        <CardContent>
          <Typography variant="h5" components="h2" gutterBottom>
            {props.title}
          </Typography>
          {props.loading ?
          <CircularProgress />
          :
          <PieChart width={300} height={250}>
            <Pie
                data={props.cardData} 
                dataKey="value"
                cx="50%" 
                cy="50%" 
                innerRadius={60}
                outerRadius={80} 
                paddingAngle={5}
              >
                {
                  props.cardData.map((entry) => <Cell fill={entry.colour}/>)
                }
              </Pie>
            <Tooltip />
          </PieChart>
          }       
        </CardContent>
      </Card>
    </Grid>
  )
}