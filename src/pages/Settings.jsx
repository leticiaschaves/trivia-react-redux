import React, { Component } from 'react';
import './Settings.css';

export default class Settings extends Component {
  render() {
    return (
      <div>
        <h1
          data-testid="settings-title"
          className="settings-container"
        >
          Configurações
        </h1>
      </div>
    );
  }
}
