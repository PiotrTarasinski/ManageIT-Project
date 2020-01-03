import { Dispatch } from 'redux';
import { Action, SprintState } from 'models/types/store';
import { handleError } from 'utils/handleError';
import { API } from 'store/api';
import { sprintActionTypes } from 'models/enums/storeActions';

const setSprint = (sprint: SprintState) => ({
  type: sprintActionTypes.SET_SPRINT,
  payload: sprint,
});

const getSprint = (id: string) => (dispatch: Dispatch<Action>) => {
  return API.sprint
    .getSprint(id)
    .then((res: any) => {
      dispatch(
        setSprint({
          ...res.data,
          startDate: new Date(res.data.startDate),
          endDate: new Date(res.data.endDate),
        }),
      );
    })
    .catch((err: any) => {
      return handleError(err)(dispatch);
    });
};

export { getSprint };
