import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    taskTypeChip: {
      color: grey['50'],
      fontWeight: 'bold',
      '& svg': {
        fill: grey['50'],
      },
    },
  }),
);

export default useStyles;
