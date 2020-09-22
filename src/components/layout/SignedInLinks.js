import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));

export default function SignedInLinks()  {
  return (
    <>
      <Button color="inherit">Login</Button>
      <Button color="inherit">Dashboard</Button>
      <Button color="inherit">Set Messenger ID</Button>
    </>
  )
}