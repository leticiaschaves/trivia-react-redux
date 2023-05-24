import React, { Component } from 'react';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import './Game.css';

export default class Game extends Component {
  render() {
    return (
      <div className="game-container">
        <Header />
        <h1 className="game-name">
          Nome do jogo
        </h1>
        <QuestionCard { ...this.props } />
      </div>
    );
  }
}
