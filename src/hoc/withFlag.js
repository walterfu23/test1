// HOC for CompConfirmDialog
import React from 'react';
import CompConfirmDialog from './CompConfirmDialog';

const withFlag = (WrappedComponent) => {
  class HOC extends React.Component {
    state = { 
      flag: false,
      text: undefined,
    };
    getFlag = () => {
      return this.state.flag;
    }
    setFlag = (flag) => {
      this.setState(prevState => ({
        ...prevState,
        flag,
      }));
    }

    getText = () => {
      return this.state.text;
    }
    setText = (text) => {
      this.setState(prevState=> ({
        ...prevState,
        text,
      }))
    }

    noop = () => {};   // this function does nothing

    render() {
      return <WrappedComponent
        drpGetFlag={this.getFlag}
        drpSetFlag={this.setFlag}
        drpGetText={this.getText}
        drpSetText={this.setText}
        drpNoop = {this.noop}
        {...this.props}
      />
    }
  }

  return HOC;
} // withFlag

export default withFlag;
