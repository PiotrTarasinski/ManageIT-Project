import React from 'react';
import useStyles from './pageContainer.style';
import clsx from 'clsx';

interface IProps {
  children: React.ReactNode;
  className?: any;
}

const PageContainer = (props: IProps) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <main className={classes.main}>
      <div className={classes.toolbar} />
      <div className={classes.container}>
        <div className={clsx(classes.content, props.className)}>{children}</div>
      </div>
    </main>
  );
};

export default PageContainer;
