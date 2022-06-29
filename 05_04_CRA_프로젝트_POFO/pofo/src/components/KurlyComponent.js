import React, { Component } from 'react';

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
        주소: '',
        성별: '선택안함', //라디오버튼

        생년:'',
        생월:'',
        생일:'',
        생년월일: '',

        추가입력사항: '',  //라디오버튼
        약관동의: [],     //체크박스 다중선택 저장 객체 배열
      }
  }

  onChangeId=(value)=>{
    this.setState({아이디: value});
  }

  onChangePw=(value)=>{
    this.setState({비밀번호: value});
  }

  onChangePwRe=(value)=>{
    this.setState({비밀번호확인: value});
  }

  onChangeName=(value)=>{
    this.setState({이름: value});
  }

  onChangeEmail=(value)=>{
    this.setState({이메일: value});
  }

  onChangePhone=(value)=>{
    this.setState({휴대폰: value});
  }

  onChangeAddress=(value)=>{
    this.setState({주소: value});
  }

  onChangeGender=(value)=>{
    this.setState({성별: value});
  }

  onChangeYear=(value)=>{
    this.setState({생년: value});
  }

  onChangeMonth=(value)=>{
    this.setState({생월: value});
  }

  onChangeDate=(value)=>{
    this.setState({생일: value});
  }

  onChangeChoocheon=(value)=>{
    this.setState({추가입력사항: value});
  }

  // 약관동의 체크박스 이벤트 8개(1개 전체체크) (한개씩 7개 일반체크(Single 체크))
  // 체크상태(true)이면 약관동의에 저장(누적하고)
  // 체크상태가 아니면(false)이면 약관동의 배열안에  
  // 배열값만 제외(삭제)한다.
  
  onChangeCheckEvent=(checked, value)=>{

    if(checked){ //true
      this.setState({약관동의: [...this.state.약관동의, value]}); //배열에 데이터 추가하기(누적하기) ES5 취미.push(value)
    }
    else{ //false 삭제(제외)
      //let result = this.state.약관동의.filter((item) => item!==value);
      //let result = this.state.약관동의.filter( item => item!==value); //괄호생략가능 매개변수 1개인경우
      // let result = this.state.약관동의.filter((item) => {                //중괄호를 사용한 경우는 반드시 리턴문사용해야한다.
      //     return item!==value
      // }); 
      // let result = this.state.약관동의.filter((item) =>                     //소괄호만 사용한 리턴문사용안해도 가능
      //      ( 
      //        item!==value
      //      )
      // ); 
      let result = this.state.약관동의.filter((item) => {                      //중괄호사용 그리고 리턴문 소괄호 사용가능
           return ( 
                    item!==value
           )
      }); 
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
      this.setState({약관동의: [] });  //모두삭제
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
        <form onSubmit={this.onSubmitEvent}>
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
                        className='inputText' 
                        id='inputId' 
                        placeholder='6자 이상의 영문 혹인 영문과 숫자를 조합'                                               
                        onChange={(e)=>this.onChangeId(e.target.value)}
                        value={this.state.아이디}
                        />
                        <button className='w120-btn'>중복확인</button>
                        <p className=''>6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                        <p className=''>아이디 중복확인</p>
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
                        type='text' 
                        className='inputText' 
                        id='inputId' 
                        placeholder='비밀번호를 입력해주세요'
                        onChange={(e)=>this.onChangePw(e.target.value)}
                        value={this.state.비밀번호}
                        />
                        <p className=''>10자 이상 입력</p>
                        <p className=''>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                        <p className=''>동일한 숫자 3개 이상 연속 사용 불가</p>
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
                        type='text' 
                        className='inputText' 
                        id='inputId' 
                        placeholder='비밀번호를 한번더 입력해주세요'  
                        onChange={(e)=>this.onChangePwRe(e.target.value)}
                        value={this.state.비밀번호확인}
                        />
                        <p className=''>동일한 비밀번호를 입력해주세요.</p>
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
                        id='inputId' 
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
                        id='inputId'  
                        placeholder='예: marketkurly@kurly.com' 
                        onChange={(e)=>this.onChangeEmail(e.target.value)}
                        value={this.state.이메일}
                        />
                        <button className='w120-btn'>중복확인</button>
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
                        className='inputText' 
                        id='inputId' 
                        placeholder='숫자만 입력해주세요'
                        onChange={(e)=>this.onChangePhone(e.target.value)} 
                        value={this.state.휴대폰}
                        />
                        <button className='w120-btn phone'>중복확인</button>
                      </div>
                    </div>
                </li>
                <li>
                    <div className='gap'>
                      <div className='label-box'>
                        <span>주소<i>*</i></span>
                      </div>                   
                      <div className='input-box'>
                        <button type='button' className='inputText addr' id='inputId'><img src='../../img/_ico_search.svg' alt='검색'/>주소검색</button>
                        <span className='address-info'>배송지에 따라 상품 정보가 달라질 수 있습니다.</span>
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
      </div>
    );
  }
}

export default KurlyComponent;