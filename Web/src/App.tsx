import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from 'models/types/store';
import HomePage from 'pages/home/HomePage';
import LoginPage from 'pages/login/LoginPage';
import RegisterPage from 'pages/register/RegisterPage';
import ProjectsPage from 'pages/projects/ProjectsPage';
import ProfilePage from 'pages/profile/ProfilePage';
import Swal from 'sweetalert2';
import MainContainer from 'components/containers/mainContainer/MainContainer';
import Navigation from 'components/navigation/Navigation';
import CssBaseline from '@material-ui/core/CssBaseline';
import DashBoardPage from 'pages/dashboard/DashBoardPage';
import BacklogPage from 'pages/backlog/BacklogPage';
import SprintPage from 'pages/sprint/SprintPage';
import TeamPage from 'pages/team/TeamPage';
import TasksPage from 'pages/tasks/TasksPage';
import RaportPage from 'pages/raport/RaportPage';

interface IStoreProps {
  isAuth: boolean;
}

interface IAppProps {}

type Props = IAppProps & IStoreProps;
type RouteProps = RouteComponentProps<any> & any;

class App extends React.Component<Props> {
  authorizedRender = (props: RouteProps, Component: React.ComponentClass) => {
    const { isAuth } = this.props;
    if (isAuth) {
      return <Component {...props} />;
    } else {
      Swal.fire({
        title: 'Unauthorized',
        text: 'You are not logged in',
        type: 'error',
        confirmButtonText: 'Login',
      });
      return <Redirect to={this.redirectRoute(props)} />;
    }
  };

  redirectRoute = (props: RouteProps) => ({
    pathname: '/login',
    state: { previousURL: props.location.pathname + props.location.search },
  });

  render() {
    return (
      <Router basename="/">
        <CssBaseline />
        <MainContainer>
          <Navigation />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route
              path="/projects"
              render={props => this.authorizedRender({ ...props }, ProjectsPage)}
            />
            <Route
              path="/profile"
              render={props => this.authorizedRender({ ...props }, ProfilePage)}
            />
            <Route
              path="/dashboard"
              render={props => this.authorizedRender({ ...props }, DashBoardPage)}
            />
            <Route path="/team" render={props => this.authorizedRender({ ...props }, TeamPage)} />
            <Route
              path="/backlog"
              render={props => this.authorizedRender({ ...props }, BacklogPage)}
            />
            <Route
              path="/sprint"
              render={props => this.authorizedRender({ ...props }, SprintPage)}
            />
            <Route path="/tasks" render={props => this.authorizedRender({ ...props }, TasksPage)} />
            <Route
              path="/raport"
              render={props => this.authorizedRender({ ...props }, RaportPage)}
            />
            <Redirect from="*" to="/home" />
          </Switch>
        </MainContainer>
      </Router>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps)(App);
