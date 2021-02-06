import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./modal.scss";

export default class Modal extends Component {
  state = {
    input: "",
    status: "",
    selectedDate: null,
  };

  handleSendInput = () => {
    if (this.state.input === "") {
      alert("Please provide a name for your project");
    } else if (this.state.status === "") {
      alert("Please provide a status for your project");
    } else if (this.state.selectedDate === null) {
      alert("Please provide a close date for your project");
    } else {
      this.props.sendInput(
        this.state.input,
        this.state.status,
        this.state.selectedDate
      );
      this.setState({ input: "" });
    }
  };

  handleTyping = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSelecting = (e) => {
    this.setState({ status: e.target.value });
    console.log(this.state.status);
  };

  handleDateChange = (e) => {
    this.setState({ selectedDate: e });
    console.log(this.state.selectedDate);
  };

  render() {
    const {
      createProject,
      showModalStatus,
      onChangeInput,
      onChangeStatus,
      onChangeCloseDate,
      handleModalClose,
    } = this.props;
    const { input } = this.state;
    const { classes } = this.props;

    if (!showModalStatus) {
      return null;
    } else {
      return (
        <div className="modal">
          <div className="modal-content">
            <h1 className="modal-title">Create Project</h1>
            <div className="modal-inner">
              <TextField
                label="Project Name"
                type="text"
                value={input}
                onChange={this.handleTyping}
              />
              <FormControl>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.status}
                  onChange={this.handleSelecting}
                >
                  <MenuItem value={"pending"}>Pending</MenuItem>
                  <MenuItem value={"completed"}>Completed</MenuItem>
                  <MenuItem value={"canceled"}>Canceled</MenuItem>
                </Select>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                  label="Pick Date"
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="button-modal">
              <Button variant="contained" onClick={this.handleSendInput}>
                Create
              </Button>
            </div>
          </div>
        </div>
      );
    }
  }
}
