import { ThunkAction } from "redux-thunk";
import {
  fetchManpowerDayCellsRequest,
  fetchManpowerDayCellsSuccess,
  fetchManpowerDaySumRequest,
  fetchManpowerDaySumSuccess,
  toggleRowExpanded,
} from "./actions";
import { wait } from "../../commons/helpers";
import { TargetManpowerActions } from ".";
import { TargetManpowerCell, TargetManpowerDaySum } from "../../commons/models";
import { RootState } from "..";
import { useAppSelector } from "../../hooks";
import { sltCells, sltIsRowExpanded } from "./selector";

export const fetchManpowerDaySum = (): ThunkAction<
  Promise<void>,
  RootState,
  {},
  TargetManpowerActions
> => {
  return async (dispatch) => {
    dispatch(fetchManpowerDaySumRequest());

    await wait(1000);

    const res: TargetManpowerDaySum[] = [
      {
        date: "17 Jan 2022",
        role: "Chef",
        value: 2,
        order: 1,
      },
      {
        date: "17 Jan 2022",
        role: "Bartender",
        value: 2,
        order: 3,
      },
      {
        date: "17 Jan 2022",
        role: "Cleaning Service",
        value: 1,
        order: 2,
      },
      {
        date: "18 Jan 2022",
        role: "Chef",
        value: 4,
        order: 1,
      },
    ];

    dispatch(fetchManpowerDaySumSuccess(res));
  };
};

export const fetchTargetManpowerCells = (
  date: string
): ThunkAction<Promise<void>, RootState, {}, TargetManpowerActions> => {
  return async (dispatch, getState) => {
    const state = getState();

    const isRowExpanded = sltIsRowExpanded(state);

    console.log("ranggaxxx", isRowExpanded);

    if (!!isRowExpanded[date]) {
      dispatch(toggleRowExpanded({ date, isExpanded: false }));
      return;
    }

    dispatch(fetchManpowerDayCellsRequest(date));

    await wait(1000);

    const manpowerCells = getDummyManpowerCells(date);

    dispatch(
      fetchManpowerDayCellsSuccess({
        date,
        targetManpowerCells: manpowerCells,
      })
    );
  };
};

const getDummyManpowerCells = (date: string): TargetManpowerCell[] => {
  if (date === "17 Jan 2022") {
    return [
      {
        id: "power1",
        role: "Chef",
        manPower: 2,
        weekStart: "2022-01-17",
        timeStart: "2022-01-17 08:00:00",
        timeEnd: "2022-01-17 08:30:00",
      },
      {
        id: "power1",
        role: "Chef",
        manPower: 2,
        weekStart: "2022-01-17",
        timeStart: "2022-01-17 08:30:00",
        timeEnd: "2022-01-17 09:00:00",
      },
      {
        id: "power1",
        role: "Chef",
        manPower: 2,
        weekStart: "2022-01-17",
        timeStart: "2022-01-17 15:30:00",
        timeEnd: "2022-01-17 16:00:00",
      },
    ];
  } else if (date === "19 Jan 2022") {
    return [
      {
        id: "power1",
        role: "Bartender",
        manPower: 2,
        weekStart: "2022-01-19",
        timeStart: "2022-01-19 08:00:00",
        timeEnd: "2022-01-19 08:30:00",
      },
    ];
  }

  return [];
};
