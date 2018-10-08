import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropDownList } from '@progress/kendo-react-dropdowns';
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
import Constants from '../shared/Constants';

// The form in a dialog to add or edit fields for BizPageField
// Props passed in that are not in defaultProps:
// handleCancel - called by the component to tell the caller
//                to close this component.
// 
class CompBizPageFieldForm extends Component {

  static defaultProps = {
    editMode: Constants.EDIT_MODE_ADD, // creating a new record
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
      props.editMode === Constants.EDIT_MODE_ADD ?
        recEmpty : props.getCurrentRec;
    const getDialogTitle = () => {
      switch (props.editMode) {
        case Constants.EDIT_MODE_ADD:
          return 'Add BizPageField';
        case Constants.EDIT_MODE_ADD_SIMILAR:
          return 'Add Similiar BizPageField';
        case Constants.EDIT_MODE_EDIT:
          return 'Edit BizPageField';
        default:
          return 'Edit';
      }
    }
    const dialogTitle = getDialogTitle();
    const adding = props.editMode === Constants.EDIT_MODE_EDIT ?
      false : true;
    const stateInit = {
      adding,           // true: adding a new record.
      dialogTitle,      // title of the dialog box
      RevId: undefined, // the selected Rev in its dropdown.
      PgId: undefined,  // the selected Page in its dropdown.
      listBizDocRevPage: undefined,  // list of BizDocRevPage entries matching RevId
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
    const RevId = event.target.value.Id;
    const listBizDocRevPage =
      BizDocRevPage.filterByDocRevId(this.props.listBizDocRevPage, RevId);
    this.setState(prevState => ({
      ...prevState,
      RevId,
      Page: {},
      listBizDocRevPage,

    }));
  }

  // BizDocRevPage dropdown value changed
  handleBizPageFieldDrownDownChange = (event) => {
    const PgId = event.target.value.Id;
    this.setState(prevState => ({
      ...prevState,
      recInEdit: {
        ...prevState.recInEdit,
        PgId,
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
                label="Revision"
                data={this.props.listBizDocRev}
                dataItemKey={'Id'}
                textField={'dispLabel'}
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
                //                value={this.state.Page}
                onChange={this.handleBizPageFieldDrownDownChange}
                style={{ width: "100%" }}
                required={true}
                disabled={!this.state.adding}
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
      </div>
    ); // return
  } // render()
} // CompBizPageFieldForm

const mapStateToProps = (state, ownProps) => {
  const listBizDocRevPageUnsorted = createBizDocRevPageListSelector(state);
  const listBizDocRevPage = BizDocRevPage.sortByPgNum(listBizDocRevPageUnsorted);

  const listRevsUnsorted = createBizDocRevListSelector(state);
  const listRevsWithPage = BizDocRev.entriesWithPage(
    listRevsUnsorted, listBizDocRevPage);
  const listBizDocRev = BizDocRev.sortByRevName(listRevsWithPage);

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
