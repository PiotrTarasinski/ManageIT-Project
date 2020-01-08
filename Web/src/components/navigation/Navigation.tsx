import React, { useEffect } from 'react';

import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AccountBox,
  Settings,
  ViewList,
  ExitToApp,
  Dashboard,
  Group,
  DeveloperBoard,
  AccountTree,
  Assignment,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import useStyles from './navigation.style';

import logo from 'assets/images/logos/manageIT.png';
import defaultAvatar from 'assets/images/utils/default_avatar.png';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { AppState, UserState, Action } from 'models/types/store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Collapse, Avatar, Typography, Button, MenuItem, Menu } from '@material-ui/core';
import { ROUTES } from 'models/variables/routes';
import { StoreAction } from 'store/actions';
import { History } from 'history';
import { SideNavLink } from 'models/types/sideNavLink';

interface IDispatchProps {
  handleLogOut: (history: History) => void;
}

interface IStoreProps {
  user: UserState;
  sidebarVisible: boolean;
}

type Props = RouteComponentProps<any> & IStoreProps & IDispatchProps;

function Navigation(props: Props) {
  const classes = useStyles();
  const theme = useTheme();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerProfileOpen, setDrawerProfileOpen] = React.useState(false);
  const [userMenu, setUserMenu] = React.useState<null | HTMLElement>(null);

  const { sidebarVisible, user } = props;

  const logOut = () => {
    setUserMenu(null);
    return props.handleLogOut(props.history);
  };

  const navLinks: SideNavLink[] = [
    {
      hasProp: false,
      title: 'Projects List',
      pathname: ROUTES.projects.pathname,
      icon: <ViewList />,
    },
    {
      hasProp: true,
      title: 'Dashboard',
      pathname: ROUTES.dashboard.pathname,
      icon: <Dashboard />,
      prop: user.activeProjectId,
    },
    {
      hasProp: true,
      title: 'Team',
      pathname: ROUTES.team.pathname,
      icon: <Group />,
      prop: user.activeProjectId,
    },
    {
      hasProp: true,
      title: 'Backlog',
      pathname: ROUTES.backlog.pathname,
      icon: <DeveloperBoard />,
      prop: user.activeProjectId,
    },
    {
      hasProp: true,
      title: 'Active Sprint',
      pathname: ROUTES.sprint.pathname,
      icon: <AccountTree />,
      prop: user.activeSprintId,
    },
    {
      hasProp: true,
      title: 'Task List',
      pathname: ROUTES.tasks.pathname,
      icon: <Assignment />,
      prop: user.activeProjectId,
    },
    {
      hasProp: true,
      title: 'Raports',
      pathname: ROUTES.raport.pathname,
      icon: <TrendingDown />,
      prop: user.activeProjectId,
    },
  ];

  const renderSideNavLink = (link: SideNavLink) => {
    const { hasProp, title, pathname, icon, prop } = link;
    if (!hasProp || (hasProp && prop)) {
      return (
        <ListItem
          key={title}
          button
          component={Link}
          to={hasProp ? `${pathname}/${prop}` : pathname}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>{title}</ListItemText>
        </ListItem>
      );
    }
  };

  useEffect(() => {
    if (!sidebarVisible) {
      setDrawerOpen(false);
    }
  }, [sidebarVisible]);

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
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
          <Link
            to={
              user.isAuth
                ? user.activeProjectId
                  ? `${ROUTES.dashboard.pathname}/${user.activeProjectId}`
                  : ROUTES.projects.pathname
                : ROUTES.home.pathname
            }
            className={classes.logo}
          >
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
              src={user.avatar || defaultAvatar}
            />
            <Typography className={classes.appBarUsername}>{user.name || 'Username'}</Typography>
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
              to={`${ROUTES.profile.pathname}/${user.id}`}
              onClick={() => setUserMenu(null)}
            >
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </MenuItem>
            <MenuItem className={classes.appBarLogoutButton} onClick={() => logOut()}>
              <ListItemIcon>
                <ExitToApp />
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
              {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={() => setDrawerProfileOpen(!drawerProfileOpen)}>
              <ListItemIcon>
                <AccountBox />
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
              <Link to={`${ROUTES.profile.pathname}/${user.id}`}>
                <Avatar
                  alt="Avatar"
                  src={user.avatar || defaultAvatar}
                  className={classes.drawerAvatar}
                />
              </Link>
              <Typography className={classes.drawerUsername}>{user.name || 'Username'}</Typography>
              <Divider />
              <List>
                <ListItem button component={Link} to={`${ROUTES.profile.pathname}/${user.id}`}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText>Profile Settings</ListItemText>
                </ListItem>
                <ListItem button className={classes.drawerLogoutButton} onClick={() => logOut()}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItem>
                <Divider />
              </List>
            </Collapse>
            {navLinks.map((link: SideNavLink) => {
              return renderSideNavLink(link);
            })}
          </List>
        </Drawer>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  sidebarVisible: state.app.sidebarVisible,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  handleLogOut: (history: History) => dispatch(StoreAction.user.handleLogOut(history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));
