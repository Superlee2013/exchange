/**
 * Created by Superlee on 2015/11/26.
 */
/**
 * 页面渲染完毕后，调用下列函数，获取个人信息、说说内容
 */
$(document).ready(function () {
    getPersonInformData();
    getMoodPosterData();
    getPostImgPreviewData();
});

/**
 * 生成个人信息内容
 * 从服务器拿到数据，由模版生成html内容
 */
function getPersonInformData() {
    //        生成个人信息
    $.get('/user/listUserInfo', function (data) {
        if(typeof data=="object"){
            createPersonInform(data.user_inform);
            return;
        }
        window.location.href="/login.html";
    });
}

/**
 * 生成说说内容
 * 从服务器拿到数据，由模版生成html内容
 * 参数为页码，默认为1
 */
function getMoodPosterData(pageNo) {
    //生成说说内容
    $.post('/moodPoster/listPersonalMoodPoster', {
        pageNo: pageNo || 1
    }, function (data, textStatus, xhr) {
        if(typeof data=="object"){
            createMoodPoster(data);
            return;
        }
        window.location.href="/login.html";

    })
}

//个人说说生成函数

function getPersonalMoodPosterData(pageNo){
    //生成说说内容
    $.post('/moodPoster/listPersonalMoodPoster', {
        pageNo: pageNo || 1
    }, function (data, textStatus, xhr) {
        if(typeof data=="object"){
            createMoodPoster(data);
            handlePersonalPageNumClick();
            return;
        }
        window.location.href="/login.html";

    })
}

//个人说说界面页码点击函数
function handlePersonalPageNumClick(){
    var pageBox=$('div#mood_poster_module nav ul.pagination li');
    var length=pageBox.length;
    for(var i=1;i<length-1;i++){
        var pageUI=pageBox[i].getElementsByTagName('a')[0];
        var eventString="getPersonalMoodPosterData("+i+")";
        //pageUI.attr('onclick',eventString);
        pageUI.setAttribute('onclick',eventString);
    }
}

//个人收藏生成函数
function getCollectMoodPosterData(pageNo){
    $.post('/moodPoster/listUserCollectMoodPoster',{
        pageNo:pageNo||1
    },function(data){
        if(typeof data=="object"){
            createMoodPoster(data);
            handleCollectPageNumClick();
            return;
        }
        window.location.href="/login.html";
    })
}

//收藏界面页码点击事件
function handleCollectPageNumClick(){
    var pageBox=$('div#mood_poster_module nav ul.pagination li');
    var length=pageBox.length;
    for(var i=1;i<length-1;i++){
        var pageUI=pageBox[i].getElementsByTagName('a')[0];
        var eventString="getCollectMoodPosterData("+i+")";
        //pageUI.attr('onclick',eventString);
        pageUI.setAttribute('onclick',eventString);
    }
}



//个人信息生成函数
// 参数为个人信息，包括头像姓名出生等
function createPersonInform(user_inform) {
    // 由模版生成内容
    var tpl_profile_inform = g("tpl_profile_inform1").innerHTML.replace(/^\s*/, "").replace(/\s*$/, '');
    var tpl_person_inform = g("tpl_person_inform2").innerHTML.replace(/^\s*/, "").replace(/\s*$/, '');

    var img_user_photo='<img src="'+user_inform.user_photo+'" alt="'+user_inform.user_name+'" class="photo">';

    var main_profile_inform = tpl_profile_inform.replace(/{{img_user_photo}}/g,img_user_photo)
        .replace(/{{user_name}}/g, user_inform.user_name)
        .replace(/{{user_signature}}/g, user_inform.user_signature);

    var main_person_inform = tpl_person_inform.replace(/{{mood_num}}/g, user_inform.mood_num)
        .replace(/{{collection_num}}/g, user_inform.collection_num)
        .replace(/{{attention_num}}/g, user_inform.attention_num)
        .replace(/{{user_place}}/g, user_inform.user_place)
        .replace(/{{user_birthday}}/g, user_inform.user_birthday)
        .replace(/{{user_signature}}/g, user_inform.user_signature);

    g("profile_inform1").innerHTML = main_profile_inform;
    g("person_inform2").innerHTML = main_person_inform;
}




