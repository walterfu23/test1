import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input, Switch } from '@progress/kendo-react-inputs';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionJobSubcatDoc from '../../actions/actionJobSubcatDoc';
import { Dialog } from '@progress/kendo-react-dialogs';
import ErrorBox from '../shared/ErrorBox';
import Job from '../../orm/modelJob';
import { createJobListSelector } from '../../selectors/selectJob';
import JobTopLevelList from '../../orm/modelJobTopLevelList';
import { createJobTopLevelListListSelector } from '../../selectors/selectJobTopLevelList';
import TopLevelList from '../../orm/modelTopLevelList';
import { createTopLevelListListSelector } from '../../selectors/selectTopLevelList';
import Category from '../../orm/modelCategory';
import { createCategoryListSelector } from '../../selectors/selectCategory';
import SubCategory from '../../orm/modelSubCategory';
import { createSubCategoryListSelector } from '../../selectors/selectSubCategory';
import BizDoc from '../../orm/modelBizDoc';
import { createBizDocListSelector } from '../../selectors/selectBizDoc';
import './CompJobSubcatDoc.css';
import CompConst from '../shared/CompConst';
import DRPDraggable from '../../utils/DRPDraggable';

// The form in a dialog to add or edit fields for JobSubcatDoc
// Props passed in that are not in defaultProps:
// handleCancel - called by the component to tell the caller
//                to close this component.
// 
class CompJobSubcatDocForm extends Component {

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
      Active: true,
      Comment: undefined,
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
          return 'Add JobSubcatDoc';
        case CompConst.EDIT_MODE_ADD_SIMILAR:
          addNew = false;
          adding = true;
          return 'Add Similiar JobSubcatDoc';
        case CompConst.EDIT_MODE_EDIT:
          addNew = false;
          adding = false;
          return 'Edit JobSubcatDoc';
        default:
          return 'Edit';
      }
    }

    const dialogTitle = getDialogTitle();  // this must be called first
    const selectedPage = (addNew || !recInEditToUse) ?
      undefined : recInEditToUse.Job;
    const selectedRev = (addNew || !selectedPage) ?
      undefined : selectedPage.SubCategory;
    const selectedRevId = selectedRev && selectedRev.Id;
    const listJob = selectedRevId &&
      Job.filterByDocRevId(props.listJob, selectedRevId);

    const stateInit = {
      adding,           // true: adding a new record.
      dialogTitle,      // title of the dialog box
      selectedRev, // the selected Rev in its dropdown.
      selectedPage,  // the selected Page in its dropdown.
      listJob,  // list of Job entries matching RevId
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

  // Job dropdown value changed. 
  // listTopLevelList will follow the selected Job value
  handleJobDrownDownChange = (event) => {
    const selectedJob = event.target.value;
    const selectedJobId = selectedJob.Id;
    const listTopLevelList =
      JobTopLevelList.filterByJobId(
        this.props.listTopLevelList, selectedJobId);
    // TODO: if the list has only one entry, use that entry
    this.setState(prevState => ({
      ...prevState,
      selectedJob,
      selectedTopLevelList: null,
      listTopLevelList,
      selectedCategory: null,
      selectedSubCategory: null,

      recInEdit: {
        ...prevState.recInEdit,
        JobId: selectedJobId,
      },
    }));
  }

  // TopLevelList dropdown value changed. 
  // listCategory will follow the selected TopLevelList value
  handleTopLevelListDrownDownChange = (event) => {
    const selectedTopLevelList = event.target.value;
    const selectedTopLevelListId = selectedTopLevelList.Id;
    const listCategory = Category.filterByTopLevelListId(
      this.props.listCategory, selectedTopLevelListId
    );
    // TODO: if the list has only one entry, use that entry
    this.setState(prevState => ({
      ...prevState,
      selectedTopLevelList,
      selectedCategory: null,
      listCategory,
      selectedSubCategory: null,

      // TopLevelListId is not in recInEdit.
    }));
  }

  // Category dropdown value changed. 
  // listSubCategory will follow the selected Category value
  handleCategoryDrownDownChange = (event) => {
    const selectedCategory = event.target.value;
    const selectedCategoryId = selectedCategory.Id;
    const listSubCategory = SubCategory.filterByCatId(
      this.props.listSubCategory, selectedCategoryId
    );
    // TODO: if the list has only one entry, use that entry
    this.setState(prevState => ({
      ...prevState,
      selectedCategory,
      selectedSubCategory: null,
      listSubCategory,

      // CategoryId is not in recInEdit.
    }));
  }

  // SubCategory dropdown value changed. 
  handleCategoryDrownDownChange = (event) => {
    const selectedSubCategory = event.target.value;
    const selectedSubCategoryId = selectedSubCategory.Id;
    this.setState(prevState => ({
      ...prevState,
      selectedSubCategory,

      recInEdit: {
        ...prevState.recInEdit,
        SubCategoryId: selectedSubCategoryId,
      },
    }));
  }

  // BizDoc dropdown value changed. 
  handleBizDocDrownDownChange = (event) => {
    const selectedBizDoc = event.target.value;
    const selectedBizDocId = selectedBizDoc.Id;
    this.setState(prevState => ({
      ...prevState,
      selectedBizDoc,

      recInEdit: {
        ...prevState.recInEdit,
        BizDocId: selectedBizDocId,
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
                name="JobId"
                label="Job"
                data={this.props.listJob}
                dataItemKey={'Id'}
                textField={'Label'}
                value={this.state.selectedJob}
                onChange={this.handleJobDrownDownChange}
                style={{ width: "100%" }}
                required={true}
                disabled={!this.state.adding}
              />
            </div>
            <div className="drp-margin-bottom">
              <DropDownList
                label="Top Level List"
                data={this.state.listTopLevelList}
                dataItemKey={'Id'}
                textField={'ListLabel'}
                value={this.state.selectedTopLevelList}
                onChange={this.handleTopLevelListDrownDownChange}
                style={{ width: "100%" }}
                required={true}
                disabled={!this.state.adding}
              />
            </div>
            <div className="drp-margin-bottom">
              <DropDownList
                label="Category"
                data={this.state.listCategory}
                dataItemKey={'Id'}
                textField={'Name'}
                value={this.state.selectedCategory}
                onChange={this.handleCategoryDrownDownChange}
                style={{ width: "100%" }}
                required={true}
                disabled={!this.state.adding}
              />
            </div>
            <div className="drp-margin-bottom">
              <DropDownList
                label="SubCategory"
                data={this.state.listSubCategory}
                dataItemKey={'Id'}
                textField={'Name'}
                value={this.state.selectedSubCategory}
                onChange={this.handleSubCategoryDrownDownChange}
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
            </div>
            <br />
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
            <ErrorBox loc="JobSubcatDoc_form" />
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
} // CompJobSubcatDocForm

const mapStateToProps = (state, ownProps) => {
  const listJobUnsorted = createJobListSelector(state);
  const listJob = Job.sortByDispLabel(listJobUnsorted);

  const listTopLevelListAll = createTopLevelListListSelector(state);
  const listTopLevelListSansJob = TopLevelList.filterSansJob(listTopLevelListAll);
  const listTopLevelList = TopLevelList.sortByListLabel(listTopLevelListSansJob);

  const listCategoryUnsorted = createCategoryListSelector(state);
  const listCategory = Category.sortByDispOrder(listCategoryUnsorted);

  const listSubCategoryUnsorted = createSubCategoryListSelector(state);
  const listSubCategory = SubCategory.sortByCatDispOrder(listSubCategoryUnsorted);

  return {
    listJob,
    listTopLevelList,
    listCategory,
    listSubCategory,
    getUserInfo: actionControl.getUserInfo(state),
    getCurrentRec: actionControl.getCurrentJobSubcatDoc(state),
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    createRequested: (rec) => dispatch(
      actionGen(actionJobSubcatDoc.CREATE_JobSubcatDoc_REQUESTED, rec)
    ),
    updateRequested: (rec) => dispatch(
      actionGen(actionJobSubcatDoc.UPDATE_JobSubcatDoc_REQUESTED, rec)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompJobSubcatDocForm);
