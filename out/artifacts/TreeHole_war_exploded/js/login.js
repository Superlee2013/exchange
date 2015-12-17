/**
 * Created by Superlee on 2015/11/26.
 */
var isUsernameExist;
$(document).ready(function () {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage'],
        navigation: true,
        navigationPosition: 'right',
        css3: true

        // verticalCentered:false,
    });

    var $form_signIn = $('form#form_signIn');
    var $form_register = $('form#form_register');

    //点击切换登陆注册按钮
    $('a.fast_link_btn').click(function (event) {
        var $btn = $(this)[0];
        var data_action = $btn.getAttribute("data-action");
        if (data_action == "register") {
            $btn.setAttribute("data-action", "signIn");
            $btn.innerHTML = "登陆";
            show($form_register, $form_signIn);
            return;
        }
        $btn.setAttribute("data-action", "register");
        $btn.innerHTML = "注册";
        show($form_signIn, $form_register);
    });

    function show(el_show, el_hide) {
        el_show.stop().animate({
                height: '250px',
                opacity: 1
            },
            'normal', function () {
                /* stuff to do after animation is complete */
                el_hide.css({
                    height: '0px',
                    bottom: '0px',
                    opacity: 0
                });
            });
    }

    //注册事件用户名输入框判断
    $('#form_register input[name="username"]')[0].addEventListener('blur', function () {
        // alert("hahah");
        //TODO:ajax见擦用户名是否存在
        var username = $('#form_register input[name="username"]')[0].value;
        $.ajax({
            url: '/user/checkUserName',
            type: 'POST',
            dataType: 'json',
            data: "username=" + username,
            success: function (data) {
                var result=data.result;
                if(result=="redundancyUser"){
//                            $("#username_register_result").removeClass('hide').addClass('show');
                    showAndHideTipBox(g("me-tipbox"),1000,"用户名已存在");
                }
            }
        });
    });

    $('#form_register input[name="password"]')[0].addEventListener('blur',function(){
        var password = $('#form_register input[name="password"]')[0].value;
        if(password==""){
            showAndHideTipBox(g("me-tipbox"),1000,"密码不能为空");
        }
    });

    $('#form_register input[name="confirm_password"]')[0].addEventListener('blur', function () {
        var password = $('#form_register input[name="password"]')[0].value;
        var confirm_password = $('#form_register input[name="confirm_password"]')[0].value;
        if (confirm_password !== password) {
            showAndHideTipBox(g("me-tipbox"),1000,"两次输入密码不一致");
        }
    });
});

//提交注册表单
function register() {
    //TODO:2.检查用户名和密码是否为空
    var username = $('#form_register input[name="username"]')[0].value;
    var password = $('#form_register input[name="password"]')[0].value;
    var confirm_password = $('#form_register input[name="confirm_password"]')[0].value;
//            if (username==""||password==""||confirm_password !== password) return;
    if(!checkUserValid(username,password,confirm_password)) return;
    //$("form#form_register").submit();
    //showDialog();
    //$('div#dialog .ui-dialog-content input[name="identifyCode"]').focus();//验证码输入框获取焦点
    sendIndetifyCode(username);
}

function fetchPassword(){
    var toAddress=$('#form_signIn input[name="username"]')[0].value;
    //TODO:检查邮箱格式是否正确
    if(toAddress==""){
        showAndHideTipBox(g("me-tipbox"),1000,"请输入您的用户名(邮箱地址)");
        return;
    }

    $.post('/email/fetchUserPassword',{
        toAddress:toAddress
    },function(data){
        var result=data.result;
        if(result=="error"){
            showAndHideTipBox(g("me-tipbox"),1000,"您的邮箱地址输入错误");
            return;
        }
        showAndHideTipBox(g("me-tipbox"),3000,"我们已经向您注册的此邮箱中发送您的密码，请登陆邮箱查收您的密码");
    })
}

function sendIndetifyCode(user_email){
    //TODO:检查邮箱格式是否合法
    $.post('/email/sendIdentiFyCode',{
        toAddress:user_email
    },function(data){
        var result=data.result;
        if(result=="success"){
            showDialog();
            $('div#dialog .ui-dialog-content input[name="identifyCode"]').focus();//验证码输入框获取焦点
        }
        else if(result=="error"){
            showAndHideTipBox(g("me-tipbox"),1000,"您的邮箱可能不存在");
        }
        else if(result=="redundancyUser"){
            showAndHideTipBox(g("me-tipbox"),1000,"该邮箱已被注册");
        }
    });
}




//提交登陆表单
function signIn() {
    //TODO:1.检查用户名和密码是否为空
//            $("form#form_signIn").submit();
    var username=$('#form_signIn input[name="username"]')[0].value;
    var password=$('#form_signIn input[name="password"]')[0].value;
    //TODO:2.用户名或密码为空时显示提示
    if(!checkUserValid(username,password)) return;
    //发送请求
    $.ajax({
        url:'/user/signIn',
        type:'POST',
        dataType:'json',
        data:{"username":username,"password":password},
        success:function(data){
            var result=data.result;
            console.log(result);
            if(result=="noThisUser"){
                showAndHideTipBox(g("me-tipbox"),1000,"无此用户名");
            }
            else if(result=="passwordWrong"){
                showAndHideTipBox(g("me-tipbox"),1000,"密码错误");
            }
            else if(result=="success"){
                window.location.href="/index.html";
            }
        }
    })

}

function checkUserValid(username,password,confirm_password){
    var flag=true;
    if(username=="") flag=false;
    else if(password=="") flag=false;
    else if(confirm_password!=undefined){
        if(confirm_password !== password) flag=false;
    }
    return flag;
}
