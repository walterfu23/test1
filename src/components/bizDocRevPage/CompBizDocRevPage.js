import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBizDocRevPageListSelector } from '../../selectors/selectBizDocRevPage';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { filterBy, orderBy } from '@progress/kendo-data-query';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionBizDocRevPage from '../../actions/actionBizDocRevPage';
import CompBizDocRevPageForm from './CompBizDocRevPageForm';
import ErrorBox from '../shared/ErrorBox';
import LoadingPanel from '../shared/LoadingPanel';
import utils from '../../utils/utils';
import './CompBizDocRevPage.css';

class CompBizDocRevPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      creating: undefined,    // true: adding; false: editing.
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
    if (!utils.objEmpty(currentDataItem) &&
      window.confirm(
        'Confirm deleting: ' + currentDataItem.PageNum)) {
      this.props.deleteRequested(currentDataItem);
    }
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
  // render for CompBizDocRevPage
  render() {
    const hasCurrentRec = !utils.objEmpty(this.props.getCurrentRec);
    return (
      <div>
        <ErrorBox loc="BizDocRevPage_main" />
        {this.props.getShowLoading && <LoadingPanel />}

        <Grid
          style={{ height: '420px' }}
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
          <GridColumn field="BizDocRev.RevName" title="Rev Name" width="170px" />
          <GridColumn field="PgNum" title="Page Number" filter="numeric" width="135px"  />
          <GridColumn field="PgKey1" title="Key1" />
          <GridColumn field="PgKey2" title="Key2" />
          <GridColumn field="PgType" title="PgType" />
          <GridColumn field="Active" title="Active" width="95px" filter="boolean" />
        </Grid>

        {this.props.getShowForm &&    // show the form if adding or editing
          <CompBizDocRevPageForm
            creating={this.state.creating}
            handleCancel={this.handleFormCancel}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const listRecs = createBizDocRevPageListSelector(state);
  return {
    listRecs,       // list of BizDocRev's
    getShowLoading: actionControl.getShowLoadingBizDocRevPage(state),
    getShowForm: actionControl.getShowFormBizDocRevPage(state),
    getCurrentRec: actionControl.getCurrentBizDocRevPage(state),
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setShowForm: (showFlag) => dispatch(
      actionControl.setShowFormBizDocRevPage(showFlag)),
    deleteRequested: (rec) => dispatch(
      actionGen(actionBizDocRevPage.DELETE_BizDocRevPage_REQUESTED, rec)
    ),
    setCurrentRec: (rec) => dispatch(
      actionControl.setCurrentBizDocRevPage(rec)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompBizDocRevPage);
