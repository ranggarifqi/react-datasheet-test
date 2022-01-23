import * as _ from "lodash";

import { createReducer } from "@reduxjs/toolkit";
import { compactArray } from "../../commons/helpers";
import {
  DATE_ONLY_FORMAT,
  TargetManpowerCell,
  TargetManpowerDaySum,
} from "../../commons/models";
import {
  fetchManpowerDayCellsRequest,
  fetchManpowerDayCellsSuccess,
  fetchManpowerDaySumSuccess,
  toggleRowExpanded,
} from "./actions";
import { format, parse } from "date-fns";

type RowIndexMapping = {
  [date: string]: boolean;
};

interface List {
  [date: string]: {
    [role: string]: TargetManpowerCell[];
  };
}

interface DaySum {
  [date: string]: {
    [role: string]: TargetManpowerDaySum
  }
}

export interface TargetManpowerState {
  list: List;
  selectedRoles: string[];
  daySum: DaySum; // grouped by date
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
    const ordered = _.orderBy(action.payload, ["order"], ["asc"]);
    const mappedRoles = ordered.map((v) => v.role);
    const compactRoles = compactArray(mappedRoles);

    const groupedDaySum: Dict<TargetManpowerDaySum[]> = _.groupBy(
      action.payload,
      "date"
    );

    const daySumGroupedByDateAndRole: DaySum = _.mapValues(groupedDaySum, (daysum) => _.keyBy(daysum,'role'))

    state.daySum = daySumGroupedByDateAndRole;
    state.selectedRoles = compactRoles;
  });

  builder.addCase(toggleRowExpanded, (state, action) => {
    const { date, isExpanded } = action.payload;
    state.isRowExpanded[date] = isExpanded;
  });

  builder.addCase(fetchManpowerDayCellsRequest, (state, action) => {
    state.isRowFetching[action.payload] = true;
  });

  builder.addCase(fetchManpowerDayCellsSuccess, (state, action) => {
    const { date, targetManpowerCells } = action.payload;

    const groupedByRole: Dict<TargetManpowerCell[]> = _.groupBy(
      targetManpowerCells,
      "role"
    );

    const list: List = {
      [date]: groupedByRole,
    };

    state.list = { ...state.list, ...list };
    state.isRowFetching[date] = false;
    state.isRowExpanded[date] = true;
  });
});

export default reducer;
