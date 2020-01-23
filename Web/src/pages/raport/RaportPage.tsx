import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './raportPage.style';

type Props = RouteComponentProps<any>;

function RaportPage(props: Props) {
  const classes = useStyles();

  return (
    <PageContainer className={classes.mainContainer}>
      <div></div>
    </PageContainer>
  );
}

export default withRouter(RaportPage);
