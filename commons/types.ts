import ReactDataSheet from "react-datasheet";
import { TargetManpowerCell, TargetManpowerDaySum } from "./models";

export type CellValue = string | number | null;

export interface Cell
  extends ReactDataSheet.Cell<Cell, CellValue>,
    Partial<TargetManpowerCell> {
  date: string;
  value: CellValue;
  isDaySum: boolean;
  column: string;
}
