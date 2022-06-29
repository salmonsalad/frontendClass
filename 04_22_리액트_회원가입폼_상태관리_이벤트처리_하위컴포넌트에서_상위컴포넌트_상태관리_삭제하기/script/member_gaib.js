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
    
    // 로컬스토레이지에 저장하기
    // localStorage.length; //전체길이
    // localStorage.key(0~length);
    // localStorage.setItem(키(key), 키값(Value)) //데이터(문자열) 저장하기
    // localStorage.getItem(키(key)) //데이터 가져오기
    // localStorage.removeItem(키(key)) //데이터 삭제하기
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

    // 데이터저장: 객체형식저장(Object)
    // 로컬스토레이지는 객체형식을 저장 못한다.
    // 그래서 문자열형식(JSON.stringfy())으로 변경을 해야한다.
    // 자동증가: this.state.번호+1; 다음번호

    //초기화: 다음 입력값을 위해서 입력상자를 비워야한다.
    //       그리고 번호는 1씩 증가

    
    this.setState({아이디:''});
    this.setState({비밀번호:''});
    this.setState({이름:''});
    this.setState({이메일:''});
    this.refId.current.focus();  //입력 위치에서 포커싱

    // Ref : 초기화하고 커서가 아이디에서 깜빡깜빡 포커스(아이디.focus())를 맞춘다.
    //1. DOM 요소를 생성해서 등록한다. root.변수생성 this.refId  = React.createRef();
    //2. input 선택자 요소에 등록 연결(ref=this.refId)
    //3. 초기화 위치에 포커싱( this.refId.current.focus(); )
   
   
  }

  memberListLoad = () => {

    let 멤버 = [];
    for(let i=0; i<localStorage.length; i++){
       멤버.push( JSON.parse(localStorage.getItem(localStorage.key(i)))  ); 
    }

    //가공 처리 정렬
    
    //하위폼에서 상위 상태관리 삭제


    this.setState({
        회원: 멤버
    })

    //AutoIncrement : AI
    let max = 0;
    for(let i=0; i<localStorage.length; i++){
        if( max < Number(localStorage.key(i)) ){
            max = Number(localStorage.key(i));
        }
    }
    console.log('max : ',  max );
    this.setState({번호: max+1 }); //자동증가

  }




  //컴포넌트 디드 마운트
  componentDidMount(){ 
    
    this.memberListLoad();

    // 데이터 가져오기
    // console.log( localStorage.getItem(1) );
    // console.log( localStorage.getItem(2) );
    // console.log( localStorage.getItem(3) );
    // console.log( localStorage.getItem('member-1') );
    // console.log( localStorage.getItem( localStorage.key(0) ) );

    // 키 key() 가져오기
    // console.log( localStorage.key(0) );
    // console.log( localStorage.key(1) );
    // console.log( localStorage.key(2) );
    // console.log( localStorage.key(3) );
    // console.log( localStorage.key(4) );
    // console.log( localStorage.key(5) );
    // console.log( localStorage.key(6) );
    // console.log( localStorage.key(7) );

    //for(let i=0; i<localStorage.length; i++){
      //console.log( JSON.parse( localStorage.getItem(localStorage.key(i)) ) );
    //}

    // 상태관리 멤버변수 배열에 저장하기전에 
    // 임시 배열을 만들어서 저장하고
    // 그리고 임시 배열데이터를 
    // 한번에 상태관리 멤버변수 배열에 저장한다.

  }

  // 삭제함수
  // onClickDelete=(e, bun)=>{
  //   e.preventDefault();
  //   localStorage.removeItem( bun );
  //   this.memberListLoad();  //모든데이터 변경 업데이트 출력정보 출력
  // }

  onClickDeletefn = () => {
    alert('상위컴포넌트의 onClickDeletefn')
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

          <ListComponent 회원={this.state.회원}  fn={this.onClickDeletefn} />

      </div>
    );
  }
}




class ListComponent extends React.Component {
  render() {

    //상위 함수를 내려 받아서 사용
    this.props.fn();


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

