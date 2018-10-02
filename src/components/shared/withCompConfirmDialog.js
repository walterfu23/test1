// HOC for CompConfirmDialog
import React from 'react';

const withCompConfirmDialog = (WrappedComponent) => {
  class HOC extends React.Component {
    state = {
      show: false,
      title: undefined,
      msgText: undefined,
      yesParam: undefined,
      noParam: undefined,
      width: undefined,
    };

    // get the prop stored in the state
    getProp = (propName) => {
      const propVal = this.state[propName];
      return propVal;
    }

    // set the state prop
    setProp = (propName, propVal) => {
      this.setState(prevState => ({
        ...prevState,
        [propName]: propVal,
      }));
    }

    // generate the getProp function, for the given prop
    genGetProp = (propName) => {
      return () => this.getProp(propName);
    }

    // generate the setProp function, for the given prop and val
    genSetProp = (propName) => {
      return (propVal) => this.setProp(propName, propVal);
    }

    render() {
      return <WrappedComponent
        drpGetProp={this.getProp}
        drpSetProp={this.setProp}
        drpGenGetProp={this.genGetProp}
        drpGenSetProp={this.genSetProp}
        {...this.props}
      />
    }
  }

  return HOC;
} // withCompConfirmDialog

export default withCompConfirmDialog;
