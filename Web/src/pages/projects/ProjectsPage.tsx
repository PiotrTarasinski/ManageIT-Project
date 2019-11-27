import React from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './projectsPage.style';
import ProjectsTable from './projectsTable/ProjectsTable';

function ProjectsPage() {
  const classes = useStyles();

  return (
    <PageContainer className={classes.mainContainer}>
      <ProjectsTable />
    </PageContainer>
  );
}

export default ProjectsPage;
