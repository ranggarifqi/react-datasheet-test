import * as _ from "lodash";

import { createReducer } from "@reduxjs/toolkit";
import { compactArray } from "../../commons/helpers";
import { TargetManpowerCell, TargetManpowerDaySum } from "../../commons/models";
import {
  fetchManpowerDayCellsRequest,
  fetchManpowerDayCellsSuccess,
  fetchManpowerDaySumSuccess,
} from "./actions";

type RowIndexMapping = {
  [rowIdx: number]: boolean
}

export interface TargetManpowerState {
  list: Dict<TargetManpowerCell[]>;
  selectedRoles: string[];
  daySum: Dict<TargetManpowerDaySum[]>;
  isRowFetching: RowIndexMapping;
  isRowExpanded: RowIndexMapping;
}

const initialState: TargetManpowerState = {
  list: {},
  selectedRoles: [],
  daySum: {},
  isRowFetching: {},
  isRowExpanded: {},
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchManpowerDaySumSuccess, (state, action) => {
    const mappedRoles = action.payload.map((v) => v.role);
    const compactRoles = compactArray(mappedRoles);

    const groupedDaySum: Dict<TargetManpowerDaySum[]> = _.groupBy(
      action.payload,
      "date"
    );

    state.daySum = groupedDaySum;
    state.selectedRoles = compactRoles;
  });

  builder.addCase(fetchManpowerDayCellsRequest, (state, action) => {
    state.isRowFetching[action.payload] = true
  })

  builder.addCase(fetchManpowerDayCellsSuccess, (state, action) => {
    const { rowIdx, targetManpowerCells } = action.payload

    const groupedByDate: Dict<TargetManpowerCell[]> = _.groupBy(
      targetManpowerCells,
      "timeStart"
    );
    state.list = { ...state.list, ...groupedByDate };
    state.isRowFetching[rowIdx] = false
    state.isRowExpanded[rowIdx] = true
  });
});

export default reducer;
