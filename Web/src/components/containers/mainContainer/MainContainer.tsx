import React from 'react';
import useStyles from './mainContainer.style';

interface IProps {
  children: React.ReactNode;
}

const MainContainer = (props: IProps) => {
  const classes = useStyles();
  const { children } = props;

  return <div className={classes.root}>{children}</div>;
};

export default MainContainer;
