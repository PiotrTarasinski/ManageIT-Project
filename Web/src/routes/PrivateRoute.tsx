import React from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import linksConstants from '../config/app/linksConstants';
import authSelectors from '../store/modules/Auth/selectors';

const PrivateRoute = ({
  exact,
  path,
  changeLocation,
  isAuthenticated,
  component: Component
}) => {
  if (!isAuthenticated) {
    changeLocation(linksConstants.AUTH.LOGIN);
  }

  return <Route exact={exact} path={path} component={Component}/>;
};

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state.auth)
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    changeLocation: path => push(path)
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
