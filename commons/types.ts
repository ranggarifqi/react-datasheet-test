import ReactDataSheet from "react-datasheet";

export type CellValue = string | number | null;
export interface Cell extends ReactDataSheet.Cell<Cell, CellValue> {
  value: CellValue;
}
