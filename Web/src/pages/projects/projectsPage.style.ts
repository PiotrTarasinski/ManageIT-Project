import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      backgroundColor: grey[50],
      padding: theme.spacing(3),
    },
  }),
);

export default useStyles;
