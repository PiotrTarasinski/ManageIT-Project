import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      position: 'relative',
      maxHeight: '100vh',
      overflow: 'hidden',
    },
    container: {
      position: 'relative',
      flexGrow: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    content: {
      padding: theme.spacing(3),
      minHeight: '100%',
    },
  }),
);

export default useStyles;
