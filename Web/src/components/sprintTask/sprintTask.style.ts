import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { grey, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    taskContainer: {
      backgroundColor: grey[50],
      margin: theme.spacing(1, 0),
      padding: theme.spacing(0, 1),
      border: '1px solid #ccc',
      borderLeft: '5px solid #ccc',
      borderLeftColor: (props: any) => props.taskTypeColor || '#ccc',
    },
    taskHeader: {
      display: 'flex',
      margin: theme.spacing(0, -1),
    },
    taskType: {
      display: 'inline-flex',
      width: 29,
      height: 27,
      marginTop: -1,
      borderBottomRightRadius: 30,
      backgroundColor: (props: any) => props.taskTypeColor || '#ccc',
      padding: '2px 1px',
    },
    typeIcon: {
      color: '#FFF',
      fontSize: 19,
    },
    taskNumber: {
      padding: theme.spacing(0, 1),
      flexGrow: 1,
      paddingTop: 4,
      fontSize: 15,
      fontWeight: 'bold',
      color: grey[600],
    },
    chip: {
      color: '#FFF',
      height: 20,
      minWidth: 20,
      padding: '0 8px',
      borderRadius: 10,
    },
    taskTitle: {
      paddingTop: 4,
      color: grey[700],
    },
    assignContainer: {
      display: 'flex',
      flexDirection: 'row-reverse',
      paddingTop: 4,
      paddingRight: theme.spacing(1),
      transition: theme.transitions.create(['opacity'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard,
      }),

      '&:hover': {
        opacity: 0.8,
      },
    },
    assignAvatar: {
      width: 30,
      height: 30,
      border: '1px solid',
      borderColor: deepPurple['A200'],

      '&:not(:first-child)': {
        marginRight: -10,
      },
    },
    labelsContainer: {
      display: 'flex',
      flexWrap: 'wrap',

      '& > *': {
        margin: theme.spacing(0.25),
      },
      '& > *:first-child': {
        marginLeft: 0,
      },
    },
    taskFooter: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing(2),
      marginBottom: 4,

      '& > *': {
        margin: theme.spacing(0, 0.25),
      },
      '& > *:first-child': {
        marginLeft: 0,
      },
    },
    taskPoints: {
      fontWeight: 'bold',
      backgroundColor: deepPurple[500],
    },
    priorityIcon: {
      fontWeight: 'bold',
      backgroundColor: (props: any) => props.taskPriorityColor || '#ccc',
    },
  }),
);

export default useStyles;
