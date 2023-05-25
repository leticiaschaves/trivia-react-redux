import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetScore } from '../redux/actions';
import './Feedback.css';

class Feedback extends Component {
  initialPage = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  rankingPage = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const numberAssertions = 3;
    return (
      <div>
        <Header />
        <main
          className="feedback"
        >
          {
            (assertions < numberAssertions)
              ? <p data-testid="feedback-text">Could be better...</p>
              : <p data-testid="feedback-text">Well Done!</p>
          }
          <h3 data-testid="feedback-total-score">{ score }</h3>
          <h3 data-testid="feedback-total-question">{ assertions }</h3>
          <div className="btn-container">
            <input
              className="btn-feedback"
              type="button"
              label="Play Again"
              value="Play Again"
              data-testid="btn-play-again"
              onClick={ this.initialPage }
            />
            <input
              className="btn-feedback"
              type="button"
              label="Ranking"
              value="Ranking"
              data-testid="btn-ranking"
              onClick={ this.rankingPage }
            />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
});

Feedback.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
