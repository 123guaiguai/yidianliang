import service from "../index.js"
export function getQuestionnaires() {//获取心理自测模板
    return service({
        url: "questionnaire/getQuestionnaires",
        method: 'GET'
    })
}
export function getResult(data) {//提交心理自测表单，获取自测结果
    return service({
        url: "questionnaire/getResult",
        method: 'POST',
        data
    })
}
export function getPsychologicalAssert() {//获取当前心理状态
    return service({
        url: "psychology/get",
        method: 'GET'
    })
}
export function updateReader() {//心理状态是否展示过,用来标识心理自测消息是否已读
    return service({
        url: "psychology/update",
        method: 'PUT'
    })
}