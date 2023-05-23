import React, { Component } from 'react';
import { getQuestions } from '../helpers/triviaAPI';

export default class Question extends Component {
  state = {
    results: [],
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const APIdata = await getQuestions(token);
    if (APIdata) {
      this.setState({
        results: [...APIdata.results],
      });
    } else {
      this.logout();
    }
  }

  logout = () => {
    const { history } = this.props;
    localStorage.setItem('token', '');
    history.push('/');
  };

  render() {
    const { results } = this.state;
    return (
      <div>
        <p data-testid="question-category">campo category</p>
        <p data-testid="question-text">campo question</p>
        <div data-testid="answer-options">
          <button data-testid="correct-answer">correto</button>
          <button data-testid={ `wrong-answer-${0}` }>errado</button>
        </div>
      </div>
    );
  }
}
