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
    textInfo: {
      fontSize: '19px',
      color: grey[600],
    },
    textHeader: {
      fontSize: '19px',
      color: grey[700],
      fontWeight: 'bold',
    },
    avatar: {
      border: '1px solid',
      borderColor: deepPurple['A200'],
    },
  }),
);

export default useStyles;
