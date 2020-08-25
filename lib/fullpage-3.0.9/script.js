$('ul#menu li').on('click', function() {
    setTimeout(function() {
        $('nav').fadeOut("slow", function() {
            $('.toggle-menu').click();
            $('nav').fadeIn("fast", function() {});
        });
    }, 100);
});
var $header_top = $('.header-top');
var $nav = $('nav');

$header_top.find('a').on('click', function() {
    $(this).parent().toggleClass('open-menu');
});


new fullpage('#fullpage', {
    sectionsColor: ['#206262', '#406180', '#406180', '#406180', '#406180', '#1c163c', '#206262'],
    sectionSelector: '.vertical-scrolling',
    responsiveHeight: 500,
    navigation: true,
    slidesNavigation: true,
    controlArrows: false,
    css3: true,
    scrollingSpeed: 800,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection', 'sixthSection', 'seventhSection'],
    menu: '#menu',

    afterLoad: function(anchorLink, index) {
        $header_top.css('background', 'rgba(0, 47, 77, .3)');
        $nav.css('background', 'rgba(0, 47, 77, .25)');
        if (index == 5) {
            $('#fp-nav').hide();
        }
    },

    onLeave: function(index, nextIndex, direction) {
        if (index == 5) {
            $('#fp-nav').show();
        }
    },
});


function loadImage(url, callback) {
    var image = new Image();
    image.onload = function() {
        callback(null, image);
    };
    image.onerror = function() {
        callback(new Error('Could not load image at ' + url));
    };
    image.src = url;
}

function loadImages(urls, callback) {
    var returned = false;
    var count = 0;
    var result = new Array(urls.length);
    urls.forEach(function(url, index) {
        loadImage(url, function(error, item) {
            if (returned) return;
            if (error) {
                returned = true;
                return callback(error);
            }
            result[index] = item;
            count++;
            if (count === urls.length) {
                return callback(null, result);
            }
        });
    });
}

let startSlider = function() {
    $('.recommendation-slider').slick({
        autoplay: true,
        arrows: false,
        infinite: true
    });
}

var sliderisloaded = false;
$(document).ready(function() {
    var imageUrls = ['assets/img/dark-jungle.jpg', 'assets/img/red-jungle.jpg', 'assets/img/pink-jungle.jpg'];
    loadImages(imageUrls, function(err, images) {
        $('body').fadeIn("slow", function() {});
        startSlider();
        sliderisloaded = true;
    });
    setTimeout(function() {
        $('body').fadeIn("slow", function() {});
        if (!sliderisloaded) {
            startSlider();
        }
    }, 4000);
});