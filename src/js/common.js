$(document).ready(function(){
    var $document = $(document);
    var $body = $("body");
    var $menu = $(".nav__wrapper");
    var $shadow = $(".nav__shadow");
    var $menu_btn = $(".nav__menu-btn");
    var $filter = $(".filter-btn");
    var $filter_shadow = $(".filter__shadow");
    var $filter_wrapper = $(".filter__wrapper");
    var $backdoor = $(".backdoor");
    var $filter_inner = $(".filter__inner");
    var $catalog = $(".catalog");
    var $order = $(".order");
    var vm_swipe = $(".vm-swipe-inner");
    var $filter_item = $(".filter__item");
    var $filter_link = $(".filter__item-link");

    set_filter_size();
    
    svg4everybody();

    $menu_btn.on("click", open_menu);
    $filter.on("click", open_filter);

    $backdoor.on("click", function(){
        close_menu();
        close_filter();
    });

    $filter_link.on("click", function (event) {
        event.preventDefault();

        close_filter();
        $filter_item.removeClass("filter__item--active");
        $(this).parent().addClass("filter__item--active");
        
        var elementClick = $(this).attr("data-scroll");
        var destination = $("." + elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, 400);
    });

    $(window).resize(set_filter_size);
 
    $(window).resize(function() {
        if ($(window).width() < 1024) $(".swipe").vmSwipe("destroy");    
        if ($(window).width() > 1024) $(".swipe").vmSwipe({direcion: "horizontal"});
    });

    if ($(window).width() > 1024) $(".swipe").vmSwipe({ direcion: "horizontal" });

    function open_filter() {
        $filter_wrapper.addClass("filter__wrapper--active");
        $filter_shadow.removeClass("hidden");
        $backdoor.addClass("active");
        $body.toggleClass("overflow-hidden");
    }

    function close_filter() {
        $filter_wrapper.removeClass("filter__wrapper--active");
        $filter_shadow.addClass("hidden");
        $backdoor.removeClass("active");
        $body.removeClass("overflow-hidden");
    }

    function open_menu() {
        $menu.addClass("nav__wrapper--active");
        $shadow.removeClass("hidden");
        $backdoor.addClass("active");
        $body.addClass("overflow-hidden");
    }
    function close_menu() {
        $menu.removeClass("nav__wrapper--active");
        $shadow.addClass("hidden");
        $backdoor.removeClass("active");
        $body.removeClass("overflow-hidden");
    }
    function set_filter_size() {
        $filter_shadow.width($body.width() - $order.outerWidth() - 21);
    }
});