import service from "../index.js"

export function getSwiperList(){//获取轮播图
    return service({
        url:"common/picture",
        method:'GET'
    })
}

export function getCounselors(){//获取咨询师信息
    return service({
        url:"counselor/getCounselors",
        method:'GET'
    })
}

export function getArticles(){//获取最新热文信息
    return service({
        url:"article/newArticle",
        method:"GET"
    })
}