import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Icon, InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import useStyles from './projectsTable.style';
import CreateProjectModal from 'modals/createProject/CreateProjectModal';

interface ProjectsTableToolbarProps {
  classes: ReturnType<typeof useStyles>;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProjectsTableToolbar = (props: ProjectsTableToolbarProps) => {
  const { classes, handleSearch } = props;

  const [createProjectModalOpen, setCreateProjectModalOpen] = React.useState(false);

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.title}>
        <Icon className={classes.headCellIcon}>list_alt</Icon>
        <Typography variant="h6">Projects List</Typography>
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
      <Tooltip title="New project">
        <IconButton
          className={classes.createProjectIcon}
          aria-label="new project"
          onClick={() => setCreateProjectModalOpen(true)}
        >
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
      <CreateProjectModal
        modalOpen={createProjectModalOpen}
        setModalOpen={setCreateProjectModalOpen}
      />
    </Toolbar>
  );
};

export default ProjectsTableToolbar;
