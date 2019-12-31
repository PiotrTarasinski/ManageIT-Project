import React from 'react';
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
import { taskState, taskType, taskPriority } from 'models/enums/task';
import SprintTask from 'components/sprintTask/SprintTask';
import { daysBetween } from 'utils/daysBetween';
import { ISprint } from 'models/types/sprint';

function SprintPage() {
  const [sprintOptionsDialOpen, setSprintOptionsDialOpen] = React.useState(false);

  const classes = useStyles();

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    console.log(result);
  };

  const sprint: ISprint = {
    id: '1',
    name: 'Sprint Name',
    startDate: new Date('12-14-2019'),
    endDate: new Date('12-29-2019'),
    description: 'This sprint should be done right F@#CK!NG NOW!',
    taskList: {
      toDoList: [
        {
          id: '1',
          title: 'Create Login Form HTML template',
          state: taskState.TO_DO,
          type: taskType.TASK,
          index: 0,
          points: 3,
          priority: taskPriority.HIGH,
          comments: [
            { id: '1', author: { id: '1', name: 'Piotr Tarasiński' }, message: 'Great Work!' },
          ],
          labels: [
            { id: '1', name: 'Front End', color: '#ff9800' },
            { id: '2', name: 'Design', color: '#1565c0' },
          ],
          assign: [
            { id: '1', name: 'Piotr Tarasiński' },
            { id: '2', name: 'Szymon Tokarzewski' },
            { id: '3', name: 'Szymon Tokarzewski' },
          ],
          revievers: [],
        },
        {
          id: '2',
          title: 'Add token validation',
          state: taskState.TO_DO,
          type: taskType.IMPROVMENT,
          index: 1,
          points: 8,
          priority: taskPriority.NORMAL,
          comments: [],
          labels: [
            { id: '1', name: 'Back End', color: '#ff9800' },
            { id: '2', name: 'Authentication', color: '#1565c0' },
          ],
          assign: [{ id: '1', name: 'Piotr Tarasiński' }],
          revievers: [],
        },
        {
          id: '3',
          title: 'Add remember me button to login form',
          state: taskState.TO_DO,
          type: taskType.IDEA,
          index: 2,
          points: 1,
          priority: taskPriority.LOW,
          comments: [],
          labels: [
            { id: '1', name: 'Front End', color: '#ff9800' },
            { id: '2', name: 'Design', color: '#1565c0' },
          ],
          assign: [],
          revievers: [],
        },
        {
          id: '4',
          title: 'Register Form invalid email pass validation',
          state: taskState.TO_DO,
          type: taskType.BUG,
          index: 3,
          points: 5,
          priority: taskPriority.NORMAL,
          comments: [],
          labels: [
            { id: '1', name: 'Back End', color: '#ff9800' },
            { id: '2', name: 'Authentication', color: '#1565c0' },
          ],
          assign: [],
          revievers: [],
        },
      ],
      inProgressList: [
        {
          id: '5',
          title: 'DatePicker wrong date format',
          state: taskState.IN_PROGRESS,
          type: taskType.BUG,
          index: 0,
          points: 3,
          priority: taskPriority.NORMAL,
          comments: [],
          labels: [{ id: '1', name: 'Front End', color: '#ff9800' }],
          assign: [],
          revievers: [],
        },
        {
          id: '6',
          title: 'Add interceptor to detect token',
          state: taskState.IN_PROGRESS,
          type: taskType.IMPROVMENT,
          index: 1,
          points: 5,
          priority: taskPriority.NORMAL,
          comments: [],
          labels: [
            { id: '1', name: 'Front End', color: '#ff9800' },
            { id: '2', name: 'Authentication', color: '#1565c0' },
          ],
          assign: [],
          revievers: [],
        },
        {
          id: '7',
          title: 'Regiter Form validation',
          state: taskState.IN_PROGRESS,
          type: taskType.TASK,
          index: 2,
          points: 5,
          priority: taskPriority.NORMAL,
          comments: [],
          labels: [
            { id: '1', name: 'Back End', color: '#ff9800' },
            { id: '2', name: 'Authentication', color: '#1565c0' },
          ],
          assign: [],
          revievers: [],
        },
        {
          id: '8',
          title: 'Config docker compose to start test environment',
          state: taskState.IN_PROGRESS,
          type: taskType.TASK,
          index: 3,
          points: 8,
          priority: taskPriority.NORMAL,
          comments: [],
          labels: [
            { id: '1', name: 'Dev Ops', color: '#ff9800' },
            { id: '2', name: 'Environment', color: 'grey' },
          ],
          assign: [],
          revievers: [],
        },
        {
          id: '9',
          title: 'Home page HTML template',
          state: taskState.IN_PROGRESS,
          type: taskType.TASK,
          index: 4,
          points: 5,
          priority: taskPriority.NORMAL,
          comments: [],
          labels: [
            { id: '1', name: 'Front End', color: '#ff9800' },
            { id: '2', name: 'Design', color: '#1565c0' },
          ],
          assign: [],
          revievers: [],
        },
        {
          id: '10',
          title: 'Sidebar not visible on firefox',
          state: taskState.IN_PROGRESS,
          type: taskType.BUG,
          index: 5,
          points: 8,
          priority: taskPriority.NORMAL,
          comments: [],
          labels: [
            { id: '1', name: 'Front End', color: '#ff9800' },
            { id: '2', name: 'Design', color: '#1565c0' },
          ],
          assign: [],
          revievers: [],
        },
      ],
      toReviewList: [
        {
          id: '11',
          title: 'Add tooltips in side menu',
          state: taskState.TO_REVIEW_AND_TEST,
          type: taskType.IDEA,
          index: 0,
          points: 3,
          priority: taskPriority.NORMAL,
          comments: [],
          labels: [
            { id: '1', name: 'Front End', color: '#ff9800' },
            { id: '2', name: 'Design', color: '#1565c0' },
          ],
          assign: [],
          revievers: [],
        },
      ],
      doneList: [
        {
          id: '12',
          title: 'Create Register Form HTML template',
          state: taskState.DONE,
          type: taskType.TASK,
          index: 0,
          points: 5,
          priority: taskPriority.NORMAL,
          comments: [],
          labels: [
            { id: '1', name: 'Front End', color: '#ff9800' },
            { id: '2', name: 'Design', color: '#1565c0' },
          ],
          assign: [],
          revievers: [],
        },
        {
          id: '13',
          title: 'Store token in COOKIES',
          state: taskState.DONE,
          type: taskType.IMPROVMENT,
          index: 1,
          points: 1,
          priority: taskPriority.NORMAL,
          comments: [],
          labels: [
            { id: '1', name: 'Front End', color: '#ff9800' },
            { id: '2', name: 'Authentication', color: '#1565c0' },
          ],
          assign: [],
          revievers: [],
        },
      ],
    },
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
          <div className={classes.taskList}>
            <div className={classes.taskListHeader}>
              <QueryBuilder className={classes.taskListIcon} />
              <div>
                <Typography className={classes.taskListTitle}>{taskState.TO_DO}</Typography>
                <Typography>
                  {`${sprint.taskList.toDoList.length} Tasks | ${sprint.taskList.toDoList
                    .map(o => o.points)
                    .reduce((a, b) => a + b, 0)} Points`}
                </Typography>
              </div>
            </div>
            <Droppable droppableId={taskState.TO_DO}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className={classes.droppable}>
                  {sprint.taskList.toDoList.map((item, index) => (
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
          <div className={classes.taskList}>
            <div className={classes.taskListHeader}>
              <Build className={classes.taskListIcon} />
              <div>
                <Typography className={classes.taskListTitle}>{taskState.IN_PROGRESS}</Typography>
                <Typography>
                  {`${
                    sprint.taskList.inProgressList.length
                  } Tasks | ${sprint.taskList.inProgressList
                    .map(o => o.points)
                    .reduce((a, b) => a + b, 0)} Points`}
                </Typography>
              </div>
            </div>
            <Droppable droppableId={taskState.IN_PROGRESS}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className={classes.droppable}>
                  {sprint.taskList.inProgressList.map((item, index) => (
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
          <div className={classes.taskList}>
            <div className={classes.taskListHeader}>
              <ThumbsUpDown className={classes.taskListIcon} />
              <div>
                <Typography className={classes.taskListTitle}>
                  {taskState.TO_REVIEW_AND_TEST}
                </Typography>
                <Typography>
                  {`${
                    sprint.taskList.toReviewList.length
                  } Tasks | ${sprint.taskList.toReviewList
                    .map(o => o.points)
                    .reduce((a, b) => a + b, 0)} Points`}
                </Typography>
              </div>
            </div>
            <Droppable droppableId={taskState.TO_REVIEW_AND_TEST}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className={classes.droppable}>
                  {sprint.taskList.toReviewList.map((item, index) => (
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
          <div className={classes.taskList}>
            <div className={classes.taskListHeader}>
              <CheckCircle className={classes.taskListIcon} />
              <div>
                <Typography className={classes.taskListTitle}>{taskState.DONE}</Typography>
                <Typography>
                  {`${sprint.taskList.doneList.length} Tasks | ${sprint.taskList.doneList
                    .map(o => o.points)
                    .reduce((a, b) => a + b, 0)} Points`}
                </Typography>
              </div>
            </div>
            <Droppable droppableId={taskState.DONE}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className={classes.droppable}>
                  {sprint.taskList.doneList.map((item, index) => (
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
        </DragDropContext>
      </div>
    </PageContainer>
  );
}

export default SprintPage;
