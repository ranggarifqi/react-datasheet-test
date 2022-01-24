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
import { DATE_ONLY_FORMAT, TargetManpowerCell, TargetManpowerDaySum } from "../../commons/models";
import { RootState } from "..";
import { useAppSelector } from "../../hooks";
import { sltCells, sltIsRowExpanded } from "./selector";
import format from "date-fns/format";
import { add } from "date-fns";

export const fetchManpowerDaySum = (): ThunkAction<
  Promise<void>,
  RootState,
  {},
  TargetManpowerActions
> => {
  return async (dispatch) => {
    dispatch(fetchManpowerDaySumRequest());

    await wait(1000);

    const today = format(new Date(), DATE_ONLY_FORMAT)
    const nextDay = format(add(new Date(), { days: 1 }), DATE_ONLY_FORMAT)

    const res: TargetManpowerDaySum[] = [
      {
        date: today,
        role: "Chef",
        value: 2,
        order: 1,
      },
      {
        date: today,
        role: "Bartender",
        value: 2,
        order: 3,
      },
      {
        date: today,
        role: "Cleaning Service",
        value: 1,
        order: 2,
      },
      {
        date: nextDay,
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
  const today = format(new Date(), DATE_ONLY_FORMAT)
  const nextDay = format(add(new Date(), { days: 1 }), DATE_ONLY_FORMAT)
  if (date === today) {
    return [
      {
        id: "power1",
        role: "Chef",
        manPower: 2,
        weekStart: "2022-01-24",
        timeStart: "2022-01-24 08:00:00",
        timeEnd: "2022-01-24 08:30:00",
      },
      {
        id: "power1",
        role: "Chef",
        manPower: 2,
        weekStart: "2022-01-24",
        timeStart: "2022-01-24 08:30:00",
        timeEnd: "2022-01-24 09:00:00",
      },
      {
        id: "power1",
        role: "Chef",
        manPower: 2,
        weekStart: "2022-01-24",
        timeStart: "2022-01-24 15:30:00",
        timeEnd: "2022-01-24 16:00:00",
      },
    ];
  } else if (date === nextDay) {
    return [
      {
        id: "power1",
        role: "Bartender",
        manPower: 2,
        weekStart: "2022-01-25",
        timeStart: "2022-01-25 08:00:00",
        timeEnd: "2022-01-25 08:30:00",
      },
    ];
  }

  return [];
};
