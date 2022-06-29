import React, { Component } from 'react';

class KurlyComponent extends Component {
  render() {
    return (
      <div id='kurly'>
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
                      <input type='text' className='inputText' id='inputId' placeholder='6자 이상의 영문 혹인 영문과 숫자를 조합' />
                      <button className='w120-btn'>중복확인</button>
                      <p className='green'>6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                      <p className='green'>아이디 중복확인</p>
                    </div>
                  </div>
              </li>
              <li>
                  <div className='gap'>
                    <div className='label-box'>
                      <span>비밀번호<i>*</i></span>
                    </div>                   
                    <div className='input-box'>
                      <input type='text' className='inputText' id='inputId' placeholder='비밀번호를 입력해주세요' />
                      
                    </div>
                  </div>
              </li>
              <li>
                  <div className='gap'>
                    <div className='label-box'>
                      <span>비밀번호확인<i>*</i></span>
                    </div>                   
                    <div className='input-box'>
                      <input type='text' className='inputText' id='inputId' placeholder='비밀번호를 한번더 입력해주세요'  />
                      
                    </div>
                  </div>
              </li>
              <li>
                  <div className='gap'>
                    <div className='label-box'>
                      <span>이름<i>*</i></span>
                    </div>                   
                    <div className='input-box'>
                      <input type='text' className='inputText' id='inputId' placeholder='이름을 입력해주세요'  />
                      
                    </div>
                  </div>
              </li>
              <li>
                  <div className='gap'>
                    <div className='label-box'>
                      <span>이메일<i>*</i></span>
                    </div>                   
                    <div className='input-box'>
                      <input type='email' className='inputText' id='inputId'  placeholder='예: marketkurly@kurly.com'   />
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
                      <input type='text' className='inputText' id='inputId' placeholder='숫자만 입력해주세요' />
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
                        <input type='radio' checked={false}  />
                        <span>남자</span>
                      </label>
                      <label>
                        <input type='radio' checked={false}  />
                        <span>여자</span>
                      </label>
                      <label>
                        <input type='radio' checked={true} />
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
                            <input type='text' id='year' placeholder='YYYY'/>
                          </li>
                          <li>
                            <span>/</span>
                          </li>
                          <li>
                            <input type='text' id='month' placeholder='MM'/>
                          </li>
                          <li>
                            <span>/</span>
                          </li>
                          <li>
                            <input type='text' id='date' placeholder='DD' />
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
                        <input type='radio' checked={false}  />
                        <span>추천인 아이디</span>
                      </label>
                      <label>
                        <input type='radio' checked={false}  />
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
                                <input type='checkbox' />
                                <span>전체 동의합니다.</span>
                              </label>
                              <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                          </dt>
                          <dd>
                              <label>
                                <input type='checkbox' />
                                <span>이용약관동의 (필수)</span>
                              </label>
                              <span>
                                <a href='#!'>이용약관보기 <i>&gt;</i></a>
                              </span>
                          </dd>
                          <dd>
                              <label>
                                <input type='checkbox' />
                                <span>개인정보 수집·이용 동의(필수)</span>
                              </label>
                              <span>
                                <a href='#!'>이용약관보기 <i>&gt;</i></a>
                              </span>
                          </dd>
                          <dd>
                              <label>
                                <input type='checkbox' />
                                <span>개인정보 수집·이용 동의(선택)</span>
                              </label>
                              <span>
                                <a href='#!'>이용약관보기 <i>&gt;</i></a>
                              </span>
                          </dd>
                          <dd>
                              <label>
                                <input type='checkbox' />
                                <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의</span>
                              </label>
                              <div className='sub-checkbox'>
                                  <div>
                                    <label>
                                      <input type='checkbox' />
                                      <span>SNS</span>
                                    </label>
                                    <label>
                                      <input type='checkbox' />
                                      <span>이메일</span>
                                    </label>
                                  </div>
                                  <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                              </div>
                          </dd>
                          <dd>
                              <label>
                                <input type='checkbox' />
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




          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
      </div>
    );
  }
}

export default KurlyComponent;