import { CellValue } from "./types";

export interface Column {
  key?: string;
  name: string;
  default?: CellValue;
  forceComponent?: boolean;
  disableEvents?: boolean;
}

export const defaultColumns: Column[] = [
  { key: 'date', name: "" },
  { key: 'total', name: "total"},
  { name: "Chef"},
  { name: "Bartender"},
];
