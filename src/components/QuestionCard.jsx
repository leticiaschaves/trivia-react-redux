import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getQuestions } from '../helpers/triviaAPI';
import './QuestionCard.css';
import Timer from './Timer';

export default class QuestionCard extends Component {
  state = {
    results: [],
    activeIndex: 0,
    userAnswered: false,
    isDisabled: false,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const APIdata = await getQuestions(token);
    if (APIdata) {
      this.setState({
        results: [...APIdata.results],
        activeIndex: 0,
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

  sortArray = (array) => {
    const half = 0.5;
    return array.sort(() => half - Math.random());
  };

  handleClick = () => {
    this.setState({ userAnswered: true });
  };

  renderAnswers = () => {
    const { results, activeIndex, userAnswered, isDisabled } = this.state;
    const activeQuestion = results[activeIndex];
    const arrayButtons = [];

    if (activeQuestion.type === 'boolean') {
      arrayButtons.push(
        <button
          key="correct"
          data-testid="correct-answer"
          className={ userAnswered ? 'correct' : '' }
          onClick={ this.handleClick }
          disabled={ isDisabled }
        >
          {activeQuestion.correct_answer}
        </button>,
      );

      arrayButtons.push(
        <button
          key="incorrect"
          data-testid={ `wrong-answer-${0}` }
          className={ userAnswered ? 'incorrect' : '' }
          onClick={ this.handleClick }
          disabled={ isDisabled }
        >
          {activeQuestion.incorrect_answers[0]}
        </button>,
      );

      return (this.sortArray(arrayButtons));
    }
    arrayButtons.push(
      <button
        key="correct"
        data-testid="correct-answer"
        className={ userAnswered ? 'correct' : '' }
        onClick={ this.handleClick }
        disabled={ isDisabled }
      >
        {activeQuestion.correct_answer}
      </button>,
    );

    activeQuestion.incorrect_answers.forEach((question, index) => {
      arrayButtons.push(
        <button
          key={ index }
          data-testid={ `wrong-answer-${index}` }
          className={ userAnswered ? 'incorrect' : '' }
          onClick={ this.handleClick }
          disabled={ isDisabled }
        >
          {activeQuestion.incorrect_answers[index]}
        </button>,
      );
    });
    console.log(this.sortArray(arrayButtons));
    return this.sortArray(arrayButtons);
  };

  timeOut = () => {
    console.log('GAME OVER');
    this.setState({ isDisabled: true });
  };

  render() {
    const { results, activeIndex } = this.state;
    const activeQuestion = results[activeIndex];
    return (
      <div className="question-card-container">
        { activeQuestion
        && (
          <main className="card">
            <div className="infos">
              <p
                data-testid="question-category"
                className="category"
              >
                {activeQuestion.category}
              </p>
              <p
                className="type"
              >
                {activeQuestion.type}
              </p>
              <Timer timeOut={ this.timeOut } />
            </div>
            <div className="question-answer">
              <p
                data-testid="question-text"
                className="question"
              >
                {activeQuestion.question}
              </p>
              <div
                data-testid="answer-options"
                className="answers"
              >
                { this.renderAnswers()}
              </div>
            </div>
          </main>
        )}
      </div>
    );
  }
}

QuestionCard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
