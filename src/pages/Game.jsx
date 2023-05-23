import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';

export default class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <Question />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.object,
  // dispatch: PropTypes.func,
}.isRequired;
