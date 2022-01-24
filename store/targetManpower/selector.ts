import * as _ from "lodash";
import { createSelector } from "@reduxjs/toolkit";
import { add, format, parse, startOfISOWeek } from "date-fns";
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
              column: key,
            };
          }
          case "total": {
            return {
              isDaySum: true,
              value: total,
              disableEvents: true,
              date,
              column: key,
            };
          }
          default: {
            return {
              isDaySum: true,
              value: daySum[key]?.value ?? 0,
              disableEvents: true,
              date,
              column: key,
            };
          }
        }
      });

      result.push(rowArray);

      if (isRowExpandedMapping[date]) {
        for (let i = 0; i < 48; i++) {
          const childArr: Cell[] = columns.map<Cell>((column) => {
            const columnKey = column.key;

            const temp = list[date][columnKey] ?? [];

            const timeString = getTimeString(i);
            const timeStart = formatDateTimeString(date, timeString);
            const timeEnd = getTimeEnd(timeStart);

            switch (columnKey) {
              case "date": {
                return {
                  isDaySum: false,
                  value: timeString,
                  disableEvents: true,
                  date,
                  column: columnKey,
                };
              }
              case "total": {
                return {
                  isDaySum: false,
                  value: 0,
                  disableEvents: true,
                  date,
                  column: columnKey,
                };
              }
              default: {
                return {
                  isDaySum: false,
                  value: temp[timeStart]?.manPower ?? 0,
                  disableEvents: false,
                  date,
                  column: columnKey,
                  ...temp[timeStart],
                  timeStart,
                  timeEnd,
                  weekStart: weekDates[0],
                };
              }
            }
          });

          result.push(childArr);
        }
      }
    }

    return result;
  }
);

const getTimeString = (i: number = 0) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? 0 : 30; // getting minutes of the hour in 0-55 format

  return `${("0" + hour).slice(-2)}:${("0" + minute).slice(-2)}`;
};

const formatDateTimeString = (rawDate: string, time: string) => {
  const date = parse(rawDate, DATE_ONLY_FORMAT, new Date());
  const formatted = format(date, "yyyy-MM-dd");

  return `${formatted} ${time}:00`;
};

const getTimeEnd = (timeStart: string): string => {
  const start = parse(timeStart, "yyyy-MM-dd HH:mm:ss", new Date());
  const added = add(start, { minutes: 30 });
  return format(added, "yyyy-MM-dd HH:mm:ss");
};
