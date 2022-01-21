import ReactDataSheet from "react-datasheet";
import { TargetManpowerCell } from "./models";

export type CellValue = number | null;
export interface Cell extends ReactDataSheet.Cell<Cell, CellValue>, TargetManpowerCell {
  value: CellValue;
}
