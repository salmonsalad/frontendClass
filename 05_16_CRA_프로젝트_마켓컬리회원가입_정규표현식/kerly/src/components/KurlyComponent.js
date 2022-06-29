import React, { Component } from 'react';
import Postcode from './Postcode';
// import '../scss/Kurly.scss';

class KurlyComponent extends Component {

  constructor(props){
      super(props);
      this.state = {
        아이디: '',
        비밀번호: '',
        비밀번호확인: '',
        이름: '',
        이메일: '',
        휴대폰: '',

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
        
        isPhoneClass: false //휴대폰 버튼 클래스
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

    const regExp = /(?=.*[A-Za-z])+(?=.*[0-9])*[^\s][A-Za-z0-9]{6,}/g;
    if(value===''){
      this.setState({isClassId: ''});
    }
    else{
        if(regExp.test(value)){
          this.setState({isClassId: true});
        }
        else{
          this.setState({isClassId: false});
        }
    }

  }

  //중복확인 아이디 클릭 모달 이벤트
  onClickIdModalEvent=(e)=>{
      e.preventDefault();
      this.setState({isModalOpen: true});
      if(this.state.아이디===''){
        this.setState({modalText: '아이디를 입력해 주세요.'})
      }
      else{
          if(this.state.isClassId===false){ //아이디 정규표현식이 결과가 false 인경우
            this.setState({modalText: '아이디는 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다'})
          }
      }
  }
  //중복확인 이메일 클릭 모달 이벤트
  onClickEmailModalEvent=(e)=>{
      e.preventDefault();
      this.setState({isModalOpen: true});
      if(this.state.이메일===''){
        this.setState({modalText: '이메일을 입력해 주세요.'})
      }
      else{
          if(this.state.isClassEmail===false){ //아이디 정규표현식이 결과가 false 인경우
            this.setState({modalText: '잘못된 이메일 형식입니다.'})
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
      this.setState({isClassPw1: ''});
    }
    else{
        if(regExp1.test(value)){
          this.setState({isClassPw1: true});
        }
        else{
          this.setState({isClassPw1: false});
        }
    }

    if(value===''){
      this.setState({isClassPw2: ''});
    }
    else{
        if(regExp2.test(value)){
          this.setState({isClassPw2: true});
        }
        else{
          this.setState({isClassPw2: false});
        }
    }

    if(value===''){
      this.setState({isClassPw3: ''});
    }
    else{
        if(regExp3.test(value)===false){
          this.setState({isClassPw3: true});
        }
        else{
          this.setState({isClassPw3: false});
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
    this.setState({이메일: value});
    //2938383-jong@naver.com
    //moonjong@naver.com
    //moonjong@yahoo.co.kr
    //moon_jong@yahoo29.co.kr
    //moon.jong@green35_.co.kr
    const regExp = /^[A-Za-z0-9-_]+(.[A-Za-z0-9-_])*@[A-Za-z0-9-_]+(.[A-Za-z])*.[A-Za-z]{2,3}$/;

    if(value===''){
      this.setState({isClassEmail: ''});
    }
    else{
       if(regExp.test(value)){
        this.setState({isClassEmail: true});
       } 
       else{
        this.setState({isClassEmail: false});
       }  
    }


  }

  onChangePhone=(value)=>{
    
    let result = value.replace(/[^0-9]/g, '');

    this.setState({휴대폰: result });

    //휴대폰 번호가 10이상이면 우측에 인증번호받기 버튼이 보인다.
    if( this.state.휴대폰.length >= 10 ){
       this.setState({isPhoneClass: true });
    }
    else {
      this.setState({isPhoneClass: false });
    }

    //휴대폰 번호 정규표현식
    // 010 7942 5305
    // 010 794  5305
    // 011 794  5305
    // 016 794  5305
    // 017 794  5305
    // 018 794  5305
    // 019 794  5305


  }

  onClickPhoneEvent=(e)=>{
    e.preventDefault();
    // 입력이 완료되고 난 후 인증번호 버튼을 클릭해서 실행
    if( !/^01[016789]{1}[0-9]{3,4}[0-9]{4}$/g.test(this.state.휴대폰) ){      
      this.setState({
          isModalOpen: true, //모달 열기
          modalText: '잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.' //가이드 텍스트
      })
      return;
    }
  }


  //함수를 이용 매개변수 값에 주소(Address)가 전달된다. 
  onChangeAddress1=(zip, value)=>{
    this.setState({주소1: value});
    this.setState({우편번호: zip});
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
  }


  onChangeGender=(value)=>{
    this.setState({성별: value});
  }

  onChangeYear=(value)=>{
    this.setState({생년: value});
    //1900 ~ 2000
    //1999 ~ 2999
    // const regExp = /(?:1[0-9][0-9][0-9]|2[0-9][0-9][0-9])/g;
    const regExp = /^(?:1\d\d\d|2\d\d\d)$/g;
    console.log(  regExp.test(value) );
  }

  onChangeMonth=(value)=>{
    this.setState({생월: value});
    //1-12
    const regExp = /^(?:0?[1-9]|1[012])$/g;
    console.log(  regExp.test(value) );
  }

  onChangeDate=(value)=>{
    this.setState({생일: value});
    //01-31  01 10 20 30
    const regExp = /^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;
    console.log(  regExp.test(value) );
  }

  onChangeChoocheon=(value)=>{
    this.setState({추가입력사항: value});
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
        `이용약관동의 (필수)`,
        `개인정보 수집·이용 동의(필수)`,
        `개인정보 수집·이용 동의(선택)`,
        `무료배송, 할인쿠폰 등 혜택/정보 수신 동의`,
        `SNS`,
        `이메일`,
        `본인은 만 14세 이상입니다.`
    ];

    if(checked){
      this.setState({약관동의: imsi}); //전체체크내용저장
    }
    else{
      this.setState({약관동의: [] });  //모두삭제: 빈배열은 초기화
    }


  }



  onSubmitEvent=(e)=>{
    e.preventDefault();
    
    //생년월일
    this.setState({생년월일: `${this.state.생년}-${this.state.생월}-${this.state.생일}` });

  }

  render() {

    return (
      <div id='kurly'>

        <form onSubmit={this.onSubmitEvent} id='fo'>
          <div className='title'>
              <h1><img src='../../img/logo_x2.png' alt='logo'/></h1>
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
                            <>
                              <p className={ //클래스 추가 3항연산자
                                (
                                  this.state.isClassId===''?'':(this.state.isClassId===true?'green':'red')
                                )
                              }>6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                              <p>아이디 중복확인</p>
                            </>
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
                            <>
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
                            </>
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
                            <p className={
                                    (
                                      this.state.isClassPwRe===''?'':(this.state.isClassPwRe===true?'green':'red')
                                    )
                            }>동일한 비밀번호를 입력해주세요.</p>
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
                        />
                        <button onClick={this.onClickPhoneEvent}  className={`w120-btn ${this.state.isPhoneClass ? '':'phone' }`}>인증번호 받기</button>
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
                          <>
                              <input 
                              type='text' 
                              className='inputText' 
                              id='inputZip' 
                              placeholder='우편번호'  
                              // onChange={(e)=>this.onChangeZip(e.target.value)}
                              value={this.state.우편번호}
                              />

                              <input 
                              type='text' 
                              className='inputText' 
                              id='inputAddress1' 
                              placeholder='주소입력1'  
                              // onChange={(e)=>this.onChangeAddress1(e.target.value)}
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
                          </>
                        )
                      }    
                        <button 
                        type='button' 
                        onClick={this.onClickAddress}  
                        className={`inputText addr
                        ${this.state.isAddrInputShow?' on':''}
                        `} 
                        id='inputAddress'>
                          <img src='../../img/_ico_search.svg' alt='검색'/>
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
                                <Postcode  
                                onChangeAddress1={this.onChangeAddress1} 
                                />
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
                              />
                            </li>
                          </ul>
                      </div>
                    </div>
                </li>
                <li>
                    <div className='gap'>
                      <div className='label-box'>
                        <span>추가입력 사항</span>
                      </div>                   
                      <div className='input-box radio-box'>
                        <label>
                          <input 
                          type='radio'  
                          onChange={(e)=>this.onChangeChoocheon(e.target.value)}
                          checked={this.state.추가입력사항.includes(`추천인 아이디`)}
                          value={`추천인 아이디`}
                          />
                          <span>추천인 아이디</span>
                        </label>
                        <label>
                          <input 
                          type='radio' 
                          onChange={(e)=>this.onChangeChoocheon(e.target.value)}
                          checked={this.state.추가입력사항.includes(`참여 이벤트명`)}
                          value={`참여 이벤트명`}                        
                          />
                          <span>참여 이벤트명</span>
                        </label>
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
                                  checked={this.state.약관동의.includes(`이용약관동의 (필수)`)}
                                  value={`이용약관동의 (필수)`}
                                  />
                                  <span>이용약관동의 (필수)</span>
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
                                checked={this.state.약관동의.includes(`본인은 만 14세 이상입니다.`)}
                                value={`본인은 만 14세 이상입니다.`}                                    
                                />
                                  <span>본인은 만 14세 이상입니다.</span>
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
                                <a href='#!' onClick={this.onClickModalClose} title='Close'><img src='../../img/ico_close_999_32x32.png' alt=''/></a>
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
    );
  }
}

export default KurlyComponent;