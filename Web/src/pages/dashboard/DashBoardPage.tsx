import React from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './dashboardPage.style';

function DashBoardPage() {
  const classes = useStyles();

  return (
    <PageContainer className={classes.mainContainer}>
      <h1>elo</h1>
    </PageContainer>
  );
}

export default DashBoardPage;
