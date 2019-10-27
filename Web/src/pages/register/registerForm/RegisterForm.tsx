import * as React from 'react';
import useStyles from '../registerPage.style';
import { Form, Field } from 'react-final-form';
import { Typography, InputAdornment, Grid, IconButton, Button, TextField } from '@material-ui/core';
import { Email, Visibility, VisibilityOff, Person } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { ROUTES } from 'models/variables/routes';
import { Link } from 'react-router-dom';
import { API } from 'store/api';
import { IRegisterForm } from 'models/types/forms';
import { validate } from './registerForm.validation';
// import { FORM_ERROR } from 'final-form';

const onSubmit = async (values: IRegisterForm) => {
  const { name, email, password, confirmPassword } = values;
  return API.user
    .signUp(name, email, password, confirmPassword)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
      // return { email: 'Unknown username' };
      // return { [FORM_ERROR]: 'Login Failed' };
    });
};

function RegisterForm() {
  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, dirtySinceLastSubmit }) => (
        <form className={classes.formInner} onSubmit={handleSubmit} noValidate>
          <Grid container alignItems="flex-start" spacing={1}>
            {/* {submitError && !dirtySinceLastSubmit && <div>{submitError}</div>} */}
            <Grid item xs={12}>
              <Field name="name" type="text">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    fullWidth
                    label="Name"
                    autoComplete="name"
                    margin="normal"
                    variant="outlined"
                    error={
                      (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
                      meta.touched
                        ? true
                        : false
                    }
                    helperText={
                      (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
                      meta.touched
                        ? meta.error || meta.submitError
                        : undefined
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Person htmlColor={grey['700']} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field name="email" type="email">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    fullWidth
                    label="Email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    error={
                      (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
                      meta.touched
                        ? true
                        : false
                    }
                    helperText={
                      (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
                      meta.touched
                        ? meta.error || meta.submitError
                        : undefined
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email htmlColor={grey['700']} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="password" type={showPassword ? 'text' : 'password'}>
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    fullWidth
                    label="Password"
                    autoComplete="password"
                    margin="normal"
                    variant="outlined"
                    error={
                      (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
                      meta.touched
                        ? true
                        : false
                    }
                    helperText={
                      (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
                      meta.touched
                        ? meta.error || meta.submitError
                        : undefined
                    }
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="confirmPassword" type={showPassword ? 'text' : 'password'}>
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    fullWidth
                    label="Confrim Password"
                    autoComplete="password"
                    margin="normal"
                    variant="outlined"
                    error={
                      (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
                      meta.touched
                        ? true
                        : false
                    }
                    helperText={
                      (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
                      meta.touched
                        ? meta.error || meta.submitError
                        : undefined
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                className={classes.submitButton}
                color="primary"
                size="large"
                variant="contained"
                type="submit"
                disabled={submitting}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                Already have an account? <br />
                <Link className={classes.link} to={ROUTES.login.pathname}>
                  Sign in
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
}

export default RegisterForm;
