jQuery(function ($) {
$('#login').click(function () {
                $("#login_modal").fadeIn(500);
                $(".background_overlay").fadeIn(500);
                positionPopup();
            });

            $("#close, .background_overlay").click(function () {
                $("#login_modal").fadeOut(200);
                $(".background_overlay").fadeOut(200);
                setTimeout(function () {
                    angular.element(document.getElementById('clear')).triggerHandler('click');
                }, 0);
            });

            function positionPopup() {
                if (!$("#login_modal").is(':visible')) {
                    return;
                }
                $("#login_modal").css({
                    left: ($(window).width() - $('#login_modal').width()) / 2,
                    top: 150,
                    position: 'absolute',
                });
            }
            $(window).bind('resize', positionPopup);
            $("#search").click(function () {
                $(".search-popup").show();
            });

            $("#slide2 form span").click(function () {
                $(".search-popup").hide();
            });
});