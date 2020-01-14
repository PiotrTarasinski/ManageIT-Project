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
  Typography,
} from '@material-ui/core';
import defaultAvatar from 'assets/images/utils/default_avatar.png';
import { ITask } from 'models/types/task';
import { PersonAdd, PersonAddDisabled, Search, Close } from '@material-ui/icons';
import { IPerson } from 'models/types/person';
import { ThunkDispatch } from 'redux-thunk';
import { AppState, Action } from 'models/types/store';
import { StoreAction } from 'store/actions';
import { connect } from 'react-redux';
import { assignType } from 'models/enums/task';

interface IComponentProps {
  assignModalOpen: boolean;
  setAssignModalOpen: any;
  sprintId: string;
}

interface IStoreProps {
  task?: ITask;
  users: IPerson[];
}

interface IDispatchProps {
  assigToTask: (
    task: ITask,
    sprintId: string,
    user: IPerson,
    type: assignType,
    remove: boolean,
  ) => void;
}

type Props = IComponentProps & IStoreProps & IDispatchProps;

const SprintAssignTaskModal = (props: Props) => {
  const classes = useStyles();

  const [activeTab, setActiveTab] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const { assignModalOpen, setAssignModalOpen, task, users, sprintId } = props;

  const handleAssign = (user: IPerson, remove: boolean) => {
    if (task) {
      const assignAs = activeTab === 0 ? assignType.ASSIGN : assignType.REVIEW;
      props.assigToTask(task, sprintId, user, assignAs, remove);
    }
  };

  const renderAssignIcon = (user: IPerson) => {
    let selectedType: IPerson[] = [];
    if (task) {
      selectedType = activeTab === 0 ? task.assign : task.reviewers;
    }

    return selectedType.filter((assigne: IPerson) => assigne.id === user.id).length > 0 ? (
      <Tooltip title="Unassign">
        <PersonAddDisabled onClick={() => handleAssign(user, true)} />
      </Tooltip>
    ) : (
      <Tooltip title="Assign">
        <PersonAdd onClick={() => handleAssign(user, false)} />
      </Tooltip>
    );
  };

  return (
    <Dialog
      open={assignModalOpen}
      onClose={() => setAssignModalOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle disableTypography id="form-dialog-title" className={classes.dialogTitle}>
        <Typography variant="h6">Assign to</Typography>
        <IconButton aria-label="close" onClick={() => setAssignModalOpen(false)}>
          <Close />
        </IconButton>
      </DialogTitle>
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
                  <ListItem key={user.id} className={classes.listItem}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} src={user.avatar || defaultAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email} />
                    <ListItemSecondaryAction>
                      <IconButton>{renderAssignIcon(user)}</IconButton>
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

const mapStateToProps = (state: AppState) => ({
  task: state.sprint.selectedTask,
  users: state.project.projectMemberList,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  assigToTask: (task: ITask, sprintId: string, user: IPerson, type: assignType, remove: boolean) =>
    dispatch(StoreAction.sprint.assigToTask(task, sprintId, user, type, remove)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SprintAssignTaskModal);
