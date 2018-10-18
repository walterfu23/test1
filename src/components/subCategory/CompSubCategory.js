import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSubCategoryListSelector } from '../../selectors/selectSubCategory';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { filterBy, orderBy } from '@progress/kendo-data-query';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionSubCategory from '../../actions/actionSubCategory';
import CompSubCategoryForm from './CompSubCategoryForm';
import ErrorBox from '../shared/ErrorBox';
import LoadingPanel from '../shared/LoadingPanel';
import utils from '../../utils/utils';
import './CompSubCategory.css';
import CompConfirmDialog from '../shared/CompConfirmDialog';
import withCompConfirmDialog from '../shared/withCompConfirmDialog';
import CompConst from '../shared/CompConst';
import SubCategory from '../../orm/modelSubCategory';

class CompSubCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: undefined,    // 3 EDI_MODE_ choices from CompConst
      filter: {               // used by the grid to filter
        logic: "and",
        filters: [],
      },
      sort: [],                // used by the grid to sort
    }
  }

  //==========================================================

  // Add pressed: requesting a new record to be added.
  handleAdd = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        editMode: CompConst.EDIT_MODE_ADD,
      };
    });
    this.props.setShowForm(true);  // show the form
  }

  // form's cancel button or form's close button clicked.
  handleFormCancel = () => {
    this.props.setShowForm(false);  // hide the form
  }

  // Add Similar button pressed.
  handleAddSimilar = () => {
    const currentDataItem = this.props.getCurrentRec;
    if (!utils.objEmpty(currentDataItem)) {
      this.setState((prevState) => {
        const newState = {
          ...prevState,
          editMode: CompConst.EDIT_MODE_ADD_SIMILAR,
        }
        return newState;
      });
      this.props.setShowForm(true);  // show the form  
    }
  }

  // Edit button pressed.
  handleEdit = () => {
    const currentDataItem = this.props.getCurrentRec;
    if (!utils.objEmpty(currentDataItem)) {
      this.setState((prevState) => {
        const newState = {
          ...prevState,
          editMode: CompConst.EDIT_MODE_EDIT,
        }
        return newState;
      });
      this.props.setShowForm(true);  // show the form  
    }
  }

  // remove button pressed
  handleRemoveOrig = () => {
    const currentDataItem = this.props.getCurrentRec;
    if (!utils.objEmpty(currentDataItem) &&
      window.confirm(
        'Confirm deleting: ' + currentDataItem.PageNum)) {
      this.props.deleteRequested(currentDataItem);
    }
  }

  // remove button pressed
  handleRemove = () => {
    const currentDataItem = this.props.getCurrentRec;
    if (!utils.objEmpty(currentDataItem)) {
      const itemLabel = currentDataItem.Category.Name +
        ', ' + currentDataItem.Name;
      const msgText = 'Please confirm deleting: ' + itemLabel;
      this.props.drpSetProp('msgText', msgText);
      // currentDataItem will be passed to the yes callback: removeConfirmed()
      this.props.drpSetProp('yesParam', currentDataItem);
      this.props.drpSetProp('show', true);  // show the dialog
    }
  }

  // this function will be passed to <CompConfirmDialog/>.
  // It will be called when user presses Yes in the confirmation dialog.
  removeConfirmed = (currentDataItem) => {
    this.props.deleteRequested(currentDataItem);
  }

  //==========================================================

  // a row is clicked. remember the current record
  handleRowClick = (event) => {
    const currentItem = event.dataItem;
    this.props.setCurrentRec(currentItem);
  }

  // edit group is closed
  handleEditGroupClose = (event) => {
    this.props.setCurrentRec({});  // no more current record
  }

  // filter changed
  handleFilterChange = (event) => {
    const filter = event.filter;
    this.setState((prevState) => ({
      ...prevState,
      filter,
    }));
  }

  // column sort requested
  handleSortChange = (event) => {
    const sort = event.sort;
    this.setState((prevState) => ({
      ...prevState,
      sort,
    }));
  }

  // data to use, after filtering, sorting, with the selected marker
  dataToUse = () => {
    const listRecs = this.props.listRecs;
    const filteredData = filterBy(listRecs, this.state.filter);
    const sortedFilteredData = orderBy(filteredData, this.state.sort);
    const currentRec = this.props.getCurrentRec;
    const currentRecId = currentRec && currentRec.Id;
    const dataWithSelectedItem = sortedFilteredData.map(item => ({
      ...item,
      selected: item.Id === currentRecId,
    }));
    return dataWithSelectedItem;
  }

  //==========================================================
  // render for CompSubCategory
  render() {
    const hasCurrentRec = !utils.objEmpty(this.props.getCurrentRec);
    return (
      <div>
        <ErrorBox loc="SubCategory_main" />
        {this.props.getShowLoading && <LoadingPanel />}

        <Grid
          style={{ height: '580px' }}
          reorderable
          data={this.dataToUse()}
          selectedField="selected"
          onRowClick={this.handleRowClick}
          filterable
          filter={this.state.filter}
          onFilterChange={this.handleFilterChange}
          sortable={{
            allowUnsort: true,
            mode: 'multiple'
          }}
          sort={this.state.sort}
          onSortChange={this.handleSortChange}
          resizable={true}
        >
          <GridToolbar>
            <Button
              title="Add"
              className="k-button k-primary"
              iconClass="k-icon k-i-plus"
              onClick={this.handleAdd}
            >
              &nbsp;&nbsp;Add&nbsp;&nbsp;
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {
              hasCurrentRec &&
              <div className="drp-edit-box drp-float-right">
                <Button
                  title="Add Similar"
                  className="k-button k-primary"
                  iconClass="k-icon k-i-plus"
                  onClick={this.handleAddSimilar}
                >
                  &nbsp;&nbsp;Add Similar&nbsp;&nbsp;
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  title="Edit"
                  className="k-button k-primary"
                  iconClass="k-icon k-i-edit"
                  onClick={this.handleEdit}
                >
                  &nbsp;&nbsp;Edit&nbsp;&nbsp;
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  title="Remove"
                  look="bare"
                  className="k-button"
                  iconClass="k-icon k-i-delete"
                  onClick={this.handleRemove}
                >
                  &nbsp;Remove
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  look="bare"
                  iconClass="k-icon k-i-close drp-icon-close"
                  onClick={this.handleEditGroupClose}
                />
              </div>
            }
          </GridToolbar>
          <GridColumn field="Id" title="Id" width="70px" editable={false} filterable={false} />
          <GridColumn field="Category.Name" title="Category" width="165px"/>
          <GridColumn field="Name" title="SubCategory"  />
          <GridColumn field="Val" title="Val" width="130px" />
          <GridColumn field="DispOrder" title="Disp Order" filterable={false} width="125px"/>
          <GridColumn field="Comment" title="Comment" />
          <GridColumn field="Active" title="Active" width="95px" filter="boolean" />
        </Grid>

        <CompConfirmDialog
          getShowConfirm={this.props.drpGenGetProp('show')}
          setShowConfirm={this.props.drpGenSetProp('show')}
          msgText={this.props.drpGetProp('msgText')}
          yesCallback={this.removeConfirmed}
          yesCallbackParam={this.props.drpGetProp('yesParam')}
        />

        {this.props.getShowForm &&    // show the form if adding or editing
          <CompSubCategoryForm
            editMode={this.state.editMode}
            handleCancel={this.handleFormCancel}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const listRecsUnsorted = createSubCategoryListSelector(state);
  const listRecs = SubCategory.sortByCatDispOrder(listRecsUnsorted);
  return {
    listRecs,       // list of SubCategory's
    getShowLoading: actionControl.getShowLoadingSubCategory(state),
    getShowForm: actionControl.getShowFormSubCategory(state),
    getCurrentRec: actionControl.getCurrentSubCategory(state),
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setShowForm: (showFlag) => dispatch(
      actionControl.setShowFormSubCategory(showFlag)),
    deleteRequested: (rec) => dispatch(
      actionGen(actionSubCategory.DELETE_SubCategory_REQUESTED, rec)
    ),
    setCurrentRec: (rec) => dispatch(
      actionControl.setCurrentSubCategory(rec)
    ),
  }
}

const Comp_confirm = withCompConfirmDialog(CompSubCategory);
const Comp_confirm_redux =
  connect(mapStateToProps, mapDispatchToProps)(Comp_confirm);
export default Comp_confirm_redux;
