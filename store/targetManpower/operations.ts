import { ThunkAction } from "redux-thunk";
import {
  fetchManpowerDayCellsRequest,
  fetchManpowerDayCellsSuccess,
  fetchManpowerDaySumRequest,
  fetchManpowerDaySumSuccess,
} from "./actions";
import { wait } from "../../commons/helpers";
import { TargetManpowerActions } from ".";
import { TargetManpowerCell, TargetManpowerDaySum } from "../../commons/models";
import { RootState } from "..";
import { useAppSelector } from "../../hooks";
import { sltCells } from "./selector";

export const fetchManpowerDaySum = (): ThunkAction<
  Promise<void>,
  RootState,
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
      {
        id: "4",
        date: "18 Jan 2022",
        role: "Chef",
        value: 4,
      },
    ];

    dispatch(fetchManpowerDaySumSuccess(res));
  };
};

export const fetchTargetManpowerCells = (
  rowIdx: number
): ThunkAction<Promise<void>, RootState, {}, TargetManpowerActions> => {
  return async (dispatch) => {
    dispatch(fetchManpowerDayCellsRequest(rowIdx));

    await wait(2000);

    const manpowerCells = getDummyManpowerCells(rowIdx);

    dispatch(
      fetchManpowerDayCellsSuccess({
        rowIdx,
        targetManpowerCells: manpowerCells,
      })
    );
  };
};

const getDummyManpowerCells = (rowIdx: number): TargetManpowerCell[] => {
  if (rowIdx === 0) {
    return [
      {
        id: "power1",
        role: "Chef",
        manPower: 4,
        timeStart: "2022-01-17 08:00:00",
        timeEnd: "2022-01-17 08:30:00",
      },
    ];
  }

  return [];
};
