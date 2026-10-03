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
    }});
    

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
   7. slider2 hover video play
   =============================== */
   $('.slider2 .swiper-slide').on('mouseenter', function () {
    const video = $(this).find('video')[0];
    if (video) {
        video.play().catch(() => {});
    }});

    $('.slider2 .swiper-slide').on('mouseleave', function () {
    const video = $(this).find('video')[0];
    if (video) {
        video.pause();
        video.currentTime = 0;
    }});

    /* ===============================
    POPUP (video + iframe 통합
    =============================== */
    
    function openPopup2($item) {
        const popup = $('.popup');
        const media = popup.find('.popup-media');
    
        media.empty();
    
        popup.find('h2').text($item.find('h3').text());
        popup.find('p').html($item.find('p').html());
    
        const video = $item.find('video');
        const iframe = $item.find('iframe');
        const img = $item.find('img');
    
        // VIDEO
        if (video.length) {
            media.html(`
                <video muted playsinline controls>
                    <source src="${video.attr('src')}" type="video/mp4">
                </video>
            `);
    
            setTimeout(() => {
                const v = media.find('video')[0];
                if (v) v.play().catch(() => {});
            }, 50);
        }
    
        // IFRAME
        else if (iframe.length) {
            const src = iframe.attr('src');
    
            media.html(`
                <iframe 
                    src="${src}${src.includes('?') ? '&' : '?'}autoplay=1&mute=1"
                    allow="autoplay; fullscreen"
                    allowfullscreen>
                </iframe>
            `);
        }
    
        // IMAGE
        else if (img.length) {
            media.html(`<img src="${img.attr('src')}" />`);
        }
    
        popup.addClass('on');
    }

    function openPopup1($item) {
        const popup = $('.popup1');
        const media = popup.find('.popup-media');
    
        media.empty();
    
        popup.find('h2').text($item.find('h3').text());
        popup.find('p').html($item.find('p').html());
    
        const img = $item.find('img');
    
        if (img.length) {
            media.html(`<img src="${img.attr('src')}" />`);
        }
    
        popup.addClass('on');
    }

    // 슬라이더2 팝업
    $('.slider2 .swiper-slide').on('click', function () {
    openPopup2($(this));});



    // ⭐ 슬라이더1 수정 (여기에 넣기!)
    $('.slider1 .swiper-slide').on('click', function (e) {

    // a 태그 클릭이면 팝업 막기
    if ($(e.target).closest('a').length > 0) return;

    openPopup1($(this));});

    /* ===============================
    팝업 닫기
    =============================== */
    $('.popup button').on('click', function () {

        const video = $('.popup video')[0];
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    
        $('.popup').removeClass('on');
        $('.popup-media').empty();
    });
    
    $('.popup1 button').on('click', function () {
        $('.popup1').removeClass('on');
        $('.popup1-media').empty();
    });

    /* ===============================
    9. LOADING ANIMATION
    =============================== */
    const loader =
        document.getElementById('loader');
    
    const progressBar =
        document.querySelector('.progress-bar');
    
    const percentText =
        document.querySelector('.percent-text');
    
    const statusText =
        document.getElementById('loading-status');
    
    const main =
        document.querySelector('main');
    
    
    /* ===============================
       ELEMENT CHECK
    =============================== */
    
    if (
        !loader ||
        !progressBar ||
        !percentText ||
        !statusText
    ) {
    
        console.error(
            'LOADER ELEMENT NOT FOUND'
        );
    
    } else {
    
        let value = 0;
    
    
        /* ===============================
           STATUS
        =============================== */
    
        const statuses = [
    
            [0,  'Preparing experience...'],
    
            [20, 'Loading assets...'],
    
            [45, 'Synchronizing data...'],
    
            [65, 'Initializing character...'],
    
            [82, 'Establishing connection...'],
    
            [95, 'Entering world...']
    
        ];
    
    
        function updateStatus(value) {
    
            let current =
                statuses[0][1];
    
    
            for (
                const [threshold, text]
                of statuses
            ) {
    
                if (
                    value >= threshold
                ) {
    
                    current = text;
    
                }
    
            }
    
    
            if (
                statusText.textContent !==
                current
            ) {
    
                statusText.style.opacity =
                    '0';
    
                statusText.style.transform =
                    'translateY(4px)';
    
    
                setTimeout(function () {
    
                    statusText.textContent =
                        current;
    
                    statusText.style.opacity =
                        '1';
    
                    statusText.style.transform =
                        'translateY(0)';
    
                }, 120);
    
            }
    
        }
    
    
        /* ===============================
           LOADING
        =============================== */
    
        function animateLoader() {
    
            const remaining =
                100 - value;
    
    
            const speed =
                Math.max(
                    0.08,
                    remaining * 0.015
                );
    
    
            value += speed;
    
    
            if (value > 100) {
    
                value = 100;
    
            }
    
    
            /* ===============================
               HORIZONTAL PROGRESS
            =============================== */
    
            progressBar.style.transform =
                `scaleX(${value / 100})`;
    
    
            /* ===============================
               PERCENT
            =============================== */
    
            percentText.textContent =
                Math.floor(value) + '%';
    
    
            /* ===============================
               STATUS
            =============================== */
    
            updateStatus(value);
    
    
            /* ===============================
               CONTINUE
            =============================== */
    
            if (value < 100) {
    
                requestAnimationFrame(
                    animateLoader
                );
    
            } else {
    
                finishLoader();
    
            }
    
        }
    
    
        /* ===============================
           FINISH
        =============================== */
    
        function finishLoader() {
    
            /* ===============================
               1. 100%
            =============================== */
    
            statusText.style.opacity =
                '0';
    
            statusText.style.transform =
                'translateY(4px)';
    
    
            setTimeout(function () {
    
    
                /* ===============================
                   2. ACCESS GRANTED
                =============================== */
    
                statusText.textContent =
                    'ACCESS GRANTED';
    
                statusText.style.opacity =
                    '1';
    
                statusText.style.transform =
                    'translateY(0)';
    
    
                /* ===============================
                   3. ACCESS GRANTED DISPLAY
                =============================== */
    
                setTimeout(function () {
    
    
                    /*
                     * 로딩 UI 제거
                     */
    
                    loader.classList.add(
                        'loaded'
                    );
    
    
                    /*
                     * 로딩 UI가 사라지는 순간
                     * 바로 Fill 시작
                     */
    
                    loader.classList.add(
                        'transition-fill'
                    );
    
    
                    /* ===============================
                       4. FILL COMPLETE
                    =============================== */
    
                    setTimeout(function () {
    
    
                        /*
                         * MAIN은 원래 뒤에 존재.
                         *
                         * 이 시점에서
                         * 컬러 화면이 완전히 덮었으므로
                         * Reveal 시작.
                         */
    
                        loader.classList.add(
                            'transition-reveal'
                        );
    
    
                        /* ===============================
                           5. REVEAL COMPLETE
                        =============================== */
    
                        setTimeout(function () {
    
                            loader.classList.add(
                                'hidden'
                            );
    
                            document.body.classList.remove(
                                'loading'
                            );
    
                        }, 750);
    
    
                    }, 800);
    
    
                }, 450);
    
    
            }, 150);
    
        }
    
    
        /* ===============================
           START
        =============================== */
    
        animateLoader();
    
    }



});