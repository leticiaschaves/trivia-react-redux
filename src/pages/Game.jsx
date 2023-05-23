import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getQuestions } from '../helpers/triviaAPI';

export default class Game extends Component {
  async componentDidMount() {
    const token = localStorage.getItem('token');
    const APIdata = await getQuestions(token);
    if (APIdata) {
      console.log(APIdata);
    } else {
      this.logout();
    }
  }

  logout = () => {
    const { history } = this.props;
    localStorage.setItem('token', '');
    history.push('/');
  };

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.object,
  // dispatch: PropTypes.func,
}.isRequired;
