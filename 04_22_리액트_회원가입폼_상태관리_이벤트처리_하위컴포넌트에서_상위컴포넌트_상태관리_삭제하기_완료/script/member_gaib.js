class App extends React.Component {
 
  constructor(props){
     super(props); 
     
     this.refId = React.createRef();
     this.state = {
        번호:1,
        아이디:'',
        비밀번호:'',
        이름:'',
        이메일:'',
        회원: []
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
  onSubmitAdd=(e)=>{
    e.preventDefault();
    
    // 로컬스토레이지에 저장될 객체를 임시 생성 사용
    let 멤버 = {
        번호: this.state.번호,
        아이디: this.state.아이디,
        비밀번호: this.state.비밀번호,
        이름: this.state.이름,
        이메일: this.state.이메일
    }

    localStorage.setItem(멤버.번호, JSON.stringify(멤버) );
    this.memberListLoad();

      
    this.setState({아이디:''});
    this.setState({비밀번호:''});
    this.setState({이름:''});
    this.setState({이메일:''});
    this.refId.current.focus();  //입력 위치에서 포커싱
  }

  memberListLoad = () => {

    //반드시 임시 객체를 생성해서 저장하고
    let 멤버 = [];
    for(let i=0; i<localStorage.length; i++){
       멤버.push( JSON.parse(localStorage.getItem(localStorage.key(i)))  ); 
    }

    //그리고 스테이트에 배열에 한번에 저장 변경한다.
    this.setState({
        회원: 멤버
    })

    //AutoIncrement : AI
    // 최대값 알고리즘
    let max = 0;
    for(let i=0; i<localStorage.length; i++){
        if( max < Number(localStorage.key(i)) ){
            max = Number(localStorage.key(i));
        }
    }
    this.setState({번호: max+1 }); //자동증가 다음 레코드 번호

  }




  //컴포넌트 디드 마운트
  componentDidMount(){ 
    this.memberListLoad();
  }

  // 삭제함수
   onClickDeletefn = (deleteBun) => {
    localStorage.removeItem( deleteBun );
    this.memberListLoad();  //모든데이터 변경 업데이트 출력정보 출력
  }



  render() {
    return (
      <div id='app'>
          <h1>회원가입</h1>
          <div id='member'>
            <form onSubmit={this.onSubmitAdd}>
              <div><input ref={this.refId} onChange={this.onChangeId} type='text' id='id' value={this.state.아이디} placeholder='Id 입력!'/></div> 
              <div><input onChange={this.onChangePw}  type='password' id='pw' value={this.state.비밀번호}  placeholder='Password 입력!'/></div> 
              <div><input onChange={this.onChangeName} type='text' id='name' value={this.state.이름}   placeholder='Name 입력!' /></div> 
              <div><input onChange={this.onChangeEmail} type='email' id='email' value={this.state.이메일}   placeholder='Email 입력!' /></div> 
              <div><button type='submit'>ADD</button></div>
            </form>
          </div>

          <ListComponent 회원={this.state.회원}  onClickDeletefn={this.onClickDeletefn} />

      </div>
    );
  }
}




class ListComponent extends React.Component {
  

  onClickDelete = (e, bun) =>{
    e.preventDefault();
    //상위컴포넌트에서 내려받은 함수를 사용
    this.props.onClickDeletefn(bun);
  }

  render() {
    // const onClickDelete = (e, bun) =>{
    //   e.preventDefault();
    //   //상위컴포넌트에서 내려받은 함수를 사용
    //   this.props.onClickDeletefn(bun);
    // }
    return (
       <div className='list-box'>
          <table>
              <colgroup>
                <col width='60px' />
                <col width='100px' />
                <col width='100px' />
                <col width='100px' />
                <col width='300px' />
                <col width='100px' />
              </colgroup>

              <thead>
                <tr>
                  <th>번호</th>
                  <th>아이디</th>
                  <th>비밀번호</th>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                  {
                    this.props.회원.map((item)=>{
                        return(
                          <tr key={item.번호}>
                            <td>{item.번호}</td>
                            <td>{item.아이디}</td>
                            <td>{item.비밀번호}</td>
                            <td>{item.이름}</td>
                            <td>{item.이메일}</td>
                            <td><button onClick={(e)=>{this.onClickDelete(e, item.번호)}}>삭제</button></td>
                          </tr>
                        )
                    })
                  }
              </tbody>
          </table>  
       </div>
    );
  }
}




ReactDOM.render(
  <App />,
  document.getElementById('root')
);

