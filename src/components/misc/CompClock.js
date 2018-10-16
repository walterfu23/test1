import React from 'react';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    const currentTime = this.getCurrentTime();
    this.state = {
      currentTime,
    }
  }

  getCurrentTime = () => {
    return new Date().toLocaleString();
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.intervalExpired(),
      this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  intervalExpired() {
    const currentTime = this.getCurrentTime();
    this.setState(prevState => ({
      currentTime,
    }));
  }

  render() {
    return this.state.currentTime || '';
  }
}
