import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import ReactDataSheet from "react-datasheet";
import SheetRenderer from "../components/SheetRenderer";
import { Cell, CellValue } from "../commons/types";
import CellRenderer from "../components/CellRenderer";
import { useDispatch } from "react-redux";
import { fetchSelectedRoles } from "../store/targetManpower/operations";

export class MyReactDataSheet extends ReactDataSheet<Cell, CellValue> {}

const Home: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSelectedRoles());
  });

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
        data={[]}
        valueRenderer={(cell) => "-"}
        dataRenderer={(cell) => "-"}
        sheetRenderer={onSheetRenderer}
        cellRenderer={onCellRenderer}
        onCellsChanged={(changes) => {
          console.log(changes);
          // const newGrid = grid.map((row) => [...row]);
          // changes.forEach(({ cell, row, col, value }) => {
          //   newGrid[row][col] = { ...newGrid[row][col], value };
          // });
          // setGrid(newGrid);
        }}
      />
    </div>
  );
};

export default Home;
