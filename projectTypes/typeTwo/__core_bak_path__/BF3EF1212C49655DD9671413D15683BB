import axios from './axiosConfig'
import qs from 'qs'
import { pageServicePath } from './../utils/variable';
import { preData } from '../utils/db/preDear';

const url_ = pageServicePath;   // => http://localhost:8088
const successCode = {
    field: 'code',
    code: 0
};

/**
 * 工程信息接口
 * fetchProject     通过 id 获取工程信息
 * updateProject    提供一个完整工程信息(包含id)更新工程信息
 * projectList      获取工程列表（当前为分页）
 * saveProject      提供一个完整工程信息(不包含id)新增工程信息
 * deleteProject    通过 id 删除工程信息
 */
export const fetchProject = id => {
    return axios({
        url_,successCode,
        method : "post",
        url : '/projects/info/' + id,
        header : {
            'Content-Type' : 'application/json'
        },
    })
        .then(_ => preData.singleData(_));
};
export const updateProject = data => {
    return axios({
        url: '/projects/update',
        url_,successCode,
        data,
        method : "post",
        header : {
            'Content-Type' : 'application/json'
        },
    })
};
export const projectList = () => {
    return axios({
        url_,successCode,
        method : "post",
        url : '/projects/list',
        header : {
            'Content-Type' : 'application/json'
        },
    })
        .then(_ => preData.multiDataNotPages(_));
};
export const saveProject = data => {
    return axios({
        url: '/projects/save',
        url_,successCode,
        data: data,
        method : "post",
        header : {
            'Content-Type' : 'application/json'
        },
    })
        .then(_ => preData.singleData(_));
};
export const deleteProject = id => {
    return axios({
        url_,successCode,
        method : "post",
        url : '/projects/delete',
        data: (id instanceof Array ? id : [id]),
        header : {
            'Content-Type' : 'application/json'
        },
    });
};

/**
 * fetchLayout        获取相应主题布局组件（当前没有分页设置）
 * fetchTemplate      获取相应主题一般组件（当前没有分页设置）
 * 以下三个接口适合 布局组件 和 一般组件
 * deleteTemplate     通过 id 删除组件信息
 * updateTemplateNew  提供一个完整组件信息(包含id)更新组件信息
 * addTemplateNew     提供一个完整组件信息(不包含id)新增组件信息
 */
