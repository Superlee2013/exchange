/**
 * Created by Superlee on 2015/12/4.
 */
/*说说模块内容生成函数*/
function createMoodPoster(mood_poster_data) {
    var main_module_mood_poster = "";
    var module_mood_poster = g('tpl_mood_poster_module').innerHTML.replace(/^\s*/, "").replace(/\s*$/, '');

    var tpl_mood_poster_item = g('tpl_mood_poster').innerHTML.replace(/^\s*/, "").replace(/\s*$/, '');//说说模版代码
    var tpl_page_item = g('tpl_mood_poster_page').innerHTML.replace(/^\s*/, "").replace(/\s*$/, '');//页面代码
    var tpl_mood_poster_comment_item = g('tpl_mood_poster_comment').innerHTML.replace(/^\s*/, "").replace(/\s*$/, '');//评论代码
    //var tpl_mood_poster_picture = g('tpl_mood_poster_picture').innerHTML.replace(/^\s*/, "").replace(/\s*$/, '');//图片代码
    var tpl_mood_poster_more_ctrl = g('tpl_mood_poster_more_ctrl').innerHTML.replace(/^\s*/, "").replace(/\s*$/, '');//更多按钮

    var main_mood_poster = [];
    var main_page = [];

    var current_user_id = mood_poster_data.current_user_id;

    //生成页数html代码
    var current_page = mood_poster_data.current_page;
    for (var i = 1; i <= mood_poster_data.total_page; i++) {
        var page_item = tpl_page_item.replace(/{{page_num}}/g, i)
            .replace(/{{page_class}}/g, current_page == i ? 'active' : "");
        main_page.push(page_item);
    }


    //生成说说html代码
    for (var i = 0; i < mood_poster_data.mood_poster.length; i++) {
        var mood_poster_item_data = mood_poster_data.mood_poster[i];//每条说说数据
        var mood_poster_item = createMoodPosterItemHtml(mood_poster_item_data, current_user_id, tpl_mood_poster_item, tpl_mood_poster_more_ctrl, tpl_mood_poster_comment_item);
        //将说说条目添加到容器中
        main_mood_poster.push(mood_poster_item);
    }

    //替换说说模块
    main_module_mood_poster = module_mood_poster.replace(/{{mood_poster_list}}/g, main_mood_poster.join(""))
        .replace(/{{mood_poster_page_list}}/g, main_page.join(""));
    //替换页数
    // main_module_mood_poster=module_mood_poster.replace(/{{mood_poster_page_list}}/g,main_page.join(""));

    g('mood_poster_module').innerHTML = main_module_mood_poster;

    /*为每条说说按钮添加事件*/
    addEventToMoodPosterCtrlItem();
}

/**
 * 由后台返回的数据生成评论条目html内容
 * @param comment_data 评论数据
 * @param tpl_comment 评论样式模版
 * @returns {string|XML} 评论html代码
 */
function createCommentItemHtml(comment_data, tpl_comment) {
    var item_comment_role = comment_data.data_role;//评论角色，是评论还是回复
    var item_comment_className = '';//评论样式
    if (item_comment_role == 'comment') {
        item_comment_className = ' mood-poster-item-comment-item ';
        // html_comment_item=html_comment_item.replace(/{{class_ui_by_role}}/g,' mood-poster-item-comment-item ');
    }
    else if (item_comment_role == 'reply') {
        item_comment_className = ' mood-poster-item-comment-item mood-poster-comment-reply';
    }
    else {
        item_comment_className = 'hide';
    }

    var img_commenter_photo = '<img src="' + comment_data.commenter_photo + '">';

    var html_comment_item = tpl_comment.replace(/{{comment_id}}/g, comment_data.comment_id)
        .replace(/{{parent_id}}/g, comment_data.parent_id)
        .replace(/{{data_role}}/g, comment_data.data_role)
        .replace(/{{img_commenter_photo}}/g, img_commenter_photo)
        .replace(/{{commenter_name}}/g, comment_data.commenter_name)
        .replace(/{{comment_content}}/g, comment_data.comment_content)
        .replace(/{{comment_time}}/g, comment_data.comment_time)
        .replace(/{{class_ui_by_role}}/g, item_comment_className);
    return html_comment_item;
}

