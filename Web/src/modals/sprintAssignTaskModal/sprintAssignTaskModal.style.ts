import { createStyles, makeStyles, Theme, fade } from '@material-ui/core/styles';
import { grey, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabContent: {
      padding: theme.spacing(2, 0),
    },
    dialogTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: grey[100],
      backgroundColor: deepPurple[500],
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${grey[500]}`,
      backgroundColor: fade(theme.palette.common.white, 0.85),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.95),
      },
      width: '100%',
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
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      width: '100%',
    },
    listContainer: {
      margin: theme.spacing(1, 0),
      maxHeight: 256,
      overflowY: 'auto',
    },
    listItem: {
      paddingRight: 68,
    },
    avatar: {
      border: '1px solid',
      borderColor: deepPurple['A200'],
    },
  }),
);

export default useStyles;
