import React, { Component } from 'react';
import '../Style.scss';

class SubComponent extends Component {
  render() {
    const {cnt} = this.props;
    return (
      <div id='sub'>
          <h2>서브 컴포넌트</h2>
          <h1>{ cnt }</h1>
      </div>
    );
  }
}

export default SubComponent;