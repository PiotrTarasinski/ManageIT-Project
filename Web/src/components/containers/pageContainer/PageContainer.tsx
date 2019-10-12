import * as React from 'react';
import useStyles from './pageContainer.style';

interface IProps {
  children: React.ReactNode;
}

const PageContainer = (props: IProps) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <main className={classes.main}>
      <div className={classes.toolbar} />
      <div className={classes.container}>
        <div className={classes.content}>{children}</div>
      </div>
    </main>
  );
};

export default PageContainer;