/**
 * 生成每条说说html代码
 * @param mood_poster_item_data 说说数据
 * @param current_user_id 当前登陆用户id
 * @param tpl_mood_poster_item 说说样式模版
 * @param tpl_mood_poster_more_ctrl 说说内部更多按钮模块“按钮”样式模版
 * @param tpl_mood_poster_comment_item 说说内部评论模块“评论”样式模版
 * @returns {string|XML} 说说html代码
 */
function createMoodPosterItemHtml(mood_poster_item_data, current_user_id, tpl_mood_poster_item, tpl_mood_poster_more_ctrl, tpl_mood_poster_comment_item) {
    var item_img_data = mood_poster_item_data.mood_poster_picture;//图片数据，数组
    var item_comment_data = mood_poster_item_data.mood_poster_comment;//评论数据，数组

    var current_user_like = mood_poster_item_data.current_user_like;//用户是否点赞
    var current_user_collect = mood_poster_item_data.current_user_collect;//用户是否收藏
    var mood_poster_like = mood_poster_item_data.mood_poster_like_count;//该条说说被点赞次数

    //修改部分
    var like_content = (current_user_like == true ? '取消赞' : '赞');
    var like_count = (mood_poster_like == 0 ? '' : '(' + mood_poster_like + ')');
    var collection_content = (current_user_collect ? '取消收藏' : '收藏');

    //更多按钮是否显示
    var html_moodPoster_more_ctrl = "";
    if (current_user_id != null && current_user_id == mood_poster_item_data.mood_poster_user_id) {
        html_moodPoster_more_ctrl = tpl_mood_poster_more_ctrl.replace(/{{moodPoster_id}}/g, mood_poster_item_data.mood_poster_id);
    }

    //说说图片html
    var img_mood_poster_user_photo = '<img src="' + mood_poster_item_data.mood_poster_user_photo + '" alt="">';

    //说说主题内容区域
    var mood_poster_item = tpl_mood_poster_item.replace(/{{mood_poster_id}}/g, mood_poster_item_data.mood_poster_id)
        .replace(/{{img_mood_poster_user_photo}}/g, img_mood_poster_user_photo)
        .replace(/{{mood_poster_user_name}}/g, mood_poster_item_data.mood_poster_user_name)
        .replace(/{{mood_poster_time}}/g, mood_poster_item_data.mood_poster_time)
        .replace(/{{mood_poster_total_view}}/g, mood_poster_item_data.mood_poster_total_view)
        .replace(/{{mood_poster_content}}/g, mood_poster_item_data.mood_poster_content)
        .replace(/{{current_user_like}}/g, current_user_like)
        .replace(/{{current_user_collect}}/g, current_user_collect)
        .replace(/{{like_content}}/g, like_content).replace(/{{like_count}}/g, like_count)
        .replace(/{{collection_content}}/g, collection_content)
        .replace(/{{mood_poster_more_ctrl}}/g, html_moodPoster_more_ctrl);

    //替换图片
    var img_data = [];
    if (item_img_data) {
        for (var j = 0; j < item_img_data.length; j++) {
            //var img_source = item_img_data[j];
            var item_img = '<img src="' + item_img_data[j] + '">';
            img_data.push(item_img);
        }
    }

    //替换评论模版
    var comment_data = [];
    if (item_comment_data) {
        for (var k = 0; k < item_comment_data.length; k++) {
            var item_comment = item_comment_data[k];
            //生成每条评论的html代码，添加到数组中
            var html_comment_item = createCommentItemHtml(item_comment, tpl_mood_poster_comment_item);
            comment_data.push(html_comment_item);
        }
    }

    //替换图片列表和评论列表
    mood_poster_item = mood_poster_item.replace(/{{mood_poster_picture_list}}/g, img_data.join(''))
        .replace(/{{mood_poster_comment_list}}/g, comment_data.join(''));
    return mood_poster_item;
}

