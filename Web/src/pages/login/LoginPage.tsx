import * as React from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './loginPage.style';
import { Form, Field } from 'react-final-form';
import {
  Paper,
  Container,
  Typography,
  InputAdornment,
  Grid,
  IconButton,
  Button,
  FormControlLabel,
} from '@material-ui/core';
import { TextField, Checkbox } from 'final-form-material-ui';
import { Email, Visibility, VisibilityOff } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { ROUTES } from 'models/variables/routes';
import { Link } from 'react-router-dom';

interface IStoreProps {}

interface ComponentProps {
  showPassword: boolean;
}

const onSubmit = async (values: any) => {
  console.log(values);
};

const validate = (values: any) => {
  const errors: any = {};

  const { email, password } = values;
  if (!email) {
    errors.email = 'Email is required!';
  }
  if (email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.email = 'Invalid email!';
  }
  if (!password) {
    errors.password = 'Password is required!';
  }
  if (password && (password.length < 6 || password.length > 24)) {
    errors.password = 'Password must be 6-24 characters!';
  }
  return errors;
};

type Props = IStoreProps & ComponentProps;

function LoginPage(props: Props) {
  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <PageContainer className={classes.mainContainer}>
      <Container maxWidth="sm">
        <Paper className={classes.formContainer} elevation={24}>
          <Typography className={classes.header} variant="h1" component="h1">
            Sign In
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, submitting, pristine, values }) => (
              <form className={classes.formInner} onSubmit={handleSubmit} noValidate>
                <Grid container alignItems="flex-start" spacing={1}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="email"
                      type="email"
                      label="Email"
                      component={TextField}
                      autoComplete="email"
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email htmlColor={grey['700']} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      component={TextField}
                      autoComplete="password"
                      margin="normal"
                      variant="outlined"
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
        </Paper>
      </Container>
    </PageContainer>
  );
}

export default LoginPage;
