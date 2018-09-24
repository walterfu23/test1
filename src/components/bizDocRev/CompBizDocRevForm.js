import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Switch } from '@progress/kendo-react-inputs';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionBizDocRev from '../../actions/actionBizDocRev';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import ErrorBox from '../shared/ErrorBox';

// The form in a dialog to add or edit fields for BizDoc
// Props passed in that are not in defaultProps:
// handleCancel - called by the component to tell the caller
//                to close this component.
// 
class CompBizDocRevForm extends Component {

  static defaultProps = {
    // true defaults - props that can be passed in from caller, 
    creating: true,        // default is creating a new record
    recInEdit: {
      Id: undefined,
      DocId: undefined,
      Active: true,
      RevName: undefined,
      LangOrig: undefined,
      LangNormalized: undefined,
      RevOrig: undefined,
      RevNormalized: undefined,
    },
    EDIT_FIELD_WIDTH: '500px',       // width of edit fields
    TEXTAREA_COLS: 47,      // cols in a textarea
    TEXTAREA_ROWS: 3,       // rows in a textarea
  };

  constructor(props) {
    super(props);
    this.state = {
      recInEdit: {
        ...props.recInEdit,
        Creator: props.getUserInfo.uid,   // CreateTime added in Api.
        Modifier: props.getUserInfo.uid,  
      }
    }
  }

  // save button pressed. Save or update the record
  handleSave = () => {
    if (this.props.creating) {
      // request to create the record
      this.props.createRequested(this.state.recInEdit);
    } else {
      // request to update the record
      this.props.updateRequested(this.state.recInEdit);
    }
    //    this.props.handleCancel();   // close the form
  }

  
  // Enter key pressed becomes a no-op.
  handleSubmit = (event) => {
    console.log('handleSubmit() entered');
    //    event.preventDefault();
    this.handleSave();   // treat it the same as the Save button
    console.log('handleSubmit() exiting');
  }

  // title of the diaglog box
  dialogTitle = () => {
    return this.props.creating ? 'Add BizDocRev' : 'Edit BizDocRev';
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
          onClose={this.props.handleCancel}
          width={this.props.EDIT_FIELD_WIDTH}
        >
          <form
            onSubmit={this.handleSubmit}
          >
            <div style={{ marginBottom: '1rem' }}>
              <Input
                name="DocId"
                label="DocId"
                required={true}
                value={this.state.recInEdit.DocId || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
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
                name="RevName"
                label="Rev. Name"
                required={true}
                value={this.state.recInEdit.RevName || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                name="LangOrig"
                label="LangOrig"
                value={this.state.recInEdit.LangOrig || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                name="LangNormalized"
                label="LangNorm"
                value={this.state.recInEdit.LangNormalized || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                name="RevOrig"
                label="RevOrig"
                value={this.state.recInEdit.RevOrig || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                name="RevNormalized"
                label="RevNorm"
                value={this.state.recInEdit.RevNormalized || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>

          </form>

          <ErrorBox />

          <DialogActionsBar>
            <button
              className="k-button"
              onClick={this.props.handleCancel}
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
} // CompBizDocRevForm

//const mapStateToProps = null;  // no need to get redux state info
const mapStateToProps = (state, ownProps) => ({
  getUserInfo: actionControl.getUserInfo(state),
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    createRequested: (rec) => dispatch(
      actionGen(actionBizDocRev.CREATE_BizDocRev_REQUESTED, rec)
    ),
    updateRequested: (rec) => dispatch(
      actionGen(actionBizDocRev.UPDATE_BizDocRev_REQUESTED, rec)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompBizDocRevForm);
