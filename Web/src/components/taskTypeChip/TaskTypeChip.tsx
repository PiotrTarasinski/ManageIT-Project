import React from 'react';
import useStyles from './taskTypeChip.style';
import { Chip } from '@material-ui/core';
import { taskType } from 'models/enums/task';
import { grey, orange, indigo, red } from '@material-ui/core/colors';
import { BugReport, List, Settings, EmojiObjects } from '@material-ui/icons';

interface IProps {
  type: taskType;
}

const TaskTypeChip = (props: IProps) => {
  const classes = useStyles();

  const { type } = props;

  let icon: JSX.Element | undefined = undefined;
  let color: string = grey[50];

  if (type === taskType.TASK) {
    icon = <List />;
    color = orange[500];
  }
  if (type === taskType.IMPROVEMENT) {
    icon = <Settings />;
    color = indigo['700'];
  }
  if (type === taskType.BUG) {
    icon = <BugReport />;
    color = red[600];
  }
  if (type === taskType.IDEA) {
    icon = <EmojiObjects />;
    color = '#f20cb1';
  }

  return (
    <Chip
      label={type}
      icon={icon}
      style={{ backgroundColor: color }}
      className={classes.taskTypeChip}
    />
  );
};

export default TaskTypeChip;
