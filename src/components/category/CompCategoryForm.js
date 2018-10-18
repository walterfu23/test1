import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Switch } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import actionGen from '../../actions/actionGen';
import actionControl from '../../actions/actionControl';
import actionCategory from '../../actions/actionCategory';
import { Dialog } from '@progress/kendo-react-dialogs';
import ErrorBox from '../shared/ErrorBox';
import { createTopLevelListListSelector } from '../../selectors/selectTopLevelList';
import TopLevelList from '../../orm/modelTopLevelList';
import './CompCategory.css';
import CompConst from '../shared/CompConst';
import DRPDraggable from '../../utils/DRPDraggable';

// The form in a dialog to add or edit fields for Category
// Props passed in that are not in defaultProps:
// handleCancel - called by the component to tell the caller
//                to close this component.
// 
class CompCategoryForm extends Component {

  static defaultProps = {
    editMode: CompConst.EDIT_MODE_ADD, // creating a new record
    EDIT_FIELD_WIDTH: '400px',       // width of edit fields
    TEXTAREA_COLS: 47,      // cols in a textarea
    TEXTAREA_ROWS: 3,       // rows in a textarea
  };

  constructor(props) {
    super(props);
    const recEmpty = {
      Id: undefined,
      ListId: undefined,
      Active: true,
      Name: undefined,
      Val: undefined,
      DispOrder: undefined,
      Comment: undefined,
      Creator: props.getUserInfo.uid,   // CreateTime added in Api.
    };
    const recInEditToUse =
      props.editMode === CompConst.EDIT_MODE_ADD ?
        recEmpty : props.getCurrentRec;

    let addNew = false;
    let adding = false;
    const getDialogTitle = () => {
      switch (props.editMode) {
        case CompConst.EDIT_MODE_ADD:
          addNew = true;
          adding = true;
          return 'Add Category';
        case CompConst.EDIT_MODE_ADD_SIMILAR:
          addNew = false;
          adding = true;
          return 'Add Similiar Category';
        case CompConst.EDIT_MODE_EDIT:
          addNew = false;
          adding = false;
          return 'Edit Category';
        default:
          return 'Edit';
      }
    }
    const dialogTitle = getDialogTitle();
    const selectedParent = (addNew || !recInEditToUse) ?
      undefined : recInEditToUse.TopLevelList;


    const stateInit = {
      adding,           // true: adding a new record.
      dialogTitle,      // title of the dialog box
      selectedParent,   // the selected TopLevelList in the dropdown
      recInEdit: {
        ...recInEditToUse,
        Modifier: props.getUserInfo.uid,
      },
    };
    this.state = stateInit;
    this.draggable = DRPDraggable.draggableObj;
  } // constructor

  componentWillUnMount() {
    this.draggable.destroy();
  }

  // Save or update the record
  saveRecord = () => {
    if (this.state.adding) {
      // request to create the record
      this.props.createRequested(this.state.recInEdit);
    } else {
      // request to update the record
      this.props.updateRequested(this.state.recInEdit);
    }
  }

  // form submitted
  handleSubmit = (event) => {
    event.preventDefault();
    this.saveRecord();   // save the record
  }

  // record the form field changes to state
  onDialogInputChange = (event) => {
    const target = event.target;
    const fieldVal = target.type === 'checkbox' ? target.checked : target.value;
    const fieldName = target.props ? target.props.name : target.name;
    const recEdited = Object.assign({}, this.state.recInEdit);
    recEdited[fieldName] = fieldVal;
    this.setState(prevState => ({
      ...prevState,
      recInEdit: recEdited,
    }));
  }

  // TopLevelList dropdown value changed
  handleTopLevelListDrownDownChange = (event) => {
    const selectedParent = event.target.value;
    const ListId = selectedParent.Id;
    this.setState(prevState => ({
      ...prevState,
      selectedParent,
      recInEdit: {
        ...prevState.recInEdit,
        ListId,
      },
    }));
  }

  getDialogTitle = () => {
    return (<span
      ref={(element) =>
        DRPDraggable.setupDraggable(this.draggable, element)
      }
    >
      {this.state.dialogTitle}
    </span>
    );
  }

  // render the dialog
  render() {
    return (
      <div>
        <Dialog
          title={this.getDialogTitle()}
          onClose={this.props.handleCancel}
          width={this.props.EDIT_FIELD_WIDTH}
        >
          <form onSubmit={this.handleSubmit}>
            <div className="drp-margin-bottom">
              <DropDownList
                name="ListId"
                label="Top List"
                data={this.props.listTopLevelList}
                dataItemKey={'Id'}
                textField={'ListLabel'}
                value={this.state.selectedParent}
                onChange={this.handleTopLevelListDrownDownChange}
                style={{ width: "100%" }}
                required={true}
                disabled={!this.state.adding}
              />
            </div>
            <div className="drp-align-center">
              <label style={{ float: "left" }}>
                <br />
                <Switch
                  name="Active"
                  checked={this.state.recInEdit.Active}
                  onChange={this.onDialogInputChange}
                />
                &nbsp;&nbsp;Active
              </label>
            </div>
            <br />
            <div className="drp-margin-bottom">
              <Input
                name="Name"
                label="Name"
                value={this.state.recInEdit.Name || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>
            <div className="drp-margin-bottom">
              <Input
                name="Val"
                label="Val"
                value={this.state.recInEdit.Val || ''}
                onChange={this.onDialogInputChange}
                width="20"
                style={{ width: "45%", float: "left" }}
              />
              &nbsp;
              <label style={{ width: "10%" }}>&nbsp;</label>
              <Input
                name="DispOrder"
                label="Disp Order"
                value={this.state.recInEdit.DispOrder || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "45%", float: "right" }}
              />
            </div>
            <div className="drp-margin-bottom">
              <Input
                name="Comment"
                label="Comment"
                value={this.state.recInEdit.Comment || ''}
                onChange={this.onDialogInputChange}
                style={{ width: "100%" }}
              />
            </div>

            <br />
            <ErrorBox loc="Category_form" />
            <br />
            <button
              className="k-button k-primary"
            >
              &nbsp;&nbsp;Save&nbsp;&nbsp;
            </button>
            <button
              className="k-button drp-float-right"
              onClick={this.props.handleCancel}
            >
              &nbsp;&nbsp;Cancel&nbsp;&nbsp;
            </button>
          </form>
        </Dialog>
      </div>
    ); // return
  } // render()
} // CompCategoryForm

const mapStateToProps = (state, ownProps) => {
  const listTopLevelListUnsorted = createTopLevelListListSelector(state);
  const listTopLevelList = TopLevelList.sortByListLabel(listTopLevelListUnsorted);
  return {
    listTopLevelList,
    getUserInfo: actionControl.getUserInfo(state),
    getCurrentRec: actionControl.getCurrentCategory(state),
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    createRequested: (rec) => dispatch(
      actionGen(actionCategory.CREATE_Category_REQUESTED, rec)
    ),
    updateRequested: (rec) => dispatch(
      actionGen(actionCategory.UPDATE_Category_REQUESTED, rec)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompCategoryForm);