/*说说条目中元素添加事件*/
/*.mood-poster-item-ui*/
function addEventToMoodPosterCtrlItem() {
    var moodPosterId, commentId, content, role;
    var $textArea;
    var $commentList;
    var $replyItem;
    var atParentComment;
    /*textarea焦点事件*/
    $('.mood-poster-item-ui textarea').focus(function () {
        $textArea = $(this);
        $commentList = $textArea.parent().prev();
        $(this).attr('rows', 3);
        $(this).next().removeClass('hide');
    }).blur(function () {
        moodPosterId = $(this).attr("data-mid");
        //role = $(this).attr("data-role");
        content = $(this).val();
        if (content.length == 0) {
            $(this).attr('rows', 1);
            $(this).next().addClass('hide');
            role = undefined;
            commentId = undefined;
        }
    });

    /*"评论"按钮点击事件*/
    $('.mood-poster-item-ui a.mood-poster-item-foot-ctrl[data-role="comment"]').click(function () {
        var $item = $(this);
        var $commentArea = $item.closest('.mood-poster-item-foot').find('.mood-poster-comment-ui').children('textarea');
        if (role == "reply") {
            $commentArea.val("");
        }
        role = "comment";
        $commentArea.focus();
    });

    /*回复按钮点击事件*/
    $('.mood-poster-item-ui div.mood-poster-item-comment-list ').on("click", "div.mood-poster-comment-item-content p a[data-role='reply']", function () {
        var $item = $(this);
        var $replyObject = $item.parent().prev().find('a');
        $replyItem = $item.parent().parent().parent();
        commentId = $item.attr('data-cid');
        atParentComment = "回复<a href='" + $replyObject.attr('href') + "'>" + $replyObject.html() + "</a> ";
        var $commentArea = $item.closest('.mood-poster-item-foot').find('.mood-poster-comment-ui').children('textarea');
        if (role == "comment") {
            $commentArea.val("");
        }
        role = "reply";
        $commentArea.focus();
    });

    //TODO:安全隐患：用户修改前台data属性源代码
    /*评论"发表"按钮点击事件*/
    $('.mood-poster-item-ui .btn-comment').click(function () {
        if (role == "reply") {
            content = atParentComment + content;
        }
        $.post('/comment/publishComment', {
            moodPosterId: moodPosterId || -1,
            parentCommentId: commentId || -1,
            role: role || "comment",
            content: content
        }, function (data) {
            var role = data.comment.data_role;
            var tpl_comment = g('tpl_mood_poster_comment').innerHTML.replace(/^\s*/, "").replace(/\s*$/, '');//评论代码
            var html_comment = createCommentItemHtml(data.comment, tpl_comment);
            if (role == "comment") {
                $commentList.append(html_comment);
            }
            else if (role == "reply") {
                $replyItem.after(html_comment);
            }
            $textArea.val("").blur();


        });

    });

    /*点赞按钮事件*/
    $('.mood-poster-item-ui .mood-poster-item-foot-ctrl[data-action="like"]').click(function (event) {
        var $likeUI = $(this), $likeContentUI = $('span.like-content', this), $likeCountUI = $('span.like-count', this);
        var isLike = $(this).attr('data-isLike');
        var moodPosterId = $(this).attr('data-mid');
        var willContent = (isLike == 'true' ? '赞' : '取消赞');
        var willLike = (isLike == 'true' ? 'false' : 'true');
        $.post('/attitude/updateAttitudeLike', {
            moodPosterId: moodPosterId
        }, function (data) {
            var like_count = data.result;
            $likeUI.attr('data-isLike', willLike);
            $likeContentUI.html(willContent);
            $likeCountUI.html(like_count == 0 ? '' : '(' + like_count + ')');//后台返回的赞总人数
        });
    });

    /*收藏按钮事件*/
    $('.mood-poster-item-ui .mood-poster-item-foot-ctrl[data-action="collect"]').click(function (event) {
        var $collectUI = $(this), $collectContentUI = $('span.collection-content', this);
        var isCollect = $(this).attr('data-isCollect');
        var moodPosterId = $(this).attr('data-mid');
        var willContent = (isCollect == 'true' ? '收藏' : '取消收藏');
        var willCollect = (isCollect == 'true' ? 'false' : 'true');
        $.post('/attitude/updateAttitudeCollect', {
            moodPosterId: moodPosterId
        }, function (data) {
            $collectUI.attr('data-isCollect', willCollect);
            $collectContentUI.html(willContent);
            changeUserInfoCollectNum(data.result);
        });
    });
}

