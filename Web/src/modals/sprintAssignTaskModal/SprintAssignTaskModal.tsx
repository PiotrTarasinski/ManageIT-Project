import React from 'react';
import useStyles from './sprintAssignTaskModal.style';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  InputBase,
  Tooltip,
} from '@material-ui/core';
import defaultAvatar from 'assets/images/utils/default_avatar.png';
import { ITask } from 'models/types/task';
import { PersonAdd, PersonAddDisabled, Search } from '@material-ui/icons';
import { IPerson } from 'models/types/person';

interface IProps {
  assignModalOpen: boolean;
  setAssignModalOpen: any;
  task?: ITask;
}

const SprintAssignTaskModal = (props: IProps) => {
  const classes = useStyles();

  const [activeTab, setActiveTab] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const { assignModalOpen, setAssignModalOpen, task } = props;

  const users: IPerson[] = [
    { id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab', name: 'Piotr Tarasiński' },
    { id: '2', name: 'Szymmon Tarasiński', email: 'szymko@gmail.com' },
    { id: '3', name: 'Szymmon Tokarzewski' },
    { id: '4', name: 'Agnieszka Skwarczyńska' },
    { id: '5', name: 'Samanta Wiśniewska' },
  ];

  const renderAssignIcon = (user: IPerson) => {
    let selectedType: IPerson[] = [];
    if (task) {
      selectedType = activeTab === 0 ? task.assign : task.reviewers;
    }

    return selectedType.filter((assigne: IPerson) => assigne.id === user.id).length > 0 ? (
      <Tooltip title="Unassign">
        <PersonAddDisabled />
      </Tooltip>
    ) : (
      <Tooltip title="Assign">
        <PersonAdd />
      </Tooltip>
    );
  };

  return (
    <Dialog
      open={assignModalOpen}
      onClose={() => setAssignModalOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Assign to</DialogTitle>
      <DialogContent>
        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event: React.ChangeEvent<{}>, newValue: number) => setActiveTab(newValue)}
        >
          <Tab label="Assignees" />
          <Tab label="Reviewers" />
        </Tabs>
        <div className={classes.tabContent}>
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
            />
          </div>
          <List className={classes.listContainer} dense={true}>
            {users
              .filter(
                (user: IPerson) =>
                  user.name.toLowerCase().includes(search.toLowerCase()) ||
                  (user.email || '').toLowerCase().includes(search.toLowerCase()),
              )
              .map((user: IPerson) => {
                return (
                  <ListItem key={user.id}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} src={user.avatar || defaultAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        {renderAssignIcon(user)}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
          </List>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SprintAssignTaskModal;
