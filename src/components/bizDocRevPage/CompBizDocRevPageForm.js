import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Switch } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionBizDocRevPage from '../../actions/actionBizDocRevPage';
import { Dialog } from '@progress/kendo-react-dialogs';
import ErrorBox from '../shared/ErrorBox';
import { createBizDocRevListSelector } from '../../selectors/selectBizDocRev';
import BizDocRev from '../../orm/modelBizDocRev';
import './CompBizDocRevPage.css';

// The form in a dialog to add or edit fields for BizDocRevPage
// Props passed in that are not in defaultProps:
// handleCancel - called by the component to tell the caller
//                to close this component.
// 
class CompBizDocRevPageForm extends Component {

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
      RevId: undefined,
      Active: true,
      PgNum: undefined,
      PgKey1: undefined,
      PgKey2: undefined,
      PgType: undefined,
      Creator: props.getUserInfo.uid,   // CreateTime added in Api.
    };
    const recInEditToUse =
      props.creating ? recEmpty : props.getCurrentRec;
    const dialogTitle =
      props.creating ? 'Add BizDocRevPage' : 'Edit BizDocRevPage';
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

  // BizDocRev dropdown value changed
  handleBizDocRevDrownDownChange = (event) => {
    const RevId = event.target.value.Id;
    this.setState(prevState => ({
      ...prevState,
      recInEdit: {
        ...prevState.recInEdit,
        RevId,
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
              <DropDownList
                name="RevId"
                label="RevName"
                data={this.props.listBizDocRev}
                dataItemKey={'Id'}
                textField={'RevName'}
                value={this.state.recInEdit.BizDocRev}
                onChange={this.handleBizDocRevDrownDownChange}
                style={{ width: "100%" }}
                required={true}
                disabled={!this.props.creating}
              />
            </div>
            <div className="drp-margin-bottom">
              <label>
                <Switch
                  name="Active"
                  checked={this.state.recInEdit.Active}
                  onChange={this.onDialogInputChange}
                  style={{ width: "45%", float: "left" }}
                />
                &nbsp;&nbsp;Active
              </label>
              <Input
                name="PgNum"
                label="Page Number"
                required={true}
                value={this.state.recInEdit.PgNum || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "45%", float: "right" }}
              />
            </div>
            <br />
            <div className="drp-margin-bottom">
              <Input
                name="PgKey1"
                label="Key 1"
                value={this.state.recInEdit.PgKey1 || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
            <div className="drp-margin-bottom">
              <Input
                name="PgKey2"
                label="Key 2"
                value={this.state.recInEdit.PgKey2 || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
            <div className="drp-margin-bottom">
              <Input
                name="PgType"
                label="Page Type"
                value={this.state.recInEdit.PgType || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>

            <br />
            <ErrorBox loc="BizDocRevPage_form" />
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
} // CompBizDocRevPageForm

const mapStateToProps = (state, ownProps) => {
  const listBizDocRevUnsorted = createBizDocRevListSelector(state);
  const listBizDocRev = BizDocRev.sortByRevName(listBizDocRevUnsorted);
  return {
    listBizDocRev,
    getUserInfo: actionControl.getUserInfo(state),
    getCurrentRec: actionControl.getCurrentBizDocRevPage(state),
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    createRequested: (rec) => dispatch(
      actionGen(actionBizDocRevPage.CREATE_BizDocRevPage_REQUESTED, rec)
    ),
    updateRequested: (rec) => dispatch(
      actionGen(actionBizDocRevPage.UPDATE_BizDocRevPage_REQUESTED, rec)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompBizDocRevPageForm);
