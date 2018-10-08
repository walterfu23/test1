import React from 'react';
import { Dialog } from '@progress/kendo-react-dialogs';
import './CompConfirmDialog.css';

class CompConfirmDialog extends React.Component {
  static defaultProps = {
    title: 'Please confirm',
    msgText: 'Are you sure you want to continue?',
    yesText: 'Yes',
    noText: 'No',
    width: 300,
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


  render() {
    if (!this.props.getShowConfirm()) {
      return null;
    }

    return (
      <div>
        <Dialog
          title={this.props.title}
          onClose={this.handleClose}
          width={this.props.width}
        >
          <br />
          <p style={{fontSize:"14pt"}}>
            {this.props.msgText}
          </p>
          <br />
          <br />
          <button
            className="k-button drp-float-left"
            onClick={this.handleNo}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
            {this.props.noText}
            &nbsp;&nbsp;&nbsp;&nbsp;
            </button>
          <button
            className="k-button k-primary drp-float-right"
            onClick={this.handleYes}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
            {this.props.yesText}
            &nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </Dialog>
      </div >
    );
  }
}

export default CompConfirmDialog;
