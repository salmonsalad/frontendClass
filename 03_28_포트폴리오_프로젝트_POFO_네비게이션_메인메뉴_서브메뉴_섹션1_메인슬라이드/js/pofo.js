(($)=>{

  const pofo = {
      init(){
        this.section1();
      },
      section1(){
        //메인 슬라이드
        let cnt = 0;        
        const slideWrap = $('.slide-wrap');
        let setId = 0;  //타이머 변수



        //1. 메인슬라이드 함수
        function mainSlide(){
            slideWrap.animate({left:-1903*cnt}, 600, function(){
              if(cnt>2){cnt=0} //마지막보다 크면 처음 슬라이드로 이동
              if(cnt<0){cnt=2} //처음 이전이면 마지막 슬라이드로 이동
              slideWrap.animate({left:-1903*cnt}, 0);
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
        autoTimer();



        // 터치 스와이프
        // 마우스의 방향에 따라 슬라이드를 다음슬라이드 또는 이전슬라이드를 구현한다.
        // mouseover == mouseenter /  mouseleave == mouseout,
        // mousedown / mouseup / mousemove 
        const slideContainer = $('.slide-container');
        let   mouseStart = 0;
        let   mouseEnd = 0;

              //터치 스와이프 개발
              slideContainer.on({
                mousedown: function(event){
                  mouseStart = event.clientX;   //마우스 터치시작               
                },
                mouseup: function(event){
                  mouseEnd = event.clientX      //마우스 터치끝
                  
                  // console.log( mouseStart-mouseEnd ); // 이동거리 = 터치시작 - 터치끝

                  if( mouseStart-mouseEnd > 0 ){ //다음슬라이드
                    clearInterval(setId);  //타이머중지
                    nextCount();
                  }                  
                  if( mouseStart-mouseEnd < 0 ){ //이전슬라이드
                    clearInterval(setId);  //타이머중지
                    prevCount();
                  }                  
                }
              });    




      },
      section2(){
      
      },
      section3(){
      
      },
      section4(){
      
      },
      section5(){
      
      },
      section6(){
      
      },
      section7(){
      
      },
      section8(){
      
      },
      section9(){
      
      },
      section10(){
      
      },
      section11(){
      
      },
      footer(){
      
      }      
  }

  pofo.init();



})(jQuery);