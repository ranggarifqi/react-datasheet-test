import ReactDataSheet from "react-datasheet";
import { Cell, CellValue } from "../commons/types";
import { useAppSelector } from "../hooks";
import { sltColumns } from "../store/targetManpower/selector";
import styles from './SheetRenderer.module.css'


const SheetRenderer = (
  props: ReactDataSheet.SheetRendererProps<Cell, CellValue>
) => {
  const columns = useAppSelector(sltColumns)

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.name} className={styles.th}>{col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};
export default SheetRenderer;
