(($)=>{

  class pofo {
      init(){
        this.section1();
        this.header();
      }
      header(){
        //메인메뉴 버튼위에 마우스 오버시 
        //해당 서브메뉴 페이드 인 효과로 나타난다.
        //선택자
        const mainBtn = $('.main-btn');
        const nav = $('#nav');
        const sub = $('.sub');
        const subBtn = $('.sub-btn');
        const subsub = $('.subsub');

              mainBtn.on({
                mouseenter: function(){
                  sub.stop().fadeOut(0);
                  $(this).next().stop().fadeIn(300);
                }
              });

              nav.on({
                  mouseleave: function(){
                    sub.stop().fadeOut(300);
                  }
              });


              subBtn.on({
                mouseenter(){
                  subsub.stop().fadeOut(0);
                  $(this).next().stop().fadeIn(300);
                }
              });



      }
      section1(){
        //메인 슬라이드
        let cnt = 0;        
        const slideWrap = $('.slide-wrap');
        let setId = 0;  //타이머 변수

        //1. 메인슬라이드 함수
        function mainSlide(){
            slideWrap.stop().animate({left:-1903*cnt}, 600, 'easeInOutExpo',function(){
              if(cnt>2){cnt=0} //마지막보다 크면 처음 슬라이드로 이동
              if(cnt<0){cnt=2} //처음 이전이면 마지막 슬라이드로 이동
              slideWrap.stop().animate({left:-1903*cnt}, 0);
            });
        }

        //2. 다음카운트 함수
        function nextCount(){
            cnt++;
            mainSlide();
        }
        //2. 이전카운트 함수
        function prevCount(){
            cnt--;
            mainSlide();
        }

        //3. 자동타이머함수
        function autoTimer(){
          setId = setInterval(nextCount, 3000);
          // setInterval(prevCount, 3000); //왼쪽에서 오른쪽으로 이동
        }
        // autoTimer();



        // 터치 스와이프
        // 마우스의 방향에 따라 슬라이드를 다음슬라이드 또는 이전슬라이드를 구현한다.
        // mouseover == mouseenter /  mouseleave == mouseout,
        // mousedown / mouseup / mousemove 
        const slideContainer = $('.slide-container');
        let   mouseStart = 0;
        let   mouseEnd = 0;
        let   ds = null; //드래그 시작 Drag Start
        let   de = null; //드래그 끝   Drag End
        let   md = false; //마우스 다운상태  Mouse Down


              //터치 스와이프 개발
              slideContainer.on({
                mousedown: function(event){
                  mouseStart = event.clientX;   //마우스 터치시작  
                  // 드래그시작 drag start = ds
                  ds = event.clientX - slideWrap.offset().left-1903;
                  // 마우스 다운 mouse donw = md
                  md = true;
                },
                mouseleave: function(event){
                  mouseEnd = event.clientX; 
                  md = false;
                  if( mouseStart-mouseEnd > 0 ){ //다음슬라이드
                    clearInterval(setId);  //타이머중지
                    nextCount();
                  }                  
                  if( mouseStart-mouseEnd < 0 ){ //이전슬라이드
                    clearInterval(setId);  //타이머중지
                    prevCount();
                  }  
                },
                mouseup: function(event){
                  mouseEnd = event.clientX;      //마우스 터치끝
                  md = false;  //마우스 이동 끝나고 딸깍이 끝나면 노면은
                  // console.log( mouseStart-mouseEnd ); // 이동거리 = 터치시작 - 터치끝

                  if( mouseStart-mouseEnd > 0 ){ //다음슬라이드
                    clearInterval(setId);  //타이머중지
                    nextCount();
                  }                  
                  if( mouseStart-mouseEnd < 0 ){ //이전슬라이드
                    clearInterval(setId);  //타이머중지
                    prevCount();
                  }                  
                },
                mousemove: function(e){
                  //마우스 이동거리
                  //마우스가 다운상태에서만 
                  //드래그가 가능하게 만들어야한다.
                  console.log( e.clientX );
                  if( md !== true){
                    return; //강제종료
                  }
                  //드래그 끝 drag end = de
                  de = e.clientX;


                  slideWrap.css({ left: de - ds });
                }
              });    

      }
      section2(){
      
      }
      section3(){
      
      }
      section4(){
      
      }
      section5(){
      
      }
      section6(){
      
      }
      section7(){
      
      }
      section8(){
      
      }
      section9(){
      
      }
      section10(){
      
      }
      section11(){
      
      }
      footer(){
      
      }   
  }
  const newpofo = new pofo();
  newpofo.init();


})(jQuery);