import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  state = {
    rankings: [],
  };

  componentDidMount() {
    // buscar o array do localStorage
    const ranking = localStorage.getItem('ranking');
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
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        {
          rankings.map((ranking, index) => (
            <>
              <img
                data-testid="header-profile-picture"
                src={ ranking.gravatarEmail }
                alt={ ranking.name }
              />
              <p
                key={ index }
                data-testid="header-player-name"
              >
                {ranking.name}
                oi
              </p>
              <p
                key={ index }
                data-testid="header-score"
              >
                {ranking.score}
              </p>
            </>
          ))
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
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
