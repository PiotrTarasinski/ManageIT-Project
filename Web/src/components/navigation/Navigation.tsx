import React from 'react';

import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewListIcon from '@material-ui/icons/ViewList';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import useStyles from './navigation.style';

import logo from 'assets/images/logos/manageIT.png';
import defaultAvatar from 'assets/images/utils/default_avatar.png';
import { Link } from 'react-router-dom';
import { AppState, UserState, Action } from 'models/types/store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Collapse, Avatar, Typography } from '@material-ui/core';

interface IDispatchProps {
  // action: () => void;
}

type Props = UserState & IDispatchProps;

function Navigation(props: Props) {
  const classes = useStyles();
  const theme = useTheme();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerProfileOpen, setDrawerProfileOpen] = React.useState(false);

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: drawerOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/home" className={classes.logo}>
            <img src={logo} alt="ManageIT" />
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        onMouseLeave={() => (!drawerOpen ? setDrawerProfileOpen(false) : null)}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => setDrawerProfileOpen(!drawerProfileOpen)}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
            {drawerProfileOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={drawerProfileOpen}
            className={classes.drawerProfileMenu}
            timeout="auto"
            unmountOnExit
          >
            <Link to="/profile">
              <Avatar
                alt="Avatar"
                src={props.avatar ? props.avatar : defaultAvatar}
                className={classes.drawerAvatar}
              />
            </Link>
            <Typography className={classes.userName}>Username Here</Typography>
            <Divider />
            <List>
              <ListItem button component={Link} to="/profile">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>Profile Settings</ListItemText>
              </ListItem>
              <ListItem button className={classes.logoutButton}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItem>
              <Divider />
            </List>
          </Collapse>
          <ListItem button component={Link} to="/projects">
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText>Projects List</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/team">
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText>Team</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/backlog">
            <ListItemIcon>
              <DeveloperBoardIcon />
            </ListItemIcon>
            <ListItemText>Backlog</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/sprint">
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText>Active Sprint</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/tasks">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText>Task List</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/raport">
            <ListItemIcon>
              <TrendingDownIcon />
            </ListItemIcon>
            <ListItemText>Raports</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}

const mapStateToProps = (state: AppState) => ({
  isAuth: state.user.isAuth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  // action: () => dispatch(action()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
