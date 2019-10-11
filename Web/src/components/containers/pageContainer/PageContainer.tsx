import * as React from 'react';
import useStyles from './pageContainer.style';

interface IProps {
  children: React.ReactNode;
}

const PageContainer = (props: IProps) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
    </main>
  );
};

export default PageContainer;
