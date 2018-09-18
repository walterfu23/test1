import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBizDocListSelector } from '../selectors/selectBizDoc';
import { Grid, GridColumn, GridCell, GridToolbar } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input, Switch } from '@progress/kendo-react-inputs';
import MyCommandCell from './MyCommandCell';
import { ActionTypesBizDoc } from '../constants/actionTypes';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

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
      this.remove,
      this.save,
      this.cancel,
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

  // cancel button or form close clicked.
  handleCancel = () => {
    this.setState(this.props.stateInit);
  }

  // save button pressed. Save the record
  handleSave = () => {
    this.props.createRequested(this.state.recInEdit);  // request to create the record
    //   this.handleCancel();
    //    this.setState(this.props.stateInit);   // done with the dialog
  }

  // Enter key pressed in the form. Q: same as pressing Save?
  handleSubmit = (event) => {
    event.preventDefault();
  }

  // title of the diaglog box
  dialogTitle = () => {
    return this.state.creating ? 'Add BizDoc' : 'Edit BizDoc';
  }

  // return a clone of the record
  cloneRec = rec => Object.assign({}, rec);

  onDialogInputChange = (event) => {
    const target = event.target;
    const fieldVal = target.type === 'checkbox' ? target.checked : target.value;
    const fieldName = target.props ? target.props.name : target.name;

    const recEdited = this.cloneRec(this.state.recInEdit);
    recEdited[fieldName] = fieldVal;

    this.setState(
      {
        recInEdit: recEdited
      }
    );
  }

  //==========================================================
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

        {this.state.recInEdit &&   // show dialog if adding or editing
          <Dialog
            title={this.dialogTitle()}
            onClose={this.handleCancel}
            width={this.props.EDIT_FIELD_WIDTH}
          >
            <form
              onSubmit={this.handleSubmit}
            >
              <div style={{ marginBottom: '1rem' }}>
                <label>
                  <Switch
                    name="Active"
                    checked={this.state.recInEdit.Active}
                    onChange={this.onDialogInputChange}
                  />
                  &nbsp;&nbsp;Active
              </label>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <Input
                  name="DocNum"
                  label="Document Number"
                  value={this.state.recInEdit.DocNum || ''}
                  onChange={this.onDialogInputChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <Input
                  name="DocName"
                  label="Document Name"
                  value={this.state.recInEdit.DocName || ''}
                  required={true}
                  onChange={this.onDialogInputChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <Input
                  name="Comment"
                  label="Comment"
                  value={this.state.recInEdit.Comment || ''}
                  onChange={this.onDialogInputChange}
                  style={{ width: "100%" }}
                />
              </div>
            </form>

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
  const action = (type, payload) => dispatch({
    type,
    payload,
  });
  // return {
  //   createRequested: (recToCreate) => dispatch({
  //     type: ActionTypesBizDoc.CREATE_BizDoc_REQUESTED, 
  //     payload: recToCreate,
  //   })
  // }
  return {
    createRequested: (recToCreate) => action(
      ActionTypesBizDoc.CREATE_BizDoc_REQUESTED,
      recToCreate
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompBizDoc);
