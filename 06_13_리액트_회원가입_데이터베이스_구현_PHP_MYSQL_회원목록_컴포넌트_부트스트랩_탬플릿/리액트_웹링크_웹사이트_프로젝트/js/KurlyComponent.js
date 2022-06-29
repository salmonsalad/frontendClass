
class KurlyComponent extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        회원: [], //데이터베이스 데이터 가져와서 저장 보관할 배열 객체
        아이디: '',
        아이디ok: false,
        아이디중복확인: false,
        비밀번호: '',
        비밀번호1ok: false,
        비밀번호2ok: false,
        비밀번호3ok: false,
        비밀번호확인: '',
        이름: '',
        이메일: '',
        이메일ok: false,

        휴대폰인증: '',
        휴대폰: '',
        휴대폰ok: false,
        인증키: '123456',

        isTimerOpen: true, //카운트타이머 
        isPhoneOkOpen: false,
        isPhoneOkClass: true,
        disabled1: false,  
        disabled2: false,
        setId: 0,

        minutes: 2,
        seconds: 59,
        counterStart: false,

        우편번호:'',
        주소1: '',
        주소2: '',
        주소: '',

        성별: '선택안함', //라디오버튼

        생년:'',
        생월:'',
        생일:'',
        생년월일: '',


        추가입력사항: '',  //라디오버튼
        isAddInputBoxShow: false, //추가입력박스 
        addInputPlaceHolder:'',
        추가입력상자:'', //추가입력상자 입력값
       
       
        약관동의: [],     //체크박스 다중선택 저장 객체 배열
        isAddressOn: false,  //주소검색을 클릭하면 true로 변환 그럼 주소검색창이 열린다.
        isAddrInputShow: false,  //주소검색을 클릭하면 true로 변환 그럼 주소검색창이 열린다.
        
        showId: false, //아이디의 가이드텍스트 show        
        isClassId:'',  //클래스를 '' : true : false

        showPw: false, //비밀번호의 가이드텍스트 show   
        isClassPw1:'', //클래스를 '' : true : false
        isClassPw2:'',
        isClassPw3:'',
        
        showPwRe: false, //비밀번호확인  
        isClassPwRe:'',
        
        isClassEmail:'', //이메일
        
        isModalOpen : false, //모달창 show & hide
        modalText : '',  //아이디/이메일/인증번호받기 가이드 텍스트
        
        isPhoneClass: false, //휴대폰 버튼 클래스


        //생년월일 가이드 텍스트
        showBirthDay: false, //show hide
        isClassBirthDay:'', //'',true, false
        birthDayGuideText:'', //가이드텍스트 여러가지 내용

      }
  }

  //아이디 가이드 텍스트 보여주기
  onMouseDown=(e)=>{
    this.setState({showId: true});
  }

  //입력값의 입력 제한(정규표현식)
  //6장이상  {6,}
  //영문필수 +
  //숫자선택 *
  //공백사용불가 [^\s]
  onChangeId=(value)=>{
    this.setState({아이디: value});   
    this.inputIdtext=value; //전역변수

    const regExp = /(?=.*[A-Za-z])+(?=.*[0-9])*[^\s][A-Za-z0-9]{6,}/g;
    if(value===''){
      this.setState({
        isClassId: '',
        아이디ok: false
      });      
    }
    else{
        if(regExp.test(value)){
          this.setState({
            isClassId: true,
            아이디ok: true
          });
        }
        else{
          this.setState({
            isClassId: false,
            아이디ok: false
          });
        }
    }

  }


  //아이디 중복확인 반복처리문
  //1. 아이디에 입력값 === 저장된 아이디와 비교
  //2. 로컬스토레이지(데이터베이스) 데이터 전체 추출
  //3. 추출한 데이터에서 아이디만 추출한다.
  //4. 반복처리 비교하교 같은 아이디가 있다면 true 로 변환
  //5. 결과가 true 이면 등록된 아이디 입니다.
  //6. 결과가 false 이면 사용가능한 아이디 입니다.

  //중복확인 아이디 클릭 모달 이벤트
  onClickIdModalEvent=(e)=>{
      e.preventDefault();

      this.axiosGet(); //데이터베이스 데이터 가져오기

      this.setState({
        isModalOpen: true,
        아이디중복확인: true
      });
      if(this.state.아이디===''){
        this.setState({
          modalText: '아이디를 입력해 주세요.',
          아이디ok: false,
        })
      }
      else{
          if(this.state.isClassId===false){ //아이디 정규표현식이 결과가 false 인경우
            this.setState({
              modalText: '아이디는 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다',
              아이디ok: false,
            })
          }
          else{
           
              // 디버깅 
              // db 정보와 키보드로 입력된 현재 입력값인 아이디로 비교
              let imsiDb = [];
                  // for(let i=0; i<localStorage.length; i++){
                  //   imsiDb.push(  JSON.parse(localStorage.getItem(localStorage.key(i))) );
                  // }
                  imsiDb = this.state.회원; //데이터베이스 데이터를 이용 비교하도록 저장

                  // 같은 아이디가 있으면 true 발생 
                  // 같은 아이디가 없으면 false 발생 
                  let result = imsiDb.map((item)=>item.아이디===this.inputIdtext);
                      if(result.includes(true)){ //중복된 아이디 있다 true 포함됨
                          this.setState({
                            modalText: '중복된 아이디 입니다.',
                            아이디ok: false,
                          })
                      }
                      else{ //
                        this.setState({
                          modalText: '사용가능한 아이디 입니다.',
                          아이디ok: true,
                        })
                      }


          }
      }
  }


  //모달 닫기 이벤트
  onClickModalClose=(e)=>{
    e.preventDefault();
    this.setState({isModalOpen: false});
  }









  //가이드 텍스트
  onFocusPw=(e)=>{
    this.setState({showPw: true});
  }

  //정규표현식
  //1, 10자이상
  //2, ((?=.*[영문])+ 그리고 ((?=.*[숫자])+|(?=.*[특수문자])+)+)[^\s] 2개이상 조합[영문숫자특수문자]{10,}
  //3, 연속 같은 숫자 사용불가 /(.)\1\1/ 3회

  onChangePw=(value)=>{
    this.setState({비밀번호: value});
    
    const regExp1 = /.{10,}/;
    const regExp2 = /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%&*-_])+)+)[^\s][A-Za-z0-9!@#$%&*-_]{10,}/;
    const regExp3 = /(.)\1\1/;

    if(value===''){
      this.setState({
        isClassPw1: '',
        비밀번호ok: false
      });
    }
    else{
        if(regExp1.test(value)){
          this.setState({
            isClassPw1: true,
            비밀번호1ok: true
          });
        }
        else{
          this.setState({
            isClassPw1: false,
            비밀번호1ok: false
          });
        }
    }

    if(value===''){
      this.setState({
        isClassPw2: '',
        비밀번호2ok: false
      });
    }
    else{
        if(regExp2.test(value)){
          this.setState({
            isClassPw2: true,
            비밀번호2ok: true
          });
        }
        else{
          this.setState({
            isClassPw2: false,
            비밀번호2ok: false
          });
        }
    }

    if(value===''){
      this.setState({
        isClassPw3: '',
        비밀번호3ok: false
      });
    }
    else{
        if(regExp3.test(value)===false){
          this.setState({
            isClassPw3: true,
            비밀번호3ok: true
          });
        }
        else{
          this.setState({
            isClassPw3: false,
            비밀번호3ok: false
          });
        }
    }

  }

  //가이드텍스트 show
  onFocusPwRe=()=>{
    this.setState({showPwRe: true});
  }

  //비밀번호와 동일한 번호
  onChangePwRe=(value)=>{
    this.setState({비밀번호확인: value});

    //입력된 비밀번화와 === 비밀번화확인을 비교

    if(value===''){
      this.setState({isClassPwRe: ''});
    }
    else{
       if(this.state.비밀번호===value){
        this.setState({isClassPwRe: true});
       } 
       else{
        this.setState({isClassPwRe: false});
       }  
    }
  }

  onChangeName=(value)=>{
    
    //영문, 한글, 공백만 입력 나머지는 모두 자동 삭제
    // .test()  true & false
    // 문자열.replace(정규표현식, '')  정규표현식이 true 이면  변경('') 삭제

    this.setState({이름: value.replace(/[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, '')  });


  }

  onChangeEmail=(value)=>{
    this.emailValue = value;  //전역변수
    this.inputEmailtext = value; //현재 입력 이메일 전역변수

    this.setState({이메일: value});

    const regExp = /^[A-Za-z0-9]([\-\_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([\-\_\.]?[A-Za-z0-9])*.[A-Za-z]{2,3}$/;

    if(value===''){
      this.setState({
        isClassEmail: '',
        이메일ok: false
      });
    }
    else{
       if(regExp.test(value)===true){
        this.setState({
          isClassEmail: true,
          이메일ok: true
        });
       } 
       else{
        this.setState({
          isClassEmail: false,
          이메일ok: false
        });
       }  
    }


  }
  
  //중복확인 이메일 클릭 모달 이벤트
  onClickEmailModalEvent=(e)=>{
      e.preventDefault();
      const regExp = /^[A-Za-z0-9]([\-\_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([\-\_\.]?[A-Za-z0-9])*.[A-Za-z]{2,3}$/;

      this.axiosGet(); //데이터베이스 데이터 가져오기

      //모달창 오픈  
      this.setState({
        isModalOpen: true
      });

      if(this.emailValue===''){
        this.setState({
          modalText: '이메일을 입력해 주세요.',
          이메일ok: false
        })
      }
      else{
          if( regExp.test(this.emailValue)===false ){ //아이디 정규표현식이 결과가 false 인경우
              this.setState({
                modalText: '잘못된 이메일 형식입니다.',
                이메일ok: false
              })
          }
          else{ //이메일 정상


              // 디버깅 
              // db 정보와 키보드로 입력된 현재 입력값인 아이디로 비교
              let imsiDb = [];
                  // for(let i=0; i<localStorage.length; i++){
                  //   imsiDb.push(  JSON.parse(localStorage.getItem(localStorage.key(i))) );
                  // }

                  imsiDb = this.state.회원; //db

                  // 같은 아이디가 있으면 true 발생 
                  // 같은 아이디가 없으면 false 발생 
                  let result = imsiDb.map((item)=>item.이메일===this.inputEmailtext);
                      if(result.includes(true)){ //중복된 이메일 있다 true 포함됨
                          this.setState({
                            modalText: '중복된 이메일 입니다.',
                            이메일ok: false,
                          })
                      }
                      else{ //
                        this.setState({
                          modalText: '사용가능한 이메일 입니다.',
                          이메일ok: true,
                        })
                      }

          }
      }
  }



  onChangePhone=(value)=>{
    this.phoneValue = value;
    let result = value.replace(/[^0-9]/g, '');

    this.setState({휴대폰: result });

    //휴대폰 번호가 10이상이면 우측에 인증번호받기 버튼이 보인다.
    if( value.length >= 10 ){
       this.setState({isPhoneClass: true });
    }
    else {
      this.setState({isPhoneClass: false });
    }

    //휴대폰 번호 정규표현식
    // 010 7942 5305
  }

  onChangePhoneOk=(value)=>{
    this.setState({휴대폰인증: value});
  }



  //휴대폰 인증번호 받기 클릭 이벤트
  onClickPhoneEvent=(e)=>{
    e.preventDefault();
    // 휴대폰 번호 입력상자가 빈값이면 버튼은 클릭이 취소된다.
    if(this.phoneValue!==undefined){
        if(this.phoneValue.length < 10 ){
          return;
        }
        else{
            if( !/^01[016789]{1}[0-9]{3,4}[0-9]{4}$/g.test(this.state.휴대폰) ){      
              this.setState({
                  휴대폰ok: false,
                  isModalOpen: true, //모달 열기
                  modalText: '잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.' //가이드 텍스트
              })
              return;
            }
            else{
              this.setState({
                isModalOpen: true, //모달 열기
                modalText: '인증번호가 전송 되었습니다.', //가이드 텍스트
                휴대폰ok: true,
                isPhoneOkOpen: true,  //휴대폰 인증 입력상자 보이기
                //타이머 함수 호출;
                counterStart: true,  //타이머 동작
                disabled1: true
              });
              this.counterTimer();
            }
        } 
    }
  }

  //인증번호 확인 클릭 이벤트
  onClickPhoneOkEvent=(e)=>{
    e.preventDefault();
    
    if(this.state.휴대폰인증===this.state.인증키){
        this.setState({
          isModalOpen: true, //모달 열기
          modalText: '인증번호이 완료되었습니다.', //가이드 텍스트  
          isTimerOpen: false,     //카운터타이머 숨기기 
          disabled2: true,
          isPhoneOkClass: false,
          휴대폰: this.state.휴대폰.replace(/^(01[016789]{1})([0-9]{3,4})([0-9]{4})$/g, '$1-$2-$3'), 
        });
        clearInterval(this.state.setId);
    }
    else{
        this.setState({
          isModalOpen: true, //모달 열기
          modalText: '인증번호를 확인하세요.',
          isTimerOpen: true,
          disabled2: false
        });
    }

  }


  //타이머 함수
  counterTimer(){

    //반드시 화살표 함수 사용
    let setId2 = setInterval(()=>{
        
      //초 0~59 분 2
      this.setState({seconds: this.state.seconds-1})

      if( this.state.seconds<=0 ){
          this.setState({
            seconds: 59,
            minutes: this.state.minutes-1  //1분 감소
          }); //1분경과
          if( this.state.minutes<=0 ){
              clearInterval( setId2 );
              this.setState({
                seconds: 0,
                minutes: 0
              }); //1분경과
          }
      }  
    },300);

    this.setState({setId: setId2});

  }

  // 컴포넌트 디드 마운트
  // 렌더링 이후에 동작하는 메서드
  componentDidMount(){
    this.state.counterStart && this.counterTimer();
  }

  //카카오(daum) 주소검색 메인함수
  daumAddressSearch=()=>{

      const addrfn=(data)=>{
        this.onChangeAddress1(data.zonecode, data.address);
      }

      new daum.Postcode({  //새로운 생성자 생성 this
          oncomplete: function(data) {
              //data는 사용자가 선택한 주소 정보를 담고 있는 객체이며, 상세 설명은 아래 목록에서 확인하실 수 있습니다.
              addrfn(data);
          }
      }).open();

  }

  //함수를 이용 매개변수 값에 주소(Address)가 전달된다. 
  onChangeZip=(zip)=>{
    this.setState({우편번호: zip});
  }

  onChangeAddress1=(zip, value)=>{
    this.setState({주소1: value});
    this.onChangeZip(zip);
    this.setState({isAddressOn: false}); //검색이 완료되면 다시초기화
    this.setState({isAddrInputShow: true}); //재검색버튼이보이고 우편번호, 주솝1, 주소2 모두 보인다.

  }

  onChangeAddress2=(value)=>{
    this.setState({주소2: value});
  }


  // 주소검색버튼클릭이벤트
  onClickAddress=(e)=>{
    e.preventDefault();
    //열기
    this.setState({isAddressOn: true});
    alert('클릭');
    this.daumAddressSearch(); //주소검색 메인함수 호출
  }


  onChangeGender=(value)=>{
    this.setState({성별: value});
  }

  //////////////////////////////////////////////////////
  // 생년월일 체크 함수
  //////////////////////////////////////////////////////

    //1 생년
    //1900 ~ 2000
    //1999 ~ 2999
    //const regExp = /(?:1[0-9][0-9][0-9]|2[0-9][0-9][0-9])/g;    
    //const regExp = /^(?:1\d\d\d|2\d\d\d)$/g;
    //console.log(  regExp.test(value) );

    //2. 생월
    //1-12
    //const regExp = /^(?:0?[1-9]|1[012])$/g;
    //console.log(  regExp.test(value) );

    //3. 생일
    //01-31  01 10 20 30
    //3-1. const regExp = /^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;
    //     console.log(  regExp.test(value) );
    //3-2. 생일자의 말일을 정확히 체크해야한다.

    //4. 단 년, 월, 일 모두 입력제한 조건을 만족한 경우에 아래의
    //   3가지 조건을 마지막 조건으로 구현핸다.
    //4-1. 미래의 생년월일 가입불가
    //4-2. 만 14세미만 가입불가
    //4-3. 만 100세 초과 가입불가
  
    //5. 생년월일 저장
    //   this.setState({생년월일: `${this.state.생년}-${this.state.생월}-${this.state.생일}` });

    birthDayCheckEventFn=(z)=>{    
      const {생년, 생월, 생일} = this.state;
      const lastDate = new Date(생년, 생월, 0).getDate();  //0 => 말일  , 1 => 다음달 첫날
      const nowYear = new Date().getFullYear();
      const nowMonth = new Date().getMonth()+1; // 0 ~ 11
      const nowDate = new Date().getDate();           
      const nowToday = new Date(nowYear, nowMonth, nowDate); //현재년월일 변수
      const nowToday14 = new Date(nowYear-14, nowMonth, nowDate); //현재년월일 변수
      const nowToday100 = new Date(nowYear-100, nowMonth, nowDate); //현재년월일 변수
      const birthDay = new Date(생년, 생월, 생일);            //생년월일 변수

      //년 월 일 입력상자 모두(and == &&) 빈칸이면 포커스인아웃 이벤트 발생 취소한다.
      if( 생년==='' &&  생월==='' && 생일===''  ){
         return;
      }
      else{
        //생년을 체크
        if( /^(?:1[9][0-9][0-9]|2[0-9][0-9][0-9])$/g.test(생년)===false ){  
            //가이드텍스트 show 
            this.setState({
                showBirthDay: true, //show => true  hide => false
                isClassBirthDay: false, //'' => '' ,true => green, false= > red
                birthDayGuideText: '태어난 년도 4자리를 정확하게 입력해주세요.', //가이드텍스트 여러가지 내용
            })         
            return;
        }
        else{
            //가이드텍스트 hide 초기화
            this.setState({
                showBirthDay: false, //show => true  hide => false
                isClassBirthDay: '', //'' => '' ,true => green, false= > red
                birthDayGuideText: '', //가이드텍스트 여러가지 내용
            })   

            //생월
            if(/^(?:0?[1-9]|1[012])$/g.test(생월)===false){ //false
              //가이드텍스트 show   
              this.setState({
                  showBirthDay: true, //show => true  hide => false
                  isClassBirthDay: false, //'' => '' ,true => green, false= > red
                  birthDayGuideText: '태어난 월을 정확하게 입력해주세요.', //가이드텍스트 여러가지 내용
              })    
              return;
            }
            else{ //true
                //가이드텍스트 hide 초기화
                this.setState({
                    showBirthDay: false, //show => true  hide => false
                    isClassBirthDay: '', //'' => '' ,true => green, false= > red
                    birthDayGuideText: '', //가이드텍스트 여러가지 내용
                })   

                //생일
                if(/^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g.test(생일)===false  || 생일 > lastDate  ){ //false
                  //가이드텍스트 show  
                  this.setState({
                      showBirthDay: true, //show => true  hide => false
                      isClassBirthDay: false, //'' => '' ,true => green, false= > red
                      birthDayGuideText: '태어난 일을 정확하게 입력해주세요.', //가이드텍스트 여러가지 내용
                  })    
                  return;
                }
                else{ //true
                  //가이드텍스트 hide   
                  this.setState({
                      showBirthDay: false, //show => true  hide => false
                      isClassBirthDay: '', //'' => '' ,true => green, false= > red
                      birthDayGuideText: '', //가이드텍스트 여러가지 내용
                  })   

                  //날짜 객체를 활용 new Date() 객체 사용
                  //4. 3가지의 조건문을 마지막으로 구현
                  //4-1. 미래의 생년월일 가입불가
                  //4-2. 만 14세미만 가입불가
                  //4-3. 100세 초과 가입불가

                  //4-1. 미래의 생년월일 가입불가
                  //     매래와 현재의 날짜 셋팅 변수필요
                  if( birthDay > nowToday ){ //미래
                      //가이드텍스트 show  
                      this.setState({
                          showBirthDay: true, //show => true  hide => false
                          isClassBirthDay: false, //'' => '' ,true => green, false= > red
                          birthDayGuideText: '생년월일이 미래로 입력되었어요.', //가이드텍스트 여러가지 내용
                      })    
                      return;             
                  }
                  else {
                      //가이드텍스트 hide   
                      this.setState({
                          showBirthDay: false, //show => true  hide => false
                          isClassBirthDay: '', //'' => '' ,true => green, false= > red
                          birthDayGuideText: '', //가이드텍스트 여러가지 내용
                      })   
                  }


                  //4-2. 만 14세미만 가입불가
                  if( birthDay > nowToday14 ){ //
                    //가이드텍스트 show  
                    this.setState({
                        showBirthDay: true, //show => true  hide => false
                        isClassBirthDay: false, //'' => '' ,true => green, false= > red
                        birthDayGuideText: '만 14세 미만은 가입이 불가합니다.', //가이드텍스트 여러가지 내용
                    })    
                    return;             
                  }
                  else {
                      //가이드텍스트 hide   
                      this.setState({
                          showBirthDay: false, //show => true  hide => false
                          isClassBirthDay: '', //'' => '' ,true => green, false= > red
                          birthDayGuideText: '', //가이드텍스트 여러가지 내용
                      })   
                  }


                  //4-3. 100초과 가입불가
                  if( birthDay < nowToday100 ){ //
                    //가이드텍스트 show  
                    this.setState({
                        showBirthDay: true, //show => true  hide => false
                        isClassBirthDay: false, //'' => '' ,true => green, false= > red
                        birthDayGuideText: '생년월일을 다시 확인해주세요.', //가이드텍스트 여러가지 내용
                    })    
                    return;             
                  }
                  else {
                      //가이드텍스트 hide   
                      this.setState({
                          showBirthDay: false, //show => true  hide => false
                          isClassBirthDay: '', //'' => '' ,true => green, false= > red
                          birthDayGuideText: '', //가이드텍스트 여러가지 내용
                      })   
                  }

                  
                }
            }
        }

      }

    }

    //포커스아웃이벤트함수
    //순수자바스크립에서 
    //onFocus / onFocusIn => 리액트에서 사용 불가 : 그래서 onFocus 를 사용
    //onBlur / onFocusOut => 리액트에서 사용 불가 : 그래서 onBlur 를 사용
    
    //입력상자를 떠나면발생
    onBlurEvent=(z)=>{
      this.birthDayCheckEventFn(z);
    }

    //입력상자에 포커스발생
    onFocusEvent=(z)=>{
      this.birthDayCheckEventFn(z);
    }

    //onChange  키보드로 입력시 발생되는 이벤트
    onChangeYear=(value)=>{
      this.setState({생년: value});
    }

    onChangeMonth=(value)=>{
      this.setState({생월: value});
    }

    onChangeDate=(value)=>{
      this.setState({생일: value});
    }

  //////////////////////////////////////////////////////////////

  //추가 입력사항 라디오 버튼 체인지 이벤트    
  onChangeChoocheon=(value,id)=>{

    if(id==='event'){
        this.setState({
          추가입력사항: value,
          isAddInputBoxShow: true, 
          addInputPlaceHolder:'참여 이벤트명을 입력해주세요.',
        });
    }
    else{
        this.setState({
          추가입력사항: value,
          isAddInputBoxShow: true, 
          addInputPlaceHolder:'참여 추천인 아이디를 입력해주세요.',
        });
    }
  }

  //추가입력상자 입력값
  onChangeAddInputBox=(value)=>{
      this.setState({
          추가입력상자:value
      });
  }


  // 약관동의 체크박스 이벤트 8개(1개 전체체크) (한개씩 7개 일반체크(Single 체크))
  // 체크상태(true)이면 약관동의에 저장(누적하고)
  // 체크상태가 아니면(false)이면 약관동의 배열안에  
  // 배열값만 제외(삭제)한다.
  
  onChangeCheckEvent=(checked, value)=>{
    let result ='';


    if(checked){ //true

      //조건문 : SNS / 이메일
      if(value==='SNS' &&  this.state.약관동의.includes('이메일') ){
        this.setState({약관동의: [...this.state.약관동의, 'SNS', '무료배송, 할인쿠폰 등 혜택/정보 수신 동의']})
      }
      else if(value==='이메일' &&  this.state.약관동의.includes('SNS') ){
        this.setState({약관동의: [...this.state.약관동의, '이메일', '무료배송, 할인쿠폰 등 혜택/정보 수신 동의']})
      }
      else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의' &&  this.state.약관동의.includes('SNS')  &&  !this.state.약관동의.includes('이메일') ){
        this.setState({약관동의: [...this.state.약관동의, '이메일', value ]})
      }
      else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의' &&  this.state.약관동의.includes('이메일')  &&  !this.state.약관동의.includes('SNS') ){
        this.setState({약관동의: [...this.state.약관동의, 'SNS', value ]})
      }
      else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의' &&  this.state.약관동의.includes('이메일')  &&  this.state.약관동의.includes('SNS') ){
        this.setState({약관동의: [...this.state.약관동의, value ]})
      }
      else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의' &&  !this.state.약관동의.includes('이메일')  &&  !this.state.약관동의.includes('SNS') ){
        this.setState({약관동의: [...this.state.약관동의, '이메일', 'SNS',  value ]})
      }
      else{
        this.setState({약관동의: [...this.state.약관동의, value]}); //배열에 데이터 추가하기(누적하기) ES5 취미.push(value)
      }
      
    }
    else{ //false 삭제(제외)

      if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의'){
        result = this.state.약관동의.filter((item) => item!==value);
        result = result.filter((item) => item!=='SNS');
        result = result.filter((item) => item!=='이메일');
      }
      else if(value==='SNS'){
        result = this.state.약관동의.filter((item) => item!==value);
        result = result.filter((item) => item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의');
      }
      else if(value==='이메일'){
        result = this.state.약관동의.filter((item) => item!==value);
        result = result.filter((item) => item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의');
      }
      else{
        result = this.state.약관동의.filter((item) => item!==value);   
      }

      this.setState({약관동의: result });
    }
      
  }

  //모두 체크
  onChangeCheckEventAll=(checked, value)=>{

    //모두처크가 선택되면 전체 선택한다.
    let imsi = [
        `이용약관동의(필수)`,
        `개인정보 수집·이용 동의(필수)`,
        `개인정보 수집·이용 동의(선택)`,
        `무료배송, 할인쿠폰 등 혜택/정보 수신 동의`,
        `SNS`,
        `이메일`,
        `본인은 만 14세 이상입니다.(필수)`
    ];

    if(checked){
      this.setState({약관동의: imsi}); //전체체크내용저장
    }
    else{
      this.setState({약관동의: [] });  //모두삭제: 빈배열은 초기화
    }
  }


  //1. 아이디 ~ 이용약관 까지 모두 검증하고 
  //2. 검증된 데이터만 전송합니다. 저장
  //3. 초기화 -> 다음 입력을 위해서 모든 속성을 초기화
  //4. 중복데이터 검증: 아이디 이메일

  onSubmitEvent=(e)=>{
    e.preventDefault();

    const { 
            아이디, 비밀번호, 이름, 이메일, 휴대폰, 우편번호, 주소1, 주소2, 주소, 성별, 생년, 생월, 생일, 추가입력사항, 추가입력상자, 약관동의,
            아이디ok, 비밀번호1ok, 비밀번호2ok, 비밀번호3ok, 이메일ok, 휴대폰ok, 아이디중복확인
    } = this.state;      

    if(아이디==='' || 비밀번호 === '' || 이름 === '' ||  이메일==='' || 휴대폰==='' || 주소1==='' || 주소2==='' ){
        if(아이디===''){
          this.setState({
            isModalOpen : true,
            modalText : '아이디를 입력해주세요.'
          })
        }
        else if(비밀번호===''){
          this.setState({
            isModalOpen : true,
            modalText : '비밀번호를 입력해주세요.'
          })
        }
        else if(이름===''){
          this.setState({
            isModalOpen : true,
            modalText : '이름을 입력해주세요.'
          })
        }
        else if(이메일===''){
          this.setState({
            isModalOpen : true,
            modalText : '이메일을 입력해주세요.'
          })
        }
        else if(휴대폰===''){
          this.setState({
            isModalOpen : true,
            modalText : '휴대폰을 입력해주세요.'
          })
        }
        else if(주소===''){
          this.setState({
            isModalOpen : true,
            modalText : '주소를 입력해주세요.'
          })
        }        
        return;
    }
    else {

        console.log( '아이디ok' , 아이디ok  );
        console.log( '비밀번호1ok' , 비밀번호1ok  );
        console.log( '비밀번호2ok' , 비밀번호2ok  );
        console.log( '비밀번호3ok' , 비밀번호3ok  );
        console.log( '이메일ok' , 이메일ok  );
        console.log( '휴대폰ok' , 휴대폰ok  );
        console.log( '아이디중복확인' , 아이디중복확인  );

        //입력값 규칙을 어기면 입력취소
        if( 아이디ok===false || 비밀번호1ok===false ||  비밀번호2ok===false ||  비밀번호3ok===false ||  이메일ok===false ||  휴대폰ok===false ||  아이디중복확인===false  ){
          
          if(아이디ok===false){
            this.setState({
              isModalOpen : true,
              modalText : '아이디는 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다'
            })
          }        
          else if(이메일ok===false){
            this.setState({
              isModalOpen : true,
              modalText : '잘못된 이메일 형식입니다.'
            })
          }
          return;
        }//아니면 정상 데이터 전송
        else {

            let cnt=0;
            //약관동의 필수 3개 체크 해야 전송
            for(let i=0; i<약관동의.length; i++){
                if( 약관동의[i].indexOf('필수') >=0 ){ //찾았다면 못찾으면 -1
                   cnt++; 
                }
            }
            
            console.log( cnt );

            if(cnt < 3){
              this.setState({
                isModalOpen : true,
                modalText : '약관동의 필수 선택사항 선택하세요.'
              })
              console.log('카운트 ', cnt );
              return;
            }

            else { //모든 조건 만족하고 그리고 전송 저장

                  //1. 임시객체 생성 
                  //2. JSON.stringfy() 문자열 형식으로 변환
                  const 가입회원정보 = {
                        // 고유번호로 저장 : 자동증가번호 AUTO_INCREMENT(AI)
                        아이디: 아이디, //문자열 String 20 바차 VARCHAR(20)
                        비밀번호: 비밀번호, //문자열 String 20
                        이름: 이름, //문자열 String 50
                        이메일: 이메일, //문자열 String 100
                        휴대폰: 휴대폰, //문자열 String 13
                        주소: `${우편번호} ${주소1} ${주소2}`, //문자열 String 100
                        성별: 성별, //문자열 String 4
                        생년월일: `${생년}-${생월}-${생일}`, //날짜 Date
                        추가입력사항: `${추가입력사항}: ${추가입력상자}`, //문자열 String 250
                        약관동의: 약관동의, //문자열 String, 1500
                        가입일자: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` //날짜 Date
                  }

                  console.log( 가입회원정보 );
                  //저장
                  localStorage.setItem(가입회원정보.아이디, JSON.stringify(가입회원정보));

                  //리액트 <-> API(REACT/AXIOS 또는 JQUERY/AJAX) <-> 외부 서버사이드 스크립트언어PHP) <-> DB 저장 
                  //AXIOS API : Request(요청) -> Response(응답)
                  //폼데이터 보내기 POST
                  //외부데이터 가져오기 GET

                  //AXIOS는 
                  //폼데이터 객체를 생성해야 가능
                  let formData = new FormData();
                      formData.append('id', 아이디);
                      formData.append('pw', 비밀번호);
                      formData.append('name', 이름);
                      formData.append('email', 이메일);
                      formData.append('hp', 휴대폰);
                      formData.append('addr', `${우편번호} ${주소1} ${주소2}`);
                      formData.append('gender', 성별);
                      formData.append('birth', `${생년}-${생월}-${생일}`);
                      formData.append('addinput', `${추가입력사항}: ${추가입력상자}`);
                      formData.append('agrement', 약관동의);
                      formData.append('joindate', `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`);

                  //AXIOS API 데이터 전송
                  //axios({}).then(()=>{}).catch(()=>{});
                  //비동기실 전송방식
                  axios({
                      url:'./insert_table_kerly.php',
                      method:'POST',
                      data: formData
                  })
                  .then((response)=>{
                    // console.log('AXIOS API 성공 response ', response);
                    // console.log('AXIOS API 성공 response.data ', response.data);
                    
                    this.setState({
                      isModalOpen : true,
                      modalText : '마켓컬리 회원 가입을 감사드립니다.'
                    })

                    this.axiosGet();  //DB 데이터 가져오기

                  })
                  .catch((error)=>{
                      // console.log('AXIOS API 실패', error);
                      this.setState({
                        isModalOpen : true,
                        modalText : 'AXIOS API 실패'
                      })
                  });




                  //초기화
                  this.setState({
                        아이디: '',
                        아이디ok: false,
                        아이디중복확인: false,
                        비밀번호: '',
                        비밀번호1ok: false,
                        비밀번호2ok: false,
                        비밀번호3ok: false,
                        비밀번호확인: '',
                        이름: '',
                        이름ok: false,
                        이메일: '',
                        이메일ok: false,
                        휴대폰: '',
                        휴대폰ok: false,
                        우편번호:'',
                        주소1: '',
                        주소2: '',
                        주소: '',
                        성별: '선택안함', //라디오버튼
                        생년:'',
                        생월:'',
                        생일:'',
                        생년월일: '',
                        추가입력사항: '',  //라디오버튼
                        약관동의: [],     //체크박스 다중선택 저장 객체 배열
                        isAddressOn: false,  //주소검색을 클릭하면 true로 변환 그럼 주소검색창이 열린다.
                        isAddrInputShow: false,  //주소검색을 클릭하면 true로 변환 그럼 주소검색창이 열린다.
                        showId: false, //아이디의 가이드텍스트 show        
                        isClassId:'',  //클래스를 '' : true : false
                        showPw: false, //비밀번호의 가이드텍스트 show   
                        isClassPw1:'', //클래스를 '' : true : false
                        isClassPw2:'',
                        isClassPw3:'',
                        showPwRe: false, //비밀번호확인  
                        isClassPwRe:'',
                        isClassEmail:'', //이메일
                        isModalOpen : false, //모달창 show & hide
                        modalText : '',  //아이디/이메일/인증번호받기 가이드 텍스트
                        isPhoneClass: false, //휴대폰 버튼 클래스
                        showBirthDay: false, //show hide
                        isClassBirthDay:'', //'',true, false
                        birthDayGuideText:'', //가이드텍스트 여러가지 내용
                  });
            }
        }
    }

  }

  // 데이터베이스 데이터 가져오기 
  // 언제? 리액트 웹사이트 로딩시
  // AXIOS API 통해서 GET 방식
  // 가져와서 constructor() => 회원[] 멤버변수 에 저장
  
  // 로딩시 실행하는 메서드 
  // 비동기식은 반드시 화살표 함수 사용
  axiosGet=()=>{
      axios({
          url:'./select_table_kerly.php',
          method:'GET'
      })
      .then((res)=>{ //가져오기 성공
          this.setState({
            회원: res.data
          })
      })
      .catch((error)=>{
          console.log('AXIOS 실패 ', error );
      });
  }
  
  componentDidMount(){
    this.axiosGet();
  }
  // 라이프사이클  컨스트럭터 constructor() -> 멤버변수 / 프롭스 props -> 랜더 render() 
  // -> 화면에 데이터가 뿌려진다 마운트된다. -> 컴포넌트 디드 마운트 componentDidMount()


  render() {

    return (
      <div id='kurly'>
        <div id='main'>
        <form onSubmit={this.onSubmitEvent} id='fo'>
          <div className='title'>
              <h1><img src='./img/logo_x2.png' alt='logo'/></h1>
              <h2>회원가입</h2>
          </div>

          <div className='content'>
            
              <h4><span><i>*</i>필수입력사항</span></h4>            
              <ul>
                <li>
                    <div className='gap'>
                      <div className='label-box'>
                        <span>아이디<i>*</i></span>
                      </div>                   
                      <div className='input-box'>
                        <input 
                        type='text'
                        maxLength='20'
                        className='inputText' 
                        id='inputId' 
                        placeholder='6자 이상의 영문 혹인 영문과 숫자를 조합'                                               
                        onChange={(e)=>this.onChangeId(e.target.value)}
                        onFocus={(e)=>this.onMouseDown(e)}
                        value={this.state.아이디}
                        />
                        <button className='w120-btn'  onClick={this.onClickIdModalEvent}>중복확인</button>
                        {
                         this.state.showId && (
                            <div>
                              <p className={ //클래스 추가 3항연산자
                                (
                                  this.state.isClassId===''?'':(this.state.isClassId===true?'green':'red')
                                )
                              }>6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                              <p>아이디 중복확인</p>
                            </div>
                          )
                        }
                      </div>
                    </div>
                </li>
                <li>
                    <div className='gap'>
                      <div className='label-box'>
                        <span>비밀번호<i>*</i></span>
                      </div>                   
                      <div className='input-box'>
                        <input 
                        type='password' 
                        maxLength='20'
                        className='inputText' 
                        id='inputPw' 
                        placeholder='비밀번호를 입력해주세요'
                        onChange={(e)=>this.onChangePw(e.target.value)}
                        onFocus={(e)=>this.onFocusPw(e)}
                        value={this.state.비밀번호}
                        />
                        {
                        this.state.showPw && (
                            <div>
                              <p className={
                                (
                                  this.state.isClassPw1===''?'':(this.state.isClassPw1===true?'green':'red')
                                )
                              }                        
                              >10자 이상 입력</p>
                              <p className={
                                (
                                  this.state.isClassPw2===''?'':(this.state.isClassPw2===true?'green':'red')
                                )
                              }>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                              <p className={
                                (
                                  this.state.isClassPw3===''?'':(this.state.isClassPw3===true?'green':'red')
                                )
                              }
                              >동일한 숫자 3개 이상 연속 사용 불가</p>
                            </div>
                          )
                        }
                      </div>
                    </div>
                </li>
                <li>
                    <div className='gap'>
                      <div className='label-box'>
                        <span>비밀번호확인<i>*</i></span>
                      </div>                   
                      <div className='input-box'>
                        <input 
                        type='password' 
                        maxLength='20'
                        className='inputText' 
                        id='inputPwRe' 
                        placeholder='비밀번호를 한번더 입력해주세요'  
                        onChange={(e)=>this.onChangePwRe(e.target.value)}
                        onFocus={(e)=>this.onFocusPwRe(e)}
                        value={this.state.비밀번호확인}
                        />
                        {
                          this.state.showPwRe && (
                            <div>
                              <p className={
                                      (
                                        this.state.isClassPwRe===''?'':(this.state.isClassPwRe===true?'green':'red')
                                      )
                              }>동일한 비밀번호를 입력해주세요.</p>
                            </div>
                          )
                        } 
                      </div>
                    </div>
                </li>
                <li>
                    <div className='gap'>
                      <div className='label-box'>
                        <span>이름<i>*</i></span>
                      </div>                   
                      <div className='input-box'>
                        <input 
                        type='text' 
                        className='inputText' 
                        id='inputName' 
                        placeholder='이름을 입력해주세요'  
                        onChange={(e)=>this.onChangeName(e.target.value)}
                        value={this.state.이름}
                        />
                        
                      </div>
                    </div>
                </li>
                <li>
                    <div className='gap'>
                      <div className='label-box'>
                        <span>이메일<i>*</i></span>
                      </div>                   
                      <div className='input-box'>
                        <input 
                        type='email' 
                        className='inputText' 
                        id='inputEmail'  
                        placeholder='예: marketkurly@kurly.com' 
                        onChange={(e)=>this.onChangeEmail(e.target.value)}
                        value={this.state.이메일}
                        />
                        <button  onClick={this.onClickEmailModalEvent} className='w120-btn'>중복확인</button>
                      </div>
                    </div>
                </li>
                <li>
                    <div className='gap'>
                      <div className='label-box'>
                        <span>휴대폰<i>*</i></span>
                      </div>                   
                      <div className='input-box'>
                        <input 
                        type='text' 
                        maxLength='11'
                        className='inputText' 
                        id='inputPhone' 
                        placeholder='숫자만 입력해주세요'
                        onChange={(e)=>this.onChangePhone(e.target.value)} 
                        value={this.state.휴대폰}
                        disabled={this.disabled1}
                        />
                        <button disabled={this.disabled1}  onClick={this.onClickPhoneEvent}  className={`w120-btn ${this.state.isPhoneClass ? '':'phone' }`}>인증번호 받기</button>
                        
                        {/* 인증번호확인 */}
                        {
                          this.state.isPhoneOkOpen && (
                            <div>
                              <input 
                              type='text' 
                              maxLength='6'
                              className='inputText phoneok-input' 
                              id='inputPhone' 
                              placeholder='인증번호를 입력하세요'
                              onChange={(e)=>this.onChangePhoneOk(e.target.value)} 
                              value={this.state.휴대폰인증}
                              disabled={this.disabled2} 
                              />
                              <button disabled={this.disabled2}  onClick={this.onClickPhoneOkEvent}  className={`w120-btn phonok-btn ${this.state.isPhoneOkClass ? '':'phone' }`}>인증번호 확인</button>
                              {
                                this.state.isTimerOpen && (
                                  <span className='counter-timer-box'>{this.state.minutes}:{this.state.seconds<10?`0${this.state.seconds}`:this.state.seconds}</span>
                                )
                              }
                            </div>                              
                          )
                        }
                      </div>
                    </div>
                </li>
                <li>
                    <div className='gap'>
                      <div className='label-box address'>
                        <span>주소<i>*</i></span>
                      </div>                   
                      <div className='input-box'>
                      {
                        this.state.isAddrInputShow &&  (
                          <div>
                              <input 
                              type='text' 
                              className='inputText' 
                              id='inputZip' 
                              placeholder='우편번호'  
                              onChange={(e)=>this.onChangeZip(e.target.value)}
                              value={this.state.우편번호}
                              />

                              <input 
                              type='text' 
                              className='inputText' 
                              id='inputAddress1' 
                              placeholder='주소입력1'  
                              onChange={(e)=>this.onChangeAddress1(e.target.value)}
                              value={this.state.주소1}
                              />
                            
                              <input 
                              style={{margin:'5px 0'}}
                              type='text' 
                              className='inputText' 
                              id='inputAddress2' 
                              placeholder='세부 주소입력2'  
                              onChange={(e)=>this.onChangeAddress2(e.target.value)}
                              value={this.state.주소2}
                              />
                          </div>
                        )
                      }    
                        <button 
                        type='button' 
                        onClick={this.onClickAddress}  
                        className={`inputText addr
                        ${this.state.isAddrInputShow?' on':''}
                        `} 
                        id='inputAddress'>
                          <img src='./img/_ico_search.svg' alt='검색'/>
                          <span>
                          {
                            this.state.isAddrInputShow===true?`주소재검색`:`주소검색`
                          }
                          </span>
                        </button>
                        <span className='address-info'>배송지에 따라 상품 정보가 달라질 수 있습니다.</span>


                        <div id='postcode'>

                          {
                            // 참이면 주소검색창 열린다.
                            this.state.isAddressOn && (
                                <div></div>
                            )

                          }
                            
                        </div>

                      </div>
                    </div>
                </li>
                <li>
                    <div className='gap'>
                      <div className='label-box'>
                        <span>성별</span>
                      </div>                   
                      <div className='input-box radio-box'>
                        <label>
                          <input 
                          type='radio' 
                          onChange={(e)=>this.onChangeGender(e.target.value)} 
                          checked={this.state.성별.includes(`남자`)} 
                          value={`남자`} 
                          />
                          <span>남자</span>
                        </label>
                        <label>
                          <input 
                          type='radio' 
                          onChange={(e)=>this.onChangeGender(e.target.value)} 
                          checked={this.state.성별.includes(`여자`)} 
                          value={`여자`} 
                          />
                          <span>여자</span>
                        </label>
                        <label>
                          <input 
                          type='radio' 
                          onChange={(e)=>this.onChangeGender(e.target.value)} 
                          checked={this.state.성별.includes(`선택안함`)} 
                          value={`선택안함`} 
                          />
                          <span>선택안함</span>
                        </label>
                      </div>
                    </div>
                </li>
                <li>
                    <div className='gap'>
                      <div className='label-box'>
                        <span>생년월일</span>
                      </div>                   
                      <div className='input-box'>
                          <ul  className='date-box' tabIndex='0'>
                            <li>
                              <input 
                              type='text'
                              maxLength='4' 
                              id='year' 
                              placeholder='YYYY'
                              onChange={(e)=>this.onChangeYear(e.target.value)}
                              value={this.state.생년}
                              onBlur={(e)=>this.onBlurEvent(e)}
                              onFocus={(e)=>this.onFocusEvent(e)}
                              />
                            </li>
                            <li>
                              <span>/</span>
                            </li>
                            <li>
                              <input 
                              type='text' 
                              maxLength='2'
                              id='month' 
                              placeholder='MM'
                              onChange={(e)=>this.onChangeMonth(e.target.value)}
                              value={this.state.생월}
                              onBlur={(e)=>this.onBlurEvent(e)}
                              onFocus={(e)=>this.onFocusEvent(e)}                             
                              />
                            </li>
                            <li>
                              <span>/</span>
                            </li>
                            <li>
                              <input 
                              type='text' 
                              maxLength='2'
                              id='date' 
                              placeholder='DD'
                              onChange={(e)=>this.onChangeDate(e.target.value)}
                              value={this.state.생일}
                              onBlur={(e)=>this.onBlurEvent(e)}
                              onFocus={(e)=>this.onFocusEvent(e)}                            
                              />
                            </li>
                          </ul>

                            {
                                this.state.showBirthDay && (
                                  <div>
                                    <p className={ //클래스 추가 3항연산자
                                      (
                                        this.state.isClassBirthDay===''?'':(this.state.isClassBirthDay===true?'green':'red')
                                      )
                                    }>{this.state.birthDayGuideText}</p>
                                  </div>
                                )
                            }

                      </div>
                    </div>
                </li>
                <li className='add-input-list'>
                    <div className='gap'>
                      <div className='label-box'>
                        <span>추가입력 사항</span>
                      </div>                   
                      <div className='input-box radio-box'>
                        <label>
                          <input 
                          type='radio'
                          id='id'  
                          onChange={(e)=>this.onChangeChoocheon(e.target.value, e.target.id)}
                          checked={this.state.추가입력사항.includes(`추천인 아이디`)}
                          value={`추천인 아이디`}
                          />
                          <span>추천인 아이디</span>
                        </label>
                        <label>
                          <input 
                          type='radio' 
                          id='event'  
                          onChange={(e)=>this.onChangeChoocheon(e.target.value, e.target.id)}
                          checked={this.state.추가입력사항.includes(`참여 이벤트명`)}
                          value={`참여 이벤트명`}                        
                          />
                          <span>참여 이벤트명</span>
                        </label>
                        {      
                            this.state.isAddInputBoxShow && (
                              <div className='add-input-box'>
                                <input 
                                type='text' 
                                className='inputText' 
                                id='addInputBox' 
                                placeholder={this.state.addInputPlaceHolder}  
                                onChange={(e)=>this.onChangeAddInputBox(e.target.value)}
                                value={this.state.추가입력상자}
                                />
                                <p>
                                추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                                가입 이후, 수정이 불가합니다.<br/>
                                대소문자 및 띄어쓰기에 유의해주세요.
                                </p>
                              </div>      
                            )
                          }
                      </div>

                    </div>
                </li> 

                <li>
                  <hr />
                </li>

                <li className='service'>
                    <div className='gap'>
                      <div className='label-box'>
                        <span>이용약관동의<i>*</i></span>
                      </div>                   
                      <div className='input-box check-box'>
                        
                        <dl>
                            <dt>
                                <label>
                                  <input 
                                  type='checkbox'
                                  onChange={(e)=>this.onChangeCheckEventAll(e.target.checked, e.target.value)}
                                  checked={this.state.약관동의.length >=7 ? true:false}
                                  value={`전체 동의합니다.`}
                                  />
                                  <span>전체 동의합니다.</span>
                                </label>
                                <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                            </dt>
                            <dd>
                                <label>
                                  <input 
                                  type='checkbox'
                                  id='chk1' 
                                  onChange={(e)=>this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                  checked={this.state.약관동의.includes(`이용약관동의(필수)`)}
                                  value={`이용약관동의(필수)`}
                                  />
                                  <span>이용약관동의(필수)</span>
                                </label>
                                <span>
                                  <a href='#!'>이용약관보기 <i>&gt;</i></a>
                                </span>
                            </dd>
                            <dd>
                                <label>
                                  <input 
                                  type='checkbox' 
                                  id='chk2' 
                                  onChange={(e)=>this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                  checked={this.state.약관동의.includes(`개인정보 수집·이용 동의(필수)`)}
                                  value={`개인정보 수집·이용 동의(필수)`}                                  
                                  />
                                  <span>개인정보 수집·이용 동의(필수)</span>
                                </label>
                                <span>
                                  <a href='#!'>이용약관보기 <i>&gt;</i></a>
                                </span>
                            </dd>
                            <dd>
                                <label>
                                  <input 
                                  type='checkbox' 
                                  id='chk3' 
                                  onChange={(e)=>this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                  checked={this.state.약관동의.includes(`개인정보 수집·이용 동의(선택)`)}
                                  value={`개인정보 수집·이용 동의(선택)`}                                    
                                  />
                                  <span>개인정보 수집·이용 동의(선택)</span>
                                </label>
                                <span>
                                  <a href='#!'>이용약관보기 <i>&gt;</i></a>
                                </span>
                            </dd>
                            <dd>
                                <label>
                                <input 
                                  type='checkbox' 
                                  id='chk4' 
                                  onChange={(e)=>this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                  checked={this.state.약관동의.includes(`무료배송, 할인쿠폰 등 혜택/정보 수신 동의`)}
                                  value={`무료배송, 할인쿠폰 등 혜택/정보 수신 동의`}                                    
                                  />
                                  <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의</span>
                                </label>
                                <div className='sub-checkbox'>
                                    <div>
                                      <label>
                                      <input 
                                      type='checkbox' 
                                      id='chk5' 
                                      onChange={(e)=>this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                      checked={this.state.약관동의.includes(`SNS`)}
                                      value={`SNS`}                                    
                                      />
                                        <span>SNS</span>
                                      </label>
                                      <label>
                                      <input 
                                      type='checkbox' 
                                      id='chk6' 
                                      onChange={(e)=>this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                      checked={this.state.약관동의.includes(`이메일`)}
                                      value={`이메일`}                                    
                                      />
                                        <span>이메일</span>
                                      </label>
                                    </div>
                                    <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                </div>
                            </dd>
                            <dd>
                                <label>
                                <input 
                                type='checkbox' 
                                id='chk7' 
                                onChange={(e)=>this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                checked={this.state.약관동의.includes(`본인은 만 14세 이상입니다.(필수)`)}
                                value={`본인은 만 14세 이상입니다.(필수)`}                                    
                                />
                                  <span>본인은 만 14세 이상입니다.(필수)</span>
                                </label>
                            </dd>
                        </dl>
                      
                      </div>
                    </div>
                </li>
              </ul>
              
          </div>

          <div className='button-box'>
              <button tepe='submit'>가입하기</button>
          </div>
        </form>

       

        {/* 모달창 중복확인(아이디/이메일)/인증번호받기 */}
        {
          this.state.isModalOpen && (
            <div className='modal'>
                <div className='container'>
                  <div className='content-box'>
                      <ul>
                        <li>
                              <h2>알림메시지</h2>
                              <span>
                                <a href='#!' onClick={this.onClickModalClose} title='Close'><img src='./img/ico_close_999_32x32.png' alt=''/></a>
                              </span>
                        </li>
                        <li>
                              <p>{this.state.modalText}</p>
                        </li>
                      </ul>
                  </div>
                  <div className='button-box'>
                      <button className='ok-btn'  onClick={this.onClickModalClose}  title='확인'>확인</button>
                  </div>
                </div>
            </div>
          )
        }
        </div>

        <MemberComponent 회원= {this.state.회원} />

      </div> 
    );
  }
}


class MemberComponent extends React.Component {
  render() {
    return (
      <div id='memberList' className='container'>
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
      </div>
    );
  }
}

ReactDOM.render(
    <KurlyComponent />,
  document.getElementById('root')
);
