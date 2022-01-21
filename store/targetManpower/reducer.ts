import * as _ from "lodash";

import { createReducer } from "@reduxjs/toolkit";
import { compactArray } from "../../commons/helpers";
import { TargetManpowerCell, TargetManpowerDaySum } from "../../commons/models";
import { fetchManpowerDaySumSuccess, setList } from "./actions";

export interface TargetManpowerState {
  list: Dict<TargetManpowerCell[]>;
  selectedRoles: string[];
  daySum: Dict<TargetManpowerDaySum[]>;
}

const initialState: TargetManpowerState = {
  list: {},
  selectedRoles: [],
  daySum: {},
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setList, (state, action) => {
    state.list = action.payload;
  });

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
});

export default reducer;
