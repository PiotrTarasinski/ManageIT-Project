import React from 'react';
import useStyles from './taskDetailsModal.style';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  IconButton,
  Typography,
} from '@material-ui/core';
import defaultAvatar from 'assets/images/utils/default_avatar.png';
import { ITask } from 'models/types/task';
import { Close } from '@material-ui/icons';
import { IPerson } from 'models/types/person';
import { ThunkDispatch } from 'redux-thunk';
import { AppState, Action } from 'models/types/store';
import { StoreAction } from 'store/actions';
import { connect } from 'react-redux';

interface IComponentProps {
  modalOpen: boolean;
  setModalOpen: any;
}

interface IStoreProps {
  task?: ITask;
}

interface IDispatchProps {}

type Props = IComponentProps & IStoreProps & IDispatchProps;

const TaskDetailsModal = (props: Props) => {
  const classes = useStyles();

  const { modalOpen, setModalOpen, task } = props;

  return (
    <React.Fragment>
      {task && (
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
        >
          <DialogTitle disableTypography id="form-dialog-title" className={classes.dialogTitle}>
            <Typography variant="h6">{task.identifier} - Task Details</Typography>
            <IconButton color="inherit" aria-label="close" onClick={() => setModalOpen(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography className={classes.textInfo}>
              <span className={classes.textHeader}>Title: </span>
              {task.title}
            </Typography>
            <Typography className={classes.textHeader}>Labels: </Typography>
            <Typography className={classes.textInfo}>
              <Typography className={classes.textHeader}>Description: </Typography>
              {task.description || 'No description was provided for this task'}
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
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
