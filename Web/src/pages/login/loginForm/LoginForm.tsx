import * as React from 'react';
import useStyles from '../loginPage.style';
import { Form, Field } from 'react-final-form';
import {
  Typography,
  InputAdornment,
  Grid,
  IconButton,
  Button,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import { Checkbox } from 'final-form-material-ui';
import { Email, Visibility, VisibilityOff } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { ROUTES } from 'models/variables/routes';
import { Link } from 'react-router-dom';
import { API } from 'store/api';
import { ILoginForm } from 'models/types/forms';
import { validate } from './loginForm.validation';
// import { FORM_ERROR } from 'final-form';

const onSubmit = async (values: ILoginForm) => {
  const { email, password } = values;
  return API.user
    .signIn(email, password)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
      // return { email: 'Unknown username' };
      // return { [FORM_ERROR]: 'Login Failed' };
    });
};

function LoginForm() {
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
            <Grid item xs={12}>
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
            <Grid item xs={6}>
              <FormControlLabel
                label="Remember Me"
                control={<Field name="rememberMe" component={Checkbox} type="checkbox" />}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                <Link className={classes.link} to={ROUTES.home.pathname}>
                  Forgot password?
                </Link>
              </Typography>
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
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                Don't have an account? <br />
                <Link className={classes.link} to={ROUTES.register.pathname}>
                  Sign up now
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
}

export default LoginForm;
