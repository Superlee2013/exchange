/**
 * Created by Superlee on 2015/12/17.
 */
/**
 * 页面渲染完毕后，获取timeline数据，并生成timelinehtml
 */
$(document).ready(function () {
    getPersonalTimeline();
});

/*获取个人时间轴数据*/
function getPersonalTimeline() {
    $('#timeline').height(document.documentElement.clientHeight);
    $.get('/timeline/listPersonalTimeline', function (data) {
        if (typeof data == "object") {
            var timelineData = handleTimelineData(data).timelineData;
            timeline.createTimeline(timelineData);
            handleTitleClick();
            return;
        }
        window.location.href = "/login.html";
    })
}

function handleTitleClick() {
    /*浏览点中说说*/
    $('div#my-timeline').on("click", 'div.timeline-content-title', function (event) {
        var $item = $(this);
        var id = $item.attr('data-poster');
        if (id != "undefined") {
            g('mood_poster_module').innerHTML="";
            showDialog();
            $.post('/moodPoster/listTimelineMoodPoster', {
                moodPosterId: id
            }, function (data) {
                var moodPosterdata = data.moodPoster;
                var tpl_mood_poster_item = g('tpl_mood_poster').innerHTML.replace(/^\s*/, "").replace(/\s*$/, '');//说说模版代码
                var tpl_mood_poster_comment_item = g('tpl_mood_poster_comment').innerHTML.replace(/^\s*/, "").replace(/\s*$/, '');//评论代码
                var html_timeline_mood=createMoodPosterItemHtml(moodPosterdata,tpl_mood_poster_item,tpl_mood_poster_comment_item);
                g('mood_poster_module').innerHTML=html_timeline_mood;
                addEventToMoodPosterCtrlItem();
            })
        }
    });
}

function dropFromTimeline(moodPosterId){
    $.post('/timeline/dropFromTimeline',{
        moodPosterId:moodPosterId
    },function(data){
        var result=data.result;
        if(result=="success"){
            location.reload();
        }
    })
}

function showDialog() {
    g("mood-poster-show").style.display = "block";
    g("mask").style.display = "block";

    fillToBody(g("mask"));
}

function hideDialog() {
    g("mood-poster-show").style.display = "none";
    g("mask").style.display = "none";
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
function createMoodPosterItemHtml(mood_poster_item_data, tpl_mood_poster_item, tpl_mood_poster_comment_item) {
    var item_img_data = mood_poster_item_data.mood_poster_picture;//图片数据，数组
    var item_comment_data = mood_poster_item_data.mood_poster_comment;//评论数据，数组

    var mood_poster_like = mood_poster_item_data.mood_poster_like_count;//该条说说被点赞次数

    var like_count = (mood_poster_like == 0 ? '' : '(' + mood_poster_like + ')');

    //说说图片html
    var img_mood_poster_user_photo = '<img src="' + mood_poster_item_data.mood_poster_user_photo + '" alt="">';

    //说说主题内容区域
    var mood_poster_item = tpl_mood_poster_item.replace(/{{mood_poster_id}}/g, mood_poster_item_data.mood_poster_id)
        .replace(/{{img_mood_poster_user_photo}}/g, img_mood_poster_user_photo)
        .replace(/{{mood_poster_user_name}}/g, mood_poster_item_data.mood_poster_user_name)
        .replace(/{{mood_poster_time}}/g, mood_poster_item_data.mood_poster_time)
        .replace(/{{mood_poster_total_view}}/g, mood_poster_item_data.mood_poster_total_view)
        .replace(/{{mood_poster_content}}/g, mood_poster_item_data.mood_poster_content)
        .replace(/{{like_count}}/g, like_count);

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
}
