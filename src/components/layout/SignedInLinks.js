import React from 'react';
import Button from '@material-ui/core/Button';
import { UserContext } from "../auth/UserProvider"
import { Link } from "react-router-dom"

export default function SignedInLinks()  {
  const user = React.useContext(UserContext);

  return (
    <>
    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/login">
  <Button color="inherit">{user ? "Logout" : "Login"} </Button>
    </Link>
    
    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
      <Button color="inherit">Dashboard</Button>
    </Link>

    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/messengerID">
      <Button color="inherit">Set Messenger ID</Button>
    </Link>
    </>
  )
}