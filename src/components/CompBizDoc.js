import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBizDocListSelector } from '../selectors/selectBizDoc';
import { Grid, GridColumn, GridCell, GridToolbar } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input, Switch } from '@progress/kendo-react-inputs';
import MyCommandCell from './MyCommandCell';
import actionGen from '../actions/actionGen';
import actionBizDoc from '../actions/actionBizDoc';
import CompBizDocForm from './CompBizDocForm';

class CompBizDoc extends Component {

  static defaultProps = {
    recInit: {              // record initial values 
      Id: undefined,
      Active: true,
      DocNum: undefined,
      DocName: undefined,
      Comment: undefined,
    },

    stateInit: {
      creating: true,        // true: adding; false: editing.
      recInEdit: undefined,  // record being edited or being added.
    },

    EDIT_FIELD_WIDTH: '500px',       // width of edit fields
    TEXTAREA_COLS: 47,       // cols in a textarea
    TEXTAREA_ROWS: 3,       // rows in a textarea

  }

  constructor(props) {
    super(props);
    this.state = props.stateInit;
    this.CommandCell = MyCommandCell(
      this.enterEdit,
      this.removeRec,
      this.saveChanges,
      this.cancelEdit,
      "inEdit"
    );
  }

  // Add button pressed: requesting a new record added.
  handleAdd = () => {
    this.setState({
      creating: true,
      recInEdit: this.props.recInit,
    });
  }

  //==========================================================

  // cancel the Edit operation
  cancelEdit = () => {
    console.log("cancelEdit() invoked.")
  }

  enterEdit = (dataItem) => {
    this.update(this.state.data, dataItem).inEdit = true;
    this.setState({
      data: this.state.data.slice()
    });
  }

  saveChanges = (dataItem) => {
    dataItem.inEdit = undefined;
    //  dataItem.ProductID = this.update(sampleProducts, dataItem).ProductID;
    this.setState({
      data: this.state.data.slice()
    });
  }

  cancelEdit = (dataItem) => {
    if (dataItem.ProductID) {
      //   let originalItem = sampleProducts.find(p => p.ProductID === dataItem.ProductID);
      let originalItem = undefined;
      this.update(this.state.data, originalItem);
    } else {
      this.update(this.state.data, dataItem, !dataItem.ProductID);
    }
    this.setState({
      data: this.state.data.slice()
    });
  }

  removeRec = (dataItem) => {
    dataItem.inEdit = undefined;
    this.update(this.state.data, dataItem, true);
    //   this.update(sampleProducts, dataItem, true);
    this.setState({
      data: this.state.data.slice()
    });
  }

  itemChange = (event) => {
    const value = event.value;
    const name = event.field;
    if (!name) {
      return;
    }
    const updatedData = this.state.data.slice();
    const item = this.update(updatedData, event.dataItem);
    item[name] = value;
    this.setState({
      data: updatedData
    });
  }

  update = (data, item, remove) => {
    let updated;
    let index = data.findIndex((p) =>
      (p === item) ||
      (item.ProductID && (p.ProductID === item.ProductID))
    );
    if (index >= 0) {
      updated = Object.assign({}, item);
      data[index] = updated;
    } else {
      let id = 1;
      data.forEach(p => { id = Math.max(p.ProductID + 1, id); });
      updated = Object.assign({}, item, { ProductID: id });
      data.unshift(updated);
      index = 0;
    }

    if (remove) {
      return data.splice(index, 1)[0];
    }

    return data[index];
  }

  buttonClicked = (e) => {
    console.log('buttonClicked: ', e);
  }
  // render for CompBizDoc
  render() {
    const listBizDoc = this.props.listBizDoc;
    return (
      <div>
        <Grid
          style={{ height: '420px' }}
          data={listBizDoc}
          onItemChange={this.itemChange}
          editField='inEdit'
        >
          <GridToolbar>
            <button
              title="Add New"
              className="k-button k-primary"
              onClick={this.handleAdd}
            >
              Add new
            </button>
            {listBizDoc.filter(p => p.inEdit).length > 0 && (
              <button
                title="Cancel current changes"
                className="k-button"
                onClick={this.cancelEdit}
              >
                Cancel current changes
              </button>
            )}
          </GridToolbar>
          <GridColumn field="Id" title="Id" width="60px" editable={false} />
          <GridColumn field="Active" title="Active" width="70px" />
          <GridColumn field="DocNum" title="DocNum" width="100px" />
          <GridColumn field="DocName" title="DocName" />
          <GridColumn field="Comment" title="Comment" />
          <GridColumn cell={this.CommandCell} width="150px"/>
        </Grid>

        {this.state.recInEdit &&   // show dialog if adding or editing
          <CompBizDocForm />
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
    createRequested: (recToCreate) => dispatch(
      actionGen(actionBizDoc.CREATE_BizDoc_REQUESTED, recToCreate)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompBizDoc);
