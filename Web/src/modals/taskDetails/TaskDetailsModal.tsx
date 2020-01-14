import React from 'react';
import useStyles from './taskDetailsModal.style';
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
  modalOpen: boolean;
  setModalOpen: any;
  sprintId: string;
}

interface IStoreProps {
  task?: ITask;
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

const TaskDetailsModal = (props: Props) => {
  const classes = useStyles();

  const { modalOpen, setModalOpen, task } = props;

  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle disableTypography id="form-dialog-title" className={classes.dialogTitle}>
        <Typography variant="h6">zxc</Typography>
        <IconButton aria-label="close" onClick={() => setModalOpen(false)}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state: AppState) => ({
  task: state.app.selectedTask,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  // assigToTask: (task: ITask, sprintId: string, user: IPerson, type: assignType, remove: boolean) =>
  //   dispatch(StoreAction.sprint.assigToTask(task, sprintId, user, type, remove)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailsModal);
