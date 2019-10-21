import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState, Action } from 'models/types/store';
import Swal from 'sweetalert2';
import MainContainer from 'components/containers/mainContainer/MainContainer';
import Navigation from 'components/navigation/Navigation';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ROUTES } from 'models/variables/routes';
import { IRoute } from 'models/types/route';
import { ThunkDispatch } from 'redux-thunk';
import { StoreAction } from 'store/actions';

interface IDispatchProps {
  toggleSidebar: (sidebarVisible: boolean) => void;
}

interface IStoreProps {
  isAuth: boolean;
  sidebarVisible: boolean;
}

interface ComponentProps {}

type Props = ComponentProps & IStoreProps & IDispatchProps;
type RouteProps = RouteComponentProps<any> & any;

class App extends React.Component<Props> {
  renderPage = (props: RouteProps, page: IRoute) => {
    const { isAuth } = this.props;
    if (page.permission) {
      if (isAuth) {
        this.props.toggleSidebar(page.sidebarVisible);
        return <page.component {...props} />;
      } else {
        this.props.toggleSidebar(ROUTES.login.sidebarVisible);
        Swal.fire({
          title: 'Unauthorized',
          text: 'You are not logged in',
          type: 'error',
          confirmButtonText: 'Login',
        });
        return (
          <Redirect
            to={{
              pathname: ROUTES.login.pathname,
              state: { previousURL: props.location.pathname + props.location.search },
            }}
          />
        );
      }
    } else {
      this.props.toggleSidebar(page.sidebarVisible);
      return <page.component {...props} />;
    }
  };

  render() {
    return (
      <Router basename="/">
        <CssBaseline />
        <MainContainer>
          <Navigation />
          <Switch>
            {Object.keys(ROUTES).map(key => {
              return (
                <Route
                  key={key}
                  path={ROUTES[key].pathname}
                  render={props => this.renderPage({ ...props }, ROUTES[key])}
                />
              );
            })}
            <Redirect from="*" to={ROUTES.home.pathname} />
          </Switch>
        </MainContainer>
      </Router>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isAuth: state.user.isAuth,
  sidebarVisible: state.app.sidebarVisible,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  toggleSidebar: (sidebarVisible: boolean) =>
    dispatch(StoreAction.application.toggleSidebar(sidebarVisible)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