/*从服务器拿到上传图片的路径，并加入预览区预览*/
function getPostImgPreviewData() {
    $.get('/imageSend/listPreviewImg', function (data) {
        if (data instanceof Array && data != null && data.length > 0) {
            for (var s in data) {
                addToImgPreviewBox(data[s]);
            }
            $("#mood-poster-img-upload").css('display', 'block');
        }
    })
}

/*点击显示图片添加框*/
(function (img_btn, img_box) {
    img_btn.click(function (event) {
        if (img_box.css('display') == 'none') {
            img_box.css('display', 'block');
        }
        else {
            img_box.css('display', 'none');
        }
    });
})($("#btn-img"), $("#mood-poster-img-upload"));

/* 上传图片*/
(function () {
    var upArea = document.getElementById("upImg-area");
    var imgFile = document.getElementById("imgFile");

    upArea.addEventListener("click", function () {
        imgFile.click();
    });

    imgFile.addEventListener("change", function (e) {
        uploadFile(this.files);
    });

    /*上传图片*/
    function uploadFile(fs) {
        console.log(fs);
        var len = fs.length;
        for (var i = 0; i < len; i++) {
            sendFile(fs[i]);
        }
    }

    /*发送图片*/
    function sendFile(file) {
        var form_data = new FormData();
        form_data.append('file', file);

        /*手动构造XMLHttpRequest对象
         var xhr = new XMLHttpRequest();
         xhr.onreadystatechange=function(){
         if(xhr.readyState==4 && xhr.status==200){
         console.log(xhr.responseText);
         }
         };
         xhr.open('POST','/imageSend/sendMoodPosterImage');
         xhr.send(form_data);*/

        $.ajax({
            url: '/imageSend/sendMoodPosterImage',
            type: 'POST',
            dataType: 'json',
            data: form_data,
            processData: false,
            contentType: false
        }).done(function (data) {
            var imgPath = data.result;
            addToImgPreviewBox(imgPath);
        });
    }
})();

var img_preview_count = 0;//添加id号，递增，便于后面的查找到div,然后删除
//由服务器返回的图片路径向图片预览区添加图片
function addToImgPreviewBox(imgPath) {
    var img_tpl = g("tpl_img_preview_box").innerHTML.replace(/^\s*/, "").replace(/\s*$/, '');
    var img_preview = '<img src="' + imgPath + '">';
    var img_html = img_tpl.replace(/{{img_preview}}/g, img_preview)
        .replace(/{{img_preview_path}}/g, imgPath)
        .replace(/{{id}}/g, img_preview_count);
    $('#img-preview-box').prepend(img_html);
    img_preview_count++;
}

/*从预览区删除图片，并通过路径删除服务器上的文件*/
function removeFromImgPreViewBox(imgPath, imgId) {
    $.post('/imageSend/deleteMoodPosterImage', {
        delImgPath: imgPath
    }, function (data, textStatus, xhr) {
        if (data.result == "success") {
            $(imgId).remove();
        }
    })
}

