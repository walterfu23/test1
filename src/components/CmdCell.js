import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';

// props the caller should pass in:
// dataItem: the record being edited or removed.
export default function CmdCell(
  enterEdit,     // will call this when Edit button is pressed
  removeRec,     // will call this when Remove button is pressed
) {
  return class extends GridCell {
    render() {
      return (
        <td>
          <button
            className="k-primary k-button k-grid-edit-command"
            onClick={(e) => enterEdit(this.props.dataItem)}>
            Edit
            </button>
          <button
            className="k-button k-grid-remove-command"
            onClick={(e) => window.confirm(
              'Confirm deleting: ' + this.props.dataItem.DocName
            ) && removeRec(this.props.dataItem)}>
            Remove
            </button>
        </td>
      )
    }
  }
};
