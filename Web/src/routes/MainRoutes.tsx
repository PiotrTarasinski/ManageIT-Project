import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import linksConstants from 'models/constants/linkConstants';
import Layout from '../components/Layout/Layout';
import PrivateRoute from './PrivateRoute';

const MainRoutes = ({ routes }) => (
  <Switch>
    {routes
      .filter(route => route.public)
      .map((route, index) => (
        <PublicRoute key={index} exact={!!route.exact} path={route.path} component={route.component}/>
      ))}
    <Layout>
      <Switch>
        {routes
          .filter(route => !route.public)
          .map((route, index) => (
            <PrivateRoute key={index} exact={!!route.exact} path={route.path} component={route.component}/>
          ))}
        <Redirect to={linksConstants.NOTES.INDEX}/>
      </Switch>
    </Layout>
  </Switch>
);

export default MainRoutes;
