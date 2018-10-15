import { paramTypeNames, axiosClass , methodNames } from "./axiosClass";
import { preData } from "../utils/db/preDear";

export const saveMock = tableName => {
    return axiosClass(
        '/testdata/mock/' + tableName + '/save',
        methodNames.post,
        paramTypeNames.json,
        preData.singleData)
};

export const deleteMock = tableName => {
    return axiosClass(
        '/testdata/mock/' + tableName + '/delete',
        methodNames.delete,
        paramTypeNames.arrayJson,
        preData.singleData);
};

export const updateMock = tableName => {
    return axiosClass(
        '/testdata/mock/' + tableName + '/update',
        methodNames.post,
        paramTypeNames.json,
        preData.singleData);
};

export const listMock = tableName => {
    return axiosClass(
        '/testdata/mock/' + tableName + '/list',
        methodNames.get,
        paramTypeNames.url,
        preData.multiDataPages);
};

export const infoMock = tableName => {
    return axiosClass(
        '/testdata/mock/' + tableName + '/info/',
        methodNames.get,
        paramTypeNames.join,
        preData.singleData);
};
