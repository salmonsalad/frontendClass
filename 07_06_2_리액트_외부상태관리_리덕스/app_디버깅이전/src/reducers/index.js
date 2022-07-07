import { combineReducers } from 'redux'; //리두싱 함수
import {COUNT} from '../actions';

const initState = { //cnt 객체 속성 값 설정
  cnt: 0
}

const data = (store=initState, action) => {
  if(action.type === COUNT){
    return {
      ...store,
      cnt: store.cnt + 1
    }
  }
  else{
    return store;
  }
}

const App = combineReducers({
  data
});

export default App;