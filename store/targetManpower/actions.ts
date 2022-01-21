import { createAction } from "@reduxjs/toolkit";
import { TargetManpowerCell, TargetManpowerDaySum } from "../../commons/models";

export const setList = createAction<Dict<TargetManpowerCell[]>>(
  "targetManpower/setList"
);

export const fetchManpowerDaySumRequest = createAction(
  "targetManpower/fetchManpowerDaySumRequest"
);
export const fetchManpowerDaySumSuccess = createAction<TargetManpowerDaySum[]>(
  "targetManpower/fetchManpowerDaySumSuccess"
);
export const fetchManpowerDaySumError = createAction<Error>(
  "targetManpower/fetchManpowerDaySumError"
);

export const fetchManpowerDayCellsRequest = createAction<number>(
  "targetManpower/fetchManpowerDayCellsRequest"
);

interface fetchManpowerDayCellsSuccessPayload {
  rowIdx: number,
  targetManpowerCells: TargetManpowerCell[]
}
export const fetchManpowerDayCellsSuccess = createAction<fetchManpowerDayCellsSuccessPayload>(
  "targetManpower/fetchManpowerDayCellsSuccess"
);
export const fetchManpowerDayCellsError = createAction<Error>(
  "targetManpower/fetchManpowerDayCellsError"
);
