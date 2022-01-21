import { ThunkAction } from "redux-thunk";
import { TargetManpowerState } from "./reducer";
import {
  fetchManpowerDaySumRequest,
  fetchManpowerDaySumSuccess,
} from "./actions";
import { wait } from "../../commons/helpers";
import { TargetManpowerActions } from ".";
import { TargetManpowerDaySum } from "../../commons/models";

export const fetchManpowerDaySum = (): ThunkAction<
  Promise<void>,
  TargetManpowerState,
  {},
  TargetManpowerActions
> => {
  return async (dispatch) => {
    dispatch(fetchManpowerDaySumRequest());

    await wait(3000);

    const res: TargetManpowerDaySum[] = [
      {
        id: "1",
        date: "17 Jan 2022",
        role: "Chef",
        value: 2,
      },
      {
        id: "2",
        date: "17 Jan 2022",
        role: "Bartender",
        value: 2,
      },
      {
        id: "3",
        date: "17 Jan 2022",
        role: "Cleaning Service",
        value: 1,
      },
    ];

    dispatch(fetchManpowerDaySumSuccess(res));
  };
};
