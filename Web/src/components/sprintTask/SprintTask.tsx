import React from 'react';
import useStyles from './sprintTask.style';
import { Typography, Tooltip, IconButton, Avatar, Badge } from '@material-ui/core';
import { List, BugReport, EmojiObjects, Settings, PersonAdd, Comment } from '@material-ui/icons';
import { ITask, ITaskLabel } from 'models/types/task';
import { taskType, taskPriority } from 'models/enums/task';
import { indigo, orange, red, blue, green } from '@material-ui/core/colors';
import { IPerson } from 'models/types/person';
import clsx from 'clsx';
import defaultAvatar from 'assets/images/utils/default_avatar.png';

interface IProps {
  task: ITask;
  openAssignModal: (task: ITask) => any;
}

const SprintTask = (props: IProps) => {
  const { task } = props;

  const getStyle = () => {
    const styleProps: any = {};
    if (task.type === taskType.TASK) styleProps.taskTypeColor = orange[500];
    if (task.type === taskType.IMPROVEMENT) styleProps.taskTypeColor = indigo['700'];
    if (task.type === taskType.BUG) styleProps.taskTypeColor = red[600];
    if (task.type === taskType.IDEA) styleProps.taskTypeColor = '#f20cb1';
    if (task.priority === taskPriority.HIGH) styleProps.taskPriorityColor = red[600];
    if (task.priority === taskPriority.NORMAL) styleProps.taskPriorityColor = blue[500];
    if (task.priority === taskPriority.LOW) styleProps.taskPriorityColor = green[600];
    return styleProps;
  };

  const classes = useStyles(getStyle());

  const renderTaskTypeIcon = () => {
    if (task.type === taskType.TASK) return <List className={classes.typeIcon} />;
    if (task.type === taskType.IMPROVEMENT) return <Settings className={classes.typeIcon} />;
    if (task.type === taskType.BUG) return <BugReport className={classes.typeIcon} />;
    if (task.type === taskType.IDEA) return <EmojiObjects className={classes.typeIcon} />;
  };

  const handleOpenAssignModal = (event: React.MouseEvent<HTMLElement>, task: ITask) => {
    event.stopPropagation();
    props.openAssignModal(task);
  };

  return (
    <div className={classes.taskContainer} onClick={() => alert('Open task details')}>
      <div className={classes.taskHeader}>
        <div>
          <div className={classes.taskType}>{renderTaskTypeIcon()}</div>
        </div>
        <Typography className={classes.taskNumber}>
          {task.identifier}
          {task.index}
        </Typography>
        <Tooltip title="Assign to">
          <div
            className={classes.assignContainer}
            onClick={(event: React.MouseEvent<HTMLElement>) => handleOpenAssignModal(event, task)}
          >
            {task.assign.length === 0 ? (
              <IconButton size="small">
                <PersonAdd />
              </IconButton>
            ) : (
              task.assign.map((user: IPerson, index: number) => {
                return (
                  <Avatar
                    key={user.id}
                    alt={user.name}
                    className={clsx(classes.assignAvatar, { zIndex: index })}
                    src={user.avatar || defaultAvatar}
                  />
                );
              })
            )}
          </div>
        </Tooltip>
      </div>
      <div className={classes.labelsContainer}>
        {task.labels.map((label: ITaskLabel) => {
          return (
            <div key={label.id} style={{ background: label.color }} className={classes.chip}>
              {label.name}
            </div>
          );
        })}
      </div>
      <Typography className={classes.taskTitle}>{task.title}</Typography>
      <div className={classes.taskFooter}>
        <Tooltip title={`Points: ${task.points}`}>
          <div className={clsx(classes.taskPoints, classes.chip)}>{task.points}</div>
        </Tooltip>
        <Tooltip title={`Priority: ${task.priority}`}>
          <div className={clsx(classes.priorityIcon, classes.chip)}>{task.priority}</div>
        </Tooltip>
        <Tooltip title={`Comments: ${task.comments.length}`}>
          <Badge max={9} badgeContent={task.comments.length} color="secondary">
            <Comment style={{ color: blue[500] }} />
          </Badge>
        </Tooltip>
      </div>
    </div>
  );
};

export default SprintTask;
