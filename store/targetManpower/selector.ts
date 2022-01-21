import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Column, defaultColumns } from "../../commons/columns";

const sltTargetManpower = (state: RootState) => state.targetManpower;

const sltSelectedRoles = createSelector(sltTargetManpower, (targetManpower) => {
  return targetManpower.selectedRoles;
});

export const sltColumns = createSelector(sltSelectedRoles, (selectedRoles) => {
  const newColumns = selectedRoles.map<Column>((v) => {
    return {
      name: v,
      key: v,
    };
  });

  return [...defaultColumns, ...newColumns]
});
