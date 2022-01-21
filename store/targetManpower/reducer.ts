import { createReducer } from "@reduxjs/toolkit";
import { TargetManpowerCell } from "../../commons/models";
import { setList, setSelectedRoles } from "./actions";

interface targetManpowerState {
  list: Dict<TargetManpowerCell[]>;
  selectedRoles: string[];
}

const initialState: targetManpowerState = {
  list: {},
  selectedRoles: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setList, (state, action) => {
    state.list = action.payload
  })

  builder.addCase(setSelectedRoles, (state, action) => {
    state.selectedRoles = action.payload
  })
})

export default reducer;
