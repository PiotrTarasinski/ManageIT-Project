import { createStyles, makeStyles, Theme, fade } from '@material-ui/core/styles';
import { grey, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      backgroundColor: grey[50],
      padding: theme.spacing(3),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    toolbar: {
      backgroundColor: deepPurple[500],
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
    },
    title: {
      flex: '1 1 100%',
      display: 'flex',
      alignItems: 'center',
      color: grey[50],
    },
    headCellIcon: {
      marginRight: theme.spacing(1),
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.9),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.95),
      },
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addToProjectIcon: {
      color: grey[50],
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    tableRow: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
    headerLabel: {
      display: 'inline-flex',
      alignItems: 'center',
      color: grey[800],
    },
    avatar: {
      border: '1px solid',
      borderColor: deepPurple['A200'],
    },
  }),
);

export default useStyles;
