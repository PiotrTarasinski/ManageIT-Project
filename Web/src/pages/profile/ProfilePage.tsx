import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './profilePage.style';

type Props = RouteComponentProps<any>;

function ProfilePage(props: Props) {
  const classes = useStyles();

  return (
    <PageContainer className={classes.mainContainer}>
      <div></div>
    </PageContainer>
  );
}

export default withRouter(ProfilePage);
