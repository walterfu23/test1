import React from 'react';
import { connect } from 'react-redux';
import actionError from '../../actions/actionError';
import utils  from '../../utils/utils';
import './ErrorBox.css';

// prop of loc will be passed in. The error is displayed
// only if the loc matches the error's loc.
class ErrorBox extends React.Component {

  componentWillUnmount = () => {
    this.props.clearStateError();
  }

  render() {
    const { loc, error } = this.props.stateError.errorInfo;
    if (! utils.sameVals(this.props.loc, loc) || utils.objEmpty(error)) {
      return null;
    }

    return (
      <div className="drp-error-message">
        {error.message}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateError: state.error,
});

const mapDispatchToProps = (dispatch, props) => ({
  dispatch,
  clearStateError: () => dispatch(actionError.clearStateError),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBox);
