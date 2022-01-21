import { useCallback, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import ReactDataSheet from "react-datasheet";
import SheetRenderer from "../components/SheetRenderer";
import { Cell, CellValue } from "../commons/types";
import CellRenderer from "../components/CellRenderer";

export class MyReactDataSheet extends ReactDataSheet<Cell, CellValue> {}

const Home: NextPage = () => {
  const [grid, setGrid] = useState<Cell[][]>([
    [{ value: '17 January 2022' }, { value: '' }, { value: '' }, { value: '' }],
    [{ value: '18 January 2022' }, { value: '' }, { value: '' }, { value: '' }],
    [{ value: '19 January 2022' }, { value: '' }, { value: '' }, { value: '' }],
  ]);

  const onSheetRenderer = useCallback(
    (props: ReactDataSheet.SheetRendererProps<Cell, CellValue>) => {
      return <SheetRenderer {...props} />;
    },
    []
  );
  
  const onCellRenderer = useCallback(
    (props: ReactDataSheet.CellRendererProps<Cell, CellValue>) => {
      return <CellRenderer {...props} />;
    },
    []
  );

  return (
    <div className={styles.container}>
      <MyReactDataSheet
        data={grid}
        valueRenderer={(cell) => cell.value === '' ? '-' : cell.value}
        dataRenderer={(cell) => cell.value}
        sheetRenderer={onSheetRenderer}
        cellRenderer={onCellRenderer}
        onCellsChanged={(changes) => {
          const newGrid = grid.map((row) => [...row]);
          changes.forEach(({ cell, row, col, value }) => {
            newGrid[row][col] = { ...newGrid[row][col], value };
          });
          setGrid(newGrid);
        }}
      />
    </div>
  );
};

export default Home;
