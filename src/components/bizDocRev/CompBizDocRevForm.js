import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Switch } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionBizDocRev from '../../actions/actionBizDocRev';
import { Dialog } from '@progress/kendo-react-dialogs';
import ErrorBox from '../shared/ErrorBox';
import { createBizDocListSelector } from '../../selectors/selectBizDoc';
import BizDoc from '../../orm/modelBizDoc';
import './CompBizDocRev.css';

// The form in a dialog to add or edit fields for BizDoc
// Props passed in that are not in defaultProps:
// handleCancel - called by the component to tell the caller
//                to close this component.
// 
class CompBizDocRevForm extends Component {

  static defaultProps = {
    creating: true,        // default is for creating a new record
    EDIT_FIELD_WIDTH: '400px',       // width of edit fields
    TEXTAREA_COLS: 47,      // cols in a textarea
    TEXTAREA_ROWS: 3,       // rows in a textarea
  };

  constructor(props) {
    super(props);
    const recEmpty = {
      Id: undefined,
      DocId: undefined,
      Active: true,
      RevName: undefined,
      LangOrig: undefined,
      LangNormalized: undefined,
      RevOrig: undefined,
      RevNormalized: undefined,
      Comment: undefined,
      Creator: props.getUserInfo.uid,   // CreateTime added in Api.
    };
    const recInEditToUse =
      props.creating ? recEmpty : props.getCurrentRec;
    const dialogTitle =
      props.creating ? 'Add BizDocRev' : 'Edit BizDocRev';
    const stateInit = {
      dialogTitle,      // title of the dialog box
      recInEdit: {
        ...recInEditToUse,
        Modifier: props.getUserInfo.uid,
      }
    };
    this.state = stateInit;
  }

  // Save or update the record
  saveRecord = () => {
    if (this.props.creating) {
      // request to create the record
      this.props.createRequested(this.state.recInEdit);
    } else {
      // request to update the record
      this.props.updateRequested(this.state.recInEdit);
    }
  }

  // form submitted
  handleSubmit = (event) => {
    event.preventDefault();
    this.saveRecord();   // save the record
  }

  // record the form field changes to state
  onDialogInputChange = (event) => {
    const target = event.target;
    const fieldVal = target.type === 'checkbox' ? target.checked : target.value;
    const fieldName = target.props ? target.props.name : target.name;
    const recEdited = Object.assign({}, this.state.recInEdit);
    recEdited[fieldName] = fieldVal;
    this.setState(prevState => ({
      ...prevState,
      recInEdit: recEdited,
    }));
  }

  // BizDoc dropdown value changed
  handleBizDocDrownDownChange = (event) => {
    const DocId = event.target.value.Id;
    this.setState(prevState => ({
      ...prevState,
      recInEdit: {
        ...prevState.recInEdit,
        DocId,
      },
    }));
  }

  // render the dialog
  render() {
    return (
      <div>
        <Dialog
          title={this.state.dialogTitle}
          onClose={this.props.handleCancel}
          width={this.props.EDIT_FIELD_WIDTH}
        >
          <form onSubmit={this.handleSubmit}>
            <div className="drp-margin-bottom">
              <label>
                <Switch
                  name="Active"
                  checked={this.state.recInEdit.Active}
                  onChange={this.onDialogInputChange}
                />
                &nbsp;&nbsp;Active
              </label>
            </div>
            <br />
            <div className="drp-margin-bottom">
              <DropDownList
                name="DocId"
                label="DocNum"
                data={this.props.listBizDoc}
                dataItemKey={'Id'}
                textField={'DocNum'}
                value={this.state.recInEdit.BizDoc}
                onChange={this.handleBizDocDrownDownChange}
                style={{ width: "100%" }}
                required={true}
                disabled={! this.props.creating}
              />
            </div>
            <div className="drp-margin-bottom">
              <Input
                name="RevName"
                label="Rev. Name"
                required={true}
                value={this.state.recInEdit.RevName || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
            <div className="drp-margin-bottom">
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
            <div className="drp-margin-bottom">
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
            <div className="drp-margin-bottom">
              <Input
                name="Comment"
                label="Comment"
                value={this.state.recInEdit.Comment || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>

            <br />
            <ErrorBox loc="BizDocRev_form" />
            <br />
            <button
              className="k-button k-primary"
            >
              &nbsp;&nbsp;Save&nbsp;&nbsp;
            </button>
            <button
              className="k-button drp-float-right"
              onClick={this.props.handleCancel}
            >
              &nbsp;&nbsp;Cancel&nbsp;&nbsp;
            </button>
          </form>
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
    getCurrentRec: actionControl.getCurrentBizDocRev(state),
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
