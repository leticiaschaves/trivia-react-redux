import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGravatar } from '../helpers/getGravatar';
import './Header.css';

class Header extends Component {
  state = {
    urlGravatar: '',
  };

  componentDidMount() {
    const { gravatarEmail } = this.props;
    const urlGravatar = getGravatar(gravatarEmail);
    this.setState({
      urlGravatar,
    });
  }

  render() {
    const { name, score } = this.props;
    const { urlGravatar } = this.state;
    return (
      <header
        className="header-container"
      >
        <img
          data-testid="header-profile-picture"
          src={ urlGravatar }
          alt={ name }
          className="header-profile-img"
        />
        {/* <p>{ urlGravatar }</p> */}
        <p
          data-testid="header-player-name"
          className="name"
        >
          { name }
        </p>
        <p
          data-testid="header-score"
          className="score"
        >
          { score }
        </p>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  score: globalState.player.score,
  gravatarEmail: globalState.player.gravatarEmail,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
