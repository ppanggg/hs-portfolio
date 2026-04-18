$(function () {

    /* =========================
        MENU SCROLL (DESKTOP)
    ========================= */
    $('header ul li').click(function () {
        const idx = $(this).index();

        $('header ul li').removeClass('active');
        $(this).addClass('active');

        const targetTop = $('main section').eq(idx).offset().top;

        $('html, body').animate({
            scrollTop: targetTop
        });
    });


    /* =========================
        MENU SCROLL (MOBILE)
    ========================= */
    $('.mobilemenu li').click(function () {
        const idx = $(this).index();

        $('.mobilemenu li').removeClass('active');
        $(this).addClass('active');

        const targetTop = $('main section').eq(idx).offset().top;

        $('html, body').animate({
            scrollTop: targetTop
        });

        $('.mobilemenu').slideUp();
    });


    /* =========================
        SCROLL EVENT (ALL IN ONE)
    ========================= */
    $(window).on('scroll', function () {

        const scrollTop = $(window).scrollTop();
        const windowBottom = scrollTop + $(window).height();

        $('main section').each(function (i) {

            const sectionTop = $(this).offset().top;

            if (sectionTop <= scrollTop + 10) {

                $('header ul li, .mobilemenu li').removeClass('active');

                $('header ul li').eq(i).addClass('active');
                $('.mobilemenu li').eq(i).addClass('active');
            }
        });


        /* GOTOP */
        if (scrollTop >= 900) {
            $('.gotop').fadeIn();
        } else {
            $('.gotop').fadeOut();
        }


        /* PAGE1 RESET */
        const page1Top = $('.page1').offset().top;
        const page1Bottom = page1Top + $('.page1').outerHeight();

        if (scrollTop < page1Top || scrollTop > page1Bottom) {
            $('.page1').removeClass('blurred');
            $('.right').removeClass('open');
            $('.tooltip').removeClass('show');
        }
    });


    /* =========================
        GOTOP
    ========================= */
    $('.gotop').click(function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });


    /* =========================
        HAMBURGER MENU
    ========================= */
    $('.hamburger').click(function () {
        $('.mobilemenu').slideToggle();
    });


    /* =========================
        TOOLTIP (FIXED TOGGLE)
    ========================= */
    $('.icon-item').click(function (e) {
        e.stopPropagation();

        $('.tooltip').not($(this).find('.tooltip')).removeClass('show');
        $(this).find('.tooltip').toggleClass('show');
    });

    $(document).click(function () {
        $('.tooltip').removeClass('show');
    });


    /* =========================
        SWIPER VIDEO HOVER
    ========================= */
    $('.gallery-collection .swiper-slide').each(function () {

        $(this).mouseenter(function () {
            $(this).find('video')[0].play();
        });

        $(this).mouseleave(function () {
            const vid = $(this).find('video')[0];
            vid.pause();
            vid.currentTime = 0;
        });

        $(this).click(function () {
            const title = $(this).find('h3').text();
            const text = $(this).find('p').text();
            const videoSrc = $(this).find('video').attr('src');

            const popupVideo = $('.popup').find('video')[0];

            $('.popup h2').text(title);
            $('.popup p').text(text);
            $('.popup video').attr('src', videoSrc);

            $('.popup').addClass('on');
            popupVideo.play();
        });
    });


    /* =========================
        POPUP CLOSE
    ========================= */
    $('.popup button').click(function () {

        const popupVideo = $('.popup video')[0];

        popupVideo.pause();
        popupVideo.currentTime = 0;

        $('.popup').removeClass('on');
        $('.right').removeClass('open');
        $('.page1').removeClass('blurred');
        $('.tooltip').removeClass('show');
    });


    /* =========================
        PAGE1 CLICK TOGGLE PANEL
    ========================= */
    $('.page1').click(function (e) {

        if ($('.popup').hasClass('on')) return;

        if ($(e.target).closest('video, button, .icon-item').length) return;

        $('.right').toggleClass('open');

        if ($('.right').hasClass('open')) {
            $('.page1').addClass('blurred');
        } else {
            $('.page1').removeClass('blurred');
            $('.tooltip').removeClass('show');
        }
    });

});