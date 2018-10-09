import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input, Switch } from '@progress/kendo-react-inputs';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionBizPageField from '../../actions/actionBizPageField';
import { Dialog } from '@progress/kendo-react-dialogs';
import ErrorBox from '../shared/ErrorBox';
import { createBizDocRevListSelector } from '../../selectors/selectBizDocRev';
import { createBizDocRevPageListSelector } from '../../selectors/selectBizDocRevPage';
import BizDocRev from '../../orm/modelBizDocRev';
import BizDocRevPage from '../../orm/modelBizDocRevPage';
import './CompBizPageField.css';
import CompConst from '../shared/CompConst';

// The form in a dialog to add or edit fields for BizPageField
// Props passed in that are not in defaultProps:
// handleCancel - called by the component to tell the caller
//                to close this component.
// 
class CompBizPageFieldForm extends Component {

  static defaultProps = {
    editMode: CompConst.EDIT_MODE_ADD, // creating a new record
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
      props.editMode === CompConst.EDIT_MODE_ADD ?
        recEmpty : props.getCurrentRec;

    let addNew = false;
    let adding = false;
    const getDialogTitle = () => {
      switch (props.editMode) {
        case CompConst.EDIT_MODE_ADD:
          addNew = true;
          adding = true;
          return 'Add BizPageField';
        case CompConst.EDIT_MODE_ADD_SIMILAR:
          addNew = false;
          adding = true;
          return 'Add Similiar BizPageField';
        case CompConst.EDIT_MODE_EDIT:
          addNew = false;
          adding = false;
          return 'Edit BizPageField';
        default:
          return 'Edit';
      }
    }

    const dialogTitle = getDialogTitle();  // this must be called first
    const selectedPage = (addNew || !recInEditToUse) ?
      undefined : recInEditToUse.BizDocRevPage;
    const selectedRev = (addNew || !selectedPage) ?
      undefined : selectedPage.BizDocRev;
    const selectedRevId = selectedRev && selectedRev.Id;
    const listBizDocRevPage = selectedRevId &&
      BizDocRevPage.filterByDocRevId(props.listBizDocRevPage, selectedRevId);

    const stateInit = {
      adding,           // true: adding a new record.
      dialogTitle,      // title of the dialog box
      selectedRev, // the selected Rev in its dropdown.
      selectedPage,  // the selected Page in its dropdown.
      listBizDocRevPage,  // list of BizDocRevPage entries matching RevId
      recInEdit: {
        ...recInEditToUse,
        Modifier: props.getUserInfo.uid,
      },
    };
    this.state = stateInit;
  }

  // Save or update the record
  saveRecord = () => {
    if (this.state.adding) {
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
    const selectedRev = event.target.value;
    const selectedRevId = selectedRev.Id;
    const listBizDocRevPage =
      BizDocRevPage.filterByDocRevId(this.props.listBizDocRevPage, selectedRevId);
    this.setState(prevState => ({
      ...prevState,
      selectedRev,
      selectedPage: null,   // wipe out the previous page selection
      listBizDocRevPage,
    }));
  }

  // BizDocRevPage dropdown value changed
  handleBizPageFieldDrownDownChange = (event) => {
    const selectedPage = event.target.value;
    const PgId = selectedPage.Id;
    this.setState(prevState => ({
      ...prevState,
      recInEdit: {
        ...prevState.recInEdit,
        PgId,
      },
      selectedPage,
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
                label="Revision"
                data={this.props.listBizDocRev}
                dataItemKey={'Id'}
                textField={'dispLabel'}
                value={this.state.selectedRev}
                onChange={this.handleBizDocRevDrownDownChange}
                style={{ width: "100%" }}
                required={true}
                disabled={!this.state.adding}
              />
            </div>
            <div className="drp-margin-bottom">
              <DropDownList
                label="Page"
                data={this.state.listBizDocRevPage}
                dataItemKey={'Id'}
                textField={'dispLabel'}
                value={this.state.selectedPage}
                onChange={this.handleBizPageFieldDrownDownChange}
                style={{ width: "100%" }}
                required={true}
                disabled={!this.state.adding}
              />
            </div>
            <div className="drp-align-center">
              <label style={{ width: "45%", float: "left" }}>
                <br />
                <Switch
                  name="Active"
                  checked={this.state.recInEdit.Active}
                  onChange={this.onDialogInputChange}
                />
                &nbsp;&nbsp;Active
              </label>
              <Input
                name="Type"
                label="Type"
                value={this.state.recInEdit.Type || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "45%", float: "right" }} />
              &nbsp;
            </div>
            <br />
            <div className="drp-margin-bottom">
              <Input
                name="Name"
                label="Name"
                value={this.state.recInEdit.Name || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
                required={true}
              />
            </div>
            <div className="drp-margin-bottom">
              <Input
                name="RegEx"
                label="RegEx"
                value={this.state.recInEdit.RegEx || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
            <div className="drp-margin-bottom">
              <div style={{ width: "40%", float: "left" }}>
                <Input
                  name="X1"
                  label="X1"
                  value={this.state.recInEdit.X1 || ''}
                  onChange={this.onDialogInputChange}
                  style={{ width: "40%", float: "left" }}
                />
                &nbsp;
                <Input
                  name="Y1"
                  label="Y1"
                  value={this.state.recInEdit.Y1 || ''}
                  onChange={this.onDialogInputChange}
                  style={{ width: "40%", float: "right" }}
                />
              </div>
              <div style={{ width: "40%", float: "right" }}>
                <Input
                  name="X2"
                  label="X2"
                  value={this.state.recInEdit.X2 || ''}
                  onChange={this.onDialogInputChange}
                  style={{ width: "40%", float: "left" }}
                />
                &nbsp;
                <Input
                  name="Y2"
                  label="Y2"
                  value={this.state.recInEdit.Y2 || ''}
                  onChange={this.onDialogInputChange}
                  style={{ width: "40%", float: "right" }}
                />
              </div>
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
            <ErrorBox loc="BizPageField_form" />
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
      </div >
    ); // return
  } // render()
} // CompBizPageFieldForm

const mapStateToProps = (state, ownProps) => {
  const listBizDocRevPageUnsorted = createBizDocRevPageListSelector(state);
  const listBizDocRevPage = BizDocRevPage.sortByPgNum(listBizDocRevPageUnsorted);

  const listRevsUnsorted = createBizDocRevListSelector(state);
  const listRevsWithPage = BizDocRev.entriesWithPage(listRevsUnsorted);
  const listBizDocRev = BizDocRev.sortByRevDispLabel(listRevsWithPage);

  return {
    listBizDocRev,
    listBizDocRevPage,
    getUserInfo: actionControl.getUserInfo(state),
    getCurrentRec: actionControl.getCurrentBizPageField(state),
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    createRequested: (rec) => dispatch(
      actionGen(actionBizPageField.CREATE_BizPageField_REQUESTED, rec)
    ),
    updateRequested: (rec) => dispatch(
      actionGen(actionBizPageField.UPDATE_BizPageField_REQUESTED, rec)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompBizPageFieldForm);
