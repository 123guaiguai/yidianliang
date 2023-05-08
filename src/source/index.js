let articlesList = [
    {
        id: 1,
        title: "极度渴望爱与关注-22个克服拖延的黄金句型",
        content: "在DBT-辩证行为疗法下，22条心理暗示给你带来不一样的效果。",
        picturePath:
            "https://ossimg.xinli001.com/20230314/0573b41660006f588b34f554a3aa1757.jpeg!120x120",
    },
    {
        id: 2,
        title: "极度渴望爱与关注-22个克服拖延的黄金句型",
        content: "在DBT-辩证行为疗法下，22条心理暗示给你带来不一样的效果。",
        picturePath:
            "https://ossimg.xinli001.com/20230314/0573b41660006f588b34f554a3aa1757.jpeg!120x120",
    },
    {
        id: 3,
        title: "极度渴望爱与关注-22个克服拖延的黄金句型",
        content: "在DBT-辩证行为疗法下，22条心理暗示给你带来不一样的效果。",
        picturePath:
            "https://ossimg.xinli001.com/20230314/0573b41660006f588b34f554a3aa1757.jpeg!120x120",
    },
    {
        id: 4,
        title: "极度渴望爱与关注-22个克服拖延的黄金句型",
        content: "在DBT-辩证行为疗法下，22条心理暗示给你带来不一样的效果。",
        picturePath:
            "https://ossimg.xinli001.com/20230314/0573b41660006f588b34f554a3aa1757.jpeg!120x120",
    },
];
let counselorList = [
    {
        id: 1,
        name: "朱静",
        title: "全职心理咨询师 三级心理咨询师 ...",
        introduce:
            "全职心理咨询师 三级心理咨询师 中级婚姻家庭咨询师\r\nEFT婚姻家庭治疗师 中国社区心理援助服务机构会员 ...",
        servedNumber: 14606,
        picturePath:
            "https://img.ydlcdn.com/file/2019/05/17fb63ce320d4445995d6def8c075451.jpg!s120x120",
    },
    {
        id: 2,
        name: "朱静",
        title: "全职心理咨询师 三级心理咨询师 ...",
        introduce:
            "全职心理咨询师 三级心理咨询师 中级婚姻家庭咨询师\r\nEFT婚姻家庭治疗师 中国社区心理援助服务机构会员 ...",
        servedNumber: 14606,
        picturePath:
            "https://img.ydlcdn.com/file/2019/05/17fb63ce320d4445995d6def8c075451.jpg!s120x120",
    },
    {
        id: 3,
        name: "朱静",
        title: "全职心理咨询师 三级心理咨询师 ...",
        introduce:
            "全职心理咨询师 三级心理咨询师 中级婚姻家庭咨询师\r\nEFT婚姻家庭治疗师 中国社区心理援助服务机构会员 ...",
        servedNumber: 14606,
        picturePath:
            "https://img.ydlcdn.com/file/2019/05/17fb63ce320d4445995d6def8c075451.jpg!s120x120",
    },
];
let swiperList = [
    "https://s1.ax1x.com/2023/03/15/pp1y0xS.png",
    "https://s1.ax1x.com/2023/03/15/pp1y0xS.png",
];
let defaultImgUrl = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
let questionnaires = [//缺省的心理自测模板
    {
        title: "短式青少年抑郁量表测试 (SMFQ)",
        desc: "TEST ONE",
        color: "#22d4bf", //控制卡片的抬头颜色
        icon: "icon-xiaoxi",
        questionList: [
            {
                type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
                label: "过去两周，你感到不快或沮丧吗?",
                required: true, //是否必选
                value: 0, //保存此问题的结果，如果是单选题那么缺省为0，多选题缺省为空数组，input和textarea缺省为空字符串''
                options: [
                    {
                        label: 1,
                        value: "从不",
                    },
                    {
                        label: 2,
                        value: "有时",
                    },
                    {
                        label: 3,
                        value: "经常",
                    },
                    {
                        label: 4,
                        value: "总是",
                    },
                ],
            },
            {
                type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
                label: "过去两周，你很难入睡，或者早醒吗?",
                required: true, //是否必选
                value: 0, //保存此问题的结果
                options: [
                    {
                        label: 1,
                        value: "从不",
                    },
                    {
                        label: 2,
                        value: "有时",
                    },
                    {
                        label: 3,
                        value: "经常",
                    },
                    {
                        label: 4,
                        value: "总是",
                    },
                ],
            },
            {
                type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
                label: "过去两周，你感到疲倦或没有活力吗?",
                required: true, //是否必选
                value: 0, //保存此问题的结果
                options: [
                    {
                        label: 1,
                        value: "从不",
                    },
                    {
                        label: 2,
                        value: "有时",
                    },
                    {
                        label: 3,
                        value: "经常",
                    },
                    {
                        label: 4,
                        value: "总是",
                    },
                ],
            },
            {
                type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
                label: "过去两周，你感到没有兴趣去做任何事情吗?",
                required: true, //是否必选
                value: 0, //保存此问题的结果
                options: [
                    {
                        label: 1,
                        value: "从不",
                    },
                    {
                        label: 2,
                        value: "有时",
                    },
                    {
                        label: 3,
                        value: "经常",
                    },
                    {
                        label: 4,
                        value: "总是",
                    },
                ],
            },
            {
                type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
                label: "过去两周，你感到自己很没有价值，或者觉得自己不如别人吗?",
                required: true, //是否必选
                value: 0, //保存此问题的结果
                options: [
                    {
                        label: 1,
                        value: "从不",
                    },
                    {
                        label: 2,
                        value: "有时",
                    },
                    {
                        label: 3,
                        value: "经常",
                    },
                    {
                        label: 4,
                        value: "总是",
                    },
                ],
            },
            {
                type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
                label: "过去两周，你经常感到焦虑或者紧张吗?",
                required: true, //是否必选
                value: 0, //保存此问题的结果
                options: [
                    {
                        label: 1,
                        value: "从不",
                    },
                    {
                        label: 2,
                        value: "有时",
                    },
                    {
                        label: 3,
                        value: "经常",
                    },
                    {
                        label: 4,
                        value: "总是",
                    },
                ],
            },
            {
                type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
                label: "过去两周，你经常感到愤怒或者易怒吗?",
                required: true, //是否必选
                value: 0, //保存此问题的结果
                options: [
                    {
                        label: 1,
                        value: "从不",
                    },
                    {
                        label: 2,
                        value: "有时",
                    },
                    {
                        label: 3,
                        value: "经常",
                    },
                    {
                        label: 4,
                        value: "总是",
                    },
                ],
            },
            {
                type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
                label: "过去两周，你很难集中精力，或者感到自己做事情效率低下吗?",
                required: true, //是否必选
                value: 0, //保存此问题的结果
                options: [
                    {
                        label: 1,
                        value: "从不",
                    },
                    {
                        label: 2,
                        value: "有时",
                    },
                    {
                        label: 3,
                        value: "经常",
                    },
                    {
                        label: 4,
                        value: "总是",
                    },
                ],
            },
            {
                type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
                label:
                    "过去两周，你感到生活没有希望，或者觉得自己的未来没有前途吗?",
                required: true, //是否必选
                value: 0, //保存此问题的结果
                options: [
                    {
                        label: 1,
                        value: "从不",
                    },
                    {
                        label: 2,
                        value: "有时",
                    },
                    {
                        label: 3,
                        value: "经常",
                    },
                    {
                        label: 4,
                        value: "总是",
                    },
                ],
            },
            {
                type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
                label: "过去两周，你想过自杀吗?",
                required: true, //是否必选
                value: 0, //保存此问题的结果
                options: [
                    {
                        label: 1,
                        value: "从不",
                    },
                    {
                        label: 2,
                        value: "有时",
                    },
                    {
                        label: 3,
                        value: "经常",
                    },
                    {
                        label: 4,
                        value: "总是",
                    },
                ],
            },
        ],
    },
]
export {
    articlesList,
    counselorList,
    swiperList,
    defaultImgUrl,
    questionnaires,
};