import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(3, 3),
      margin: theme.spacing(5, 0),
      backgroundColor: 'rgba(255,255,255,0.85)',
    },
    header: {
      fontSize: 34,
      textAlign: 'center',
      fontWeight: theme.typography.fontWeightBold,
      color: deepPurple['A200'],
      margin: theme.spacing(1, 0, 3, 0),
    },
    formInner: {
      width: '100%',
    },
    formHelperText: {
      marginLeft: 14,
      marginRight: 14,
    },
    submitButton: {
      margin: theme.spacing(2, 0, 6, 0),
      fontSize: 17,
      fontWeight: theme.typography.fontWeightBold,
      background: deepPurple['A400'],

      '&:hover': {
        background: deepPurple['A700'],
      },
    },
    link: {
      display: 'block',
      fontSize: '1rem',
      textDecoration: 'none',
      lineHeight: 1.5,
      color: deepPurple['A700'],

      '&:hover': {
        opacity: 0.8,
      },
    },
  }),
);

export default useStyles;
