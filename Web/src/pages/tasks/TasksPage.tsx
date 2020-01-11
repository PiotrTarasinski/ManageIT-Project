import React from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './tasksPage.style';
import { Paper } from '@material-ui/core';
import TaskListToolbar from './TaskListToolbar';

function TasksPage() {
  const classes = useStyles();

  return (
    <PageContainer className={classes.mainContainer}>
      <Paper className={classes.paper}>
        <TaskListToolbar
          handleSearch={(event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.value);
          }}
        />
      </Paper>
    </PageContainer>
  );
}

export default TasksPage;
