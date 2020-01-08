import React from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './teamPage.style';
import TeamTable from './teamTable/TeamTable';

function TeamPage() {
  const classes = useStyles();

  return (
    <PageContainer className={classes.mainContainer}>
      <TeamTable />
    </PageContainer>
  );
}

export default TeamPage;
