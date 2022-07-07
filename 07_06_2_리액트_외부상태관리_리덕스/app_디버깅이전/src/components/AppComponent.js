import React, { Component } from 'react';
import ButtonComponent from './ButtonComponent';
import '../Style.scss';

class AppComponent extends Component {
  render() {
    const {store} = this.props;
    return (
      <div>
        <h1>상위 컴포넌트</h1>
        <h2>{ store.getState().data.cnt }</h2>
        <ButtonComponent />

      </div>
    );
  }
}

export default AppComponent;