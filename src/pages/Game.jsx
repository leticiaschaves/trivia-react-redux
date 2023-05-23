import React, { Component } from 'react';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';

export default class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <QuestionCard { ...this.props } />
      </div>
    );
  }
}
