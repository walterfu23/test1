import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBizDocListSelector } from '../../selectors/selectBizDoc';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { filterBy, orderBy } from '@progress/kendo-data-query';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionBizDoc from '../../actions/actionBizDoc';
import CompBizDocForm from './CompBizDocForm';
import ErrorBox from '../shared/ErrorBox';
import LoadingPanel from '../shared/LoadingPanel';
import utils from '../../utils/utils';
import './CompBizDoc.css';

class CompBizDoc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      creating: undefined,   // true: adding; false: editing.
      recInEdit: undefined,  // record being edited.
      filter: {
        logic: "and",
        filters: [],
      },
      sort: [],
      selectedDataItem: {},    // the selected record
    }

  }

  //==========================================================

  // Add pressed: requesting a new record added.
  handleAdd = () => {
    this.props.setShowFormBizDoc(true);  // show the form
    this.setState((prevState) => {
      return {
        ...prevState,
        creating: true,
      };
    });
  }

  // form's cancel button or form's close button clicked.
  handleFormCancel = () => {
    this.props.setShowFormBizDoc(false);  // hide the form
  }

  handleEdit = () => {
    const selectedDataItem = this.state.selectedDataItem;
    if (!utils.objEmpty(selectedDataItem)) {
      this.props.setShowFormBizDoc(true);  // show the form  
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

  // record's Edit button pressed.
  enterEdit = (dataItem) => {
    this.props.setShowFormBizDoc(true);  // show the form  
    this.setState((prevState) => {
      return {
        ...prevState,
        creating: false,
        recInEdit: dataItem,
      }
    });
  }

  // remove button pressed
  handleRemove = () => {
    const selectedDataItem = this.state.selectedDataItem;
    if (!utils.objEmpty(selectedDataItem) &&
      window.confirm(
        'Confirm deleting: ' + selectedDataItem.DocName)) {
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

  // data to use, after filtering, sorting, and selected marker
  dataToUse = () => {
    const listBizDoc = this.props.listBizDoc;
    const filteredData = filterBy(listBizDoc, this.state.filter);
    const sortedFilteredData = orderBy(filteredData, this.state.sort);

    const dataWithSelectedItem = sortedFilteredData.map(item => ({
      ...item,
      selected: item.Id === this.state.selectedDataItem.Id,
    }));
    return dataWithSelectedItem;
  }

  //==========================================================
  // render for CompBizDoc
  render() {
    return (
      <div>
        <ErrorBox />
        {this.props.getShowLoadingBizDoc && <LoadingPanel />}

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
              title="Add New"
              className="k-button k-primary"
              iconClass="k-icon k-i-plus"
              onClick={this.handleAdd}              
            >
              &nbsp;&nbsp;Add new&nbsp;&nbsp;
            </Button>
            &nbsp;&nbsp;
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
          <GridColumn field="DocNum" title="Doc Num" width="170px" />
          <GridColumn field="DocName" title="Doc Name" />
          <GridColumn field="Comment" title="Comment" />
          <GridColumn field="Active" title="Active" width="95px" filter="boolean" />
        </Grid>

        {this.props.getShowFormBizDoc &&    // show the form if adding or editing
          (
            this.state.creating ?
              <CompBizDocForm
                creating={this.state.creating}
                handleCancel={this.handleFormCancel}
              />
              :
              <CompBizDocForm
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
  const listBizDoc = createBizDocListSelector(state);
  return {
    listBizDoc,
    getShowLoadingBizDoc: actionControl.getShowLoadingBizDoc(state),
    getShowFormBizDoc: actionControl.getShowFormBizDoc(state),
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setShowFormBizDoc: (showFlag) => dispatch(
      actionControl.setShowFormBizDoc(showFlag)),
    createRequested: (rec) => dispatch(
      actionGen(actionBizDoc.CREATE_BizDoc_REQUESTED, rec)
    ),
    deleteRequested: (rec) => dispatch(
      actionGen(actionBizDoc.DELETE_BizDoc_REQUESTED, rec)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompBizDoc);
