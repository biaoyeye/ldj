/**
 * Created by Administrator on 30/04/2017.
 */
$(function () {
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    //get elements
    var $banner = $(".banner");
    var $images = $banner.find(".images");
    var $lis = $images.find("li");
    var $plis = $(".points li");
    //console.log($lis.length);

    //console.log($lis);
    //设置移动端的滑动效果
    var startX = 0;
    var distanceX = 0;
    var index = 0;
    var width = $banner.width();
    $banner.on("touchstart", function (e) {
        startX = e.originalEvent.touches[0].clientX;
        clearInterval(timer);
    });
    $banner.on("touchmove", function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
    });
    $banner.on("touchend", function () {
        if (distanceX > 0 && Math.abs(distanceX) > width * 0.4) {
            index--;
            move();
        } else if (distanceX < 0 && Math.abs(distanceX) > width * 0.4) {
            index++;
            move();
        }
        startX = 0;
        distanceX = 0;
    })

//自动轮播
    clearInterval(timer);
    var timer = setInterval(function () {
        index++;
        move();
    }, 5000)
    //function
    function move() {
        $images.animate({
            left: "" + (-index * width) + "px",
        }, "normal", "swing", function () {
            if (index == 5) {
                index = 1;
                $images.css("left", "" + (-index * width) + "px");
            } else if (index == 0) {
                index = 4;
                $images.css("left", "" + (-index * width) + "px");
            }
            $plis.removeClass("now").eq(index - 1).addClass("now");
        })
    }

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    //滚动过程中搜索框的变化显示
    $(window).on("scroll", function () {
        if (window.scrollY > (100 * width / 768)) {
            $(".search").css("background-color", "#0657a9");
        } else {
            $(".search").css("background-color", "#fff");
        }
    })
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    //关闭广告的效果
    $(".close span").on("click", function () {
        $(".close").animate({opacity: 0}, 500, "swing", function () {
            $(".close").css("display", "none");
            $(".bottom").css("margin-bottom", "" + (140 * width / 768) + "px")
        });
    })
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    //回到顶部的动态效果
    $(".toTop a").on("click", function () {
        clearInterval(timer);
        var timer = setInterval(function () {
            var leader = window.scrollY;
            var step = leader / 15;
            leader = leader - step;
            window.scrollTo(0, leader);
            if (leader == 0) {
                clearInterval(timer);
            }
        }, 20)
    })
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    //主菜单的想相关效果
    //点击按钮菜单渐渐的显示
    $(".menuClick").on("click", function () {
        $(".menuClick").hide();
        $(".menu").animate({width: "" + (360 * width / 768) + "px"}, 500, function () {
            var index = 0;
            var timer = setInterval(function () {
                $(".menu li").eq(index).slideDown(300);
                index++;
            }, 500)
            if (index == $(".menu li").length) {
                clearInterval(timer);
            }
        })
    });
    //排他
    $(".menu li").each(function (index, element) {
        $(element).on("mouseover", function () {
            $(".menu li").removeClass("current");
            $(this).addClass("current");
        });
    })
    //点击其他位置隐藏菜单,并且使得按钮显示
    $(".menu").on("click", function () {
        $(".menu li").slideUp(300);
        $(".menu").animate({width: "0px"}, 500, function () {
            $(".menuClick").show();
        })
    })
})