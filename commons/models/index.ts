export const DATE_ONLY_FORMAT = "d MMM yyyy";

export interface TargetManpowerCell {
  id: string;
  role: string;
  weekStart: string;
  timeStart: string;
  timeEnd: string;
  manPower: number;
}

export interface TargetManpowerDaySum {
  date: string;
  value: number;
  role: string;
  order: number;
}

interface Asd {
  date: string;
  cells: TargetManpowerCell[];
}

type Xyz = Asd & {
  [role: string]: number;
};

/**
 *
 * {
 *   17 Jan 2022: {
 *      daySum: {
 *        chef: 2,
 *        bartender: 3
 *      },
 *      cells: []
 *   }
 * }
 */
