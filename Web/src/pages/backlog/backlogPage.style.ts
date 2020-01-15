import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { grey, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      backgroundColor: grey[50],
      padding: theme.spacing(3),
    },
    pageHeader: {
      fontSize: 26,
      fontWeight: 'bold',
      color: grey[600],
    },
    divider: {
      height: 2,
      backgroundColor: grey[300],
      margin: theme.spacing(2, 0),
    },
    activitiesContainer: {
      padding: theme.spacing(0, 2),
    },
    groupHeader: {
      display: 'flex',
      alignItems: 'center',
      color: grey[600],
    },
    groupHeaderText: {
      fontSize: 18,
      paddingLeft: theme.spacing(1),
      fontWeight: 400,
    },
    activitiesGroupContainer: {
      borderLeft: '2px solid',
      borderLeftColor: grey[400],
      marginLeft: 12,
    },
    activityList: {
      marginLeft: 16,
    },
    activity: {
      padding: theme.spacing(2),
      border: '1px solid',
      borderColor: grey[500],
    },
    avatar: {
      border: '1px solid',
      borderColor: deepPurple[500],
    },
  }),
);

export default useStyles;
