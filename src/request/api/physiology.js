import service from "../index.js"

export function getLastSevenData(){//得到近七天数据
    return service({
        url:'physiologys/getLastSeven',
        method:'GET'
    })
}

export function getLastData(){//得到运动数据和最近一次的生理数据
    return service({
        url:'physiologys/getLast',
        method:'GET'
    })
}