import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { getToken } from '../helpers/triviaAPI';

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

  handleClick = async () => {
    const { history } = this.props;
    // const { email } = this.state;
    localStorage.setItem('token', await getToken());
    history.push('/game');
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
          onClick={ this.handleClick }
        >
          Play
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
