import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Icon, InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import useStyles from './tasksPage.style';

interface TaskListToolbarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TaskListToolbar = (props: TaskListToolbarProps) => {
  const classes = useStyles();

  const { handleSearch } = props;

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.title}>
        <Icon className={classes.headCellIcon}>list_alt</Icon>
        <Typography variant="h6">Task List</Typography>
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
      <Tooltip title="Create New Task">
        <IconButton className={classes.createNewTaskIcon} aria-label="Create New Task">
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default TaskListToolbar;
