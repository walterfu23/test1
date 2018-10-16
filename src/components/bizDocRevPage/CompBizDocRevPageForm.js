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
import CompConst from '../shared/CompConst';
import DRPDraggable from '../../utils/DRPDraggable';

// The form in a dialog to add or edit fields for BizDocRevPage
// Props passed in that are not in defaultProps:
// handleCancel - called by the component to tell the caller
//                to close this component.
// 
class CompBizDocRevPageForm extends Component {

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
          return 'Add BizDocRevPage';
        case CompConst.EDIT_MODE_ADD_SIMILAR:
          addNew = false;
          adding = true;
          return 'Add Similiar BizDocRevPage';
        case CompConst.EDIT_MODE_EDIT:
          addNew = false;
          adding = false;
          return 'Edit BizDocRevPage';
        default:
          return 'Edit';
      }
    }
    const dialogTitle = getDialogTitle();
    const selectedRev = (addNew || !recInEditToUse) ?
      undefined : recInEditToUse.BizDocRev;


    const stateInit = {
      adding,           // true: adding a new record.
      dialogTitle,      // title of the dialog box
      selectedRev,      // the selected rev in the rev dropdown
      recInEdit: {
        ...recInEditToUse,
        Modifier: props.getUserInfo.uid,
      },
    };
    this.state = stateInit;
    this.draggable = DRPDraggable.draggableObj;
  } // constructor

  componentWillUnMount() {
    this.draggable.destroy();
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
    const RevId = selectedRev.Id;
    this.setState(prevState => ({
      ...prevState,
      selectedRev,
      recInEdit: {
        ...prevState.recInEdit,
        RevId,
      },
    }));
  }

  getDialogTitle = () => {
    return (<span
      ref={(element) =>
        DRPDraggable.setupDraggable(this.draggable, element)
      }
    >
      {this.state.dialogTitle}
    </span>
    );
  }

  // render the dialog
  render() {
    return (
      <div>
        <Dialog
          title={this.getDialogTitle()}
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
            <div className="drp-align-center">
              <label style={{ width: "45%", float: "left" }}>
                <Input
                  name="PgNum"
                  label="Page No."
                  value={this.state.recInEdit.PgNum || ''}
                  onChange={this.onDialogInputChange}
                  style={{ width: "100%" }}
                />
              </label>
              &nbsp;
              <label style={{ width: "10%" }}>&nbsp;</label>
              <label style={{ width: "45%", float: "right" }}>
                <br />
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
  const listBizDocRev = BizDocRev.sortByRevDispLabel(listBizDocRevUnsorted);
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
