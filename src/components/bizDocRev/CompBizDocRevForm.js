import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Switch } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionBizDocRev from '../../actions/actionBizDocRev';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import ErrorBox from '../shared/ErrorBox';
import { createBizDocListSelector } from '../../selectors/selectBizDoc';
import BizDoc from '../../orm/modelBizDoc';

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
    EDIT_FIELD_WIDTH: '400px',       // width of edit fields
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
        docIdForNewRec: undefined,
        recInEdit: recEdited,
      }
    );
  }

  // BizDoc dropdown value changed
  handleBizDocDrownDownChange = (event) => {
    this.setState(prevState => ({
      ...prevState,
      docIdForNewRec: event.target.value,
    }));
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

            <div className="drp-input-margin-bottom">
              <label>
                <Switch
                  name="Active"
                  checked={this.state.recInEdit.Active}
                  onChange={this.onDialogInputChange}
                />
                &nbsp;&nbsp;Active
              </label>
            </div>
            <div className="drp-input-margin-bottom">
              <DropDownList
                label={'DocNum'}
                data={this.props.listBizDoc}
                dataItemKey={'Id'}
                textField={'DocNum'}
                value={this.state.docIdForNewRec}
                onChanged={this.handleBizDocDrownDownChange}
                style={{ width: "100%" }}
                required={true}
              />
            </div>
            <div className="drp-input-margin-bottom">
              <Input
                name="RevName"
                label="Rev. Name"
                required={true}
                value={this.state.recInEdit.RevName || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
            <div className="drp-input-margin-bottom">
              <Input
                name="LangOrig"
                label="LangOrig"
                value={this.state.recInEdit.LangOrig || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "45%", float: "left" }}
              />
              <Input
                name="LangNormalized"
                label="LangNorm"
                value={this.state.recInEdit.LangNormalized || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "45%", float: "right" }}
              />
            </div>
            <div className="drp-input-margin-bottom">
              <Input
                name="RevOrig"
                label="RevOrig"
                value={this.state.recInEdit.RevOrig || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "45%", float: "left" }}
              />
              <Input
                name="RevNormalized"
                label="RevNorm"
                value={this.state.recInEdit.RevNormalized || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "45%", float: "right" }}
              />
            </div>
            <div className="drp-input-margin-bottom">
              <Input
                name="Comment"
                label="Comment"
                value={this.state.recInEdit.Comment || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>

          </form>

          <br />
          <ErrorBox loc="BizDocRev_form" />

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
const mapStateToProps = (state, ownProps) => {
  const listBizDocUnsorted = createBizDocListSelector(state);
  const listBizDoc = BizDoc.sortByDocNum(listBizDocUnsorted);
  return {
    listBizDoc,
    getUserInfo: actionControl.getUserInfo(state),
  };
}

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
