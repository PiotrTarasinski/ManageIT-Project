import React from 'react';
import useStyles from './formEror.style';
import { ErrorOutline } from '@material-ui/icons';

interface IProps {
  error: string;
}

const FormEror = (props: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.formError}>
      <ErrorOutline /> {props.error}
    </div>
  );
};

export default FormEror;
