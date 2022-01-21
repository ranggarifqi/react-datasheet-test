import { createAction } from "@reduxjs/toolkit";
import { TargetManpowerCell } from "../../commons/models";

export const setList = createAction<Dict<TargetManpowerCell[]>>('targetManpower/setList')
export const setSelectedRoles = createAction<string[]>('targetManpower/setSelectedRoles')