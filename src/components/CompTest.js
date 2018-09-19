import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, GridColumn, GridCell, GridToolbar } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input, Switch } from '@progress/kendo-react-inputs';
import actionGen from '../actions/actionGen';
import actionBizDoc from '../actions/actionBizDoc';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

class CompTest extends Component {

  // render the dialog
  render() {
    return (
      <div>
        <Dialog
          title={'title here'}
          width={400}
        >
          <DialogActionsBar>
            <button
              className="k-button"
            >
              Cancel
              </button>
            <button
              className="k-button k-primary"
            >
              Save
              </button>
          </DialogActionsBar>
        </Dialog>
      </div>
    ); // return
  } // render()
} // CompTest

export default CompTest;

