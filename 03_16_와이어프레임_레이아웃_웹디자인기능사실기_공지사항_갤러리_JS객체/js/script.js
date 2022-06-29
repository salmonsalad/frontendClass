(function($){

    //객체생성 : Object   
    const obj = {
        init: function(){
            this.section1();
            this.section2();
        },
        section1: function(){

        },
        section2: function(){

        }
    }
    obj.init();


    const mega = {
        init: function(){
            this.header();
            this.section1();
            this.section2();
        },
        header: function(){
            //헤더
            //1. 메인메뉴('.main-btn)의 마우스를 오버(mouseenter())하면 
            //   바로 아래(다음)의 서브메뉴(.sub)가 위에서 아래로 부드럽게 펼쳐진다.(slideDown())
            //버튼의 이벤트를 객체 메서드형식으로 등록한다.
            $('.main-btn').on({ //Properties(속성==멤버변수)+function() = 메서드 Methods
                mouseenter: function(){
                    $('.main-btn').removeClass('addHover'); 
                    $(this).addClass('addHover'); 
                    $('.sub').stop().slideUp(0);
                    $(this).next().stop().slideDown(300);
                },
                focusin: function(){ //탭키 접근
                    $('.main-btn').removeClass('addHover'); 
                    $(this).addClass('addHover'); 
                    $('.sub').stop().slideUp(0);
                    $(this).next().stop().slideDown(300); 
                }
            });

            //nav 영역을 떠나면 모든 서브메뉴 부드럽게 접힌다.
            $('#nav').on({
                mouseleave: function(){
                    $('.sub').stop().slideUp(300);
                    $('.main-btn').removeClass('addHover'); 
                }
            });

        },
        section1: function(){
            // 섹션1
                // 캐러셀 슬라이드(메인 슬라이드)
                // .slide-wrap가 오른쪽에서 왼쪽으로 부드럽게 이동하는 슬라이드 구현
                // 타이머 3초간격으로 구현한다. 무한반복
                // 1. 메인 슬라이드 함수 제작


                //ES5 자바스크립트의 버전 
                // var slideWrap = $('.slide-wrap');
                // var cnt = 3;

                //ES6 자바스크립트의 버전 
                //변수란 식별자 = 값 value
                // const slideWrap = $('.slide-wrap'); //불변변수(변수의 값이 변경불가한 변수)
                // let cnt = 0;  //변수 설정 초기화  let 가변변수(변수의 값이 변경가능한 변수)의 키워드


                // function mainSlide(){
                //     $('.slide-wrap').animate({left:-100*cnt +'%' }, 1000, function(){
                //         if(cnt==3){cnt=0} //슬라이드 카운트가 3이면 처음으로
                //         $('.slide-wrap').animate({left:-100*cnt +'%' }, 0);
                //     });
                // }  

                // // 2. 다음 카운트 함수 제작
                // function nextCount(){
                //     // 카운트 = 카운트 + 1;  //1씩증가 1 2 3 4 .....
                //     // count = count +1;
                //     // cnt = cnt +1;
                //     cnt++;  //1씩증가 증가변수는 반드시 초기값이 지정 되어야 한다.
                //     mainSlide();
                // }

                // // 3. 자동 타이머 함수 제작
                // function autoTimer(){
                //     //셋인타발함수
                //     setInterval(nextCount, 3000); //3초간격으로 계속 무한반복 호출 실행
                // }
                // autoTimer(); //홈페이지 열릴 때(로드시)

                // // *구현방법 타이머가 3초간격으로 1회씩 호출한다. 다음 카운트 슬라이드를
                // // 그러면 다음카운트 함수는 호출될 때마 1씩 숫자를 증가한다.(카운트)
                // // 그리고 증가할 때 마다 메인 슬라이드 함수를 호출한다. 그러면 카운트 숫자가 전달된다.
                // // 메인 슬라이는 전달된 숫자만큼 오른쪽에서 왼쪽으로 부드럽게 애니메이션을 구현한다.


                // 메인 슬라이드 구현
                // 프로그램 순서(루틴)
                ///////////////////////////////////////////////////////////

                // 0 가변변수설정
                let cnt=0;

                // 알고리즘 : 어떤 문제를 해결하기위해 프로그램을 구현해서 실행하는 문제해결 방법
                // 1. 메인슬라이드함수
                function mainSlide(){        
                    $('.slide-wrap').animate({ left: -100*cnt +'%' }, 600, function(){
                        if(cnt==3){cnt=0}
                        $('.slide-wrap').animate({ left: -100*cnt +'%' }, 0); //리턴 처음으로
                        console.log( cnt );
                    });
                }
                
                // 2. 다음카운트함수
                function nextCount(){
                    cnt++;
                    mainSlide();
                }

                // 3. 자동타이머함수
                function autoTimer(){
                    setInterval(nextCount, 4000);
                }
                autoTimer();


        },
        section2: function(){
                
            //섹션2
            //공지사항, 갤러리 버튼 클릭 이벤트
            $('.gallery-btn').on({
                click: function(){
                    $('.gallery-btn').addClass('addGallery');
                    $('.notice-btn').addClass('addGallery');
                }
            });

            $('.notice-btn').on({
                click: function(){
                    $('.gallery-btn').removeClass('addGallery');
                    $('.notice-btn').removeClass('addGallery');
                }
            });



        }
    }
    mega.init()// 웨딩객체.init()

})(jQuery);