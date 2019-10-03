import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nav: {
      'background-color': 'blue',
    },
  }),
);

export default useStyles;
