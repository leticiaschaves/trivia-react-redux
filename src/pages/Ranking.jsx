import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Ranking.css';

const decreaseOne = -1;

class Ranking extends Component {
  state = {
    rankings: [],
  };

  componentDidMount() {
    // buscar o array do localStorage
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    this.setState({
      rankings: ranking,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { rankings } = this.state;
    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        {
          rankings.map((ranking, index) => (
            <div
              className="info"
              key={ index }
            >
              <img
                src={ ranking.gravatarEmail }
                alt={ ranking.name }
              />
              <p
                data-testid={ `player-name-${index}` }
              >
                {ranking.name}
              </p>
              <p
                data-testid={ `player-score-${index}` }
              >
                {ranking.score}
              </p>
            </div>
          )).sort((a, b) => {
            if (a.ranking.score > b.ranking.score) {
              return 1;
            }
            if (a.ranking.score < b.ranking.score) {
              return decreaseOne;
            }
            // a must be equal to b
            return 0;
          })
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
          className="go-home-btn"
        >
          Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.object,
}.isRequired;

const mapStateToProps = (globalState) => ({
  name: globalState.name,
  assertions: globalState.assertions,
  score: globalState.score,
  gravatarEmail: globalState.gravatarEmail,
});

export default connect(mapStateToProps)(Ranking);
