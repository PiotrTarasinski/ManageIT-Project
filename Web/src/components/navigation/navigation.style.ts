import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { deepPurple, red } from '@material-ui/core/colors';

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
      paddingTop: 4,
      paddingBottom: 4,
      transition: theme.transitions.create(['opacity'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      '& img': {
        display: 'block',
        margin: 'auto 0',
        maxWidth: '100%',
      },
      '&:hover': {
        opacity: 0.85,
      },
    },
    spacer: {
      flexGrow: 1,
      paddingRight: theme.spacing(1),
    },
    appBarAvatar: {
      border: '1px solid',
      borderColor: deepPurple['A200'],
    },
    appBarUsername: {
      fontSize: theme.typography.pxToRem(16),
      textAlign: 'center',
      color: deepPurple['A200'],
      fontWeight: theme.typography.fontWeightMedium,
      textTransform: 'none',
      marginLeft: theme.spacing(2),

      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    appBarUserMenu: {
      '& .MuiListItemIcon-root': {
        minWidth: 42,
      },
    },
    appBarLogoutButton: {
      color: red['500'],
      '& .MuiListItemIcon-root': {
        color: red['500'],
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      '& .MuiListItem-gutters ': {
        paddingLeft: 24,
      },
      '& .MuiListItemIcon-root': {
        minWidth: 48,
      },
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
            transition: theme.transitions.create('width', {
              delay: '0.2s',
            }),
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
    drawerProfileMenu: {
      paddingTop: theme.spacing(2),
    },
    drawerAvatar: {
      width: '160px !important',
      height: '160px !important',
      margin: '0 auto',
      border: '2px solid',
      borderColor: deepPurple['A200'],
      transition: theme.transitions.create(['opacity'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      '&:hover': {
        opacity: 0.75,
      },
    },
    drawerUsername: {
      fontSize: theme.typography.pxToRem(18),
      textAlign: 'center',
      color: deepPurple['A200'],
      fontWeight: theme.typography.fontWeightMedium,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    drawerLogoutButton: {
      color: red['500'],
      marginBottom: theme.spacing(1),
      '& .MuiListItemIcon-root': {
        color: red['500'],
      },
    },
  }),
);

export default useStyles;
