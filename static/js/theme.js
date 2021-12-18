"use strict";

document.addEventListener("DOMContentLoaded", function () {
    /* =====================================================
        HERO HOMEPAGE SLIDER
    ===================================================== */
    var heroSliderautoPlay = document.getElementById('hero-slider-auto-play').value;
    var heroSliderSlideSpeed = parseInt(document.getElementById('hero-slider-slide-speed').value);
    var heroSliderPaginationSpeed = parseInt(document.getElementById('hero-slider-pagination-speed').value);
    var homepageSlider = new Swiper(".homepage-slider", {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: heroSliderPaginationSpeed,
        autoplay: (heroSliderautoPlay === 'true') ? {
            delay: heroSliderSlideSpeed,
        } : false,

        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    /* =====================================================
        TESTIMONIALS SLIDER
    ===================================================== */
    var testimonialsSlider = new Swiper(".testimonials-slider", {
        slidesPerView: 1,
        spaceBetween: 10,

        breakpoints: {
            761: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },

        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    /* =====================================================
        CUSTOMERS SLIDER
    ===================================================== */
    var customersSlider = new Swiper(".customers-slider", {
        slidesPerView: 2,
        spaceBetween: 10,

        breakpoints: {
            481: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            991: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 6,
            },
        },

        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    /* =====================================================
        PRODUCT DETAILS THUMBS SLIDER
    ===================================================== */
    var productDetailSliderThumb = new Swiper(".shop-detail-slider-thumbs", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });

    /* =====================================================
        PRODUCT DETAILS SLIDER
    ===================================================== */
    var productDetailSlider = new Swiper(".shop-detail-slider", {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: productDetailSliderThumb,
        },
    });

    /* =====================================================
        PORTFOLIO SLIDER
    ===================================================== */
    var portfolioSlider = new Swiper(".portfolio-slider", {
        slidesPerView: 1,
        spaceBetween: 0,

        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    /* =============================================
        TRIGGER COUNTER UP FUNCTION USING WAYPOINTS
    ================================================ */
    const counterElem = document.getElementById("counterUp");
    if (counterElem) {
        const counterWaypoint = new Waypoint({
            element: counterElem,
            handler: function () {
                vanillaCounterUp(".counter", 100);
            },
            offset: "75%",
        });
    }

    /* =============================================
        COUNTER UP FUNCTION
    ================================================ */

    function vanillaCounterUp(counterTarget, counterSpeed) {
        const counters = document.querySelectorAll(counterTarget);
        const speed = counterSpeed;

        counters.forEach((counter) => {
            function updateCount() {
                const target = +counter.getAttribute("data-counter");
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.trunc(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = Math.trunc(target);
                }
            }
            updateCount();
        });
    }

    /* =====================================================
        NAVBAR BEHAVIOR
    ===================================================== */
    function navBarBehavior() {
        const topBar = document.getElementById("topBar"),
            topBarHeight = topBar.offsetHeight,
            header = document.querySelector(".make-sticky"),
            headerHeight = header.offsetHeight,
            scroll = window.pageYOffset;

        if (scroll >= topBarHeight) {
            header.classList.add("is-fixed", "shadow-sm");
            document.body.style.paddingTop = `${headerHeight}px`;
        } else {
            header.classList.remove("is-fixed", "shadow-sm");
            document.body.style.paddingTop = "0";
        }
    }

    window.addEventListener("scroll", function () {
        navBarBehavior();
    });
    window.addEventListener("resize", function () {
        navBarBehavior();
    });

    /* ==============================================
        MULTILEVEL DROPDOWNS
    ============================================== */
    let dropdownElementList = [].slice.call(document.querySelectorAll(".dropdown-toggle"));
    let dropdownSubmenuElementList = [].slice.call(document.querySelectorAll(".dropdown-submenu-toggle"));
    let dropdownMenus = [].slice.call(document.querySelectorAll(".dropdown-menu"));

    let dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl);
    });

    let submenuList = dropdownSubmenuElementList.map(function (e) {
        e.onclick = function (e) {
            e.target.parentNode.querySelector("ul").classList.toggle("show");
            e.stopPropagation();
            e.preventDefault();
        };
    });
    function closeAllSubmenus() {
        let dropdownSubmenus = [].slice.call(document.querySelectorAll(".dropdown-submenu"));
        dropdownSubmenus.map(function (submenu) {
            submenu.classList.remove("show");
        });
    }

    //I'm using "click" but it works with any event
    document.addEventListener("click", function (event) {
        var specifiedElement = document.querySelector(".dropdown");
        var isClickInside = specifiedElement.contains(event.target);

        if (!isClickInside) {
            closeAllSubmenus();
        }
    });
});
