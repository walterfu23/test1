import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBizDocListSelector } from '../selectors/selectBizDoc';
import { Grid, GridColumn, GridCell, GridToolbar } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import MyCommandCell from './MyCommandCell';
import { ActionTypesBizDoc } from '../constants/actionTypes';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

class CompBizDoc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordInEdit: undefined,  // true: adding or editing a record.
      creating: undefined,      // true: adding; false: editing.
    }

    this.CommandCell = MyCommandCell(
      this.enterEdit,
      this.remove,
      this.save,
      this.cancel,
      "inEdit"
    );
  }

  // title of the diaglog box
  dialogTitle = () => {
    return this.state.creating ? 'Add BizDoc' : 'Edit BizDoc';
  }

  handleAdd = () => {
    this.setState({
      recordInEdit: {},
      creating: true
    })
  }

  handleCancel = () => {
    this.setState({
      recordInEdit: undefined,  // true: adding or editing a record.
      creating: undefined,      // true: adding; false: editing.
    })
  }

  handleSave = () => {
    this.setState({
      recordInEdit: undefined,  // true: adding or editing a record.
      creating: undefined,      // true: adding; false: editing.
    })
  }

  // Add new button pressed to add a new record
  enterInsert = () => {
    const dataItem = { inEdit: true };
    this.props.listBizDoc.unshift(dataItem);
    // const newproducts = this.state.data.slice();
    // newproducts.unshift(dataItem);
    // this.update(newproducts, dataItem);
    // this.setState({
    //   data: newproducts
    // });
  }

  // cancel the add operation
  cancelInsert = () => {
    console.log("cancelInsert() invoked.")
  }

  enterEdit = (dataItem) => {
    this.update(this.state.data, dataItem).inEdit = true;
    this.setState({
      data: this.state.data.slice()
    });
  }

  save = (dataItem) => {
    dataItem.inEdit = undefined;
    //  dataItem.ProductID = this.update(sampleProducts, dataItem).ProductID;
    this.setState({
      data: this.state.data.slice()
    });
  }

  cancel = (dataItem) => {
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

  remove = (dataItem) => {
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
        <button onClick={this.buttonClicked}>Test</button>
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
                onClick={this.cancelInsert}
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
          <GridColumn cell={this.CommandCell} />
        </Grid>

        {this.state.recordInEdit &&
          <Dialog
            title={this.dialogTitle()}
            onClose={this.handleCancel}
          >
            <DialogActionsBar>
              <button
                className="k-button"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
              <button
                className="k-button k-primary"
                onClick={this.handleSave}
              >
                Save
              </button>
            </DialogActionsBar>

          </Dialog>
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
  const action = type => dispatch({ type });
  return {
    addRequested: () => action(ActionTypesBizDoc.ADD_BizDoc_REQUESTED),
    addCancelled: () => action(ActionTypesBizDoc.ADD_BizDoc_CANCELLED),
    createRequested: () => action(ActionTypesBizDoc.CREATE_BizDoc_REQUESTED),
  }
}

export default connect(mapStateToProps)(CompBizDoc);
