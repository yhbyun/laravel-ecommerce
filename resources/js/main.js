(function() {
    "use strict";

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            );
        }
    };

    var mobileMenuOutsideClick = function() {
        $(document).click(function(e) {
            var container = $("#shop-offcanvas, .js-shop-nav-toggle");
            if (
                !container.is(e.target) &&
                container.has(e.target).length === 0
            ) {
                if ($("body").hasClass("offcanvas")) {
                    $("body").removeClass("offcanvas");
                    $(".js-shop-nav-toggle").removeClass("active");
                }
            }
        });
    };

    var offcanvasMenu = function() {
        $("#navbar").append('<div id="shop-offcanvas" />');
        $("#navbar").append(
            '<a href="#" class="js-shop-nav-toggle shop-nav-toggle shop-nav-white"><i></i></a>'
        );
        var clone1 = $(".menu-1 > ul").clone();
        $("#shop-offcanvas").append(clone1);
        var clone2 = $(".menu-2 > ul").clone();
        $("#shop-offcanvas").append(clone2);

        $("#shop-offcanvas .has-dropdown").addClass("offcanvas-has-dropdown");
        $("#shop-offcanvas")
            .find("li")
            .removeClass("has-dropdown");

        // Hover dropdown menu on mobile
        $(".offcanvas-has-dropdown")
            .mouseenter(function() {
                var $this = $(this);

                $this
                    .addClass("active")
                    .find("ul")
                    .slideDown(500, "easeOutExpo");
            })
            .mouseleave(function() {
                var $this = $(this);
                $this
                    .removeClass("active")
                    .find("ul")
                    .slideUp(500, "easeOutExpo");
            });

        $(window).resize(function() {
            if ($("body").hasClass("offcanvas")) {
                $("body").removeClass("offcanvas");
                $(".js-shop-nav-toggle").removeClass("active");
            }
        });
    };

    var burgerMenu = function() {
        $("body").on("click", ".js-shop-nav-toggle", function(event) {
            var $this = $(this);

            if ($("body").hasClass("overflow offcanvas")) {
                $("body").removeClass("overflow offcanvas");
            } else {
                $("body").addClass("overflow offcanvas");
            }
            $this.toggleClass("active");
            event.preventDefault();
        });
    };

    var contentWayPoint = function() {
        var i = 0;
        $(".animate-box").waypoint(
            function(direction) {
                if (
                    direction === "down" &&
                    !$(this.element).hasClass("animated-fast")
                ) {
                    i++;

                    $(this.element).addClass("item-animate");
                    setTimeout(function() {
                        $("body .animate-box.item-animate").each(function(k) {
                            var el = $(this);
                            setTimeout(
                                function() {
                                    var effect = el.data("animate-effect");
                                    if (effect === "fadeIn") {
                                        el.addClass("fadeIn animated-fast");
                                    } else if (effect === "fadeInLeft") {
                                        el.addClass("fadeInLeft animated-fast");
                                    } else if (effect === "fadeInRight") {
                                        el.addClass(
                                            "fadeInRight animated-fast"
                                        );
                                    } else {
                                        el.addClass("fadeInUp animated-fast");
                                    }

                                    el.removeClass("item-animate");
                                },
                                k * 200,
                                "easeInOutExpo"
                            );
                        });
                    }, 100);
                }
            },
            { offset: "85%" }
        );
    };

    var dropdown = function() {
        $(".has-dropdown")
            .mouseenter(function() {
                var $this = $(this);
                $this
                    .find(".dropdown")
                    .css("display", "block")
                    .addClass("animated-fast fadeInUpMenu");
            })
            .mouseleave(function() {
                var $this = $(this);

                $this
                    .find(".dropdown")
                    .css("display", "none")
                    .removeClass("animated-fast fadeInUpMenu");
            });
    };

    var goToTop = function() {
        $(".js-gotop").on("click", function(event) {
            event.preventDefault();

            $("html, body").animate(
                {
                    scrollTop: $("html").offset().top
                },
                500,
                "easeInOutExpo"
            );

            return false;
        });

        $(window).scroll(function() {
            var $win = $(window);
            if ($win.scrollTop() > 200) {
                $(".js-top").addClass("active");
            } else {
                $(".js-top").removeClass("active");
            }
        });
    };

    // var increment = function(){

    // };

    // Loading page
    var loaderPage = function() {
        $(".shop-loader").fadeOut("slow");
    };

    var sliderMain = function() {
        $("#shop-hero .flexslider").flexslider({
            animation: "fade",
            slideshowSpeed: 5000,
            directionNav: true,
            start: function() {
                setTimeout(function() {
                    $(".slider-text").removeClass("animated fadeInUp");
                    $(".flex-active-slide")
                        .find(".slider-text")
                        .addClass("animated fadeInUp");
                }, 500);
            },
            before: function() {
                setTimeout(function() {
                    $(".slider-text").removeClass("animated fadeInUp");
                    $(".flex-active-slide")
                        .find(".slider-text")
                        .addClass("animated fadeInUp");
                }, 500);
            }
        });
    };

    // Owl Carousel
    var owlCrouselFeatureSlide = function() {
        var owl = $(".owl-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayHoverPause: true,
            smartSpeed: 500,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });

        var owl2 = $(".owl-carousel2");
        owl2.owlCarousel({
            animateOut: "slideOutDown",
            animateIn: "flipInX",
            autoplay: true,
            loop: true,
            margin: 0,
            nav: false,
            dots: true,
            autoHeight: true,
            items: 1
        });
    };

    var parallax = function() {
        if (!isMobile.any()) {
            $(window).stellar({
                horizontalScrolling: false,
                hideDistantElements: false,
                responsive: true
            });
        }
    };

    var datePicker = function() {
        // jQuery('#time').timepicker();
        jQuery(".date").datepicker({
            format: "m/d/yyyy",
            autoclose: true
        });
    };

    var cartHoverAnimationInit = function() {
        var list = document.querySelectorAll(".product-entry");

        list.forEach(element => {
            var tl = new TimelineMax();
            var mask = element.children[0].children[2];
            var cartInfo = element.children[0].children[1];

            element.addEventListener("mouseover", function() {
                tl.to(mask, 0.3, { css: { top: 0, left: 0 } }).to(
                    cartInfo,
                    0.3,
                    {
                        css: { opacity: 1 }
                    }
                );
            });

            element.addEventListener("mouseleave", function() {
                tl.to(mask, 0.3, {
                    css: { top: "100%", left: "100%" }
                }).to(cartInfo, 0.3, { css: { opacity: 0 } });
            });
        });

        // TweenLite.defaultEase = Power1.easeInOut;

        // var tlm = new TimelineMax({ onComplete: myFunction });

        // tlm.to("#red", 1, { css: { display: none } });

        // var SMController1 = new ScrollMagic.Controller();

        // var scene = new ScrollMagic.Scene({
        //                     triggerElement: "#trigger1"
        //                    , duration:1500
        //                    , triggerHook: 0.2
        // })
        // .setTween(tlm)
        // .addIndicators()
        // .setPin('#holder')
        // .addTo(SMController1)

        // function myFunction() {
        //     console.log("myFunction()");
        // }
    };

    var blogHoverAnimationInit = function() {
        var list = document.querySelectorAll(".article-entry");

        list.forEach(element => {
            var tl = new TimelineMax();
            console.log(element);

            var mask = element.children[0].children[1];
            var cartInfo = element.children[0].children[2];

            element.addEventListener("mouseover", function() {
                tl.to(mask, 0.3, { css: { top: 0, left: 0 } }).to(
                    cartInfo,
                    0.3,
                    {
                        css: { opacity: 1 }
                    }
                );
            });

            element.addEventListener("mouseleave", function() {
                tl.to(mask, 0.3, {
                    css: { left: "100%" }
                });
            });
        });
    };

    var brandEffect = function() {
        if (document.querySelector(".navbar-brand > img")) {
            var brand = document.querySelector(".navbar-brand > img");
            var Y = brand.clientHeight,
                X = brand.clientWidth;
            var currentX, currentY;
            brand.addEventListener("mousemove", function(e) {
                currentX = e.offsetX;
                currentY = e.offsetY;

                var transformValueX = -10 + (currentX / (X / 2)) * 10;
                var transformValueY = -10 + (currentY / (Y / 2)) * 10;

                console.log(transformValueX, transformValueY);

                brand.style.cssText = `
                                -moz-transform: skew(${transformValueX}deg, ${transformValueY}deg);
                                -webkit-transform: skew(${transformValueX}deg, ${transformValueY}deg);
                                -o-transform: skew(${transformValueX}deg, ${transformValueY}deg);
                                -ms-transform: skew(${transformValueX}deg, ${transformValueY}deg);
                                transform: skew(${transformValueX}deg, ${transformValueY}deg);
                 `;
            });

            brand.addEventListener("mouseleave", function() {
                brand.style.cssText = `
                                -moz-transform: skew(0deg, 0deg);
                                -webkit-transform: skew(0deg, 0deg);
                                -o-transform: skew(0deg, 0deg);
                                -ms-transform: skew(0deg, 0deg);
                                transform: skew(0deg, 0deg);
                 `;
            });
        }
    };



    $(function() {
        mobileMenuOutsideClick();
        offcanvasMenu();
        burgerMenu();
        contentWayPoint();
        sliderMain();
        dropdown();
        goToTop();
        owlCrouselFeatureSlide();
        parallax();
        datePicker();
        cartHoverAnimationInit();
        brandEffect();
        loaderPage();
    });
})();
