import ReactDataSheet from "react-datasheet";
import { defaultColumns } from "../commons/columns";
import { Cell, CellValue } from "../commons/types";
import DateCell from "./DateCell";

const CellRenderer = (
  props: ReactDataSheet.CellRendererProps<Cell, CellValue>
) => {
  const {
    cell,
    row,
    col,
    attributesRenderer,
    selected,
    editing,
    updated,
    style,
    children,
    ...rest
  } = props;

  if (defaultColumns[col]?.key === "date") {
    return (
      <DateCell {...props}>
        {props.children}
      </DateCell>
    );
  }
  return <td {...rest}>{props.children}</td>;
};

export default CellRenderer;
