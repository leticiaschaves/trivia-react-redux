import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../helpers/triviaAPI';
import { actionSaveScore } from '../redux/actions';
import './QuestionCard.css';

const ONE_SECOND_MS = 1000;
const THIRTY_SECONDS = 30;
const dificuldade = {
  hard: 3,
  medium: 2,
  easy: 1,
};

class QuestionCard extends Component {
  state = {
    results: [],
    activeIndex: 0,
    isDisabled: false,
    timer: 0,
    timerHandler: '',
    arrayButtons: [],
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const APIdata = await getQuestions(token);
    if (APIdata) {
      this.setState({
        results: [...APIdata.results],
        activeIndex: 0,
        timer: THIRTY_SECONDS,
        timerHandler: setInterval(this.decreaseTimer, ONE_SECOND_MS),
      }, this.getAnswerButtons);
    } else {
      this.logout();
    }
  }

  decreaseTimer = () => {
    const { timer, timerHandler } = this.state;
    if (timer === 0) {
      clearInterval(timerHandler);
      return this.timeOut();
    }
    const newTimer = timer - 1;
    this.setState({ timer: newTimer });
  };

  logout = () => {
    const { history } = this.props;
    localStorage.setItem('token', '');
    history.push('/');
  };

  sortArray = (array) => {
    const half = 0.5;
    return array.sort(() => half - Math.random());
  };

  saveScore = () => {
    const { timer, results, activeIndex } = this.state;
    const { dispatch } = this.props;
    const activeQuestion = results[activeIndex];
    // 10 + (timer * dificuldade);
    const ten = 10;
    const score = ten + (timer * dificuldade[activeQuestion.difficulty]);
    // console.log('SCORE', score);
    dispatch(actionSaveScore(score));
  };

  handleClick = ({ target }) => {
    // console.log('handleClick');
    const { timerHandler, results, activeIndex } = this.state;
    const activeQuestion = results[activeIndex];
    clearInterval(timerHandler);
    // console.log('TEXT CONTENT', target.textContent);
    this.setState((prevState) => ({
      arrayButtons: prevState.arrayButtons.map((elm) => {
        console.log(elm);
        return (
          <button
            key={ elm.key }
            data-testid={ elm.props['data-testid'] }
            className={ elm.key === 'correct' ? 'correct' : 'incorrect' }
          >
            {elm.props.children}
          </button>);
      }),
    }));
    // se acertou, então salva o score
    // habilita botão next
    if (target.textContent === activeQuestion.correct_answer) {
      this.saveScore();
    }
  };

  getAnswerButtons = () => {
    const { results, activeIndex, isDisabled } = this.state;
    const activeQuestion = results[activeIndex];
    const arrayButtons = [];

    if (activeQuestion.type === 'boolean') {
      arrayButtons.push(
        <button
          key="correct"
          data-testid="correct-answer"
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
          onClick={ this.handleClick }
          disabled={ isDisabled }
        >
          {activeQuestion.incorrect_answers[0]}
        </button>,
      );
    } else {
      arrayButtons.push(
        <button
          key="correct"
          data-testid="correct-answer"
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
            onClick={ this.handleClick }
            disabled={ isDisabled }
          >
            {activeQuestion.incorrect_answers[index]}
          </button>,
        );
      });
    }

    this.setState({ arrayButtons: this.sortArray(arrayButtons) });
  };

  timeOut = () => {
    console.log('GAME OVER');
    this.setState((prevState) => ({
      arrayButtons: prevState.arrayButtons.map((elm) => {
        console.log(elm);
        return (
          <button
            key={ elm.key }
            data-testid={ elm.props['data-testid'] }
            className={ elm.key === 'correct' ? 'correct' : 'incorrect' }
            disabled
          >
            {elm.props.children}
          </button>);
      }),
    }));
  };

  render() {
    const { results, activeIndex, timer, arrayButtons } = this.state;
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
              <p>{timer}</p>
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
                { arrayButtons }
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
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(QuestionCard);
