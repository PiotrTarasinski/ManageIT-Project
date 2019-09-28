import React from 'react';
import linksConstants from '../../../config/app/linksConstants';
import LoginPageContainer from './Login/LoginPageContainer';

const AuthRoutes = [
  {
    path: linksConstants.AUTH.LOGIN,
    component: LoginPageContainer,
    public: true,
    exact: true
  },
  {
    path: linksConstants.AUTH.SIGN_UP,
    component: () => <div>Sign up</div>,
  public: true,
  exact: true
  }
];

export default AuthRoutes;
