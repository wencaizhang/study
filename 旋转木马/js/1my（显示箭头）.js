/**
 * Created by jf on 2016/4/3.
 */
window.onload = function () {
    //alert("haha");
    //找人
    var wrap = document.getElementById("wrap");
    var arrow = document.getElementById("arrow");
    //鼠标经过wrap 让arrow渐渐地显示
    wrap.onmouseover = function () {
        animate(arrow, {"opacity": 1});
    }
    // 鼠标离开wrap让arrow隐藏
    wrap.onmouseout = function () {
        animate(arrow, {"opacity": 0});
    }

}