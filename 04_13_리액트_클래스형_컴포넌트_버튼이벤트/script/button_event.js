class AppComponent extends React.Component {
  // 클래스의 루트(생성자)영역
  static defaultProps = {
    title: 'AppComponent 타이틀!!!'
  }

  // 상태관리
  constructor(){
      super();
      this.state = {
            arr: [],
            cnt: 0,
            title2: '상태관리에서 타이틀 입니다.'          
      }
  }  

  onClickEventThis = (e) => {
    e.preventDefault();
    alert('번튼4 클래스 컴포넌트 루트영역에서 함수 호출 방식 반드시 this사용');
  }

  render() {
    //구조 분할 할당(비구조화)
    const {title} = this.props;
 
    // 랜더 함수 영역  : 여기에서는 모든 변수 앞에 반드시 변수 선언을 해줘야한다.
    const onClickEvent = (e) => {
          e.preventDefault();
          alert('번튼3 함수 호출 방식');
    }

    return (
      <div id='app'>
          <h1>클래스형 앱 컴포넌트 프롭스 멤버변수 {title}</h1>
          <h1>클래스형 앱 컴포넌트 상태관리 멤버변수 {this.state.title2}</h1>
            {/* 반드시 화살표 함수 사용 */}
           <button onClick={()=>{alert('버튼1 클릭 이벤트')}}>버튼1</button>
           <button 
            onClick={
                (event) => {
                  event.preventDefault();
                  alert('버튼2 클릭 이벤트');
                }
            }
           >버튼2</button>

           {/* 버튼 이벤트 함수생성하고 랜더함수 위치에서 함수 이름만 으로 호출하는 방식 */}
           <button onClick={onClickEvent}>버튼3</button>
           {/* 클래형 컴포넌트 루트영역에서 함수 호출시는 반드시 this 사용 this.함수이름 호출한다. */}
           <button onClick={this.onClickEventThis}>버튼4</button>
      </div>
    );
  }
}

// AppComponent.defaultProps = {
//   title: 'AppComponent 타이틀!!!'
// }




ReactDOM.render(
  <AppComponent />,
  document.getElementById('root')
);





/*
클래스 컴포넌트(파스칼 케이스)
버튼 이벤트
버튼
선택자.버튼등록
선택자에서 코딩 곧바로
클릭이벤트
반드시 카멜케이스 네이밍규칙
onClick={()=>{}}

상태관리 
컨스트럭터(constuctor(){})
슈퍼 super();
this.state() 상태를 멤버변수를 관리(객체구성)
setState() 상태변경
*/
