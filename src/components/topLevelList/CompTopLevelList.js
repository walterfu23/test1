import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTopLevelListListSelector } from '../../selectors/selectTopLevelList';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { filterBy, orderBy } from '@progress/kendo-data-query';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionTopLevelList from '../../actions/actionTopLevelList';
import CompTopLevelListForm from './CompTopLevelListForm';
import ErrorBox from '../shared/ErrorBox';
import LoadingPanel from '../shared/LoadingPanel';
import utils from '../../utils/utils';
import './CompTopLevelList.css';
import CompConfirmDialog from '../shared/CompConfirmDialog';
import withCompConfirmDialog from '../shared/withCompConfirmDialog';
import TopLevelList from '../../orm/modelTopLevelList';

class CompTopLevelList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      creating: undefined,   // true: adding; false: editing.
      filter: {
        logic: "and",
        filters: [],
      },
      sort: [],
    }
  }

  //==========================================================

  // Add pressed: requesting a new record added.
  handleAdd = () => {
    this.props.setShowForm(true);  // show the form
    this.setState((prevState) => {
      return {
        ...prevState,
        creating: true,
      };
    });
  }

  // form's cancel button or form's close button clicked.
  handleFormCancel = () => {
    this.props.setShowForm(false);  // hide the form
  }

  // Edit button pressed.
  handleEdit = () => {
    const currentDataItem = this.props.getCurrentRec;
    if (!utils.objEmpty(currentDataItem)) {
      this.props.setShowForm(true);  // show the form  
      this.setState((prevState) => {
        const newState = {
          ...prevState,
          creating: false,
        }
        return newState;
      });
    }
  }

  // remove button pressed
  handleRemove = () => {
    const currentDataItem = this.props.getCurrentRec;
    if (!utils.objEmpty(currentDataItem)) {
      const msgText = 'Please confirm deleting: ' + currentDataItem.ListLabel;
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

  // data to use, after filtering, sorting, and selected marker
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
  // render for CompTopLevelList
  render() {
    const hasCurrentRec = !utils.objEmpty(this.props.getCurrentRec);
    return (
      <div>
        <ErrorBox loc="TopLevelList_main" />
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
            &nbsp;&nbsp;
            {
              hasCurrentRec &&
              <div className="drp-edit-box drp-float-right">
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
          <GridColumn field="ListLabel" title="List Label" width="170px" />
          <GridColumn field="ListName" title="List Name" />
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
          <CompTopLevelListForm
            creating={this.state.creating}
            handleCancel={this.handleFormCancel}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const listRecsUnsorted = createTopLevelListListSelector(state);
  const listRecs = TopLevelList.sortByIdDesc(listRecsUnsorted);
  return {
    listRecs,
    getShowLoading: actionControl.getShowLoadingTopLevelList(state),
    getShowForm: actionControl.getShowFormTopLevelList(state),
    getCurrentRec: actionControl.getCurrentTopLevelList(state),
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setShowForm: (showFlag) => dispatch(
      actionControl.setShowFormTopLevelList(showFlag)),
    deleteRequested: (rec) => dispatch(
      actionGen(actionTopLevelList.DELETE_TopLevelList_REQUESTED, rec)
    ),
    setCurrentRec: (rec) => dispatch(
      actionControl.setCurrentTopLevelList(rec)
    ),
  }
}

const Comp_confirm = withCompConfirmDialog(CompTopLevelList);
const Comp_confirm_redux =
  connect(mapStateToProps, mapDispatchToProps)(Comp_confirm);
export default Comp_confirm_redux;
