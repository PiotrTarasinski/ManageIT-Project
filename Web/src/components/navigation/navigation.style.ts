import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 284;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: theme.palette.background.paper,
      boxShadow: 'inset 0 -1px 0 rgba(100,121,143,0.122)',
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 20,
    },
    hide: {
      display: 'none',
    },
    logo: {
      transition: theme.transitions.create(['opacity'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      '&:hover': {
        opacity: 0.85,
        cursor: 'pointer',
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: 0,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
        '@media (hover: hover)': {
          '&:hover': {
            width: drawerWidth,
          },
        },
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
  }),
);

export default useStyles;
