var mood_poster_data = {
    total_page: 5,
    current_page: 1,
    current_user_id:1,
    mood_poster: [
        {
            mood_poster_id: 1,
            mood_poster_user_photo: '/assets/imgs/me.png',
            mood_poster_user_name: '无风醉红尘',
            mood_poster_user_id:1,
            mood_poster_time: '14:27',
            mood_poster_total_view: 80,
            mood_poster_content: '这是一些测试数据，不是真正的说说，该模块之后需要替换掉发说说人的头像、姓名、时间以及相关内容，然后再动态加载评论以及回复',
            mood_poster_picture: ['/assets/imgs/bg5.jpg', '/assets/imgs/bg5.jpg', '/assets/imgs/bg5.jpg'],
            current_user_like: true,
            current_user_collect:true,
            mood_poster_like_count: 9,
            mood_poster_comment: [
                {
                    comment_id: 2,
                    parent_id: 1,
                    data_role: 'comment',
                    commenter_photo: '/assets/imgs/me.png',
                    commenter_name: '我是谁',
                    comment_content: 'json数据，用来测试动态加载说说和评论',
                    comment_time: '15:27'
                },
                {
                    comment_id: 3,
                    parent_id: 1,
                    data_role: 'reply',
                    commenter_photo: '/assets/imgs/me.png',
                    commenter_name: '谁是我',
                    comment_content: 'json数据，用来测试动态加载评论回复',
                    comment_time: '15:28'
                },
                {
                    comment_id: 4,
                    parent_id: 1,
                    data_role: 'comment',
                    commenter_photo: '/assets/imgs/me.png',
                    commenter_name: '谁是我',
                    comment_content: 'json数据，用来测试动态加载评论回复',
                    comment_time: '15:28'
                }
            ]
        },
        {
            mood_poster_id: 2,
            mood_poster_user_photo: '/assets/imgs/bg5.jpg',
            mood_poster_user_name: '醉红尘',
            mood_poster_user_id:2,
            mood_poster_time: '14:27',
            mood_poster_total_view: 80,
            mood_poster_content: '这是一些测试数据，不是真正的说说，该模块之后需要替换掉发说说人的头像、姓名、时间以及相关内容，然后再动态加载评论以及回复',
            mood_poster_picture: ['/assets/imgs/bg5.jpg'],
            current_user_like: false,
            current_user_collect:true,
            mood_poster_like_count: 0,
            mood_poster_comment: [
                {
                    comment_id: 2,
                    data_role: 'comment',
                    commenter_photo: '/assets/imgs/me.png',
                    commenter_name: '我是谁',
                    comment_content: 'json数据，用来测试动态加载说说和评论',
                    comment_time: '15:27'
                },
                {
                    comment_id: 3,
                    data_role: 'reply',
                    commenter_photo: '/assets/imgs/me.png',
                    commenter_name: '谁是我',
                    comment_content: 'json数据，用来测试动态加载评论回复',
                    comment_time: '15:27'
                }
            ]
        },
        {
            mood_poster_id: 3,
            mood_poster_user_photo: '/assets/imgs/bg5.jpg',
            mood_poster_user_name: '醉红尘',
            mood_poster_user_id:2,
            mood_poster_time: '14:27',
            mood_poster_total_view: 80,
            mood_poster_content: '这是一些测试数据，不是真正的说说，该模块之后需要替换掉发说说人的头像、姓名、时间以及相关内容，然后再动态加载评论以及回复',
            current_user_like: false,
            current_user_collect:false,
            mood_poster_like_count:13
        }
    ]
};

var data = {
    user_inform: {
        user_photo: '/assets/imgs/me.png',
        user_name: '你猜_我的名字？是什么',
        user_signature: '心有猛虎，细嗅蔷薇',
        user_birthday: '1995-05-10',
        user_place: '中国&nbsp;重庆',
        mood_num: 5,
        collection_num: 28,
        attention_num: 8
    },
    mood_poster: {}
};

var originData={
    "signature":"心有猛虎,细嗅蔷薇",
    "photo":'/assets/imgs/me.png',
    "username":'无风醉红尘',
    "timelineData":[
        {
            year:'2012',
            month:'03',
            day:'12',
            title:'第一篇说说',
            desc:'今天很高兴',
            type:'hopeful',
            moodPosterId:2
        },
        {
            year:'2012',
            month:'05',
            day:'15',
            title:'第二篇说说',
            desc:'今天很哈哈哈哈',
            type:'quiet',
            moodPosterId:3
        },
        {
            year:'2012',
            month:'7',
            day:'21',
            title:'第三篇说说',
            desc:'测试测试',
            type:'happy',
            moodPosterId:21
        },
        {
            year: '2012',
            month: '11',
            day: '29',
            title: '第四篇说说',
            desc: '今天很沮丧',
            type: 'sad',
            moodPosterId:32
        }
    ]
};