/**
 * 点击发送按钮发送说说
 * 1.发送说说文本
 * 2.将上传到服务器的图片与说说关联并将路径存入数据库(后台)
 * 3.发送成功，清空发送说说面板（textarea、图片预览区）
 */
$('#btn-send').click(function (event) {
    var content = $('textarea#mood-poster-content').val();
    var type = "hopeful";
    if (content == "") {
        showAndHideTipBox(g("me-tipbox"), 1000, "说说内容不能为空");
        return;
    }
    $.post('/moodPoster/publishMoodPoster',
        {
            content: content,
            type: type
        }, function (data, textStatus, xhr) {
            var result = data.result;
            getMoodPosterData();
            showAndHideTipBox(g("me-tipbox"), 1000, "发表成功");
            //清空说说面板
            $('textarea#mood-poster-content').val('');
            $('#img-preview-box').empty();
            $("#mood-poster-img-upload").css('display', 'none');
            img_preview_count = 0;
            changeUserInfoMoodPosterNum(result);
        });
});

/*向后台发送评论数据并得到返回值*/
function publishComment(moodPosterId, commentId, content, role) {
    $.post('/comment/publishComment', {
        moodPosterId: moodPosterId || -1,
        parentCommentId: commentId || -1,
        role: role || "comment",
        content: content
    })
}

//改变用户信息区域的用户收藏数量
function changeUserInfoCollectNum(collect_num) {
    var $userCollectNum = $('div#person_inform2 strong#user-collect-num');
    if ($userCollectNum.length > 0) {
        $userCollectNum.html(collect_num);
    }
}

//改变用户信息区域的用户说说数量
function changeUserInfoMoodPosterNum(moodPoster_num) {
    var $userMoodPosterNum = $('div#person_inform2 strong#user-mood-num');
    if ($userMoodPosterNum.length > 0) {
        $userMoodPosterNum.html(moodPoster_num);
    }
}

//改变用户信息区域的用户关注数量
function changeUserInfoAttentionNum(attention_num) {
    var $userAttentionNum = $('div#person_inform2 strong#user-attention-num');
    if ($userAttentionNum.length > 0) {
        $userAttentionNum.html(attention_num);
    }
}

//删除说说
function deleteMoodPoster(moodPosterId) {
    $.post('/moodPoster/deleteMoodPoster', {
        moodPosterId: moodPosterId
    }, function (data) {
        var result = data.result.split(',');
        getMoodPosterData();
        changeUserInfoMoodPosterNum(result[0]);
        changeUserInfoCollectNum(result[1]);
        showAndHideTipBox(g("me-tipbox"), 1000, "删除成功");
    });
}

/**
 * 时间轴函数
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

function showTimeLineDialog(moodPoster_id){
    showDialog();
    //为弹出框隐藏input赋值,传递mood id
    $('div#dialog .ui-dialog-content .ui-dialog-form input[name="mood_id"]').val(moodPoster_id);
    $('div#dialog .ui-dialog-content .ui-dialog-form input[name="mood_title"]').focus();
}

function addToTimeLineStory(){
    var title=$('div#dialog .ui-dialog-content .ui-dialog-form input[name="mood_title"]').val();
    var id=$('div#dialog .ui-dialog-content .ui-dialog-form input[name="mood_id"]').val();
    if(title==""){
        showAndHideTipBox(g("me-tipbox"),1000,"先起个名字吧");
        return;
    }
    $.post('/timeline/addToTimeline',{
        title:title,
        moodPosterId:id
    },function(data){
        var result=data.result;
        if(result=="success"){
            showAndHideTipBox(g("me-tipbox"),1000,"添加成功");
        }
        else if(result=="error"){
            showAndHideTipBox(g("me-tipbox"),1000,"操作失败");
        }
        else if(result=="exist"){
            showAndHideTipBox(g("me-tipbox"),1000,"该条心情已经加入");
        }
        hideDialog();
    })
}




