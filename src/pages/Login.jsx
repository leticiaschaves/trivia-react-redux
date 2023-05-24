import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { getToken } from '../helpers/triviaAPI';
import { addEmail, addName } from '../redux/actions';
import './Login.css';

class Login extends Component {
  state = {
    isDisabled: true,
    name: '',
    email: '',
  };

  validationBtn = () => {
    const { name, email } = this.state;
    const emailValid = validator.isEmail(email);
    const nameValid = !validator.isEmpty(name);
    this.setState({
      isDisabled: !(emailValid && nameValid),
    });
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validationBtn);
  };

  playGame = async () => {
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    dispatch(addEmail(email));
    dispatch(addName(name));
    localStorage.setItem('token', await getToken());
    history.push('/game');
    localStorage.setItem('token', await getToken());
  };

  settings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <main className="page">
        <h1
          className="game-name"
        >
          Nome do jogo
        </h1>
        <div className="conteiner">
          <h1>Sign in</h1>
          <label
            htmlFor="input-player-name"
          >
            <input
              type="text"
              id="input-player-name"
              name="name"
              data-testid="input-player-name"
              className="input-login"
              placeholder="name"
              onChange={ this.onInputChange }
            />
          </label>

          <label
            htmlFor="email-input"
          >
            <input
              type="email"
              id="input-gravatar-email"
              data-testid="input-gravatar-email"
              className="input-login"
              name="email"
              placeholder="e-mail"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            disabled={ isDisabled }
            className="btn-play"
            data-testid="btn-play"
            onClick={ this.playGame }
            id="btn-play"
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            className="btn"
            onClick={ this.settings }
          >
            Configurações

          </button>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
