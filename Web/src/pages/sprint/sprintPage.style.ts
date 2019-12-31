import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { grey, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: grey[50],
      padding: theme.spacing(3, 0),
    },
    pageHeader: {
      width: '100%',
      padding: theme.spacing(0, 3),
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderBottomColor: grey[300],
    },
    sprintName: {
      fontSize: 26,
      fontWeight: 'bold',
      color: grey[600],
    },
    sprintDateRangeContainer: {
      height: 32,
      borderRadius: 16,
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: grey[300],
      paddingLeft: theme.spacing(1),
      overflow: 'hidden',
      margin: theme.spacing(1, 0),
    },
    sprintDateRangeIcon: {
      color: '#616161',
      fontSize: 24,
    },
    sprintDateRange: {
      height: '100%',
      lineHeight: '32px',
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.87)',
      padding: theme.spacing(0, 1),
    },
    sprintTimeLeft: {
      height: '100%',
      lineHeight: '32px',
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.87)',
      backgroundColor: grey[400],
      padding: theme.spacing(0, 1),
    },
    taskListContainer: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'space-between',
      width: '100%',
      overflowX: 'auto',
      padding: theme.spacing(1, 3),
    },
    taskList: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '25%',
      minWidth: 240,
      backgroundColor: grey[100],
      borderRadius: theme.shape.borderRadius,

      '&:not(:first-child):not(:last-child)': {
        '&:nth-child(even)': {
          margin: theme.spacing(0, 1, 0, 2),
        },
        '&:nth-child(odd)': {
          margin: theme.spacing(0, 2, 0, 1),
        },
      },
    },
    taskListHeader: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing(1),
      backgroundColor: deepPurple[500],
      color: 'whitesmoke',
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
    },
    taskListIcon: {
      fontSize: 34,
      marginRight: theme.spacing(1),
    },
    taskListTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    droppable: {
      position: 'absolute',
      top: 67,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: 'scroll',
    },
  }),
);

export default useStyles;
