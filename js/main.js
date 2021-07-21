(function() {
    var sc = 0; // scrollTop
    var header = $('#header');
    var temp = '임시변수';

    // pc gnb
    $('.gnb .depth1').on('mouseenter', function() {
        header.addClass('on');
        $(this).find('.depth2').show();
        $('.dimm_header').fadeIn(200);
    });
    
    $('.gnb').on('mouseleave', function() {
        header.removeClass('on');
        $(this).find('.depth2').hide();
        $('.dimm_header').fadeOut(200);
    });

    // pc 사이트맵
    $('#header .btn_sitemap').on('click', function() {
        $('#header .modal_wrap').fadeIn();
        $('body').addClass('hidden');
    });

    $('.modal_sitemap .btn_close').on('click', function() {
        $('#header .modal_wrap').hide();
        $('body').removeClass('hidden');
    });

    // 메인슬라이더
    var mainSlider = new Swiper('.main_slider', {
        loop: true,
        speed: 2000,
        effect: 'fade',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function () {
                // transition-delay 따로적용
                $('.main_slider .swiper-slide').addClass('delay');
            },
        }
    });


    /************************** 타블렛 1200부터 적용 **********************/
    // 스크롤시 헤더스타일 변경
    $(window).scroll(function() {
        sc = $(this).scrollTop();

        if(sc >= 40) {
            header.addClass('bg');
        } else {
            header.removeClass('bg');
        }
    }).trigger('scroll');

    // 모바일메뉴 토글
    $('#header .btn_menu_toggle').on('click', function() {
        $(this).toggleClass('on');
        $('.m_gnb_box').toggleClass('open');
        $('body').toggleClass('hidden');
    });

    // 모바일 아코디언
    $('.m_gnb_box .depth1>li>a').on('click', function() {
        $(this).siblings('.depth2').slideToggle().parent().siblings().find('.depth2').slideUp();
        $(this).parent().toggleClass('on').siblings().removeClass('on');
    });

    // main_process 애니메이션
    animatedMainProcess();

    function animatedMainProcess() {
        // 서브페이지에서 요소의 존재여부를 판단
        if($('.main_process').length) {
            var mainProcess = $('.main_process');
            var listProcess = $('.main_process .list_process li');
            var listFlag = true; // scroll이벤트안에서 animatedList함수 한번만 실행시키는 용도
            
            // resize시 브라우저높이
            var winH = 0;

            $(window).resize(function() {
                winH = $(this).height();
            }).trigger('resize');

            $(window).scroll(function() {
                // 위쪽요소의 높이가 가변이므로 스크롤시마다 위치찾아줌
                // 창높이의 1/3 아래쪽에서 애니메이션
                var posY = mainProcess.offset().top - (winH * 0.66);
        
                if(sc >= posY) {
                    mainProcess.addClass('animated');
        
                    // flag변수판단하여 true일경우 한번만 실행하고 false걸어줌
                    if(listFlag) {
                        animatedList();
                        listFlag = false;
                    }
                }
            }).trigger('scroll');
        
            function animatedList() {
                var num = 0; // 숫자증가
                var idx = 0; // 0 - 7
            
                setInterval(function() {
                    num++;
                    idx = num % 8;
                    // 이전 리스트 클래스 삭제
                    listProcess.eq(idx - 1).removeClass('active');
                    listProcess.eq(idx).addClass('active');
                }, 1600);
            }
        }
    }

    var introSlider = new Swiper('.intro_slider', {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function () {
                // loop면 realIndex, loop아닐경우 activeIndex속성 사용
                var idx = introSlider.realIndex;

                $('.main_intro .txt_box').eq(idx).fadeIn().siblings().fadeOut();
            },
        },
    });

    // swiper연동시 loop:true면서 서로 효과가 다를경우 버그발생!!!!!!!!!!!!!!!
    // var txtSlider = new Swiper('.txt_slider', {
    //     effect: 'fade',
    //     loop: true,
    // });

    // swiper 연동
    // introSlider.controller.control = txtSlider;
    // txtSlider.controller.control = introSlider;

    // slideChange시 swiper-slide-active의 인덱스를 추출하여
    // .txt_group의 .txt_box그룹과 연결
})();