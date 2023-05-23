import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  initialPage = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <div>
          <input
            type="button"
            label="Início"
            value="Início"
            data-testid="btn-go-home"
            onClick={ this.initialPage }
          />
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.object,
}.isRequired;
