import { useEffect } from 'react';
import { AppState, Action } from 'models/types/store';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { INotification } from 'models/types/notification';
import { ThunkDispatch } from 'redux-thunk';
import { StoreAction } from 'store/actions';

interface IDispatchProps {
  removeSnackbars: () => void;
}

interface IStoreProps {
  notifications: INotification[];
}

type Props = IStoreProps & IDispatchProps;

function Notifier(props: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { notifications, removeSnackbars } = props;

  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach((notification: INotification) => {
        enqueueSnackbar(notification.text, {
          key: notification.key || new Date().getTime() + Math.random(),
          variant: notification.variant || 'default',
        });
      });
      removeSnackbars();
    }
  }, [notifications, removeSnackbars, enqueueSnackbar]);

  return null;
}

const mapStateToProps = (state: AppState) => ({
  notifications: state.app.notifications,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  removeSnackbars: () => dispatch(StoreAction.application.removeSnackbars()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);
