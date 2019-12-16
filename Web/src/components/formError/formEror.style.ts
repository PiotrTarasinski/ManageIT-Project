import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { grey, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formError: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      margin: theme.spacing(1),
      padding: theme.spacing(2),
      backgroundColor: grey[300],
      color: red[400],
      fontWeight: 500,
      borderRadius: theme.shape.borderRadius,
      fontSize: 17,

      '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(1),
      },
    },
  }),
);

export default useStyles;
