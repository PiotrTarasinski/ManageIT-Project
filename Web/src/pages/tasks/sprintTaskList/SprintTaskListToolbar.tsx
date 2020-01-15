import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Icon, InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import useStyles from '../tasksPage.style';

interface SprintTaskListToolbarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SprintTaskListToolbar = (props: SprintTaskListToolbarProps) => {
  const classes = useStyles();

  const { handleSearch } = props;

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.title}>
        <Icon className={classes.headCellIcon}>account_tree</Icon>
        <Typography variant="h6">Active Sprint</Typography>
      </div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Search />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleSearch}
        />
      </div>
    </Toolbar>
  );
};

export default SprintTaskListToolbar;
