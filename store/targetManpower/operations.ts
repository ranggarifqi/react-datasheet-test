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
import {
  DATE_ONLY_FORMAT,
  TargetManpowerCell,
  TargetManpowerDaySum,
} from "../../commons/models";
import { RootState } from "..";
import { useAppSelector } from "../../hooks";
import { sltCells, sltIsRowExpanded } from "./selector";
import format from "date-fns/format";
import { add } from "date-fns";
import startOfISOWeek from "date-fns/startOfISOWeek";

export const fetchManpowerDaySum = (): ThunkAction<
  Promise<void>,
  RootState,
  {},
  TargetManpowerActions
> => {
  return async (dispatch) => {
    dispatch(fetchManpowerDaySumRequest());

    await wait(1000);

    const today = format(new Date(), DATE_ONLY_FORMAT);
    const nextDay = format(add(new Date(), { days: 1 }), DATE_ONLY_FORMAT);

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
  const today = format(new Date(), DATE_ONLY_FORMAT);
  const today2 = format(new Date(), 'yyyy-MM-dd');

  const nextDay = format(add(new Date(), { days: 1 }), DATE_ONLY_FORMAT);
  const nextDay2 = format(add(new Date(), { days: 1 }), 'yyyy-MM-dd');
  const weekStart = format(startOfISOWeek(new Date()), DATE_ONLY_FORMAT);

  if (date === today) {
    return [
      {
        id: "power1",
        role: "Chef",
        manPower: 2,
        weekStart: weekStart,
        timeStart: `${today2} 08:00:00`,
        timeEnd: `${today2} 08:30:00`,
      },
      {
        id: "power1",
        role: "Chef",
        manPower: 2,
        weekStart: weekStart,
        timeStart: `${today2} 08:30:00`,
        timeEnd: `${today2} 09:00:00`,
      },
      {
        id: "power1",
        role: "Chef",
        manPower: 2,
        weekStart: weekStart,
        timeStart: `${today2} 15:30:00`,
        timeEnd: `${today2} 16:00:00`,
      },
    ];
  } else if (date === nextDay) {
    return [
      {
        id: "power1",
        role: "Bartender",
        manPower: 2,
        weekStart: weekStart,
        timeStart: `${nextDay2} 08:00:00`,
        timeEnd: `${nextDay2} 08:30:00`,
      },
    ];
  }

  return [];
};
