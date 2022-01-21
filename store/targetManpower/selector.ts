import { createSelector } from "@reduxjs/toolkit";
import { add, format, startOfISOWeek } from "date-fns";
import { RootState } from "..";
import { Column, defaultColumns } from "../../commons/columns";
import { Cell } from "../../commons/types";

const sltTargetManpower = (state: RootState) => state.targetManpower;

const sltSelectedRoles = createSelector(sltTargetManpower, (targetManpower) => {
  return targetManpower.selectedRoles;
});

const sltList = createSelector(sltTargetManpower, (targetManpower) => {
  return targetManpower.list;
});

const sltDaySum = createSelector(sltTargetManpower, (targetManpower) => {
  return targetManpower.daySum;
});

export const sltColumns = createSelector(sltSelectedRoles, (selectedRoles) => {
  const newColumns = selectedRoles.map<Column>((v) => {
    return {
      name: v,
      key: v,
    };
  });

  return [...defaultColumns, ...newColumns];
});

const getWeekDates = () => {
  const startOfISOW = startOfISOWeek(new Date());
  const result: string[] = [format(startOfISOW, "d MMM yyyy")];

  for (let i = 1; i <= 6; i++) {
    const d = add(startOfISOW, { days: i });
    result.push(format(d, "d MMM yyyy"));
  }

  return result
};

export const sltCells = createSelector(
  [sltDaySum, sltList, sltColumns],
  (daySums, list, columns) => {
    const weekDates = getWeekDates()
    const cells: Cell[][] = weekDates.map(date => {
      const daySum = daySums[date]
      console.log(daySum)
      const result: Cell[] = columns.map(column => {
        console.log(column)
        return {
          isDaySum: true,
          value: 'zzz'
        }
      })

      // result[0]

      return result
    })

    return cells;
  }
);
