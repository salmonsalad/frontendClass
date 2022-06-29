class App extends React.Component {
 
  constructor(props){
     super(props); 
     this.state = {
        아이디:'',
        비밀번호:'',
        이름:'',
        이메일:''
     }
  }

  onChangeId=(e)=>{
    this.setState({  //상태관리 변수 변경 할 때 사용
        아이디: e.target.value 
    });
  }

  onChangePw=(e)=>{
    this.setState({
      비밀번호: e.target.value
    });
  }

  onChangeName=(e)=>{
    this.setState({
      이름: e.target.value
    });
  }

  onChangeEmail=(e)=>{
    this.setState({
      이메일: e.target.value
    });
  }

  //저장하기
  onClickAdd=(e)=>{
    e.preventDefault();
    
    // 로컬스토레이지에 저장하기
    // localStorage.length; //전체길이
    // localStorage.setItem(키(key), 키값(Value)) //데이터(문자열) 저장하기
    // localStorage.getItem(키(key)) //데이터 가져오기
    // localStorage.removeItem(키(key)) //데이터 삭제하기

    localStorage.setItem(`member-${localStorage.length+1}`, `${this.state.아이디},${this.state.비밀번호},${this.state.이름}, ${this.state.이메일}`);
    
  }


  render() {
    return (
      <div id='app'>
          <h1>회원가입</h1>
        <div id='member'>
           <div><input onChange={this.onChangeId} type='text' id='id' value={this.state.아이디} placeholder='Id 입력!'/></div> 
           <div><input onChange={this.onChangePw}  type='password' id='pw' value={this.state.비밀번호}  placeholder='Password 입력!'/></div> 
           <div><input onChange={this.onChangeName} type='text' id='name' value={this.state.이름}   placeholder='Name 입력!' /></div> 
           <div><input onChange={this.onChangeEmail} type='email' id='email' value={this.state.이메일}   placeholder='Email 입력!' /></div> 
           <div><button onClick={this.onClickAdd}>ADD</button></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

