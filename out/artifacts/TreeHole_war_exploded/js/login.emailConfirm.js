/**
 * Created by Superlee on 2015/12/10.
 */
window.onresize=function(){
    autoCenter(g("dialog"));
    fillToBody(g("mask"));
};
function showDialog(){
    g("dialog").style.display="block";
    g("mask").style.display="block";

    autoCenter(g("dialog"));
    fillToBody(g("mask"));
}

function hideDialog(){
    g("dialog").style.display="none";
    g("mask").style.display="none";
}

/*为验证码确定按钮添加事件*/
function checkIndentifyCode(){
  var identifyCode= $('div#dialog div.ui-dialog-content input[name="identifyCode"]').val();
    if(identifyCode.length!=6){
        showAndHideTipBox(g("me-tipbox"),1000,"验证码位数有误");
        return;
    }
    $.post('/email/checkIndentiFyCode',{
        identifyCode:identifyCode
    },function(data){
        var result=data.result;
        if(result=="success"){
            $("form#form_register").submit();
            return;
        }
        else{
            showAndHideTipBox(g("me-tipbox"),1000,"验证无效,请重新输入验证码");
            return;
        }
    });
}

/*为对话框添加拖拽事件*/
(function(){
    var mouseOffsetX=0;
    var mouseOffsetY=0;
    var isDragging=false;

    //鼠标拖动事件
    //1.鼠标按下事件
    g("dialog-title").addEventListener("mousedown",function(e){
        var e= e||window.event;

        mouseOffsetX=e.pageX-g("dialog").offsetLeft;
        mouseOffsetY=e.pageY-g("dialog").offsetTop;
        isDragging=true;
    });

    //2.鼠标松开事件，针对于窗口document对象
    document.onmouseup=function(){
        isDragging=false;
    };

    //3.鼠标移动事件
    document.onmousemove=function(e){
        var e=e||window.event;

        var mouseX=e.pageX;
        var mouseY=e.pageY;

        var moveX=0;
        var moveY=0;

        if(isDragging===true){

            moveX=mouseX-mouseOffsetX;
            moveY=mouseY-mouseOffsetY;

            var pageWidth=document.documentElement.clientWidth;
            var pageHeight=document.documentElement.clientHeight;

            var dialogWidth=g("dialog").offsetWidth;
            var dialogHeight=g("dialog").offsetHeight;

            var maxX=pageWidth-dialogWidth;
            var maxY=pageHeight - dialogHeight;

            moveX=Math.min(maxX,Math.max(0,moveX));
            moveY=Math.min(maxY,Math.max(0,moveY));

            g("dialog").style.left=moveX +"px";
            g("dialog").style.top=moveY + "px";
        }
    }
})();