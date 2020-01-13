import React from 'react';
import useStyles from './taskPriorityChip .style';
import { Chip } from '@material-ui/core';
import { taskPriority } from 'models/enums/task';
import { grey, red, blue, green } from '@material-ui/core/colors';

interface IProps {
  priority: taskPriority;
}

const TaskPriorityChip = (props: IProps) => {
  const classes = useStyles();

  const { priority } = props;

  let color: string = grey[50];

  if (priority === taskPriority.HIGH) color = red[600];
  if (priority === taskPriority.NORMAL) color = blue[500];
  if (priority === taskPriority.LOW) color = green[600];

  return (
    <Chip label={priority} style={{ backgroundColor: color }} className={classes.taskTypeChip} />
  );
};

export default TaskPriorityChip;
