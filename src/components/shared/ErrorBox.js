import React from 'react';
import { connect } from 'react-redux';
import actionError from '../../actions/actionError';
import utils  from '../../utils/utils';

class ErrorBox extends React.Component {

  componentWillUnmount = () => {
    this.props.clearStateError();
  }

  render() {
    const { error } = this.props.stateError;
    if (utils.objEmpty(error)) {
      return null;
    }

    return (
      <div className="error-message">
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
