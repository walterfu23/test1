import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import Comp1 from './components/Comp1';

import { ActionTypesCounter, ActionTypesBizDoc } from './constants/actionTypes';

export class App extends Component {

  render() {
    return (
      <div className="App">
        <br/>
        <Comp1/>
        <br/>
        <Counter
          counterVal={this.props.counterVal}
          onIncrement={this.props.dispatchIncrement}
          onDecrement={this.props.dispatchDecrement}
          onIncrementAsync={this.props.dispatchIncrementAsyc}
          onFetch={this.props.dispatchFetch}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  counterVal: state.counter
});

const mapDispatchToProps = (dispatch, props) => {
  const action = type => dispatch({ type });
  return {
    dispatchIncrementAsyc: () => action(ActionTypesCounter.INCREMENT_ASYNC),
    dispatchIncrement: () => action(ActionTypesCounter.INCREMENT),
    dispatchDecrement: () => action(ActionTypesCounter.DECREMENT),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
