import axios from './axiosConfig'
import qs from 'qs'
import { pageServicePath } from './../utils/variable';

const paramType = {
    // url = 'ibas?id=' + id;
    join(conf,data) {
        conf.url += data;
        return conf;
    },
    // url = 'ibas?' + 'a=a' + 'b=b'
    url(conf,data) {
        conf.params = data;
        return conf;
    },
    json(conf,data) {
        conf.data = data;
        conf.header['Content-Type'] = 'application/json';
        return conf;
    },
    arrayJson(conf,data) {
        if (data instanceof Array) {
            return this.json(conf,data);
        } else {
            return this.json(conf,[data]);
        }
    },
    RequestBody(conf,data) {
        return this.json(conf,data);
    },
    RequestParam(conf,data) {
        conf.data = qs.stringify(data);
        return conf;
    }
};

export const paramTypeNames = (paramType => {
    let pts = {};
    for (let i in paramType) {
        pts[i] = i;
    }
    return pts;
})(paramType);
export const methodNames = {
    get: 'get',
    post: 'post',
    delete: 'delete'
};

export const axiosClass = (
    url,
    method = "post",
    paramTypeName = null,
    preDataType = null,
    exConf,
    url_ = pageServicePath,
    successCode) => {
    let conf = Object.assign({
        bakUrl: url,
        url,
        url_,
        successCode : successCode || {
            field: 'code',
            code: 0
        },
        method,
        header : {
            'Content-Type' : 'application/json'
        },
    },exConf);
    let paramType_ = paramType[paramTypeName || 'url'].bind(paramType);
    return ((paramType_,preDataType,data) => {
        conf.url = conf.bakUrl;
        return axios(paramType_(conf,data)).then(preDataType);
    }).bind(null,paramType_,preDataType || (_ => _));
};