export const fetchLayout = injJs => {
    injJs = injJs || "";
    return axios({
        url_,successCode,
        method : "post",
        data: qs.stringify({
            injJs,
            groupName: 'layout'
        }),
        url : '/templates/list',
        header : {
            'Content-Type' : 'application/json'
        },
    })
        .then(_ => preData.multiDataNotPages(_))
        .then(_ => {
            console.log(_);
            return _;
        });
};
export const fetchTemplate = injJs => {
    injJs = injJs || "";
    return axios({
        url_,successCode,
        url : '/templates/list',
        data: qs.stringify({
            injJs,
            groupName: '!layout'
        }),
        method : "post",
        header : {
            'Content-Type' : 'application/json'
        },
    })
        .then(_ => preData.multiDataNotPages(_))
        .then(_ => {
            console.log(_);
            return _;
        });;
};
export const deleteTemplate = id => {
    return axios({
        url: '/templates/delete',
        url_,successCode,
        method : "post",
        data: (id instanceof Array ? id : [id]),
        header : {
            'Content-Type' : 'application/json'
        },
    });
};
export const updateTemplateNew = formData => {
    return axios.post('/templates/updateNew',formData,{
        url_,successCode,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
export const addTemplateNew = formData => {
    return axios.post('/templates/save',formData,{
        url_,successCode,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(_ => preData.singleData(_));
}

/**
 * updatePage     提供一个完整页面信息(包含id)更新页面信息
 * addPage        提供一个完整页面信息(不包含id)新增页面信息
 * deletePage     通过 id 删除页面信息
 * pageList       获取一个工程下的所有页面的信息
 */
export const updatePage = data => {
    return axios({
        url: '/pages/update',
        url_,successCode,
        data,
        method : "post",
        header : {
            'Content-Type' : 'application/json'
        },
    })
};
export const addPage = data => {
    return axios({
        url: '/pages/save',
        url_,successCode,
        data,
        method : "post",
        header : {
            'Content-Type' : 'application/json'
        },
    })
        .then(_ => preData.singleData(_));
};
export const deletePage = id => {
    return axios({
        url_,successCode,
        method : "post",
        url : '/pages/delete',
        data: (id instanceof Array ? id : [id]),
        header : {
            'Content-Type' : 'application/json'
        },
    });
};
export const pageList = projectId => {
    return axios({
        url_,successCode,
        method : "post",
        url : '/pages/list',
        data: qs.stringify({
            pageTwo: projectId
        }),
        header : {
            'Content-Type' : 'application/json'
        },
    })
        .then(_ => preData.multiDataNotPages(_));
};

/**
 * 打包页面
 * 会将页面文件名和页面内容(html) 发送给后台处理生成页面
 */
export const buildFile = data => {
    return axios({
        url: '/buildFile',
        url_: 'http://localhost:8088',successCode,
        data: qs.stringify(data),
        method : "post",
        header : {
            'Content-Type' : 'application/json'
        },
    })
};

/**
 * 获取数据库表格
 * */
export const table2 = (page = 1,limit = 10) => {
    return axios({
        url_,successCode,
        method : "get",
        url : '/table2/list',
        params: {page,limit},
        header : {
            'Content-Type' : 'application/json'
        },
    })
        .then(_ => preData.multiDataPages(_));
};
/**
 * 生成代码
 */
export const createCode = tableName => {
    return axios({
        url_,successCode,
        method : "post",
        url : '/create/code?tableNames=' + tableName,
        header : {
            'Content-Type' : 'application/json'
        },
    });
};


/**
 * 弃用接口
 */
export const fetchUtils = _ => {
    return axios({
        url_,successCode,
        method : "post",
        url : '/templates/listVueUtils',
        header : {
            'Content-Type' : 'application/json'
        },
    });
};
export const addTemplate = data => {
    return axios({
        url: '/templates/add',
        url_,successCode,
        data: qs.stringify(data),
        method : "post",
        header : {
            'Content-Type' : 'application/json'
        },
    })
};
export const updateTemplate = data => {
    return axios({
        url: '/templates/update',
        url_,successCode,
        data: qs.stringify(data),
        method : "post",
        header : {
            'Content-Type' : 'application/json'
        },
    })
};

let singleData = {
    "code": "后台处理结果状态码",
    "data": {
        // 单条数据内容
        "id" : "id"
    },
    "message": "后台处理结果消息"
};

let multiDataPages = {
    "code": 200,
    "data": {
        "endRow": 4,
        "firstPage": 0,
        "hasNextPage": false,
        "hasPreviousPage": false,
        "isFirstPage": false,
        "isLastPage": true,
        "lastPage": 0,
        "list": [
            {
                // 单条数据内容
                "id" : "id"
            },
            {
                // 单条数据内容
                "id" : "id"
            }
        ],
        "navigateFirstPage": 0,
        "navigateLastPage": 0,
        "navigatePages": 8,
        "navigatepageNums": [],
        "nextPage": 0,
        "orderBy": "",
        "pageNum": 0,
        "pageSize": 0,
        "pages": 0,
        "prePage": 0,
        "size": 4,
        "startRow": 1,
        "total": 4
    },
    "message": "SUCCESS"
};

let multiDataNotPages = {
    "code": 200,
    "data": [
        {
            // 单条数据内容
            "id" : "id"
        },
        {
            // 单条数据内容
            "id" : "id"
        }
    ],
    "message": "SUCCESS"
};
