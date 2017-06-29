/**
 * Created by jf on 2016/4/3.
 */
window.onload = function () {
    //alert("haha");
    //找人
    var wrap = document.getElementById("wrap");
    var slide = document.getElementById("slide");
    var ul = slide.children[0];
    var lis = ul.children;
    var arrow = document.getElementById("arrow");

    var config = [
        {
            width: 400,
            top: 20,
            left: 50,
            opacity: 0.2,
            zIndex: 2
        },//0
        {
            width: 600,
            top: 70,
            left: 0,
            opacity: 0.8,
            zIndex: 3
        },//1
        {
            width: 800,
            top: 100,
            left: 200,
            opacity: 1,
            zIndex: 4
        },//2
        {
            width: 600,
            top: 70,
            left: 600,
            opacity: 0.8,
            zIndex: 3
        },//3
        {
            width: 400,
            top: 20,
            left: 750,
            opacity: 0.2,
            zIndex: 2
        }//4
    ];//其实就是一个配置单 规定了每张图片的大小位置层级透明度


    //鼠标经过wrap 让arrow渐渐地显示
    wrap.onmouseover = function () {
        animate(arrow, {"opacity": 1});
    }
    // 鼠标离开wrap让arrow隐藏
    wrap.onmouseout = function () {
        animate(arrow, {"opacity": 0});
    }

    //循环遍历 给每一个li添加配置 让他们各就各位
    for (var i = 0; i < lis.length; i++) {
        animate(lis[i], config[i]);
    }


}