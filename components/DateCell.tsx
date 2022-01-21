import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Cell } from "../commons/types";
import { fetchTargetManpowerCells } from "../store/targetManpower/operations";

type Props = {
  row: number;
  col: number;
  cell: Cell;
  children: ReactNode;
};

const DateCell = (props: Props) => {
  const { children, row } = props;
  const dispatch = useDispatch();

  const onClick = () => {
    console.log('zzzz')
    dispatch(fetchTargetManpowerCells(row));
  };

  return (
    <td>
      <span onClick={onClick}>V</span> {children}
    </td>
  );
};

export default DateCell;
