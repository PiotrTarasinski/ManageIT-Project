import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import background from 'assets/images/backgrounds/main_background.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100vh',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  }),
);

export default useStyles;
