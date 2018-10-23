import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Switch } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionJobTopLevelList from '../../actions/actionJobTopLevelList';
import { Dialog } from '@progress/kendo-react-dialogs';
import ErrorBox from '../shared/ErrorBox';
import { createJobListSelector } from '../../selectors/selectJob';
import Job from '../../orm/modelJob';
import { createTopLevelListListSelector } from '../../selectors/selectTopLevelList';
import TopLevelList from '../../orm/modelTopLevelList';
import './CompJobTopLevelList.css';
import CompConst from '../shared/CompConst';
import DRPDraggable from '../../utils/DRPDraggable';

// The form in a dialog to add or edit fields for JobTopLevelList
// Props passed in that are not in defaultProps:
// handleCancel - called by the component to tell the caller
//                to close this component.
// 
class CompJobTopLevelListForm extends Component {

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
      JobId: undefined,
      ListId: undefined,
      Active: true,
      Comment: undefined,
      Creator: props.getUserInfo.uid,   // CreateTime added in Api.
    };
    const recInEditToUse =
      props.editMode === CompConst.EDIT_MODE_ADD ?
        recEmpty : props.getCurrentRec;
    const getDialogTitle = () => {
      switch (props.editMode) {
        case CompConst.EDIT_MODE_ADD:
          return 'Add JobTopLevelList';
        case CompConst.EDIT_MODE_ADD_SIMILAR:
          return 'Add Similiar JobTopLevelList';
        case CompConst.EDIT_MODE_EDIT:
          return 'Edit JobTopLevelList';
        default:
          return 'Edit';
      }
    }
    const dialogTitle = getDialogTitle();
    const adding = props.editMode === CompConst.EDIT_MODE_EDIT ?
      false : true;
    const stateInit = {
      adding,           // true: adding a new record.
      dialogTitle,      // title of the dialog box
      recInEdit: {
        ...recInEditToUse,
        Modifier: props.getUserInfo.uid,
      }
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

  // Job dropdown value changed
  handleJobDrownDownChange = (event) => {
    const JobId = event.target.value.Id;
    this.setState(prevState => ({
      ...prevState,
      recInEdit: {
        ...prevState.recInEdit,
        JobId,
      },
    }));
  }

  // Cat dropdown value changed
  handleTopLevelListDrownDownChange = (event) => {
    const ListId = event.target.value.Id;
    this.setState(prevState => ({
      ...prevState,
      recInEdit: {
        ...prevState.recInEdit,
        ListId,
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
                name="JobId"
                label="Job"
                data={this.props.listJob}
                dataItemKey={'Id'}
                textField={'Label'}
                value={this.state.recInEdit.Job}
                onChange={this.handleJobDrownDownChange}
                style={{ width: "100%" }}
                required={true}
                disabled={!this.state.adding}
              />
            </div>
            <div className="drp-margin-bottom">
              <DropDownList
                name="ListId"
                label="TopLevelList"
                data={this.props.listTopLevelList}
                dataItemKey={'Id'}
                textField={'ListLabel'}
                value={this.state.recInEdit.TopLevelList}
                onChange={this.handleTopLevelListDrownDownChange}
                style={{ width: "100%" }}
                required={true}
                disabled={!this.state.adding}
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
            <ErrorBox loc="JobTopLevelList_form" />
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
} // CompJobTopLevelListForm

//const mapStateToProps = null;  // no need to get redux state info
const mapStateToProps = (state, ownProps) => {
  const listJobUnsorted = createJobListSelector(state);
  const listJob = Job.sortByDispOrder(listJobUnsorted);
  const listTopLevelListUnsorted = createTopLevelListListSelector(state);
  const listTopLevelListSansJob = TopLevelList.filterSansJob(listTopLevelListUnsorted);
  const listTopLevelList = TopLevelList.sortByListLabel(listTopLevelListSansJob);
  return {
    listJob,
    listTopLevelList,
    getUserInfo: actionControl.getUserInfo(state),
    getCurrentRec: actionControl.getCurrentJobTopLevelList(state),
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    createRequested: (rec) => dispatch(
      actionGen(actionJobTopLevelList.CREATE_JobTopLevelList_REQUESTED, rec)
    ),
    updateRequested: (rec) => dispatch(
      actionGen(actionJobTopLevelList.UPDATE_JobTopLevelList_REQUESTED, rec)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompJobTopLevelListForm);
