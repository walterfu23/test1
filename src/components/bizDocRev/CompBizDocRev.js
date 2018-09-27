import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBizDocRevListSelector } from '../../selectors/selectBizDocRev';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { filterBy, orderBy } from '@progress/kendo-data-query';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionBizDocRev from '../../actions/actionBizDocRev';
import CompBizDocRevForm from './CompBizDocRevForm';
import ErrorBox from '../shared/ErrorBox';
import LoadingPanel from '../shared/LoadingPanel';
import utils from '../../utils/utils';
import './CompBizDocRev.css';

class CompBizDocRev extends Component {

  constructor(props) {
    super(props);
    this.state = {
      creating: undefined,    // true: adding; false: editing.
      recInEdit: undefined,   // record being edited.
      filter: {               // used by the grid to filter
        logic: "and",
        filters: [],
      },
      sort: [],                // used by the grid to sort
      selectedDataItem: {},    // the selected record
      docIdForNewRec: undefined, // new BizDocRev will be for this BizDoc.
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
    const selectedDataItem = this.state.selectedDataItem;
    if (!utils.objEmpty(selectedDataItem)) {
      this.props.setShowForm(true);  // show the form  
      this.setState((prevState) => {
        return {
          ...prevState,
          creating: false,
          recInEdit: {
            ...selectedDataItem,
            // the web svc model of BizDoc does not have
            // the "selected" field. It needs to be wiped out.
            selected: undefined,
          }
        }
      });
    }
  }

  // remove button pressed
  handleRemove = () => {
    const selectedDataItem = this.state.selectedDataItem;
    if (!utils.objEmpty(selectedDataItem) &&
      window.confirm(
        'Confirm deleting: ' + selectedDataItem.RevName)) {
      this.props.deleteRequested(selectedDataItem);
      this.setState((prevState) => ({
        ...prevState,
        selectedDataItem: {},
      }));
    }
  }

  //==========================================================

  // a row is clicked
  handleRowClick = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedDataItem: event.dataItem,
    }));
  }

  // edit group is closed
  handleEditGroupClose = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedDataItem: {},
    }));
  }

  // filter changed
  handleFilterChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      filter: event.filter,
    }));
  }

  // column sort requested
  handleSortChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      sort: event.sort,
    }));
  }

  // data to use, after filtering, sorting, with the selected marker
  dataToUse = () => {
    const listRecs = this.props.listRecs;
    const filteredData = filterBy(listRecs, this.state.filter);
    const sortedFilteredData = orderBy(filteredData, this.state.sort);

    const dataWithSelectedItem = sortedFilteredData.map(item => ({
      ...item,
      selected: item.Id === this.state.selectedDataItem.Id,
    }));
    return dataWithSelectedItem;
  }

  //==========================================================
  // render for CompBizDocRev
  render() {
    return (
      <div>
        <ErrorBox loc="BizDocRev_main"/>
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
              !utils.objEmpty(this.state.selectedDataItem) &&
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
          <GridColumn field="BizDoc.DocNum" title="Doc Num" width="170px" />
          <GridColumn field="RevName" title="Rev Name" />
          <GridColumn field="LangNormalized" title="LangNorm" filterable={false} width="98px"/>
          <GridColumn field="RevNormalized" title="RevNorm" filterable={false} width="90px"/>
          <GridColumn field="Comment" title="Comment" />
          <GridColumn field="Active" title="Active" width="95px" filter="boolean" />
        </Grid>

        {this.props.getShowForm &&    // show the form if adding or editing
          (
            this.state.creating ?
              <CompBizDocRevForm
                creating={this.state.creating}
                handleCancel={this.handleFormCancel}
              />
              :
              <CompBizDocRevForm
                creating={this.state.creating}
                recInEdit={this.state.recInEdit}
                handleCancel={this.handleFormCancel}
              />
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const listRecs = createBizDocRevListSelector(state);
  return {
    listRecs,       // list of BizDocRev's
    getShowLoading: actionControl.getShowLoadingBizDocRev(state),
    getShowForm: actionControl.getShowFormBizDocRev(state),
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setShowForm: (showFlag) => dispatch(
      actionControl.setShowFormBizDocRev(showFlag)),
    createRequested: (rec) => dispatch(
      actionGen(actionBizDocRev.CREATE_BizDocRev_REQUESTED, rec)
    ),
    deleteRequested: (rec) => dispatch(
      actionGen(actionBizDocRev.DELETE_BizDocRev_REQUESTED, rec)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompBizDocRev);
