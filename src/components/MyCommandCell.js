import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';

export default function MyCommandCell(enterEdit, remove, save, cancel, editField) {
  return class extends GridCell {
    render() {
      return !this.props.dataItem[editField]
        ? (
          <td>
            <button
              className="k-primary k-button k-grid-edit-command"
              onClick={(e) => enterEdit(this.props.dataItem)}>
              Edit
                        </button>
            <button
              className="k-button k-grid-remove-command"
              onClick={(e) => window.confirm('Confirm deleting: ' + this.props.dataItem.ProductName) && remove(this.props.dataItem)}>
              Remove
                        </button>
          </td>
        )
        : (
          <td>
            <button
              className="k-button k-grid-save-command"
              onClick={(e) => save(this.props.dataItem)}>
              {this.props.dataItem.ProductID
                ? 'Update'
                : 'Add'}
            </button>
            <button
              className="k-button k-grid-cancel-command"
              onClick={(e) => cancel(this.props.dataItem)}>{this.props.dataItem.ProductID
                ? 'Cancel'
                : 'Discard'}
            </button>
          </td>
        );
    }
  }
};
