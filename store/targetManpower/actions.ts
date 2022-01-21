import { createAction } from "@reduxjs/toolkit";
import { SliceActions } from "..";
import { TargetManpowerCell } from "../../commons/models";

export const setList = createAction<Dict<TargetManpowerCell[]>>(
  "targetManpower/setList"
);

export const fetchSelectedRolesRequest = createAction(
  "targetManpower/fetchSelectedRolesRequest"
);
export const fetchSelectedRolesSuccess = createAction<string[]>(
  "targetManpower/fetchSelectedRolesSuccess"
);
export const fetchSelectedRolesError = createAction<string[]>(
  "targetManpower/fetchSelectedRolesError"
);

const actions = {
  fetchSelectedRolesRequest,
  fetchSelectedRolesSuccess,
  fetchSelectedRolesError,
};

export type TargetManpowerActions = SliceActions<typeof actions>
