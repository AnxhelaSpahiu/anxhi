import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";

const BtnCellRenderer = (props) => {
  return (
    <div>
      <Button
        style={{
          maxWidth: "71px",
          maxHeight: "30px",
          minWidth: "30px",
          minHeight: "30px",
        }}
        variant="contained"
        onClick={() => {
          props.remove(props.data);
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default BtnCellRenderer;
