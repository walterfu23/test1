import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBizDocListSelector } from '../../selectors/selectBizDoc';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { filterBy, orderBy } from '@progress/kendo-data-query';
import CmdCell from '../shared/CmdCell';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionBizDoc from '../../actions/actionBizDoc';
import CompBizDocForm from './CompBizDocForm';
import ErrorBox from '../shared/ErrorBox';
import LoadingPanel from '../shared/LoadingPanel';

// this implementation uses CmdCell. It's been replaced.
class CompBizDoc_CmdCell extends Component {

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
    }

    this.CmdCell = CmdCell(
      this.enterEdit,        // Edit button will call this
      this.removeRec,        // Remove button will call this
    );
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

  // record's Remove button pressed.
  removeRec = (dataItem) => {
    dataItem.inEdit = undefined;
    this.props.deleteRequested(dataItem);
  }

  //==========================================================
  
  // filter changed
  handleFilterChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      filter: event.filter,
    }));
  }

  handleSortChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      sort: event.sort,
    }));
  }

  // data to use, after filtering and sorting
  dataToUse = () => {
    const listBizDoc = this.props.listBizDoc;
    const filteredData = filterBy(listBizDoc, this.state.filter);
    const sortedFilteredData = orderBy(filteredData, this.state.sort);
    return sortedFilteredData;
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
          filterable
          filter={this.state.filter}
          onFilterChange={this.handleFilterChange}
          sortable={{
            allowUnsort: true,
            mode: 'multiple'
          }}
          sort={this.state.sort}
          onSortChange={this.handleSortChange}
        >
          <GridToolbar>
            <button
              title="Add New"
              className="k-button k-primary"
              onClick={this.handleAdd}
            >
              Add new
            </button>
          </GridToolbar>
          <GridColumn  field="Id" title="Id" width="70px" editable={false} filterable={false} />
          <GridColumn field="DocNum" title="Doc Num" width="170px" />
          <GridColumn field="DocName" title="Doc Name" />
          <GridColumn field="Comment" title="Comment" />
          <GridColumn field="Active" title="Active" width="95px" filter="boolean" />
          <GridColumn cell={this.CmdCell} title="Action" width="160px" filterable={false} reorderable={false} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CompBizDoc_CmdCell);
