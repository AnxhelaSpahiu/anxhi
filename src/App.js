import "./App.scss";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Modal from "./components/modal";
import BtnCellRenderer from "./components/btnCellRenderer";

class App extends Component {
  state = {
    isModalOpen: false,

    columnDefs: [
      { headerName: "ID", field: "id" },
      { headerName: "Project Name", field: "projectName", editable: true },
      { headerName: "Status", field: "status", editable: true },
      { headerName: "Close Date", field: "closeDate", editable: true },
      {
        headerName: "Actions",
        cellRenderer: "btnCellRenderer",
        cellRendererParams: {
          remove: (e) => {
            let filteredProjects = this.state.rowData.filter(
              (data) => data.id !== e.id
            );
            this.setState({ rowData: filteredProjects });
          },
        },

        // [...]
      },
    ],
    frameworkComponents: {
      btnCellRenderer: BtnCellRenderer,
    },

    rowData: [],
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("visual", prevProps, prevState, snapshot);
  }

  addProject = () => {
    this.setState({ isModalOpen: true });
    console.log(this.state.isModalOpen);
  };

  handleInput = (incomingInput, incomingStatus, incomingDate) => {
    const test = {
      id: this.state.rowData.length + 1,
      projectName: incomingInput,
      status: incomingStatus,
      closeDate: incomingDate,
    };

    const newRowData = [...this.state.rowData, test];

    this.setState({ rowData: newRowData }, () => {
      console.log(this.state.rowData);
    });
    this.setState({ isModalOpen: false });
  };

  handleModalClose = () => {};

  onRemoveItem = (id) => {
    let newTodos = this.state.rowData.filter((todo) => todo.id !== id);
    this.setState({ rowData: newTodos });
  };

  render() {
    const { isModalOpen, columnDefs, rowData } = this.state;

    return (
      <div className="container">
        <div
          className="ag-theme-balham"
          style={{ height: "200px", width: "1000px" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            frameworkComponents={this.state.frameworkComponents}
          ></AgGridReact>
        </div>
        <div className="button-main">
          <Button color="primary" variant="contained" onClick={this.addProject}>
            +
          </Button>
        </div>

        <Modal
          createProject={this.createProject}
          showModalStatus={isModalOpen}
          onChangeInput={this.onChangeInput}
          onChangeStatus={this.onChangeStatus}
          onChangeCloseDate={this.onChangeCloseDate}
          sendInput={this.handleInput}
          handleModalClose={this.handleModalClose}
        />
      </div>
    );
  }
}

export default App;
