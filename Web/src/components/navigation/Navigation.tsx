import React, { useEffect } from 'react';

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
import { Link, withRouter } from 'react-router-dom';
import { AppState, UserState, Action } from 'models/types/store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Collapse, Avatar, Typography, Button, MenuItem, Menu } from '@material-ui/core';
import { ROUTES } from 'models/variables/routes';

interface IDispatchProps {
  // action: () => void;
}

interface IStoreProps {
  isAuth: boolean;
  sidebarVisible: boolean;
}

interface ComponentProps {
  location: any;
}

type Props = IStoreProps & ComponentProps & UserState;

function Navigation(props: Props) {
  const classes = useStyles();
  const theme = useTheme();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerProfileOpen, setDrawerProfileOpen] = React.useState(false);
  const [userMenu, setUserMenu] = React.useState<null | HTMLElement>(null);

  const { sidebarVisible } = props;

  useEffect(() => {
    if (!sidebarVisible) {
      setDrawerOpen(false);
    }
  }, [sidebarVisible]);

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen && sidebarVisible,
        })}
      >
        <Toolbar>
          {sidebarVisible && (
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
          )}
          <Link to={ROUTES.home.pathname} className={classes.logo}>
            <img src={logo} alt="ManageIT" />
          </Link>
          <div className={classes.spacer}></div>
          <Button
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              setUserMenu(event.currentTarget)
            }
          >
            <Avatar
              alt="Avatar"
              className={classes.appBarAvatar}
              src={props.avatar ? props.avatar : defaultAvatar}
            />
            <Typography className={classes.appBarUsername}>
              {props.name ? props.name : 'Username'}
            </Typography>
          </Button>
          <Menu
            id="user-menu"
            anchorEl={userMenu}
            keepMounted
            open={Boolean(userMenu)}
            onClose={() => setUserMenu(null)}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            className={classes.appBarUserMenu}
          >
            <MenuItem
              component={Link}
              to={ROUTES.profile.pathname}
              onClick={() => setUserMenu(null)}
            >
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </MenuItem>
            <MenuItem className={classes.appBarLogoutButton} onClick={() => setUserMenu(null)}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {sidebarVisible && (
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
              <Link to={ROUTES.profile.pathname}>
                <Avatar
                  alt="Avatar"
                  src={props.avatar ? props.avatar : defaultAvatar}
                  className={classes.drawerAvatar}
                />
              </Link>
              <Typography className={classes.drawerUsername}>
                {props.name ? props.name : 'Username'}
              </Typography>
              <Divider />
              <List>
                <ListItem button component={Link} to={ROUTES.profile.pathname}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText>Profile Settings</ListItemText>
                </ListItem>
                <ListItem button className={classes.drawerLogoutButton}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItem>
                <Divider />
              </List>
            </Collapse>
            <ListItem button component={Link} to={ROUTES.projects.pathname}>
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText>Projects List</ListItemText>
            </ListItem>
            <ListItem button component={Link} to={ROUTES.dashboard.pathname}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItem>
            <ListItem button component={Link} to={ROUTES.team.pathname}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText>Team</ListItemText>
            </ListItem>
            <ListItem button component={Link} to={ROUTES.backlog.pathname}>
              <ListItemIcon>
                <DeveloperBoardIcon />
              </ListItemIcon>
              <ListItemText>Backlog</ListItemText>
            </ListItem>
            <ListItem button component={Link} to={ROUTES.sprint.pathname}>
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText>Active Sprint</ListItemText>
            </ListItem>
            <ListItem button component={Link} to={ROUTES.tasks.pathname}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText>Task List</ListItemText>
            </ListItem>
            <ListItem button component={Link} to={ROUTES.raport.pathname}>
              <ListItemIcon>
                <TrendingDownIcon />
              </ListItemIcon>
              <ListItemText>Raports</ListItemText>
            </ListItem>
          </List>
        </Drawer>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state: AppState) => ({
  isAuth: state.user.isAuth,
  sidebarVisible: state.app.sidebarVisible,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  // action: () => dispatch(action()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Navigation),
);
