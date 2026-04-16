$(function () {

    /* ===============================
       공통 변수
    =============================== */
    const $menuItems = $('.mainmenu li, .mobilemenu li');
    const $sections = $('main section');
    const $htmlBody = $('html, body');
    const offset = 0;


    /* ===============================
       1. 메뉴 클릭 → 스크롤 이동
    =============================== */
    
    let isScrolling = false;
    
    $('.mainmenu a, .mobilemenu li').on('click', function (e) {e.preventDefault();

    const target = $(this).closest('[data-target]').data('target');
    if (!target) return;

    $('.mainmenu li, .mobilemenu li').removeClass('active');
    $('.mainmenu li, .mobilemenu li')
        .filter('[data-target="' + target + '"]')
        .addClass('active');

    $('.mobilemenu').stop(true, true).slideUp();

    isScrolling = true;

    $('html, body').stop().animate({
        scrollTop: $('#' + target).offset().top
    }, 800, function () {
        isScrolling = false;
    });});

    /* ===============================
       2. 스크롤 → active + gotop
    =============================== */
    $(window).on('scroll', function () {

    if (isScrolling) return; 

    const scrollTop = $(this).scrollTop();

    $sections.each(function () {

        const id = $(this).attr('id');

        if ($(this).offset().top <= scrollTop + 10) {

            $menuItems.removeClass('active');

            $menuItems
                .filter('[data-target="' + id + '"]')
                .addClass('active');
        }
    });

    if (scrollTop > 300) {
        $('.gotop').stop(true, true).fadeIn();
    } else {
        $('.gotop').stop(true, true).fadeOut();
    }
});


    /* ===============================
       3. gotop
    =============================== */
    $('.gotop').on('click', function (e) {
        e.preventDefault();

        $('html, body').stop().animate({
            scrollTop: 0
        }, 800);
    });


    /* ===============================
       4. mobile menu
    =============================== */
    $('.hamburger').on('click', function () {
        $('.mobilemenu').stop(true, true).slideToggle();
    });
    $('.mobilemenu').css('z-index', 10000);

    $(window).on('resize', function () {
        if ($(window).width() > 768) {
            $('.mobilemenu').removeAttr('style');
        }
    });


    /* ===============================
       5. 마우스 라이트 효과
    =============================== */
    const page1 = document.querySelector(".page1");
    const light = document.querySelector(".mouse-light");

    if (page1 && light) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        page1.addEventListener("mousemove", (e) => {
            const rect = page1.getBoundingClientRect();

            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        function animate() {
            currentX += (mouseX - currentX) * 0.08;
            currentY += (mouseY - currentY) * 0.08;

            light.style.left = currentX + "px";
            light.style.top = currentY + "px";

            requestAnimationFrame(animate);
        }

        animate();
    }


    /* ===============================
       6. Swiper
    =============================== */
    const swiperOption = {
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        }
    };

    new Swiper(".slider1", {
        ...swiperOption,
        slidesPerView: 1,
        navigation: {
            nextEl: ".page3-right",
            prevEl: ".page3-left",
        },
        pagination: {
            el: ".slider1 .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
            1440: { slidesPerView: 3 }
        }
    });

    new Swiper(".slider2", {
        ...swiperOption,
        slidesPerView: 1,
        navigation: {
            nextEl: ".page4-right",
            prevEl: ".page4-left",
        },
        pagination: {
            el: ".slider2 .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1900: { slidesPerView: 3 }
        }
    });


    /* ===============================
       7. 갤러리 (영상 + 팝업)
    =============================== */
    $('.gallery-collection .swiper-slide').each(function () {

        const $slide = $(this);
        const video = $slide.find('video')[0];

        $slide.on('mouseenter touchstart', () => video?.play());

        $slide.on('mouseleave touchend', () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });

        $slide.on('click', function () {

            const popup = $('.popup');
            const videoEl = popup.find('video')[0];

            popup.find('h2').html($slide.find('h3').html());
            popup.find('p').html($slide.find('p').html());

            if (videoEl) {
                videoEl.src = $slide.find('video').attr('src');
                videoEl.play();
            }

            popup.addClass('on');
        });
    });

    $('.popup button').on('click', function () {
        const video = $('.popup video')[0];
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        $('.popup').removeClass('on');
    });


    /* ===============================
       8. slider1 팝업
    =============================== */
    $('.slider1 .swiper-slide').on('click', function (e) {

        if ($(this).find('a').length) return;

        e.preventDefault();

        const popup = $('.popup1');

        popup.find('h2').html($(this).find('h3').html());
        popup.find('p').html($(this).find('p').html());
        popup.find('img').attr('src', $(this).find('img').attr('src'));

        popup.addClass('on');
    });

    $('.popup1 button').on('click', function () {
        $('.popup1').removeClass('on');
    });


    /* ===============================
       9. 로딩 애니메이션
    =============================== */
    const progressBar = document.querySelector('.progress-bar');
    const percentText = document.querySelector('.percent-text');
    const loader = document.getElementById('loader');
    const main = document.getElementById('main');
    const container = document.querySelector('.left-progress');

    let value = 0;
    const speed = 0.9;

    function animateLoader() {
        value = Math.min(value + speed, 100);

        progressBar.style.height = value + '%';
        percentText.textContent = Math.floor(value) + '%';

        const barEnd =
            progressBar.getBoundingClientRect().bottom -
            container.getBoundingClientRect().top + 6;

        percentText.style.top = barEnd + 'px';
        percentText.style.transform = 'translateY(-100%)';

        if (value < 100) {
            requestAnimationFrame(animateLoader);
        } else {
            loader.style.transform = 'translateY(100vh)';
            loader.style.transition = 'transform 1s cubic-bezier(0.7,0,0.2,1)';

            setTimeout(() => {
                loader.style.display = 'none';
                main.style.opacity = '1';
            }, 1000);
        }
    }

    animateLoader();

});