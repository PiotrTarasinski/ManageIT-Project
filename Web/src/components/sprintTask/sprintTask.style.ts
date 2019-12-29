import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    taskContainer: {
      backgroundColor: grey[50],
      margin: theme.spacing(1, 0),
      padding: theme.spacing(0, 1),
      border: '1px solid #ccc',
      borderLeft: '5px solid #ccc',
      borderLeftColor: (props: any) => props.backgroundColor || '#ccc',
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
      backgroundColor: (props: any) => props.backgroundColor || '#ccc',
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
    taskTitle: {
      paddingTop: 4,
      color: grey[700],
    },
    assignContainer: {
      paddingTop: 4,
      paddingRight: theme.spacing(1),
    },
    labelsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
      '& > *:first-child': {
        marginLeft: 0,
      },
    },
    taskFooter: {
      marginTop: theme.spacing(2),
      marginBottom: 4,
    },
    taskPoints: {
      display: 'inline',
      color: '#FFF',
      backgroundColor: '#f48fb1',
      height: 20,
      minWidth: 20,
      padding: '0 6px',
      borderRadius: 10,
    },
  }),
);

export default useStyles;
