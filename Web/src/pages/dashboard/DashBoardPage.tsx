import React from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './dashboardPage.style';

function DashBoardPage() {
  const classes = useStyles();

  return (
    <PageContainer className={classes.mainContainer}>
      <div></div>
    </PageContainer>
  );
}

export default DashBoardPage;
