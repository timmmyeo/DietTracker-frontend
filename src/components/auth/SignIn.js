import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography"
import { signInWithFacebook, signOut } from '../../config/firebaseConfig'
import { UserContext } from "./UserProvider"

export default function SignIn() {
  const user = React.useContext(UserContext);

  return (
    <>
    {
      user ? 
      <>
        <Typography>You are now logged in!</Typography>
        <Button variant="contained" color="primary" onClick={signOut}>{
          <p>Log out!</p>
        }
        </Button>
      </>
      :
      <>
        <Typography>Please log in!</Typography>
        <Button variant="contained" color="primary" onClick={signInWithFacebook}>{
          <p>Log in!</p>
        }
        </Button>
      </>
    }
    </>
    
  )
}