/**
 * Created by Superlee on 2015/11/26.
 */
var timeline={
    // 创建时间轴函数
    createTimeline: function (data) {

        // 创建时间轴
        createStoryJS({
            lang:       'zh-cn',
            type:       'timeline',
            source:     data,
            embed_id:   'my-timeline',
            hash_bookmark: false,
            start_zoom_adjust: 1
        });

        var that = this;

        // 创建定时器渲染flag
        var SET_MOOD_FLAG_STATUS = setInterval(function () {
            if ($('.flag').length) {
                that.setMoodFlagStatus();
                clearInterval(SET_MOOD_FLAG_STATUS);
            }
        }, 20);
    },

    // 渲染时间轴上flag状态
    setMoodFlagStatus : function () {
        var $item = $('.slider-item'),
            $flag = $('.flag'),
            moodStatus = ['quiet', 'hopeful' , 'sad', 'happy'];

        $('.flag-content>div').remove();

        for (var i = 0, len = $item.length; i < len; i ++) {
            for (var j = 0, jLen = moodStatus.length; j < jLen; j ++) {

                if ($item.eq(i).hasClass(moodStatus[j])) {
                    $flag.eq(i).addClass('mood-flag mood-flag-' + moodStatus[j]);
                    break;
                }
            }
        }
    }
};
/*获取个人时间轴数据*/
function getPersonalTimeline(){
    $.get('/timeline/listPersonalTimeline',function(data){
        if(typeof data=="object"){
            var timelineData=handleTimelineData(data).timelineData;
            timeline.createTimeline(timelineData);
            return;
        }
        window.location.href="/login.html";
    })
}


function handleTimelineData(data) {

    // 获取月份缩写
    function getMonthAbbr (month) {
        var abbr;
        switch (month) {
            case '01': case '1' : abbr = 'Jan'; break;
            case '02' : case '2' : abbr = 'Feb'; break;
            case '03' : case '3' : abbr = 'Mar'; break;
            case '04' : case '4' : abbr = 'Apr'; break;
            case '05' : case '5' : abbr = 'May'; break;
            case '06' : case '6' : abbr = 'Jun'; break;
            case '07' : case '7' : abbr = 'Jul'; break;
            case '08' : case '8' : abbr = 'Aug'; break;
            case '09' : case '9' : abbr = 'Sep'; break;
            case '10' : abbr = 'Oct'; break;
            case '11' : abbr = 'Nov'; break;
            case '12' : abbr = 'Dec'; break;
            default : abbr = month; break;
        }

        return abbr;
    }

    // 获取时间轴内容html
    function getTimelineText (obj){
        var html = '';

        html = '<div class="timeline-content clearfix">' +
                    '<div class="timeline-content-left">' +
                        '<div class="timeline-content-date">' +
                            '<div class="timeline-content-year">' + obj.year + '</div>' +
                            '<div class="timeline-content-month">' + getMonthAbbr(obj.month) +
                                '<span class="timeline-content-day">' + obj.day + '</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="timeline-content-right">' +
                        '<div class="timeline-content-title" data-poster="'+ obj.moodPosterId +'">' + obj.title + '</div>' +
                            '<div class="timeline-content-desc">' + obj.desc + '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';

        return html;
    }

    function initTimelineData(originData){
        var timelineData={};
        var timeline={};
        timeline.type="default";
        timeline.headline=originData.username;
        timeline.text=getTimelineText({ year : '', month : '', day : '', title : originData.username, desc : originData.signature});
        timeline.asset={};
        timeline.asset.media=originData.photo;
        //初始化"date"部分
        var date=[];
        var origin_date=originData.timelineData;
        for(var i=0;i<origin_date.length;i++){
            var data_item=createDateItem(origin_date[i]);
            date.push(data_item);
        }
        timeline.date=date;
        timelineData.timeline=timeline;
        return timelineData;
    }

    function createDateItem(itemData){
        var data_item={};
        data_item.startDate=itemData.year+","+itemData.month+","+itemData.day;
        data_item.headline=itemData.title;
        data_item.text=getTimelineText(itemData);
        data_item.classname=itemData.type;
        return data_item;
    }

    var timelineData=initTimelineData(data);

    return {
        timelineData : timelineData
    }
}





