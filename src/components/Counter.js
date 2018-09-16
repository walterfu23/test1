import React, { Component } from 'react';
import { connect }from 'react-redux';

class Counter extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onIncrementAsync}>
          Increment after 1 second
        </button>
        {' '}
        <button onClick={this.props.onIncrement}>
          Increment
        </button>
        {' '}
        <button onClick={this.props.onDecrement}>
          Decrement
        </button>
        <div>
          Clicked: {this.props.counterVal} times  
        </div>
      </div>
    );
  }
}
export default Counter;
