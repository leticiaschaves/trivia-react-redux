import React, { Component } from 'react';
import Header from '../components/Header';
import './Game.css';

export default class Game extends Component {
  render() {
    return (
      <div className="game-container">
        <Header />
      </div>
    );
  }
}
