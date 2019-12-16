import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PageContainer from 'components/containers/pageContainer/PageContainer';

type Props = RouteComponentProps<any>;

function ProfilePage(props: Props) {
  console.log(props);
  return <PageContainer>ProfilePage</PageContainer>;
}

export default withRouter(ProfilePage);
