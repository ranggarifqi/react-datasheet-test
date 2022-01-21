import { ThunkAction } from "redux-thunk";
import { TargetManpowerState } from "./reducer";
import {
  fetchSelectedRolesRequest,
  fetchSelectedRolesSuccess,
  TargetManpowerActions,
} from "./actions";
import { wait } from "../../commons/helpers";

export const fetchSelectedRoles =
  (): ThunkAction<
    Promise<void>,
    TargetManpowerState,
    {},
    TargetManpowerActions
  > =>
  async (dispatch) => {
    dispatch(fetchSelectedRolesRequest());

    await wait(3000);

    dispatch(fetchSelectedRolesSuccess(["Role 1", "Role 2", "Role 3"]));
  };
