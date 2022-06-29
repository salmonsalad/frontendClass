import React, { Component } from 'react';
import HeaderComponent from './wrap/HeaderComponent';

class WrapComponent extends Component {
  render() {
    return (
      <div id="wrap">
        <HeaderComponent />

      </div>
    );
  }
}

export default WrapComponent;