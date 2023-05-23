import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { getToken } from '../helpers/triviaAPI';
import { addEmail, addName } from '../redux/actions';

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
  };

  settings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
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
          onClick={ this.playGame }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          onClick={ this.settings }
        >
          Configurações

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
