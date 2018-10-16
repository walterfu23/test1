import React from 'react';
import { Dialog } from '@progress/kendo-react-dialogs';
import './CompConfirmDialog.css';
import DRPDraggable from '../../utils/DRPDraggable';

class CompConfirmDialog extends React.Component {
  static defaultProps = {
    title: 'Please confirm',
    msgText: 'Are you sure you want to continue?',
    yesText: 'Yes',
    noText: 'No',
    width: 300,
  }

  draggable = DRPDraggable.draggableObj;
  componentWillUnMount() {
    this.draggable.destroy();
  }

  handleClose = () => this.handleNo();

  closeDialog = () => {
    this.props.setShowConfirm(false);
  }

  handleYes = () => {
    this.props.yesCallback &&
      this.props.yesCallback(this.props.yesCallbackParam);
    this.closeDialog();
  }

  handleNo = () => {
    this.props.noCallback &&
      this.props.noCallback(this.props.noCallbackParam);
    this.closeDialog();
  }

  getDialogTitle = () => {
    return (<span
      ref={(element) =>
        DRPDraggable.setupDraggable(this.draggable, element)
      }
    >
      {this.props.title}
    </span>
    );
  }

  render() {
    if (!this.props.getShowConfirm()) {
      return null;
    }

    return (
      <div>
        <Dialog
          title={this.getDialogTitle()}
          onClose={this.handleClose}
          width={this.props.width}
        >
          <br />
          <p style={{ fontSize: "14pt" }}>
            {this.props.msgText}
          </p>
          <br />
          <br />
          <button
            className="k-button k-primary drp-float-left"
            onClick={this.handleYes}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
            {this.props.yesText}
            &nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <button
            className="k-button drp-float-right"
            onClick={this.handleNo}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
            {this.props.noText}
            &nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </Dialog>
      </div >
    );
  }
}

export default CompConfirmDialog;
