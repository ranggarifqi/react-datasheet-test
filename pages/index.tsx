import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import ReactDataSheet from "react-datasheet";
import SheetRenderer from "../components/SheetRenderer";
import { Cell, CellValue } from "../commons/types";
import CellRenderer from "../components/CellRenderer";
import { useDispatch } from "react-redux";
import { fetchManpowerDaySum } from "../store/targetManpower/operations";
import { useAppSelector } from "../hooks";
import { sltCells } from "../store/targetManpower/selector";

export class MyReactDataSheet extends ReactDataSheet<Cell, CellValue> {}

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const cells = useAppSelector(sltCells);

  useEffect(() => {
    dispatch(fetchManpowerDaySum());
  }, [dispatch]);

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
        data={cells}
        valueRenderer={(cell) => cell.value}
        dataRenderer={(cell) => cell.value}
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
