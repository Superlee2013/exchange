/**
 * Created by Superlee on 2015/12/3.
 */
$(document).ready(function () {
    $('#fullpage').fullpage({
        menu: '#menu',
        anchors: ['firstPage', 'secondPage', '3rdPage']
    });

    initData();
    addContactToProvinceCityArea(cityData, $('#province-select'), $('#city-select'), $('#area-select'));
});

function initData() {
    $.get('/user/listUserInfo', function (data) {
        if(data instanceof Object) setProfile(data.user_inform);
        else{
            window.location.href="/login.html";
        }
    })
}

/*初始化时设置个人信息*/
function setProfile(data) {
    $('#profile input[name="nickname"]').val(data.user_name);
    if(data.user_place!=null) initAddress(data.user_place);
    $('#profile input[name="birthday"]').val(data.user_birthday);
    $('#profile textarea[name="signature"]').val(data.user_signature);
    $('#section1 .photo-view img').attr('src', data.user_photo);
}

/*更新个人信息*/
function updateProfile() {
    var data = {
        nickname: $('#profile input[name="nickname"]').val(),
        address: $('#province-select').val() + "&nbsp;" + $('#city-select').val() + "&nbsp;" + $('#area-select').val(),
        birthday: $('#profile input[name="birthday"]').val(),
        signature: $('#profile textarea[name="signature"]').val()
    };
    $.post('/user/updateUserInfo', data, function (data) {
        if(data.result=="success"){
            showAndHideTipBox(g("me-tipbox"), 1000, "更新个人信息成功");
        }
    })
}

//图片上传
(function () {
    var upBtn = document.getElementById("upload-btn");
    var imgFile = document.getElementById("user-photo");

    upBtn.addEventListener("click", function () {
        imgFile.click();
    });

    imgFile.addEventListener("change", function (e) {
        uploadFile(this.files);
    });

    //上传图片
    function uploadFile(fs) {
        console.log(fs);
        var len = fs.length;
        for (var i = 0; i < len; i++) {
            sendFile(fs[i]);
        }
    }

    //发送图片
    function sendFile(file) {
        var form_data = new FormData();
        form_data.append('file', file);
        // ajax动态添加头像预览
        $.ajax({
            url: '/imageSend/updateUserPhoto',
            type: 'POST',
            dataType: 'json',
            data: form_data,
            processData: false,
            contentType: false
        }).done(function (data) {
            var imgPath = data.result;
            $('#section1 .photo-view img').attr('src', imgPath);
            showAndHideTipBox(g("me-tipbox"), 1000, "更新头像成功");
        });
    }

})();

/*添加省市区联动，参数为数据和省市区的dom对象jquery对象*/
function addContactToProvinceCityArea(data, province, city, area) {
    //初始化省数据
    createOption(data, province, 2);

    /*省对象改变时同时改变市数据和区数据*/
    province.change(function (event) {
        city.empty();
        area.empty();
        var province_value = $(this).val();
        // 改变city值
        var city_data = findCityByProvince(data, province_value);

        createOption(city_data, city, 1);

        // 改变area值
        var area_data = findAreaByProvinceCity(data, province_value, city.val());

        createOption(area_data, area, 0);
    });
    /*市对象改变时改变区数据*/
    city.change(function (event) {
        area.empty();
        var province_value = province.val();
        var city_value = $(this).val();

        var area_data = findAreaByProvinceCity(data, province_value, city_value);

        createOption(area_data, area, 0);
    });
}

/*通过省名查找对应的市名*/
function findCityByProvince(json_data, province) {
    for (var index in json_data) {
        if (json_data[index].name == province) {
            return json_data[index].city;
        }
    }
}
/*通过省市名查找对应的区域名*/
function findAreaByProvinceCity(json_data, province, city) {
    var city_data = findCityByProvince(json_data, province);
    for (var index in city_data) {
        if (city_data[index].name == city) {
            return city_data[index].area;
        }
    }
}

/*根据数据生成option*/
/*level等级：省：2，市：1，县：0*/
function createOption(data, el, level) {
    if (data == null) return;
    if (level != 0) {
        $.each(data, function (index, val) {
            /* iterate through array or object */
            var option = '<option value="' + val.name + '">' + val.name + '</option>';
            el.append(option);
        });
    }
    else {
        $.each(data, function (index, val) {
            var option = '<option value="' + val + '">' + val + '</option>';
            el.append(option);
        });
    }
}

/*根据返回的地址初始化地址选择区域*/
function initAddress(place) {
    var address = place.split("&nbsp;");
    var cityOption = '<option value="' + address[1] + '" selected="selected">' + address[1] + '</option>';
    var areaOption = '<option value="' + address[2] + '" selected="selected">' + address[2] + '</option>';

    $('#province-select').val(address[0]);
    //TODO:生成所有的市和区选择
    $('#city-select').append(cityOption);
    $('#area-select').append(areaOption);
}

/**
 *修改密码部分 函数
 */

function checkPassword(){
    var old_password=$('#set-password input[name="old_password"]').val();
    if(old_password==""){
        showAndHideTipBox(g("me-tipbox"), 1000, "请输入原始密码");
        return;
    }
    $.post('/user/checkOldPassword',{
        oldPassword:old_password
    },function(data){
        var result=data.result;
        if(result=="success"){
            showAndHideTipBox(g("me-tipbox"), 1000, "当前密码正确");
        }
        else if(result=="error"){
            showAndHideTipBox(g("me-tipbox"), 1000, "密码错误，请重新输入");
        }
    })
}

function changePassword(){
    var new_password=$('#set-password input[name="new_password"]').val();
    var confirm_password=$('#set-password input[name="confirm_password"]').val();

    var old_password=$('#set-password input[name="old_password"]').val();
    if(old_password==""){
        showAndHideTipBox(g("me-tipbox"), 1000, "请输入原始密码");
        return;
    }

    if(new_password==confirm_password&& new_password!=""){
        $.post('/user/changePassword',{
            newPassword:new_password
        },function(data){
            var result=data.result;
            if(result=="success"){
                showAndHideTipBox(g("me-tipbox"), 1000, "修改成功，请重新登陆");
                setTimeout(function(){
                    window.location.href="/login.html";
                },1500)
            }
        })
    }

    else if(new_password==""){
        showAndHideTipBox(g("me-tipbox"), 1000, "密码不能为空哦");
    }
    else if(new_password!=confirm_password){
        showAndHideTipBox(g("me-tipbox"), 1000, "两次密码输入不一致");
    }
}