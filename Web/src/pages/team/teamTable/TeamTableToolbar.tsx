import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { InputBase } from '@material-ui/core';
import { Search, Group, AddCircle } from '@material-ui/icons';
import useStyles from './teamTable.style';

interface TeamTableToolbarProps {
  classes: ReturnType<typeof useStyles>;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TeamTableToolbar = (props: TeamTableToolbarProps) => {
  const { classes, handleSearch } = props;

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.title}>
        <Group className={classes.headCellIcon} />
        <Typography variant="h6">Team Members</Typography>
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
      <Tooltip title="Invite to project">
        <IconButton className={classes.createProjectIcon} aria-label="Invite to project">
          <AddCircle />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default TeamTableToolbar;
