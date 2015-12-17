/**
 * Created by Superlee on 2015/12/17.
 */
/**
 * 页面渲染完毕后，获取timeline数据，并生成timelinehtml
 */
$(document).ready(function () {
    $('#timeline').height(document.documentElement.clientHeight);
    initTimelineExm();
});

function initTimelineExm(){
    var originData={
        "timelineData":[
            {
                year:'2015',
                month:'03',
                day:'12',
                title:'诗词',
                desc:'风清月白偏宜夜，一片琼田。谁羡骖鸾。人在舟中便是仙。',
                type:'quiet',
                moodPosterId:2
            },
            {
                year:'2015',
                month:'05',
                day:'15',
                title:'我很高心',
                desc:'我很喜欢上马路乱踩，看完电影去吃招牌菜',
                type:'happy',
                moodPosterId:3
            },
            {
                year:'2015',
                month:'7',
                day:'21',
                title:'不开心',
                desc:'好烦好烦好烦，好不爽不爽不爽',
                type:'sad',
                moodPosterId:21
            },
            {
                year: '2015',
                month: '9',
                day: '29',
                title: '希望',
                desc: '从明天起，做一个幸福的人，喂马劈柴，周游世界',
                type: 'hopeful',
                moodPosterId:32
            }
        ]
    };
    $('#timeline').height(document.documentElement.clientHeight);
    var timelineData=handleTimelineData(originData).timelineData;
    timeline.createTimeline(timelineData);
}