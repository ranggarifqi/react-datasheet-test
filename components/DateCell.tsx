import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Cell } from "../commons/types";
import { useAppSelector } from "../hooks";
import { fetchTargetManpowerCells } from "../store/targetManpower/operations";
import {
  sltIsRowExpanded,
  sltIsRowFetching,
} from "../store/targetManpower/selector";

type Props = {
  row: number;
  col: number;
  cell: Cell;
  children: ReactNode;
};

const DateCell = (props: Props) => {
  const { children, row, cell } = props;
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
    <td>
      <span onClick={onClick}>{symbol}</span> {children}
    </td>
  );
};

export default DateCell;
