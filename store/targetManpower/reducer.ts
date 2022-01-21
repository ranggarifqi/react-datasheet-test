import { createReducer } from "@reduxjs/toolkit";
import { TargetManpowerCell } from "../../commons/models";
import { fetchSelectedRolesSuccess, setList } from "./actions";

export interface TargetManpowerState {
  list: Dict<TargetManpowerCell[]>;
  selectedRoles: string[];
}

const initialState: TargetManpowerState = {
  list: {},
  selectedRoles: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setList, (state, action) => {
    state.list = action.payload
  })

  builder.addCase(fetchSelectedRolesSuccess, (state, action) => {
    state.selectedRoles = action.payload
  })
})

export default reducer;
