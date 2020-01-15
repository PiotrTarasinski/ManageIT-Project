import React from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './backlogPage.style';
import {
  Typography,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppState, Action } from 'models/types/store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { UnfoldLess } from '@material-ui/icons';
import defaultAvatar from 'assets/images/utils/default_avatar.png';

interface IDispatchProps {
  // handleSignIn: (email: string, password: string, history: History) => any;
}

interface IStoreProps {
  // isAuth: boolean;
}

type Props = RouteComponentProps<any> & IStoreProps & IDispatchProps;

function BacklogPage(props: Props) {
  const classes = useStyles();

  return (
    <PageContainer className={classes.mainContainer}>
      <Typography className={classes.pageHeader} component="h1">
        Project Backlog
      </Typography>
      <Divider className={classes.divider} />
      <div className={classes.activitiesContainer}>
        <div className={classes.groupHeader}>
          <UnfoldLess />
          <Typography className={classes.groupHeaderText} variant="h6">
            Activities on Jan 14, 2020
          </Typography>
        </div>
        <div className={classes.activitiesGroupContainer}>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar" className={classes.avatar} src={defaultAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary="Created a new task: ENV-013"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                      // color="textPrimary"
                    >
                      Piotr Tarasiński
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar" className={classes.avatar} src={defaultAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary="Added a new user to the project: Szymko Tokarzewski"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                      // color="textPrimary"
                    >
                      Piotr Tarasiński
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </div>
      </div>
      <div className={classes.activitiesContainer}>
        <div className={classes.groupHeader}>
          <UnfoldLess />
          <Typography className={classes.groupHeaderText} variant="h6">
            Activities on Jan 13, 2020
          </Typography>
        </div>
        <div className={classes.activitiesGroupContainer}>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar" className={classes.avatar} src={defaultAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary="Created a new task: ENV-012"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                      // color="textPrimary"
                    >
                      Piotr Tarasiński
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar" className={classes.avatar} src={defaultAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary="Created a new task: ENV-012"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                      // color="textPrimary"
                    >
                      Piotr Tarasiński
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar" className={classes.avatar} src={defaultAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary="Created a new task: ENV-012"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                      // color="textPrimary"
                    >
                      Piotr Tarasiński
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar" className={classes.avatar} src={defaultAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary="Added a new user to the project: Szymko Tokarzewski"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                      // color="textPrimary"
                    >
                      Piotr Tarasiński
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </div>
      </div>
      <div className={classes.activitiesContainer}>
        <div className={classes.groupHeader}>
          <UnfoldLess />
          <Typography className={classes.groupHeaderText} variant="h6">
            Activities on Jan 11, 2020
          </Typography>
        </div>
        <div className={classes.activitiesGroupContainer}>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar" className={classes.avatar} src={defaultAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary="Created a new task: ENV-013"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                      // color="textPrimary"
                    >
                      Piotr Tarasiński
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar" className={classes.avatar} src={defaultAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary="Added a new user to the project: Szymko Tokarzewski"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                      // color="textPrimary"
                    >
                      Piotr Tarasiński
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </div>
      </div>
      <div className={classes.activitiesContainer}>
        <div className={classes.groupHeader}>
          <UnfoldLess />
          <Typography className={classes.groupHeaderText} variant="h6">
            Activities on Jan 10, 2020
          </Typography>
        </div>
        <div className={classes.activitiesGroupContainer}>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar" className={classes.avatar} src={defaultAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary="Created a new task: ENV-013"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                      // color="textPrimary"
                    >
                      Piotr Tarasiński
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar" className={classes.avatar} src={defaultAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary="Added a new user to the project: Szymko Tokarzewski"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                      // color="textPrimary"
                    >
                      Piotr Tarasiński
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </div>
      </div>
    </PageContainer>
  );
}

const mapStateToProps = (state: AppState) => ({
  // isAuth: state.user.isAuth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  // handleSignIn: (email: string, password: string, history: History) =>
  //   dispatch(StoreAction.user.handleSignIn(email, password, history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BacklogPage));
