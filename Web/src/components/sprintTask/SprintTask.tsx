import React from 'react';
import useStyles from './sprintTask.style';
import { Typography, Tooltip, IconButton, Chip } from '@material-ui/core';
import { List, BugReport, EmojiObjects, Settings, PersonAdd } from '@material-ui/icons';
import { ITask, ITaskLabel } from 'models/types/task';
import { taskType } from 'models/enums/task';
import { indigo } from '@material-ui/core/colors';

interface IProps {
  task: ITask;
}

// const task: ITask = {
//   id: '1',
//   title: 'Lorem ipsum dolorem at vinci da vici zxc gyasd',
//   type: taskType.BUG,
//   state: taskState.TO_DO,
//   points: 3,
//   labels: [
//     { id: '1', name: 'Front End', color: 'aqua' },
//     { id: '2', name: 'Design', color: 'red' },
//   ],
//   assing: [],
//   revievers: [],
// };

const SprintTask = (props: IProps) => {
  const { task } = props;

  const getStyle = () => {
    const styleProps: any = {};
    if (task.type === taskType.TASK) styleProps.backgroundColor = '#ff9e03';
    if (task.type === taskType.IMPROVMENT) styleProps.backgroundColor = indigo['700'];
    if (task.type === taskType.BUG) styleProps.backgroundColor = '#c91818';
    if (task.type === taskType.IDEA) styleProps.backgroundColor = '#f20cb1';
    return styleProps;
  };

  const classes = useStyles(getStyle());

  const renderTaskTypeIcon = () => {
    if (task.type === taskType.TASK) return <List className={classes.typeIcon} />;
    if (task.type === taskType.IMPROVMENT) return <Settings className={classes.typeIcon} />;
    if (task.type === taskType.BUG) return <BugReport className={classes.typeIcon} />;
    if (task.type === taskType.IDEA) return <EmojiObjects className={classes.typeIcon} />;
  };

  return (
    <div className={classes.taskContainer}>
      <div className={classes.taskHeader}>
        <div>
          <div className={classes.taskType}>{renderTaskTypeIcon()}</div>
        </div>
        <Typography className={classes.taskNumber}>ENV-123</Typography>
        <Tooltip title="Assign to">
          <div className={classes.assignContainer} onClick={() => alert('elo')}>
            <IconButton size="small">
              <PersonAdd />
            </IconButton>
          </div>
        </Tooltip>
      </div>
      <Typography className={classes.taskTitle}>{task.title}</Typography>
      <div className={classes.labelsContainer}>
        {task.labels.map((label: ITaskLabel) => {
          return (
            <Chip
              key={label.id}
              style={{ background: label.color }}
              size="small"
              label={label.name}
            />
          );
        })}
      </div>
      <div className={classes.taskFooter}>
        <Tooltip title="Points">
          <div className={classes.taskPoints}>{task.points}</div>
        </Tooltip>
      </div>
    </div>
  );
};

export default SprintTask;
