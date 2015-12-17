/**
 * Created by Superlee on 2015/11/26.
 */
//查找元素
var g = function (id) {
    if (id.substr(0, 1) == '.') {
        return document.getElementsByClassName(id.substr(1));
    }
    return document.getElementById(id);
}

//提示框的显示与隐藏
function showAndHideTipBox(el,time,content){
    el.innerHTML=content;
    el.style.opacity=1;
    el.style.top="20%";
    window.setTimeout(function(){
        el.style.opacity=0;
        el.style.top="0px";
    },time);
}

/*元素在屏幕居中*/
function autoCenter(el){
    var bodyW=document.documentElement.clientWidth;
    var bodyH=document.documentElement.clientHeight;

    var elW=el.offsetWidth;
    var elH=el.offsetHeight;

    el.style.left=(bodyW-elW)/2 +"px";
    el.style.top=(bodyH-elH)/2 -100 +"px";
}

/*遮罩函数*/
function fillToBody(el){
    var bodyW=document.documentElement.clientWidth;
    var bodyH=document.documentElement.clientHeight;

    el.style.width=bodyW +"px";
    el.style.height=bodyH+"px";
}

