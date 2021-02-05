import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


class Modal extends Component{

  state={
    input:"",
    status: "",
    selectedDate: "",
    
  }

  handleSendInputWhereItBelongs = ()=>{
    this.props.sendInput(this.state.input, this.state.status, this.state.selectedDate)
    this.setState({ input: "" });
  }

  handleTyping = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSelecting = (e) => {
    this.setState({ status: e.target.value });
    console.log(this.state.status)
  };

  handleDateChange = (e) =>{
    this.setState({ selectedDate: e });
    console.log(this.state.selectedDate)
  }

  render(){
    const {createProject,showModalStatus, onChangeInput, onChangeStatus, onChangeCloseDate, handleModalClose} = this.props
    const {input} = this.state

    if (!showModalStatus){
      return null
    }
    else{
    return(
      <div className="modal">
        <div className="modal-content">
          <h1 className="modal-title">Create Project</h1>
          <label>Project Name:
          <input type="text" value={input} onChange={this.handleTyping}/>
          </label>
          <select value={this.state.status} onChange={this.handleSelecting}>
            
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker value={this.state.selectedDate} onChange={this.handleDateChange} />
          </MuiPickersUtilsProvider>

          <button onClick={this.handleSendInputWhereItBelongs}>Create</button>
          <button onClick={handleModalClose}>Close</button>
        </div>

      </div>
    )}
  }
}

class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    
  }
  buttonClick = (e) => {
    console.log(e)

    // e is getting the current node (Row Node)*
    
            /*this.setState({
                visible:true
            })
            let deletedRow = this.props.node.data;
            e.gridApi.updateRowData({ remove: [deletedRow] })  // It will update the row*/
        };
  render() {
    return (
      <button onClick={this.props.remove}>Delete</button>
    )
  }
}

class App extends Component {
 
  state = {
        isModalOpen: false,
          
      columnDefs: 
      [
  {headerName: 'ID', field: 'id'},
  {headerName: 'Project Name', field: 'projectName', editable:true},
  {headerName: 'Status', field: 'status',editable:true},
  {headerName: 'Close Date', field: 'closeDate',editable:true},
  {
    headerName: 'Actions',
    field: 'athlete',
    cellRendererFramework: BtnCellRenderer,
    cellRendererParams: {
      prop1: "ore",
      remove: function(e){
        let deletedRow = this.props.node.data;
        e.gridApi.updateRowData({ remove: [deletedRow] })

      }
  }
    
  // [...]
},
 ],

      rowData: [],
      }
    
      
      addProject = () =>{
        this.setState({ isModalOpen: true });
        console.log(this.state.isModalOpen)
      }

      createProject = ()=>{
        console.log("une krijoj projektin")
      }

      handleInput = (incomingInput, incomingStatus, incomingDate) =>{
        const test={
          id: this.state.rowData.length+1,
          projectName: incomingInput,
          status: incomingStatus,
          closeDate: incomingDate,
          
        }

        const newRowData = [...this.state.rowData, test]

        this.setState({rowData: newRowData})
        console.log(this.state.rowData)
      }

     
      handleModalClose = () =>{
        this.setState({isModalOpen: false})
      }

      onRemoveItem = () => {
        console.log("hi")
      };

      render() {
        
       const { isModalOpen, columnDefs, rowData } = this.state;

      return (
          <div
              className="ag-theme-balham"
              style={{ height: '200px', width: '1000px' }}
          >
              <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  >
              </AgGridReact>
              <button onClick = {this.addProject}>Click me to add a project</button>
              <Modal createProject={this.createProject} 
              showModalStatus ={isModalOpen} 
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
