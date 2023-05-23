import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGravatar } from '../helpers/getGravatar';

class Header extends Component {
  state = {
    urlGravatar: '',
  };

  async componentDidMount() {
    const { gravatarEmail } = this.props;
    const urlGravatar = await getGravatar(gravatarEmail);
    this.setState({
      urlGravatar,
    });
  }

  render() {
    const { name } = this.props;
    const { urlGravatar } = this.state;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ urlGravatar }
          alt={ name }
        />
        <h3 data-testid="header-player-name">{ name }</h3>
        <p data-testid="header-score">0</p>
      </div>
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
