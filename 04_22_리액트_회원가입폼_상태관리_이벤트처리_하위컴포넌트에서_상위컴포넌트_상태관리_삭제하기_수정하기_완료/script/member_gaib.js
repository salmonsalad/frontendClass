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
        회원: [],
        수정하기: false
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
    
    // 쓰기 Write(저장하기)
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

      
    this.setState({
        아이디:'',
        비밀번호:'',
        이름:'',
        이메일:'',
        수정하기: false
    });

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
    this.setState({ 번호: max+1 }); //자동증가 다음 레코드 번호

  }




  //컴포넌트 디드 마운트
  componentDidMount(){ 
    this.memberListLoad();
  }

  // 삭제함수 => 하위컴포넌트에 내려준다
   onClickDeletefn = (deleteBun) => {
    localStorage.removeItem( deleteBun );
    this.memberListLoad();  //모든데이터 변경 업데이트 출력정보 출력
  }

  // 수정함수 => 하위컴포넌트에 내려준다
  onClickUpdatefn = (updateBun) => {
    //수정할 데이터를 가져오기해야 수정을 할 수 있다.
    let imsiObj = {}
    imsiObj = JSON.parse( localStorage.getItem(updateBun) );

    //수정할 데이터를 가져온 뒤 => 화면에 입력상자에 바인딩 그래야 보고 수정하지요^^
    //입력화면의 입력상자(input)는 이미 state(멤버변수)랑 연결 되어있으니 
    //state값을 변경(setState())해주면 보인다.
    //아래 내용이 화면에 그려진다.
    this.setState({
      번호: updateBun,
      아이디: imsiObj.아이디,
      비밀번호: imsiObj.비밀번호,
      이름: imsiObj.이름,
      이메일: imsiObj.이메일,
      수정하기: true
    });

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
              <div><button type='submit' style={this.state.수정하기 ? style2:style1}>{ this.state.수정하기 ? `UPDATE` : `ADD`  }</button></div>
            </form>
          </div>

          <ListComponent 회원={this.state.회원}  onClickDeletefn={this.onClickDeletefn}  onClickUpdatefn={this.onClickUpdatefn} />

      </div>
    );
  }
}




class ListComponent extends React.Component {
  
  //삭제하기(Delete)
  onClickDelete = (e, bun) =>{
    e.preventDefault();
    //상위컴포넌트에서 내려받은 함수를 사용
    this.props.onClickDeletefn(bun);
  }

  // 수정하기(Update)
  onClickUpdate = (e, bun) => {
    e.preventDefault();
    //상위컴포넌트에서 내려받은 함수를 사용
    this.props.onClickUpdatefn(bun);
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
                <col width='80px' />
                <col width='80px' />
              </colgroup>

              <thead>
                <tr>
                  <th>번호</th>
                  <th>아이디</th>
                  <th>비밀번호</th>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>수정</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                  {
                    // 읽기(목록) Read
                    this.props.회원.map((item)=>{
                        return(
                          <tr key={item.번호}>
                            <td>{item.번호}</td>
                            <td>{item.아이디}</td>
                            <td>{item.비밀번호}</td>
                            <td>{item.이름}</td>
                            <td>{item.이메일}</td>
                            <td><button onClick={(e)=>{this.onClickUpdate(e, item.번호)}}>수정</button></td>
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

const style1 = { //UPDATE
  color: '#069',
  fontSize: '16px'
}
const style2 = { //ADD
  color: '#944',
  fontSize: '16px'
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

