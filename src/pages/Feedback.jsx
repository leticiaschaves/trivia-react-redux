import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Feedback extends Component {
  initialPage = () => {
    const { history } = this.props;
    history.push('/');
  };

  rankingPage = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    return (
      <div>
        <Header />
        <main>
          <p data-testid="feedback-text">
            Could be better...
          </p>
          <p data-testid="feedback-text">
            Well done!
          </p>
          <div>
            <input
              type="button"
              label="Play Again"
              value="Play Again"
              data-testid="btn-play-again"
              onClick={ this.initialPage }
            />
            <input
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

Feedback.propTypes = {
  history: PropTypes.object,
}.isRequired;
