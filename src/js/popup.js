$(document).ready(function(){
    var $body = $("body");
    var $popup_open_btn = $(".catalog__item-more");
    var $catalog_image = $(".catalog__image");
    var $popup_close_btn = $(".popup__close");
    var $header = $(".header"); 
    var $main = $(".main"); 
    var $popup = $(".popup");
    var $backdoor = $(".backdoor");

    $backdoor.on("click", function() {
        backdoor_blur_off();
        backdoor_off();
        close_popup();
    });
    $catalog_image.on("click", function () {
        $body.addClass("overflow-hidden padding-scroll");
        backdoor_on();
        backdoor_blur_on();
        open_popup();
    });
    $popup_open_btn.on("click", function(){
        $body.addClass("overflow-hidden padding-scroll");
        backdoor_on();
        backdoor_blur_on();
        open_popup();
    });
    $popup_close_btn.on("click", function(){
        $body.removeClass("overflow-hidden padding-scroll");
        backdoor_off();
        backdoor_blur_off();
        close_popup();
    });

    function backdoor_on() {
        $backdoor.addClass("active");
    }
    function backdoor_off() {
        $backdoor.removeClass("active");
    }
    function backdoor_blur_on() {
        $header.addClass("filter-blur");
        $main.addClass("filter-blur");
    }
    function backdoor_blur_off() {
        $header.removeClass("filter-blur");
        $main.removeClass("filter-blur");
    }
    function open_popup() {
        $popup.addClass("popup--active");
    }
    function close_popup() {
        $popup.removeClass("popup--active");
    }
});