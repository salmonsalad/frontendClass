(($)=>{

  class pofo {
      init(){
        this.section1();
        this.section4();

        this.header();
        this.parallax();
      }
      parallax(){

        const paralObj = {
            init(){
              this.header();
              this.section2();
              this.section3();
            },
            header(){

                //헤더영역
                //스크롤 방향 먼저 계산 위 / 아래
                let upDown = '';
                let scrollStart = 0;
                let scrollEnd = 0;

                //스크롤이벤트 : 스크롤이 발생하면 실행 콜백함수로 결고 돌려준다.
                $(window).scroll(function(){
                  //스크롤시작값 
                  //스크롤종료값
                  //결과변수 = (스크롤시작값-스크롤종료값) > 0 ? 'DOWN' : 'UP'
                  scrollStart = $(window).scrollTop();  //스크롤시작값

                  upDown = (scrollStart-scrollEnd) > 0 ? 'DOWN' : 'UP'
                    
                      if( upDown === 'DOWN' ){
                        $('#header').addClass('down');
                        $('#header').removeClass('event');
                      }  

                      if( upDown === 'UP' ){
                        $('#header').removeClass('down');
                        $('#header').addClass('event');
                      }

                      if( $(window).scrollTop() === 0 ){
                        $('#header').removeClass('event');
                      }

                  scrollEnd = scrollStart;  //처음 시작값을 종료에 넣어준다

                });


            },
            section2(){
                let winH = $(window).innerHeight();
                let sec2Top = $('#section2').offset().top-winH;
                let section2 = $('#section2');

                $(window).scroll(function(){

                  if( $(window).scrollTop() > sec2Top ){
                    section2.addClass('parallax');
                  }

                  if( $(window).scrollTop() === 0 ){
                    section2.removeClass('parallax');  
                  }

                });
            },
            section3(){
                let winH = $(window).height();
                let se3Top = $('#section3').offset().top-winH;
                const section3 = $('#section3');

                $(window).scroll(function(){
                    if($(this).scrollTop()===0){
                      section3.removeClass('parallax');
                    }                    
                    if($(this).scrollTop()>se3Top){
                      section3.addClass('parallax');
                    }                    
                });
            }
        }

        paralObj.init();

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

              //모바일 버튼
              $('.mobile-btn').on({
                  click:  function(){
                      $(this).toggleClass('on');
                  }
              });


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
        const pageBtn = $('.page-btn');
        let setId = 0;  //타이머 변수
        let slideW = $(window).width(); //슬라이드너비는 창너비

        //반응형 윈도우 크기 변경시 바로 반응한다. resize()
        //슬라이드 너비가 1903px로 고정크기인데 이걸
        //창크기가 변하면 바로 슬라이드 너비도 자동으로 반응하도록 한다.
        $(window).resize(function(){
            slideW = $(window).width();
            mainSlide();
        });




        //1-1 메인슬라이드 함수
        function mainSlide(){
            slideWrap.stop().animate({left:-slideW*cnt}, 600, 'easeInOutExpo',function(){
              if(cnt>2){cnt=0} //마지막보다 크면 처음 슬라이드로 이동
              if(cnt<0){cnt=2} //처음 이전이면 마지막 슬라이드로 이동
              slideWrap.stop().animate({left:-slideW*cnt}, 0);              
            });
            pageBtnEvent();
        }
        //1-2
        // 페이지버튼 이벤트 함수
        function pageBtnEvent(){
            pageBtn.removeClass('on'); //초기화
            pageBtn.eq(cnt>2?0:cnt).addClass('on'); //현재 슬라이드
        }
        // 페이지버튼 클릭 이벤트
        pageBtn.each(function(index){
          $(this).on({  //$(this) 사용  ==  pageBtn.eq(index)
            click (){
              cnt=index;
              mainSlide();
            }
          });
        })
       
       
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
        //autoTimer();






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


              //PC 용 마우스 이벤트       
              //터치 스와이프 개발
              //드래그 앤 드롭 
              slideContainer.on({
                mousedown: function(event){
                  mouseStart = event.clientX;   //마우스 터치시작  
                  // 드래그시작 drag start = ds
                  ds = event.clientX - slideWrap.offset().left-1903;
                  // 마우스 다운 mouse donw = md
                  md = true;
                },
                mouseleave: function(event){
                  if( md !== true){
                    return; //강제종료
                  }

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
                  // console.log( e.clientX );
                  if( md !== true){
                    return; //강제종료
                  }
                  //드래그 끝 drag end = de
                  de = e.clientX;


                  slideWrap.css({ left: de - ds });
                }
              });    



              //테블릿 모바일 용 핑거(손가락) 터치 이벤트       
              //터치 스와이프 개발
              //드래그 앤 드롭 
              slideContainer.on({
                touchstart: function(event){
                  mouseStart = event.originalEvent.changedTouches[0].clientX;
                  ds = event.originalEvent.changedTouches[0].clientX - slideWrap.offset().left-slideW;
                  md = true;
                },
                touchend: function(event){
                  mouseEnd = event.originalEvent.changedTouches[0].clientX;
                  md = false;
                  if( mouseStart-mouseEnd > 0 ){
                    clearInterval(setId);
                    nextCount();
                  }                  
                  if( mouseStart-mouseEnd < 0 ){
                    clearInterval(setId);
                    prevCount();
                  }                  
                },
                touchmove: function(event){
                  if( md !== true){
                    return;
                  }
                  de = event.originalEvent.changedTouches[0].clientX;
                  slideWrap.css({ left: de - ds });
                }
              });   


      }
      section2(){
      
      }
      section3(){
      
      }
      section4(){
        //버튼 클릭 이벤트
        //6개의 버튼을 배열처리 이벤트 each();
        let rate = 650 / 800;           /* 이미지높이비율값(0.8125) = 이미지높이 / 이미지너비 */
        let n    = 4;                   /* 칸수 */
        let winW = $(window).width();   /* 창너비 100% 인식 = 1903px */
        let imgW = winW / n;            /* 이미지너비 = 창너비 / 칸수 */
        let imgH = imgW * rate;         /* 이미지높이 = 이미지너비 * 이미지높이 비율값 */               
        let idx = 0;


        $('.gallery-box ul li').stop().animate({width:imgW, height:imgH}, 300);

        $('.gallery-btn').each(function(index){
            $(this).on({
              click: function(event){
                event.preventDefault();
                idx = index; //클릭 버튼 번호
                mainGallery();
              }
            });
        });

        //반응형 이벤트
        mainGallery();

        function mainGallery(){

            // 다음 시간 반응형 내용
            // 해상도 별 칸의 갯수 4 3 2 1
            


            // //////////////////////
            $('.img-box').removeClass('on');

            if(idx===0){   //8개
              $('.gallery-box ul li').eq(0).show().stop().animate({top:imgH*0, left:imgW*0}, 300);
              $('.gallery-box ul li').eq(1).show().stop().animate({top:imgH*0, left:imgW*1}, 300);
              $('.gallery-box ul li').eq(2).show().stop().animate({top:imgH*0, left:imgW*2}, 300);
              $('.gallery-box ul li').eq(3).show().stop().animate({top:imgH*0, left:imgW*3}, 300);
              $('.gallery-box ul li').eq(4).show().stop().animate({top:imgH*1, left:imgW*0}, 300);
              $('.gallery-box ul li').eq(5).show().stop().animate({top:imgH*1, left:imgW*1}, 300);
              $('.gallery-box ul li').eq(6).show().stop().animate({top:imgH*1, left:imgW*2}, 300);
              $('.gallery-box ul li').eq(7).show().stop().animate({top:imgH*1, left:imgW*3}, 300);
            }
            else if(idx===1){ //2개
              $('.gallery-box ul li').eq(0).hide();
              $('.gallery-box ul li').eq(2).hide();
              $('.gallery-box ul li').eq(3).hide();
              $('.gallery-box ul li').eq(4).hide();
              $('.gallery-box ul li').eq(5).hide();
              $('.gallery-box ul li').eq(7).hide();

              $('.gallery-box ul li').eq(1).show().stop().animate({top:imgH*0, left:imgW*0}, 300);
              $('.gallery-box ul li').eq(6).show().stop().animate({top:imgH*0, left:imgW*1}, 300);
            }
            else if(idx===2){ //6개
              $('.gallery-box ul li').eq(3).hide();
              $('.gallery-box ul li').eq(7).hide();

              $('.gallery-box ul li').eq(0).show().stop().animate({top:imgH*0, left:imgW*0}, 300);
              $('.gallery-box ul li').eq(1).show().stop().animate({top:imgH*0, left:imgW*1}, 300);
              $('.gallery-box ul li').eq(2).show().stop().animate({top:imgH*0, left:imgW*2}, 300);
              $('.gallery-box ul li').eq(4).show().stop().animate({top:imgH*0, left:imgW*3}, 300);

              $('.gallery-box ul li').eq(5).show().stop().animate({top:imgH*1, left:imgW*0}, 300);
              $('.gallery-box ul li').eq(6).show().stop().animate({top:imgH*1, left:imgW*1}, 300);
            }
            else if(idx===3){ //4개
              $('.gallery-box ul li').eq(1).hide();
              $('.gallery-box ul li').eq(3).hide();
              $('.gallery-box ul li').eq(6).hide();
              $('.gallery-box ul li').eq(7).hide();

              $('.gallery-box ul li').eq(0).show().stop().animate({top:imgH*0, left:imgW*0}, 300);
              $('.gallery-box ul li').eq(2).show().stop().animate({top:imgH*0, left:imgW*1}, 300);
              $('.gallery-box ul li').eq(4).show().stop().animate({top:imgH*0, left:imgW*2}, 300);
              $('.gallery-box ul li').eq(5).show().stop().animate({top:imgH*0, left:imgW*3}, 300);
            }
            else if(idx===4){ //5개
              $('.gallery-box ul li').eq(1).hide();
              $('.gallery-box ul li').eq(3).hide();
              $('.gallery-box ul li').eq(4).hide();
              $('.gallery-box ul li').eq(6).hide();
              $('.gallery-box ul li').eq(7).hide();

              $('.gallery-box ul li').eq(0).show().stop().animate({top:imgH*0, left:imgW*0}, 300);
              $('.gallery-box ul li').eq(2).show().stop().animate({top:imgH*0, left:imgW*1}, 300);
              $('.gallery-box ul li').eq(5).show().stop().animate({top:imgH*0, left:imgW*2}, 300);
            }
            else {  //5  //3개
              $('.gallery-box ul li').eq(0).hide();
              $('.gallery-box ul li').eq(3).hide();
              $('.gallery-box ul li').eq(5).hide();

              $('.gallery-box ul li').eq(1).show().stop().animate({top:imgH*0, left:imgW*0}, 300);
              $('.gallery-box ul li').eq(3).show().stop().animate({top:imgH*0, left:imgW*1}, 300);
              $('.gallery-box ul li').eq(4).show().stop().animate({top:imgH*0, left:imgW*2}, 300);
              $('.gallery-box ul li').eq(6).show().stop().animate({top:imgH*0, left:imgW*3}, 300);

              $('.gallery-box ul li').eq(7).show().stop().animate({top:imgH*1, left:imgW*0}, 300);
            }

            $('.img-box').addClass('on');          
        }



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