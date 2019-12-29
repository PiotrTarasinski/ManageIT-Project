import React from 'react';
import useStyles from './projectStateChip.style';
import { Chip } from '@material-ui/core';
import { CheckCircle, Settings, EmojiObjectsRounded, Cancel } from '@material-ui/icons';
import { ProjectState } from 'models/types/project';
import clsx from 'clsx';

interface IProps {
  projectState: ProjectState;
}

const ProjectStateChip = (props: IProps) => {
  const classes = useStyles();

  const { projectState } = props;

  let icon: JSX.Element | undefined = undefined;
  if (projectState === 'Completed') icon = <CheckCircle />;
  if (projectState === 'In Development') icon = <Settings />;
  if (projectState === 'Planning') icon = <EmojiObjectsRounded />;
  if (projectState === 'Cancelled') icon = <Cancel />;

  return (
    <Chip
      label={projectState}
      icon={icon}
      className={clsx(classes.projectStateChip, {
        [classes.completedStateChip]: projectState === 'Completed',
        [classes.inDevelopmentStateChip]: projectState === 'In Development',
        [classes.planningStateChip]: projectState === 'Planning',
        [classes.cancelledStateChip]: projectState === 'Cancelled',
      })}
    />
  );
};

export default ProjectStateChip;
