import * as _ from "lodash";
import { createSelector } from "@reduxjs/toolkit";
import { add, format, startOfISOWeek } from "date-fns";
import { RootState } from "..";
import { Column, defaultColumns } from "../../commons/columns";
import { Cell } from "../../commons/types";
import { DATE_ONLY_FORMAT } from "../../commons/models";

const sltTargetManpower = (state: RootState) => state.targetManpower;

const sltList = createSelector(
  sltTargetManpower,
  (targetManpower) => targetManpower.list
);

const sltSelectedRoles = createSelector(sltTargetManpower, (targetManpower) => {
  return targetManpower.selectedRoles;
});

const sltDaySum = createSelector(sltTargetManpower, (targetManpower) => {
  return targetManpower.daySum;
});

export const sltIsRowFetching = createSelector(
  sltTargetManpower,
  (targetManpower) => targetManpower.isRowFetching
);

export const sltIsRowExpanded = createSelector(
  sltTargetManpower,
  (targetManpower) => targetManpower.isRowExpanded
);

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
  const result: string[] = [format(startOfISOW, DATE_ONLY_FORMAT)];

  for (let i = 1; i <= 6; i++) {
    const d = add(startOfISOW, { days: i });
    result.push(format(d, DATE_ONLY_FORMAT));
  }

  return result;
};

export const sltCells = createSelector(
  [sltDaySum, sltColumns, sltIsRowExpanded, sltList],
  (daySums, columns, isRowExpandedMapping, list) => {
    const weekDates = getWeekDates();

    const result: Cell[][] = [];

    for (const date of weekDates) {
      const daySum = daySums[date] ?? {};
      const daySumValues = daySum ? Object.values(daySum) : [];

      const total =
        daySumValues.reduce((total, ds) => {
          return total + ds.value;
        }, 0) ?? 0;

      const rowArray: Cell[] = columns.map<Cell>((column) => {
        const key = column.key;

        switch (key) {
          case "date": {
            return {
              isDaySum: true,
              value: date,
              disableEvents: true,
              date,
            };
          }
          case "total": {
            return {
              isDaySum: true,
              value: total,
              disableEvents: true,
              date,
            };
          }
          default: {
            return {
              isDaySum: true,
              value: daySum[key]?.value ?? 0,
              disableEvents: true,
              date,
            };
          }
        }
      });

      result.push(rowArray);

      if (isRowExpandedMapping[date]) {
        for (let i = 0; i < 5; i++) {
          const childArr: Cell[] = columns.map<Cell>((column) => {
            const key = column.key;

            switch (key) {
              case "date": {
                return {
                  isDaySum: false,
                  value: "z",
                  disableEvents: false,
                  date,
                };
              }
              case "total": {
                return {
                  isDaySum: false,
                  value: 0,
                  disableEvents: false,
                  date,
                };
              }
              default: {
                return {
                  isDaySum: false,
                  // value: list[date][key][i]?.manPower ?? 0,
                  value: 0,
                  disableEvents: false,
                  date,
                };
              }
            }
          });

          result.push(childArr);
        }
      }
    }

    return result;

    // const cells: Cell[][] = weekDates.map((date) => {
    //   const daySum = daySums[date] ?? {};
    //   const daySumValues = daySum ? Object.values(daySum) : [];

    //   const total =
    //     daySumValues.reduce((total, ds) => {
    //       return total + ds.value;
    //     }, 0) ?? 0;

    //   const rowArray: Cell[] = columns.map<Cell>((column) => {
    //     const key = column.key;

    //     switch (key) {
    //       case "date": {
    //         return {
    //           isDaySum: true,
    //           value: date,
    //           disableEvents: true,
    //           date,
    //         };
    //       }
    //       case "total": {
    //         return {
    //           isDaySum: true,
    //           value: total,
    //           disableEvents: true,
    //           date,
    //         };
    //       }
    //       default: {
    //         return {
    //           isDaySum: true,
    //           value: daySum[key]?.value ?? 0,
    //           disableEvents: true,
    //           date,
    //         };
    //       }
    //     }
    //   });

    //   // if (isRowExpandedMapping[date]) {
    //   //   for (let i = 0; i < 5; i++) {
    //   //     const childArr: Cell[] = columns.map<Cell>((column) => {
    //   //       const key = column.key;

    //   //       switch (key) {
    //   //         case "date": {
    //   //           return {
    //   //             isDaySum: true,
    //   //             value: 'z',
    //   //             disableEvents: true,
    //   //             date,
    //   //           };
    //   //         }
    //   //         case "total": {
    //   //           return {
    //   //             isDaySum: true,
    //   //             value: 0,
    //   //             disableEvents: true,
    //   //             date,
    //   //           };
    //   //         }
    //   //         default: {
    //   //           return {
    //   //             isDaySum: true,
    //   //             value: daySumByRole[key]?.value ?? 0,
    //   //             disableEvents: true,
    //   //             date,
    //   //           };
    //   //         }
    //   //       }
    //   //     });

    //   //     rowArray.push(...childArr)
    //   //   }
    //   // }

    //   return rowArray;
    // });

    // return cells;
  }
);
