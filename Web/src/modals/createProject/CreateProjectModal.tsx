import React from 'react';
import useStyles from './createProjectModal.style';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { ThunkDispatch } from 'redux-thunk';
import { AppState, Action } from 'models/types/store';
import { StoreAction } from 'store/actions';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { validate } from './createProjectForm.validation';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

interface IComponentProps {
  modalOpen: boolean;
  setModalOpen: any;
}

interface IDispatchProps {
  createProject: (name: string, identifier: string, history: History) => void;
}

type Props = RouteComponentProps<any> & IComponentProps & IDispatchProps;

const TaskDetailsModal = (props: Props) => {
  const classes = useStyles();

  const { modalOpen, setModalOpen } = props;

  const onSubmit = async (values: any) => {
    const { name, identifier } = values;
    return props.createProject(name, identifier, props.history);
  };

  return (
    <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="md">
      <DialogTitle disableTypography id="form-dialog-title" className={classes.dialogTitle}>
        <Typography variant="h6">Create Project</Typography>
        <IconButton color="inherit" aria-label="close" onClick={() => setModalOpen(false)}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting, submitError, dirtySinceLastSubmit }) => (
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container alignItems="flex-start" spacing={1}>
                <Grid item xs={12}>
                  <Field name="name">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        fullWidth
                        label="Project name"
                        margin="normal"
                        variant="outlined"
                        error={
                          (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
                          meta.touched
                            ? true
                            : false
                        }
                        helperText={
                          (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
                          meta.touched
                            ? meta.error || meta.submitError
                            : undefined
                        }
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field name="identifier">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        fullWidth
                        label="Project identifier"
                        margin="normal"
                        variant="outlined"
                        error={
                          (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
                          meta.touched
                            ? true
                            : false
                        }
                        helperText={
                          (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
                          meta.touched
                            ? meta.error || meta.submitError
                            : undefined
                        }
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className={classes.submitButton}
                    color="primary"
                    size="large"
                    variant="contained"
                    type="submit"
                    disabled={submitting}
                  >
                    Creeate Project
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  createProject: (name: string, identifier: string, history: History) =>
    dispatch(StoreAction.project.createProject(name, identifier, history)),
});

export default withRouter(connect(null, mapDispatchToProps)(TaskDetailsModal));
