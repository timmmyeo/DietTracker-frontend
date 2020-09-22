import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import { UserContext } from "../auth/UserProvider"
import { PieChart, Pie, Tooltip, Cell } from "recharts"
import TextField from "@material-ui/core/TextField"
import { firestore as db, auth } from "../../config/firebaseConfig"

export default function Dashboard() {
  const user = React.useContext(UserContext);
  const [messengerId, setMessengerId] = React.useState(null);
  const [gotUserData, setGotUserData] = React.useState(false);
  const [data, setData] = React.useState({
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
        "name": "Calories",
        "value": 0,
        "colour": "#8884d8"
      },
      {
        "name": "Remaining",
        "value": 2000,
        "colour": "#82ca9d"
      }
    ],
    protein:
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
    sodium:
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
    ]
  })

  React.useEffect(() => {
    
    if (user) {
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
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
        alert("Something went wrong...1")
      });
      

    }
  }, [user, messengerId]);



  // React.useEffect(() => {
  //   let unsubscribe = () =>{}
  //   console.log(user);
  //   if (user) {
  //     console.log("We are reading!")
  //     const today = new Date();
  //     const dd = String(today.getDate()).padStart(2, '0');
  //     const mm = String(today.getMonth() + 1).padStart(2, '0');
  //     const yyyy = today.getFullYear();

  //     const todayString = dd + '-' + mm + '-' + yyyy;


  //     var docRef = db.collection("users").doc(user.uid);

  //     docRef.get().then(function(doc) {
  //         if (doc.exists) {
  //             console.log("User ID:", user.uid)
  //             console.log("Document data:", doc.data());
  //         } else {
  //             // doc.data() will be undefined in this case
  //             console.log("No such document!");
  //             console.log(user.uid);
  //         }
  //     }).catch(function(error) {
  //         console.log("Error getting document:", error);
  //     });
  //   }
  //   else {
  //     console.log("Loading data...");
  //   }

  //   return () => {
  //     console.log("Cleaning up!");
  //     unsubscribe();
  //   }
  // }, [user]);

  function getData() {
    console.log("We are reading!")
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const todayString = dd + '-' + mm + '-' + yyyy;


    const docRef = db.collection("users").doc(messengerId);
    // 3459299480758874
    docRef.get().then(function(doc) {
        if (doc.exists) {
          const todayData = doc.data()[todayString];
          if (todayData === undefined) {
            alert("Looks like you haven't eaten anything today!")
          }
          else {
            setData({
              calories:
              [
                {
                  "name": "Calories",
                  "value": todayData['total_nutrition']["calories"],
                  "colour": "#8884d8"
                },
                {
                  "name": "Remaining",
                  "value": 2000 - todayData['total_nutrition']["calories"],
                  "colour": "#82ca9d"
                },
              ],
              fat:
              [
                {
                  "name": "Fat",
                  "value": todayData['total_nutrition']['fat_g'],
                  "colour": "#8884d8"
                },
                {
                  "name": "Remaining",
                  "value": 70 - todayData['total_nutrition']['fat_g'],
                  "colour": "#82ca9d"
                }
              ],
              protein:
              [
                {
                  "name": "Protein",
                  "value": todayData['total_nutrition']["protein_g"],
                  "colour": "#8884d8"
                },
                {
                  "name": "Remaining",
                  "value": 50 - todayData['total_nutrition']["protein_g"],
                  "colour": "#82ca9d"
                },
              ],
              sodium:
              [
                {
                  "name": "Sodium",
                  "value": todayData['total_nutrition']["sodium_mg"],
                  "colour": "#8884d8"
                },
                {
                  "name": "Remaining",
                  "value": 6000 - todayData['total_nutrition']["sodium_mg"],
                  "colour": "#82ca9d"
                },
              ]
            })
          }
          
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


  return (
    <>
      {
        user ?
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>Total stats for today:</Typography>
          </Grid>

        <Grid item xs={12} sm={6} md={3} align="center">
          
          <Card>
            <CardContent>
              <Typography variant="h5" components="h2" gutterBottom>
                Calories
              </Typography>
                <PieChart width={300} height={250}>
                  <Pie
                      data={data.calories} 
                      dataKey="value"
                      cx="50%" 
                      cy="50%" 
                      innerRadius={60}
                      outerRadius={80} 
                      paddingAngle={5}
                    >
                      {
                        data.calories.map((entry) => <Cell fill={entry.colour}/>)
                      }
                    </Pie>
                  <Tooltip />
                </PieChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} align="center">
          
          <Card>
            <CardContent>
              <Typography variant="h5" components="h2" gutterBottom>
                Fat
              </Typography>
                <PieChart width={300} height={250}>
                  <Pie
                      data={data.fat} 
                      dataKey="value"
                      cx="50%" 
                      cy="50%" 
                      innerRadius={60}
                      outerRadius={80} 
                      paddingAngle={5}
                    >
                      {
                        data.fat.map((entry) => <Cell fill={entry.colour}/>)
                      }
                    </Pie>
                  <Tooltip />
                </PieChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} align="center">
          
          <Card>
            <CardContent>
              <Typography variant="h5" components="h2" gutterBottom>
                Protein
              </Typography>
                <PieChart width={300} height={250}>
                  <Pie
                      data={data.protein} 
                      dataKey="value"
                      cx="50%" 
                      cy="50%" 
                      innerRadius={60}
                      outerRadius={80} 
                      paddingAngle={5}
                    >
                      {
                        data.protein.map((entry) => <Cell fill={entry.colour}/>)
                      }
                    </Pie>
                  <Tooltip />
                </PieChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} align="center">
          
          <Card>
            <CardContent>
              <Typography variant="h5" components="h2" gutterBottom>
                Sodium
              </Typography>
                <PieChart width={300} height={250}>
                  <Pie
                      data={data.sodium} 
                      dataKey="value"
                      cx="50%" 
                      cy="50%" 
                      innerRadius={60}
                      outerRadius={80} 
                      paddingAngle={5}
                    >
                      {
                        data.sodium.map((entry) => <Cell fill={entry.colour}/>)
                      }
                    </Pie>
                  <Tooltip />
                </PieChart>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      :
      <>
        <Typography>Please sign in!</Typography>
      </>
      }
    </>
    
  )
}