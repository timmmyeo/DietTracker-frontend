import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import { UserContext } from "../auth/UserProvider"
import { firestore as db } from "../../config/firebaseConfig"
import TodayNutrition from './TodayNutrition';
import { todayDate, last7Days } from "./generateDates"
import Last7DaysNutrition from "./Last7DaysNutrition"

export default function Dashboard() {
  const user = React.useContext(UserContext);
  const [messengerId, setMessengerId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [last7DaysData, setlast7DaysData] = React.useState(Array(7).fill({calories: 0, fat: 0, protein: 0, sodium: 0}));
  const [todayData, setTodayData] = React.useState({
    calories:
    [
      {
        "name": "Calories",
        "value": 0,
        "colour": "#8884d8"
      },
      {
        "name": "Remaining",
        "value": 2000,
        "colour": "#82ca9d"
      },
    ],
    fat:
    [
      {
        "name": "Fat",
        "value": 0,
        "colour": "#8884d8"
      },
      {
        "name": "Remaining",
        "value": 70,
        "colour": "#82ca9d"
      }
    ],
    protein:
    [
      {
        "name": "Protein",
        "value": 0,
        "colour": "#8884d8"
      },
      {
        "name": "Remaining",
        "value": 50,
        "colour": "#82ca9d"
      },
    ],
    sodium:
    [
      {
        "name": "Sodium",
        "value": 0,
        "colour": "#8884d8"
      },
      {
        "name": "Remaining",
        "value": 6000,
        "colour": "#82ca9d"
      },
    ]
  })

  React.useEffect(() => {
    function getData() {
      console.log("We are reading!")
      const todayString = todayDate();
  
  
      const docRef = db.collection("users").doc(messengerId);
      docRef.get().then(function(doc) {
          if (doc.exists) {
            const todayDataTemp = doc.data()[todayString];
            if (todayDataTemp === undefined) {
              alert("Looks like you haven't eaten anything today!")
            }
            else {
              const calories = todayDataTemp['total_nutrition']["calories"];
              const fat = todayDataTemp['total_nutrition']['fat_g'];
              const protein = todayDataTemp['total_nutrition']["protein_g"];
              const sodium = todayDataTemp['total_nutrition']["sodium_mg"]
              setTodayData({
                calories:
                [
                  {
                    "name": "Calories",
                    "value": calories,
                    "colour": "#8884d8"
                  },
                  {
                    "name": "Remaining",
                    "value": calories > 2000 ? 0 : 2000 - calories,
                    "colour": "#82ca9d"
                  },
                ],
                fat:
                [
                  {
                    "name": "Fat",
                    "value": fat,
                    "colour": "#8884d8"
                  },
                  {
                    "name": "Remaining",
                    "value": fat > 70 ? 0 : 70 - fat,
                    "colour": "#82ca9d"
                  }
                ],
                protein:
                [
                  {
                    "name": "Protein",
                    "value": protein,
                    "colour": "#8884d8"
                  },
                  {
                    "name": "Remaining",
                    "value": protein > 50 ? 0 : 50 - protein,
                    "colour": "#82ca9d"
                  },
                ],
                sodium:
                [
                  {
                    "name": "Sodium",
                    "value": sodium,
                    "colour": "#8884d8"
                  },
                  {
                    "name": "Remaining",
                    "value": sodium > 6000 ? 0 : 6000 - sodium,
                    "colour": "#82ca9d"
                  },
                ]
              })
            }

            const last7DaysStrings = last7Days();
            let last7DaysDataTemp = []
            last7DaysStrings.forEach(function(date) {
              const dateTemp = doc.data()[date];
              if (dateTemp === undefined) {
                last7DaysDataTemp.push({calories: 0, fat: 0, protein: 0, sodium: 0})
              }
              else {
                last7DaysDataTemp.push({
                  calories: dateTemp['total_nutrition']["calories"], 
                  fat: dateTemp['total_nutrition']["fat_g"], 
                  protein: dateTemp['total_nutrition']["protein_g"], 
                  sodium: dateTemp['total_nutrition']["sodium_mg"]
                })
              }
            })
            setlast7DaysData(last7DaysDataTemp)

            
            
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              console.log(user.uid);
              alert("Looks like you don't exist in our database yet!")
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
          alert("Something went wrong...")
      });
    }

    function queryFirebase() {
      const docRef = db.collection("messengerID").doc(user.uid);

      docRef.get().then(function(doc) {
        if (doc.exists) {
          setMessengerId(doc.data()['id'])
          if (messengerId !== null) {
            getData();
          }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            console.log(user.uid);
            alert("You haven't set your messenger ID yet!")
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
        alert("Something went wrong reaching the database...")
      });
    }
    
    if (user) {
      const timer = setTimeout(() => queryFirebase(), 700);
      return () => clearTimeout(timer);

    }
  }, [user, messengerId]);

  return (
    <>
      {
        user ?
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>Total nutrition for today:</Typography>
          </Grid>

          <TodayNutrition data={todayData} />

          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>Total nutrition for the past 7 days:</Typography>
          </Grid>

          <Last7DaysNutrition data={last7DaysData} />

        </Grid>
      :
        <>
          <Typography>Please sign in!</Typography>
        </>
      }
    </>
    
  )
}