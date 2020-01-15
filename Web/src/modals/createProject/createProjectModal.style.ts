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
    form: {
      width: 480,
      maxWidth: '100%',
    },
    submitButton: {
      display: 'block',
      margin: theme.spacing(1, 0),
      marginLeft: 'auto',
      fontSize: 17,
      fontWeight: theme.typography.fontWeightBold,
      background: deepPurple['A400'],

      '&:hover': {
        background: deepPurple['A700'],
      },
    },
  }),
);

export default useStyles;
