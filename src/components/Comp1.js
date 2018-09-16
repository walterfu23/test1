import React, { Component } from 'react';
import { connect }from 'react-redux';
import { ActionTypesTest } from '../constants/actionTypes';
import { createBizDocRevPageTreeSelector } from '../selectors/selectBizDocRevPage';
import { createBizDocRevTreeSelector } from '../selectors/selectBizDocRev';
import { createBizDocTreeSelector } from '../selectors/selectBizDoc';

class Comp1 extends Component {
  render() {
    console.log('Comp1.BizDocRevPage: ', this.props.BizDocRevPage);
    console.log('Comp1.BizDocRev: ', this.props.BizDocRev);
    console.log('Comp1.BizDoc: ', this.props.BizDoc);
    return (
      <div>
        <button onClick={this.props.runCheck}>
          Check
        </button>
      </div>
    );
  }
}

// const mapStateToProps = (state, props) => ({
//   orm:  state.orm
// });
const mapStateToProps = (state, props) => {
  const jsonBizDocRevPage = createBizDocRevPageTreeSelector(state);
  const jsonBizDocRev = createBizDocRevTreeSelector(state);
  const jsonBizDoc = createBizDocTreeSelector(state);
  console.log('jsonBizDocRevPage: ', jsonBizDocRevPage);
  console.log('jsonBizDocRev: ', jsonBizDocRev);
  console.log('jsonBizDoc: ', jsonBizDoc);
  return {
    BizDocRevPage: jsonBizDocRevPage,
    BizDocRev: jsonBizDocRev,
    BizDoc: jsonBizDoc,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const action = type => dispatch({ type });
  return {
    runCheck: () => action(ActionTypesTest.TEST_CHECK)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comp1);
