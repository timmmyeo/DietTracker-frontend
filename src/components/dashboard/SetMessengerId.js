import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography"
import { UserContext } from "../auth/UserProvider"
import { firestore as db, auth } from "../../config/firebaseConfig"
import TextField from "@material-ui/core/TextField"
import LinearProgress from '@material-ui/core/LinearProgress';


export default function SetMessengerId() {
  const user = React.useContext(UserContext);
  const [messengerId, setMessengerId] = React.useState("You don't exist yet!");
  const [messengerIdBox, setMessengerIdBox] = React.useState('')
  const [loading, setLoading] = React.useState(true);


  React.useEffect(() => {
    if (user) {
      const docRef = db.collection("messengerID").doc(user.uid);

      docRef.get().then(function(doc) {
        if (doc.exists) {
          setMessengerId(doc.data()['id'])

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            console.log(user.uid);
        }
        setLoading(false);
      }).catch(function(error) {
        console.log("Error getting document:", error);
        alert("Something went wrong...")
      });
    }
  }, [user]);
  

  function handleChange(e) {
    setMessengerIdBox(e.target.value);
  }

  function handleSubmit(e) {
    db.collection("messengerID").doc(user.uid).set({
      'id': messengerIdBox
    })
  }

  

  return (
    <>
    {
      !user ?
      <>
        <Typography variant="h3">Please sign in!</Typography>
      </>
      :
      <>
        <Typography variant="h3">Update your Messenger ID below:</Typography>
        <br />
        {loading ?
        <LinearProgress />
        :
        <Typography variant="h3">Your current ID: {messengerId}</Typography>
        }
        
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField onChange={handleChange} value={messengerIdBox} id="messenger-id" label="New Messenger ID" />
          <Button type="submit">Submit</Button>
        </form>
      </>
    }
    </>
  )
}