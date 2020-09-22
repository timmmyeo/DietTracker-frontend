import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));

export default function SignedOutLinks()  {
  return (
    <>
      <Button color="inherit">Logout</Button>
      <Button color="inherit">Test</Button>
    </>
  )
}