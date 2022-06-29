(()=>{

  // 3. 컴포넌트 : 웹제작에 필요한 섹션(영역) 단위라 생각하면된다.
  // 예] 헤더, 메인, 섹션1, 섹션2 ... 푸터 컴포넌트    
  // 클래스형 컴포넌트 생성 
  // 클래스 이름은 네이밍 규칙 : 파스칼케이스 기법
  // class 클랙스이름       상속(확장) 리액트.컴포넌트 {}
  class HeaderComponent extends React.Component {

    render(){

        const result = this.props.nav.map((item,idx)=>{
              return(
                  <tr>
                    <td style={style.td}>{item.번호}</td>
                    <td style={style.td}>{item.이름}</td>
                    <td style={style.td}>{item.국어}</td>
                    <td style={style.td}>{item.영어}</td>
                    <td style={style.td} >{item.수학}</td>
                  </tr>
              );
        });

        // return{// 리액트는 jsx 태그 탬플릿요소들을 () 소괄호로 묶는다.
        return(// 리액트는 중괄호는 반드시 객체 사용 
              <header id="header">
                  <h1>{this.props.title}</h1>
                  <h1>이름은 {this.props.name}</h1>
                  <div>
                      <ul>
                        <li>이름 : {this.props.nav[0].이름}</li>
                        <li>이름 : {this.props.nav[1].이름}</li>
                        <li>이름 : {this.props.nav[2].이름}</li>
                        <li>이름 : {this.props.nav[3].이름}</li>
                      </ul>
                  </div>

                   <hr />

                   <table  style={{borderCollapse:'collapse', width:'800px', margin:'0 auto'}}>
                      <thead>
                          <tr>
                            <th style={style.th}>번호</th>
                            <th style={style.th}>이름</th>
                            <th style={style.th}>국어</th>
                            <th style={style.th}>영어</th>
                            <th style={style.th}>수학</th>
                          </tr>
                      </thead>                      
                      <tbody>
                            { result }
                      </tbody>  
                   </table> 

                   <Section1Component title={this.props.title2} sungjuk={this.props.nav} />

              </header>
        )
    }
  }

  //하위 컴포넌트 : 주의 React.Component 첫글자 대문자
  class Section1Component extends React.Component {
    render(){

     const { title, sungjuk } = this.props;   //비구조화==구조분할할당

      return(
          <section id='section1'>
              <h2> { title } </h2>
              <p>{ sungjuk[0].번호 }</p>
              <p>{ sungjuk[0].이름 }</p>
              <p>{ sungjuk[0].국어 }</p>
          </section>
      );
    }
  }





  HeaderComponent.defaultProps = {
      title: 'Header Component Title',
      name: 'moonjong',
      nav: [
          {번호:1, 이름:'이순신', 국어:100, 수학:100, 영어:100},
          {번호:2, 이름:'김유신', 국어:80, 수학:100, 영어:100},
          {번호:3, 이름:'류관순', 국어:99, 수학:100, 영어:100},
          {번호:4, 이름:'안중근', 국어:90, 수학:100, 영어:100}
      ],
      title2:'섹션1 컴포넌트 타이틀'
  }

  //변수 선언 반드시 해주세요
  let style = {   
      td: {   
        textAlign: 'center',
        border:'1px solid #ccc',
        height:'40px'
      },
      th: {
        border:'1px solid #ccc',
        height:'45px'
      }
  }


  // 4. 리액트 돔 : 컴포넌트와 돔컨테이너 연동
  // 프롭스(Props) : 프로퍼티스(Properties)
  ReactDOM.render(
      <HeaderComponent />,
      document.getElementById('root')
  );



})()