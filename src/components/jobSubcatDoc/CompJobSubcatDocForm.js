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
    this.state = {
      adding,           // true: add-new or add-similar record.
      addNew,           // true: add-new
      dialogTitle,      // title of the dialog box
    };
    this.draggable = DRPDraggable.draggableObj;
  } // constructor

  componentWillMount() {
    const recEmpty = {
      Id: undefined,
      Active: true,
      Comment: undefined,
      Creator: this.props.getUserInfo.uid,   // CreateTime added in Api.
    };

    const recInEditToUse = this.props.editMode === CompConst.EDIT_MODE_ADD ?
      recEmpty : this.props.getCurrentRec;

    const state = this.state;
    let selectedJob = undefined;
    let selectedBizDoc = undefined;
    let selectedTopLevelList = undefined;
    let selectedCategory = undefined;
    let selectedSubCategory = undefined;
    if (!state.addNew) {
      selectedJob = recInEditToUse.Job;
      if (selectedJob) {
        this.jobChanged(selectedJob);
      }
      selectedSubCategory = recInEditToUse.SubCategory;
      if (selectedSubCategory) {
        selectedCategory = selectedSubCategory.Category;
        if (selectedCategory) {
          selectedTopLevelList = selectedCategory.TopLevelList;
          if (selectedTopLevelList) {
            this.topLevelListChanged(selectedTopLevelList);
          }
          this.categoryChanged(selectedCategory);
        }
        this.subCategoryChanged(selectedSubCategory);
      }
      selectedBizDoc = recInEditToUse.BizDoc;
    }

    this.setState(prevState => ({
      ...prevState,
      selectedJob,
      selectedTopLevelList,
      selectedCategory,
      selectedSubCategory,
      selectedBizDoc,
      recInEdit: {
        ...recInEditToUse,
        Modifier: this.props.getUserInfo.uid,  // ModTime set in Api.
      },
    }));

  }

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
    this.jobChanged(selectedJob);
  }

  // Job value changed to selectedJob.
  // listTopLevelList will follow the selected Job value
  jobChanged = (selectedJob) => {
    const selectedJobId = selectedJob.Id;

    // listJobTopLevelList has entries whose JobId matches the selected job.
    const listJobTopLevelList = JobTopLevelList.filterByJobId(
      this.props.listJobTopLevelList, selectedJobId);

    // listTopLevelList are those entries related to the selected job.
    const listTopLevelList =
      JobTopLevelList.filterByListJobTopLevelList(
        this.props.listTopLevelList, listJobTopLevelList);

    // if the list has only one entry, use that entry
    const valUnique = listTopLevelList.length === 1;
    const valSelectedTopLevelList = valUnique ? listTopLevelList[0] : null;
    this.setState(prevState => ({
      ...prevState,
      selectedJob,
      selectedTopLevelList: valSelectedTopLevelList,
      listTopLevelList,
      selectedCategory: null,
      selectedSubCategory: null,

      recInEdit: {
        ...prevState.recInEdit,
        JobId: selectedJobId,
      },
    }));

    if (valUnique) {
      this.topLevelListChanged(valSelectedTopLevelList);
    }
  }

  // TopLevelList dropdown value changed. 
  handleTopLevelListDrownDownChange = (event) => {
    const selectedTopLevelList = event.target.value;
    this.topLevelListChanged(selectedTopLevelList);
  }

  // TopLevelList value changed to selectedTopLevelList. 
  // listCategory will follow the selected TopLevelList value
  topLevelListChanged = (selectedTopLevelList) => {
    const selectedTopLevelListId = selectedTopLevelList.Id;
    const listCategory = Category.filterByTopLevelListId(
      this.props.listCategory, selectedTopLevelListId
    );
    // if the list has only one entry, use that entry
    const valUnique = listCategory.length === 1;
    const valSelectedCategory = valUnique ? listCategory[0] : null;
    this.setState(prevState => ({
      ...prevState,
      selectedTopLevelList,
      selectedCategory: valSelectedCategory,
      listCategory,
      selectedSubCategory: null,

      // TopLevelListId is not in recInEdit.
    }));

    if (valUnique) {
      this.categoryChanged(valSelectedCategory);
    }
  }

  // Category dropdown value changed. 
  handleCategoryDrownDownChange = (event) => {
    const selectedCategory = event.target.value;
    this.categoryChanged(selectedCategory);
  }

  // Category value changed to selectedCategory. 
  // listSubCategory will follow the selected Category value
  categoryChanged = (selectedCategory) => {
    const selectedCategoryId = selectedCategory.Id;
    const listSubCategory = SubCategory.filterByCatId(
      this.props.listSubCategory, selectedCategoryId
    );
    // if the list has only one entry, use that entry
    const valUnique = listSubCategory.length === 1;
    const valSelectedSubCategory = valUnique ? listSubCategory[0] : null;
    this.setState(prevState => ({
      ...prevState,
      selectedCategory,
      selectedSubCategory: valSelectedSubCategory,
      listSubCategory,

      // CategoryId is not in recInEdit.
    }));

    if (valUnique) {
      this.subCategoryChanged(valSelectedSubCategory);
    }
  }

  // SubCategory dropdown value changed. 
  handleSubCategoryDrownDownChange = (event) => {
    const selectedSubCategory = event.target.value;
    this.subCategoryChanged(selectedSubCategory);
  }

  // SubCategory value changed to selectedSubCategory
  subCategoryChanged = (selectedSubCategory) => {
    const selectedSubCategoryId = selectedSubCategory.Id;
    this.setState(prevState => ({
      ...prevState,
      selectedSubCategory,

      recInEdit: {
        ...prevState.recInEdit,
        SubCatId: selectedSubCategoryId,
      },
    }));
  }

  // BizDoc dropdown value changed. 
  handleBizDocDropDownChange = (event) => {
    const selectedBizDoc = event.target.value;
    const selectedBizDocId = selectedBizDoc.Id;
    this.setState(prevState => ({
      ...prevState,
      selectedBizDoc,

      recInEdit: {
        ...prevState.recInEdit,
        DocId: selectedBizDocId,
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
            <div className="drp-margin-bottom">
              <DropDownList
                label="BizDoc"
                data={this.props.listBizDoc}
                dataItemKey={'Id'}
                textField={'DocNum'}
                value={this.state.selectedBizDoc}
                onChange={this.handleBizDocDropDownChange}
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

  const listJobTopLevelListUnsorted = createJobTopLevelListListSelector(state);
  const listJobTopLevelList = JobTopLevelList.sortByDispLabel(listJobTopLevelListUnsorted);

  const listTopLevelListAll = createTopLevelListListSelector(state);
  const listTopLevelListSansJob = TopLevelList.filterSansJob(listTopLevelListAll);
  const listTopLevelList = TopLevelList.sortByListLabel(listTopLevelListSansJob);

  const listCategoryUnsorted = createCategoryListSelector(state);
  const listCategory = Category.sortByDispOrder(listCategoryUnsorted);

  const listSubCategoryUnsorted = createSubCategoryListSelector(state);
  const listSubCategory = SubCategory.sortByCatDispOrder(listSubCategoryUnsorted);

  const listBizDocUnsorted = createBizDocListSelector(state);
  const listBizDoc = BizDoc.sortByDocNum(listBizDocUnsorted);

  return {
    listJob,
    listJobTopLevelList,
    listTopLevelList,
    listCategory,
    listSubCategory,
    listBizDoc,
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
