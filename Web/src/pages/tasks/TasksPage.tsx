import React, { useEffect } from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './tasksPage.style';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppState, Action, SprintState } from 'models/types/store';
import { ThunkDispatch } from 'redux-thunk';
import { StoreAction } from 'store/actions';
import { connect } from 'react-redux';
import ProjectTaskList from './projectTaskList/ProjectTaskList';
import SprintTaskList from './sprintTaskList/SprintTaskList';

interface IDispatchProps {
  getProjectTaskList: (projectId: string) => void;
}

type Props = RouteComponentProps<any> & IDispatchProps;

function TasksPage(props: Props) {
  const classes = useStyles();

  useEffect(() => {
    const projectId = props.match.params.id;
    props.getProjectTaskList(projectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer className={classes.mainContainer}>
      <SprintTaskList />
      <ProjectTaskList />
    </PageContainer>
  );
}

const mapStateToProps = (state: AppState) => ({
  projectTaskList: state.project.projectTaskList,
  sprint: state.sprint,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  getProjectTaskList: (projectId: string) =>
    dispatch(StoreAction.project.getProjectTaskList(projectId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TasksPage));
