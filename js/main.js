(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar (negative top is desktop-only; mobile stays top: 0 so the collapse aligns correctly)
    function pegStickyNav() {
        var y = $(window).scrollTop();
        var desktop = window.matchMedia('(min-width: 992px)').matches;
        var $sticky = $('.sticky-top');
        if (y > 300) {
            $sticky.addClass('bg-white shadow-sm').css('top', '0px');
        } else {
            $sticky.removeClass('bg-white shadow-sm');
            $sticky.css('top', desktop ? '-150px' : '0px');
        }
    }
    $(window).on('scroll resize', pegStickyNav);
    pegStickyNav();

    // Mobile: tap outside open navbar to close (Bootstrap does not do this by default)
    $(document).on('click.pegNavDismiss', function (e) {
        if (window.innerWidth >= 992) return;
        var collapseEl = document.getElementById('navbarCollapse');
        if (!collapseEl || !collapseEl.classList.contains('show')) return;
        var toggler = document.querySelector('.navbar [data-bs-target="#navbarCollapse"]');
        if (!toggler) return;
        if (toggler.contains(e.target) || collapseEl.contains(e.target)) return;
        if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
            var inst = bootstrap.Collapse.getInstance(collapseEl);
            if (inst) inst.hide();
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Carousels only when present (PEG Studio pages use mostly static layouts)
    if ($(".header-carousel").length) {
        $(".header-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            loop: true,
            dots: true,
            items: 1
        });
    }

    if ($(".testimonial-carousel").length) {
        $(".testimonial-carousel").owlCarousel({
            items: 1,
            autoplay: true,
            smartSpeed: 1000,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            dots: true,
            loop: true,
            nav: false
        });
    }

})(jQuery);

