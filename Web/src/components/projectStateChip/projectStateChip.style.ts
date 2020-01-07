import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { grey, green, blue, indigo, orange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    projectStateChip: {
      color: grey['50'],
      '& svg': {
        fill: grey['50'],
      },
    },
    completedStateChip: {
      backgroundColor: green['700'],
    },
    inDevelopmentStateChip: {
      backgroundColor: blue['500'],
    },
    planningStateChip: {
      backgroundColor: indigo['700'],
    },
    cancelledStateChip: {
      backgroundColor: orange['900'],
    },
  }),
);

export default useStyles;
