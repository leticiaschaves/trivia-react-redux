import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Timer extends Component {
  state = {
    timer: 30,
    timerHandler: '',
  };

  componentDidMount() {
    const oneSecond = 1000;
    this.setState({
      timer: 30,
      timerHandler: setInterval(this.decreaseTimer, oneSecond),
    });
  }

  // Vencido está
  decreaseTimer = () => {
    const { timer, timerHandler } = this.state;
    const { timeOut, logando } = this.props;
    if (timer === 0) {
      clearInterval(timerHandler);
      return timeOut();
    }
    const newTimer = timer - 1;
    logando(newTimer);
    this.setState({ timer: newTimer });
  };

  render() {
    const { timer } = this.state;
    return (
      <div>
        <h1>
          {timer}
        </h1>
      </div>
    );
  }
}

Timer.propTypes = {
  timeOut: PropTypes.func,
}.isRequired;
