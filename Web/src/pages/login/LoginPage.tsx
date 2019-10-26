import * as React from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './loginPage.style';
import { Paper, Container, Typography } from '@material-ui/core';
import LoginForm from './loginForm/LoginForm';

function LoginPage() {
  const classes = useStyles();

  return (
    <PageContainer className={classes.mainContainer}>
      <Container maxWidth="sm">
        <Paper className={classes.formContainer} elevation={24}>
          <Typography className={classes.header} variant="h1" component="h1">
            Sign In
          </Typography>
          <LoginForm />
        </Paper>
      </Container>
    </PageContainer>
  );
}

export default LoginPage;
