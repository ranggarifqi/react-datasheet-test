import { ReactNode } from "react";
import ReactDataSheet from "react-datasheet";
import { useDispatch } from "react-redux";
import { Cell, CellValue } from "../commons/types";
import { useAppSelector } from "../hooks";
import { fetchTargetManpowerCells } from "../store/targetManpower/operations";
import {
  sltIsRowExpanded,
  sltIsRowFetching,
} from "../store/targetManpower/selector";

const DateCell = (props: ReactDataSheet.CellRendererProps<Cell, CellValue>) => {
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
  const dispatch = useDispatch();

  const isRowExpandedMapping = useAppSelector(sltIsRowExpanded);
  const isRowExpanded = isRowExpandedMapping[cell.date];

  const isRowFetchingMapping = useAppSelector(sltIsRowFetching);
  const isRowFetching = isRowFetchingMapping[cell.date];

  const onClick = () => {
    dispatch(fetchTargetManpowerCells(cell.date));
  };

  const symbol = isRowFetching ? "?" : isRowExpanded ? "^" : "V";

  return (
    <td {...rest}>
      <span onClick={onClick}>
        {getSymbol(cell.isDaySum, isRowFetching, isRowExpanded)}
      </span>{" "}
      {children}
    </td>
  );
};

const getSymbol = (
  isDaySum: boolean,
  isRowFetching: boolean,
  isRowExpanded: boolean
) => {
  if (!isDaySum) {
    return "";
  }

  if (isRowFetching) {
    return "?";
  }

  if (isRowExpanded) {
    return "^";
  }

  return "V";
};

export default DateCell;
