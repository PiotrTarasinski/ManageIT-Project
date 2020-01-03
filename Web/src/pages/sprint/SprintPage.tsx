import React, { useEffect } from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './sprintPage.style';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Typography } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {
  CheckCircle,
  QueryBuilder,
  ThumbsUpDown,
  Build,
  MoreVert,
  Edit,
  Close,
} from '@material-ui/icons';
import { taskState } from 'models/enums/task';
import SprintTask from 'components/sprintTask/SprintTask';
import { daysBetween } from 'utils/daysBetween';
import { RouteComponentProps } from 'react-router-dom';
import { SprintState, AppState, Action } from 'models/types/store';
import { ThunkDispatch } from 'redux-thunk';
import { StoreAction } from 'store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ITask } from 'models/types/task';

interface IDispatchProps {
  getSprint: (id: string) => any;
}

interface IStoreProps {
  sprint: SprintState;
}

type Props = RouteComponentProps<any> & IStoreProps & IDispatchProps;

function SprintPage(props: Props) {
  const [sprintOptionsDialOpen, setSprintOptionsDialOpen] = React.useState(false);

  const classes = useStyles();
  const { sprint } = props;

  useEffect(() => {
    props.getSprint(props.match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    console.log(result);
  };

  const renderTaskList = (state: taskState) => {
    const taskList = sprint.taskList.filter((task: ITask) => task.state === state);
    let icon = <CheckCircle className={classes.taskListIcon} />;

    if (state === taskState.TO_DO) icon = <QueryBuilder className={classes.taskListIcon} />;
    if (state === taskState.IN_PROGRESS) icon = <Build className={classes.taskListIcon} />;
    if (state === taskState.TO_REVIEW_AND_TEST)
      icon = <ThumbsUpDown className={classes.taskListIcon} />;

    return (
      <div className={classes.taskList}>
        <div className={classes.taskListHeader}>
          {icon}
          <div>
            <Typography className={classes.taskListTitle}>{state}</Typography>
            <Typography>
              {`${taskList.length} Tasks | ${taskList
                .map(o => o.points)
                .reduce((a, b) => a + b, 0)} Points`}
            </Typography>
          </div>
        </div>
        <Droppable droppableId={state}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className={classes.droppable}>
              {taskList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <SprintTask key={item.id} task={item} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };

  return (
    <PageContainer className={classes.mainContainer}>
      <div className={classes.pageHeader}>
        <Typography className={classes.sprintName} component="h1">
          {sprint.name}
        </Typography>
        <SpeedDial
          ariaLabel="Sprint Options"
          className={classes.sprintOptions}
          icon={<MoreVert />}
          onClose={() => setSprintOptionsDialOpen(false)}
          onOpen={() => setSprintOptionsDialOpen(true)}
          open={sprintOptionsDialOpen}
          direction="down"
        >
          <SpeedDialAction
            icon={<Edit />}
            tooltipTitle={'Edit Sprint'}
            // onClick={handleClose}
          />
          <SpeedDialAction
            icon={<Close />}
            tooltipTitle={'Close Sprint'}
            // onClick={handleClose}
          />
        </SpeedDial>
        <div className={classes.sprintDateRangeContainer}>
          <QueryBuilder className={classes.sprintDateRangeIcon} />
          <Typography className={classes.sprintDateRange}>
            {`${sprint.startDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })}
            - ${sprint.endDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })}`}
          </Typography>
          <Typography className={classes.sprintTimeLeft}>
            {`${daysBetween(new Date(), sprint.endDate)} days ${
              new Date() < sprint.endDate ? 'left' : 'delay'
            }`}
          </Typography>
        </div>
        <Typography className={classes.sprintDescriptionHeader}>Description:</Typography>
        <Typography className={classes.sprintDescription}>
          {sprint.description || 'No description was provided for this sprint'}
        </Typography>
      </div>
      <div className={classes.taskListContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          {renderTaskList(taskState.TO_DO)}
          {renderTaskList(taskState.IN_PROGRESS)}
          {renderTaskList(taskState.TO_REVIEW_AND_TEST)}
          {renderTaskList(taskState.DONE)}
        </DragDropContext>
      </div>
    </PageContainer>
  );
}

const mapStateToProps = (state: AppState) => ({
  sprint: state.sprint,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  getSprint: (id: string) => dispatch(StoreAction.sprint.getSprint(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SprintPage));
