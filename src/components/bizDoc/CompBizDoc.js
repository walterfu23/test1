import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBizDocListSelector } from '../../selectors/selectBizDoc';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import CmdCell from '../shared/CmdCell';
import actionGen from '../../actions/actionGen';
import actionBizDoc from '../../actions/actionBizDoc';
import CompBizDocForm from './CompBizDocForm';
import ErrorBox from '../shared/ErrorBox';

class CompBizDoc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,       // true: show the form
      creating: undefined,   // true: adding; false: editing.
      recInEdit: undefined,  // record being edited.
    };
    this.CmdCell = CmdCell(
      this.enterEdit,        // Edit button will call this
      this.removeRec,        // Remove button will call this
    );
  }

  //==========================================================

  // Add pressed: requesting a new record added.
  handleAdd = () => {
    this.setState({
      showForm: true,
      creating: true,
    });
  }

  // form's cancel button or form's close button clicked.
  handleFormCancel = () => {
    this.setState({ showForm: false });
  }

  // record's Edit button pressed.
  enterEdit = (dataItem) => {
    // dataItem.inEdit = true;
    this.setState({
      showForm: true,
      creating: false,
      recInEdit: dataItem,
    });
  }

  // record's Remove button pressed.
  removeRec = (dataItem) => {
    dataItem.inEdit = undefined;
    this.props.deleteRequested(dataItem);
  }

  // render for CompBizDoc
  render() {
    const listBizDoc = this.props.listBizDoc;
    return (
      <div>
        <ErrorBox />

        <Grid
          style={{ height: '420px' }}
          data={listBizDoc}
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
          <GridColumn field="Id" title="Id" width="60px" editable={false} />
          <GridColumn field="Active" title="Active" width="70px" />
          <GridColumn field="DocNum" title="Doc Num" width="100px" />
          <GridColumn field="DocName" title="Doc Name" />
          <GridColumn field="Comment" title="Comment" />
          <GridColumn cell={this.CmdCell} title="Action" width="150px" />
        </Grid>

        {this.state.showForm &&    // show the form if adding or editing
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
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    createRequested: (rec) => dispatch(
      actionGen(actionBizDoc.CREATE_BizDoc_REQUESTED, rec)
    ),
    deleteRequested: (rec) => dispatch(
      actionGen(actionBizDoc.DELETE_BizDoc_REQUESTED, rec)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompBizDoc);
