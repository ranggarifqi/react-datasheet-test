import ReactDataSheet from "react-datasheet";
import { defaultColumns } from "../commons/columns";
import { Cell, CellValue } from "../commons/types";
import styles from './SheetRenderer.module.css'


const SheetRenderer = (
  props: ReactDataSheet.SheetRendererProps<Cell, CellValue>
) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {defaultColumns.map((col) => (
            <th key={col.name} className={styles.th}>{col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};
export default SheetRenderer;
