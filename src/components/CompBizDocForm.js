import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Switch } from '@progress/kendo-react-inputs';
import actionGen from '../actions/actionGen';
import actionBizDoc from '../actions/actionBizDoc';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

class CompBizDocForm extends Component {
  static defaultProps = {
    // true defaults - props that can be passed in from caller, 
    creating: true,        // default is creating a new record
    EDIT_FIELD_WIDTH: '500px',       // width of edit fields
    TEXTAREA_COLS: 47,      // cols in a textarea
    TEXTAREA_ROWS: 3,       // rows in a textarea

    // initial values, used internally, not passed in from caller
    recInit: {              // record initial values 
      Id: undefined,
      Active: true,
      DocNum: undefined,
      DocName: undefined,
      Comment: undefined,
    },

  }

  stateInit = {
    recInEdit: this.props.recInit,  // record being edited or being added.
  }

  constructor(props) {
    super(props);
    this.state = this.stateInit;
  }

  // cancel button or form close clicked.
  handleCancel = () => {
    this.setState(this.stateInit);
  }

  // save button pressed. Save the record
  handleSave = () => {
    this.props.createRequested(this.state.recInEdit);  // request to create the record
    //   this.handleCancel();
    //    this.setState(this.stateInit);   // done with the dialog
  }

  // Enter key pressed in the form. Q: same as pressing Save?
  handleSubmit = (event) => {
    event.preventDefault();
  }

  // title of the diaglog box
  dialogTitle = () => {
    return this.props.creating ? 'Add BizDoc' : 'Edit BizDoc';
  }

  // return a clone of the record
  cloneRec = rec => Object.assign({}, rec);

  // record the form field changes to state
  onDialogInputChange = (event) => {
    const target = event.target;
    const fieldVal = target.type === 'checkbox' ? target.checked : target.value;
    const fieldName = target.props ? target.props.name : target.name;
    const recEdited = this.cloneRec(this.state.recInEdit);
    recEdited[fieldName] = fieldVal;
    this.setState(
      {
        recInEdit: recEdited
      }
    );
  }

  // render the dialog
  render() {
    return (
      <div>
        <Dialog
          title={this.dialogTitle()}
          onClose={this.handleCancel}
          width={this.props.EDIT_FIELD_WIDTH}
        >
          <form
            onSubmit={this.handleSubmit}
          >
            <div style={{ marginBottom: '1rem' }}>
              <label>
                <Switch
                  name="Active"
                  checked={this.state.recInEdit.Active}
                  onChange={this.onDialogInputChange}
                />
                &nbsp;&nbsp;Active
              </label>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                name="DocNum"
                label="Document Number"
                value={this.state.recInEdit.DocNum || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                name="DocName"
                label="Document Name"
                value={this.state.recInEdit.DocName || ''}
                required={true}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                name="Comment"
                label="Comment"
                value={this.state.recInEdit.Comment || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
          </form>

          <DialogActionsBar>
            <button
              className="k-button"
              onClick={this.handleCancel}
            >
              Cancel
              </button>
            <button
              className="k-button k-primary"
              onClick={this.handleSave}
            >
              Save
              </button>
          </DialogActionsBar>
        </Dialog>
      </div>
    ); // return
  } // render()
} // CompBizDocForm

const mapStateToProps = null;  // no need for redux state info

const mapDispatchToProps = (dispatch, props) => {
  return {
    createRequested: (recToCreate) => dispatch(
      actionGen(actionBizDoc.CREATE_BizDoc_REQUESTED, recToCreate)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompBizDocForm);
