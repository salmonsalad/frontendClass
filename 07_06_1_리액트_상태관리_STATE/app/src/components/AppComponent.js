import React, { Component } from 'react';
import '../Style.scss';
import SubComponent from './SubComponent';

class AppComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      cnt: 0
    }
  }
  render() {
    const {cnt} = this.state;
    const addCountfn = () => {
      this.setState({cnt: cnt+1});
    }
    const subtractCountfn = () => {
      this.setState({cnt: cnt-1});
    }
    return (
      <div id='app'>
          <h1>메인 컴포넌트</h1>          
          <SubComponent cnt={cnt} />

          <button onClick={addCountfn}>+</button>
          <button onClick={subtractCountfn}>-</button>
      </div>
    );
  }
}

export default AppComponent;