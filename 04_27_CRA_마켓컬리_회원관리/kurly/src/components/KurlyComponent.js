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
                      <span>성별<i>*</i></span>
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

            </ul>
        </div>

          
      </div>
    );
  }
}

export default KurlyComponent;