//// 时间轴具体数据
//var timelineData = {
//    "timeline": {
//        "type": "default",
//        "headline":"例子",
//        "text": getTimelineText({ year : '', month : '', day : '', title : '李超', desc : 'hahahahaha'}),
//        "asset": {
//            "media":"assets/imgs/bg5.jpg",
//        },
//        "date": [
//            {
//                "startDate": "2013,3,13",
//                "headline": "一个想法",
//                "text": getTimelineText({ year : 2013, month : 3, day : 13, title : '一个想法', at : 'The head of Da Xing', desc : '出 「让我们分享未来梦想」 的想法。我们已经浪费了太多时间关注琐碎的事情。<br/>但是我们可以随时选择自己的人生：创造全新的事物。'}),
//                "classname" : "quiet",
//                "moodId"  : 1001
//            },
//            {
//                "startDate": "2013,5,18",
//                "headline": "一次会议",
//                "text": getTimelineText({ year : 2013, month : 5, day : 18, title : '一个会议', at : 'Fenglin Campus, Fudan', desc : '首次技术启动会议，但是两个技术人员直接消失。这不重要。重要的是，十年后，那次会议现场的所有人会变成什么样？'}),
//                "classname": "quiet",
//                "moodId"  : 1010
//
//            },
//            {
//                "startDate": "2013,9,24",
//                "headline": "找到基地",
//                "text": getTimelineText({ year : 2013, month : 9, day : 24, title : '找到基地', at : 'Jiafa Mansion, Shanghai', desc : '杀不死我的只能使我更强，在一个新地方继续原先的旅程。多少个梦想才能击败现实？我们叫它基地。'}),
//                "classname": "quiet",
//                "moodId"  : 1002,
//            },
//            {
//                "startDate": "2013,11,07",
//                "headline": "你所看到的开始",
//                "text": getTimelineText({ year : 2013, month : 11, day : '07', title : '你所看到的开始', at : 'Jiafa Mansion, Shanghai', desc : '10years.me网站正式上线。你所使用的域名第一次激活，你所看到的历史开始上演。'}),
//                "classname": "hopeful",
//                "moodId"  : 1003
//            },
//            {
//                "startDate": "2014,3,15",
//                "headline": "进入Innospace",
//                "text": getTimelineText({ year : 2014, month : 3, day : 15, title : '进入Innospace', at : 'KIC, Shanghai', desc : '拿到了第一笔投资，团队搬进了上海最优秀的孵化器之一。遇到了更多更有趣的人，开始潜心优化产品。'}),
//                "classname": "quiet",
//                "moodId"  : 1004
//            },
//            {
//                "startDate": "2014,4,17",
//                "headline": "梦想的移动化",
//                "text": getTimelineText({ year : 2014, month :4, day : 17, title : '梦想的移动化', at : 'Yangpu, Shanghai', desc : 'IOS版本正式上线，让人们可以更好地记录追梦历程。'}),
//                "classname": "quiet",
//                "moodId"  : 1005
//            },
//            {
//                "startDate": "2014,6,12",
//                "headline": "今天: 未来正在发生",
//                "text": getTimelineText({ year :2014, month :6, day : 12, title : '今天: 未来正在发生', at : '你的眼前', desc : '未来，每时每刻都在发生。今天，加入十年后，和我们一起，创造属于自己的未来。'}),
//                "classname": "hopeful",
//                "moodId"  : 1006
//            },
//            {
//                "startDate": "2014,9,12",
//                "headline": "创建属于你的梦想",
//                "text": getTimelineText({ year : 2014, month :9, day : 12, title : '创建属于你的梦想', at : '的撒大声的', desc : '点击时间轴上的图标即可添加梦想。只需填入该梦想的名称，预期的实现时间，以及对该梦想的描述，就可成功创建。'}),
//                "classname": "hopeful",
//                "moodId"  : 1007
//            },
//            {
//                "startDate": "2015,1,21",
//                "headline": "记录追梦历程",
//                "text": getTimelineText({ year :2015, month : 1, day : 21, title : '记录追梦历程', at : '大大大', desc : '你可以基于每个梦想随时记录实时的追梦历程，以及你关于梦想瞬间的想法。我们不希望你在这里仅仅是许愿，而是真正地把自己的梦想映射到今日的生活。'}),
//                "classname": "hopeful",
//                "moodId"  : 1008
//            }
//        ]
//    }
//};
//
//// 获取时间轴内容html
//function getTimelineText (obj){
//    var html = '';
//
//    html = '<div class="timeline-content clearfix"><div class="timeline-content-left"><div class="timeline-content-date"><div class="timeline-content-year">' + obj.year + '</div><div class="timeline-content-month">' + getMonthAbbr(obj.month) +
//        '<span class="timeline-content-day">' + obj.day + '</span></div></div></div><div class="timeline-content-right"><div class="timeline-content-title">' + obj.title + '</div><div class="timeline-content-desc">' + obj.desc + '</div></div></div></div>';
//
//    return html;
//}