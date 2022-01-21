import { ReactNode } from "react";
import { Cell } from "../commons/types";

type Props = {
  row: number;
  col: number;
  cell: Cell;
  children: ReactNode;
};

const DateCell = (props: Props) => {
  const { children, cell } = props;
  return (
    <td>
      <span onClick={() => console.log("expand row")}>V</span> {children}
    </td>
  );
};

export default DateCell;
