import React, { Component } from 'react';
import SkipComponent from './SkipComponent';
import WrapComponent from './WrapComponent';

class PofoComponent extends Component {
  render() {
    return (
      <div>
          <SkipComponent />
          <WrapComponent />
      </div>
    );
  }
}

export default PofoComponent;