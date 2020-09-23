import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"

export default function SignedInLinks()  {
  return (
    <>
    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/login">
      <Button color="inherit">Login</Button>
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