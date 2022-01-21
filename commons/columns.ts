import { CellValue } from "./types";

export interface Column {
  key: string;
  name: string;
  default?: CellValue;
  forceComponent?: boolean;
  disableEvents?: boolean;
}

export const defaultColumns: Column[] = [
  { key: 'date', name: "", disableEvents: true },
  { key: 'total', name: "total", disableEvents: true},
];
