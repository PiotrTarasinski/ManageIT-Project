import * as React from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './loginPage.style';

interface IStoreProps {}

function LoginPage(props: IStoreProps) {
  const classes = useStyles();

  return <PageContainer className={classes.mainContainer}>LoginPage</PageContainer>;
}

export default LoginPage;
