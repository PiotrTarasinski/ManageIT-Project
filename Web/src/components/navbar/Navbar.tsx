import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import useStyles from './navbar.style';

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar className={classes.nav} position="fixed">
      Navbar
    </AppBar>
  );
}
