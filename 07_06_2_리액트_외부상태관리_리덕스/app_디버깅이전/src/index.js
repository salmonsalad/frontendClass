import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style.scss';
import AppComponent from './components/AppComponent';
//1. 리덕스(Redux)로 스토어(Strore) 생성(Create)하기
//2. 리듀서스(Reducers)폴더 만들기와 index.js 만들기
import { createStrore } from 'redux';
import reducers from './reducers';
const store = createStrore(reducers); //스토어(store) 생성

const root = ReactDOM.createRoot(document.getElementById('root'));
const listener = () => { //반드시 랜더함수를 감싸준다.
  root.render(    
      <AppComponent store={store} />
  );
}
store.subscribe(listener); //섭스크립(구독자)가 스토어가 변경되면 즉시 리스너메서드 호출실행
listener();


