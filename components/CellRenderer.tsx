import ReactDataSheet from "react-datasheet";
import { defaultColumns } from "../commons/columns";
import { Cell, CellValue } from "../commons/types";
import DateCell from "./DateCell";

const CellRenderer = (
  props: ReactDataSheet.CellRendererProps<Cell, CellValue>
) => {
  const { row, col, cell } = props;
  if (defaultColumns[col].key === "date") {
    return <DateCell row={row} col={col} cell={cell}>{props.children}</DateCell>;
  }
  return <td>{props.children}</td>;
};

export default CellRenderer;
