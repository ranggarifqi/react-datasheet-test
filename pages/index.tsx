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
import { setManpowerCells } from "../store/targetManpower/actions";

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

  const dataEditor = (
    props: ReactDataSheet.DataEditorProps<Cell, CellValue>
  ) => {
    return (
      <input
        type="text"
        autoFocus
        onKeyDown={props.onKeyDown}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        value={`${props.value}`}
      />
    );
  };

  return (
    <div className={styles.container}>
      <MyReactDataSheet
        data={cells}
        valueRenderer={(cell) => cell.value}
        dataRenderer={(cell) => cell.value}
        sheetRenderer={onSheetRenderer}
        cellRenderer={onCellRenderer}
        dataEditor={dataEditor}
        onCellsChanged={(changes) => {
          dispatch(setManpowerCells(changes));
        }}
      />
    </div>
  );
};

export default Home;
