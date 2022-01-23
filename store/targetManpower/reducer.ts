import * as _ from "lodash";

import { createReducer } from "@reduxjs/toolkit";
import { compactArray } from "../../commons/helpers";
import { DATE_ONLY_FORMAT, TargetManpowerCell, TargetManpowerDaySum } from "../../commons/models";
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

export interface TargetManpowerState {
  list: Dict<TargetManpowerCell[]>;
  selectedRoles: string[];
  daySum: Dict<TargetManpowerDaySum[]>; // grouped by date
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
    const ordered = _.orderBy(action.payload, ['order'], ['asc'])
    const mappedRoles = ordered.map((v) => v.role);
    const compactRoles = compactArray(mappedRoles);

    const groupedDaySum: Dict<TargetManpowerDaySum[]> = _.groupBy(
      action.payload,
      "date"
    );

    state.daySum = groupedDaySum;
    state.selectedRoles = compactRoles;
  });

  builder.addCase(toggleRowExpanded, (state, action) => {
    const { date, isExpanded } = action.payload
    state.isRowExpanded[date] = isExpanded
  })

  builder.addCase(fetchManpowerDayCellsRequest, (state, action) => {
    state.isRowFetching[action.payload] = true;
  });

  builder.addCase(fetchManpowerDayCellsSuccess, (state, action) => {
    const { date, targetManpowerCells } = action.payload;

    const groupedByDate: Dict<TargetManpowerCell[]> = _.groupBy(
      targetManpowerCells,
      (cell) => {
        const parsed = parse(cell.timeStart, 'yyyy-MM-dd HH:mm:ss', new Date())
        console.log('parsed', parsed)
        return format(parsed, DATE_ONLY_FORMAT)
      }
    );


    state.list = { ...state.list, ...groupedByDate };
    state.isRowFetching[date] = false;
    state.isRowExpanded[date] = true;
  });
});

export default reducer;
