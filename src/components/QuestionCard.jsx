import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getQuestions } from '../helpers/triviaAPI';

export default class QuestionCard extends Component {
  state = {
    results: [],
    activeIndex: 0,
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

  renderAnswers = () => {
    const { results, activeIndex } = this.state;
    const activeQuestion = results[activeIndex];
    const arrayButtons = [];

    if (activeQuestion.type === 'boolean') {
      arrayButtons.push(
        <button
          data-testid="correct-answer"
        >
          {activeQuestion.correct_answer}
        </button>,
      );

      arrayButtons.push(
        <button data-testid={ `wrong-answer-${0}` }>
          {activeQuestion.incorrect_answers[0]}
        </button>,
      );

      return (this.sortArray(arrayButtons));
    }
    arrayButtons.push(
      <button data-testid="correct-answer">
        {activeQuestion.correct_answer}
      </button>,
    );

    activeQuestion.incorrect_answers.forEach((question, index) => {
      arrayButtons.push(
        <button data-testid={ `wrong-answer-${index}` }>
          {activeQuestion.incorrect_answers[index]}
        </button>,
      );
    });
    console.log(this.sortArray(arrayButtons));
    return this.sortArray(arrayButtons);
  };

  render() {
    const { results, activeIndex } = this.state;
    const activeQuestion = results[activeIndex];
    return (
      <div>
        { activeQuestion
        && (
          <>
            <p data-testid="question-category">{activeQuestion.category}</p>
            <p data-testid="question-text">{activeQuestion.question}</p>
            <p>{activeQuestion.type}</p>
            <div data-testid="answer-options">
              { this.renderAnswers()}
            </div>
          </>
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
