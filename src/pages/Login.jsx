import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { getToken } from '../helpers/triviaAPI';
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
    const { history } = this.props;
    // const { email } = this.state;
    localStorage.setItem('token', await getToken());
    history.push('/game');
  };

  settings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <main className="page">
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
              className="input-player-name"
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
              className="input-email"
              name="email"
              placeholder="e-mail"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            disabled={ isDisabled }
            data-testid="btn-play"
            className="play"
            onClick={ this.playGame }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            className="setts"
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
