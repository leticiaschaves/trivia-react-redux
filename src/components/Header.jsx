import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGravatar } from '../helpers/getGravatar';
import './Header.css';

class Header extends Component {
  state = {
    urlGravatar: '',
  };

  async componentDidMount() {
    const { gravatarEmail } = this.props;
    const urlGravatar = await getGravatar(await gravatarEmail);
    console.log(urlGravatar);
    this.setState({
      urlGravatar,
    });
  }

  render() {
    const { name } = this.props;
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
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  gravatarEmail: globalState.player.gravatarEmail,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
