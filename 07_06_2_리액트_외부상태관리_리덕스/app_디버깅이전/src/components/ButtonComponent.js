import React, { Component } from 'react';
import '../Style.scss';
import { count } from '../actions';

class ButtonComponent extends Component {

  countNum = () => {
    const {store} = this.props;
    store.dispatch(count()); //프롭스로 store 권한 디스패치가 리듀서에게 식별자 count() 함수를 전달
  }

  render() {
    return (
      <div>
          <h2>하위 버튼 컴포넌트</h2>
          <button onClick={this.countNum}>Count++</button>
      </div>
    );
  }
}

export default ButtonComponent;