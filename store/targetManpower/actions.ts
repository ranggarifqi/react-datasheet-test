import { createAction } from "@reduxjs/toolkit";
import { TargetManpowerCell, TargetManpowerDaySum } from "../../commons/models";

export const setList = createAction<Dict<TargetManpowerCell[]>>(
  "targetManpower/setList"
);

interface ToggleRowExpandedPaylaod {
  date: string,
  isExpanded: boolean,
}
export const toggleRowExpanded = createAction<ToggleRowExpandedPaylaod>('targetManpower/toggleRowExpanded')

export const fetchManpowerDaySumRequest = createAction(
  "targetManpower/fetchManpowerDaySumRequest"
);
export const fetchManpowerDaySumSuccess = createAction<TargetManpowerDaySum[]>(
  "targetManpower/fetchManpowerDaySumSuccess"
);
export const fetchManpowerDaySumError = createAction<Error>(
  "targetManpower/fetchManpowerDaySumError"
);

export const fetchManpowerDayCellsRequest = createAction<string>(
  "targetManpower/fetchManpowerDayCellsRequest"
);

interface fetchManpowerDayCellsSuccessPayload {
  date: string,
  targetManpowerCells: TargetManpowerCell[]
}
export const fetchManpowerDayCellsSuccess = createAction<fetchManpowerDayCellsSuccessPayload>(
  "targetManpower/fetchManpowerDayCellsSuccess"
);
export const fetchManpowerDayCellsError = createAction<Error>(
  "targetManpower/fetchManpowerDayCellsError"
);
