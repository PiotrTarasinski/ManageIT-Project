import React from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './sprintPage.style';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Typography } from '@material-ui/core';
import { CheckCircle, QueryBuilder, ThumbsUpDown, Build } from '@material-ui/icons';
import { taskState, taskType } from 'models/enums/task';
import SprintTask from 'components/sprintTask/SprintTask';
import { daysBetween } from 'utils/daysBetween';
import { ISprint } from 'models/types/sprint';

function SprintPage() {
  const classes = useStyles();

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    console.log(result);
  };

  const sprint: ISprint = {
    id: '1',
    name: 'Sprint Name',
    startDate: new Date(),
    endDate: new Date('12-27-2019'),
    toDoList: [
      {
        id: '1',
        title: 'Create Login Form HTML template',
        state: taskState.TO_DO,
        type: taskType.TASK,
        index: 0,
        points: 3,
        labels: [
          { id: '1', name: 'Front End', color: 'aqua' },
          { id: '2', name: 'Design', color: 'red' },
        ],
        assing: [],
        revievers: [],
      },
      {
        id: '2',
        title: 'Add token validation',
        state: taskState.TO_DO,
        type: taskType.IMPROVMENT,
        index: 1,
        points: 8,
        labels: [
          { id: '1', name: 'Back End', color: 'aqua' },
          { id: '2', name: 'Authentication', color: 'red' },
        ],
        assing: [],
        revievers: [],
      },
      {
        id: '3',
        title: 'Add remember me button to login form',
        state: taskState.TO_DO,
        type: taskType.IDEA,
        index: 2,
        points: 1,
        labels: [
          { id: '1', name: 'Front End', color: 'aqua' },
          { id: '2', name: 'Design', color: 'red' },
        ],
        assing: [],
        revievers: [],
      },
      {
        id: '4',
        title: 'Register Form invalid email pass validation',
        state: taskState.TO_DO,
        type: taskType.BUG,
        index: 3,
        points: 5,
        labels: [
          { id: '1', name: 'Back End', color: 'aqua' },
          { id: '2', name: 'Authentication', color: 'red' },
        ],
        assing: [],
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
        labels: [{ id: '1', name: 'Front End', color: 'aqua' }],
        assing: [],
        revievers: [],
      },
      {
        id: '6',
        title: 'Add interceptor to detect token',
        state: taskState.IN_PROGRESS,
        type: taskType.IMPROVMENT,
        index: 1,
        points: 5,
        labels: [
          { id: '1', name: 'Front End', color: 'aqua' },
          { id: '2', name: 'Authentication', color: 'red' },
        ],
        assing: [],
        revievers: [],
      },
      {
        id: '7',
        title: 'Regiter Form validation',
        state: taskState.IN_PROGRESS,
        type: taskType.TASK,
        index: 2,
        points: 5,
        labels: [
          { id: '1', name: 'Back End', color: 'aqua' },
          { id: '2', name: 'Authentication', color: 'red' },
        ],
        assing: [],
        revievers: [],
      },
      {
        id: '8',
        title: 'Config docker compose to start test environment',
        state: taskState.IN_PROGRESS,
        type: taskType.TASK,
        index: 3,
        points: 8,
        labels: [
          { id: '1', name: 'Dev Ops', color: 'aqua' },
          { id: '2', name: 'Environment', color: 'grey' },
        ],
        assing: [],
        revievers: [],
      },
      {
        id: '9',
        title: 'Home page HTML template',
        state: taskState.IN_PROGRESS,
        type: taskType.TASK,
        index: 4,
        points: 5,
        labels: [
          { id: '1', name: 'Front End', color: 'aqua' },
          { id: '2', name: 'Design', color: 'red' },
        ],
        assing: [],
        revievers: [],
      },
      {
        id: '10',
        title: 'Sidebar not visible on firefox',
        state: taskState.IN_PROGRESS,
        type: taskType.BUG,
        index: 5,
        points: 8,
        labels: [
          { id: '1', name: 'Front End', color: 'aqua' },
          { id: '2', name: 'Design', color: 'red' },
        ],
        assing: [],
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
        labels: [
          { id: '1', name: 'Front End', color: 'aqua' },
          { id: '2', name: 'Design', color: 'red' },
        ],
        assing: [],
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
        labels: [
          { id: '1', name: 'Front End', color: 'aqua' },
          { id: '2', name: 'Design', color: 'red' },
        ],
        assing: [],
        revievers: [],
      },
      {
        id: '13',
        title: 'Store token in COOKIES',
        state: taskState.DONE,
        type: taskType.IMPROVMENT,
        index: 1,
        points: 1,
        labels: [
          { id: '1', name: 'Front End', color: 'aqua' },
          { id: '2', name: 'Authentication', color: 'red' },
        ],
        assing: [],
        revievers: [],
      },
    ],
  };

  return (
    <PageContainer className={classes.mainContainer}>
      <div className={classes.pageHeader}>
        <Typography className={classes.sprintName} component="h1">
          {sprint.name}
        </Typography>
        <div className={classes.sprintDateRangeContainer}>
          <QueryBuilder className={classes.sprintDateRangeIcon} />
          <Typography className={classes.sprintDateRange}>
            {`${sprint.startDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })}
            - ${sprint.endDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })}`}
          </Typography>
          <Typography className={classes.sprintTimeLeft}>
            {`${daysBetween(sprint.startDate, sprint.endDate)} days left`}
          </Typography>
        </div>
      </div>
      <div className={classes.taskListContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={classes.taskList}>
            <div className={classes.taskListHeader}>
              <QueryBuilder className={classes.taskListIcon} />
              <div>
                <Typography className={classes.taskListTitle}>{taskState.TO_DO}</Typography>
                <Typography>
                  {`${sprint.toDoList.length} Tasks | ${sprint.toDoList
                    .map(o => o.points)
                    .reduce((a, b) => a + b, 0)} Points`}
                </Typography>
              </div>
            </div>
            <Droppable droppableId={taskState.TO_DO}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className={classes.droppable}>
                  {sprint.toDoList.map((item, index) => (
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
                  {`${sprint.inProgressList.length} Tasks | ${sprint.inProgressList
                    .map(o => o.points)
                    .reduce((a, b) => a + b, 0)} Points`}
                </Typography>
              </div>
            </div>
            <Droppable droppableId={taskState.IN_PROGRESS}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className={classes.droppable}>
                  {sprint.inProgressList.map((item, index) => (
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
                  {`${sprint.toReviewList.length} Tasks | ${sprint.toReviewList
                    .map(o => o.points)
                    .reduce((a, b) => a + b, 0)} Points`}
                </Typography>
              </div>
            </div>
            <Droppable droppableId={taskState.TO_REVIEW_AND_TEST}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className={classes.droppable}>
                  {sprint.toReviewList.map((item, index) => (
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
                  {`${sprint.doneList.length} Tasks | ${sprint.doneList
                    .map(o => o.points)
                    .reduce((a, b) => a + b, 0)} Points`}
                </Typography>
              </div>
            </div>
            <Droppable droppableId={taskState.DONE}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className={classes.droppable}>
                  {sprint.doneList.map((item, index) => (
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
