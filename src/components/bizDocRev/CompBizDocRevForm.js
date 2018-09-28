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
import './CompBizDocRev.css';
import utils from '../../utils/utils';

// The form in a dialog to add or edit fields for BizDoc
// Props passed in that are not in defaultProps:
// handleCancel - called by the component to tell the caller
//                to close this component.
// 
class CompBizDocRevForm extends Component {

  static defaultProps = {
    // true defaults - props that can be passed in from caller, 
    creating: true,        // default is for creating a new record
    recInEdit: {
      Id: undefined,
      DocId: undefined,
      Active: true,
      RevName: undefined,
      LangOrig: undefined,
      LangNormalized: undefined,
      RevOrig: undefined,
      RevNormalized: undefined,
      Comment: undefined,
    },
    EDIT_FIELD_WIDTH: '400px',       // width of edit fields
    TEXTAREA_COLS: 47,      // cols in a textarea
    TEXTAREA_ROWS: 3,       // rows in a textarea
  };

  constructor(props) {
    super(props);
    const stateInit = {
      recInEdit: {
        ...props.recInEdit,
        Creator: props.getUserInfo.uid,   // CreateTime added in Api.
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
      // the web svc model of BizDocRev does not have
      // the "selected" field. It needs to be wiped out.
      const recPure = utils.cloneDelProps(this.state.recInEdit,
        'BizDoc', 'selected');
      this.props.updateRequested(recPure);
    }
  }

  // form submitted
  handleSubmit = (event) => {
    event.preventDefault();
    this.saveRecord();   // save the record
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
          title={this.dialogTitle()}
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
