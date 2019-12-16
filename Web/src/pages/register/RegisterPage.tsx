import React from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './registerPage.style';
import { Paper, Container, Typography } from '@material-ui/core';
import RegisterForm from './registerForm/RegisterForm';

function RegisterPage() {
  const classes = useStyles();

  return (
    <PageContainer className={classes.mainContainer}>
      <Container maxWidth="sm">
        <Paper className={classes.formContainer} elevation={24}>
          <Typography className={classes.header} variant="h1" component="h1">
            Sign Up
          </Typography>
          <RegisterForm />
        </Paper>
      </Container>
    </PageContainer>
  );
}

export default RegisterPage;
