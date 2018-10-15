import { paramTypeNames, axiosClass , methodNames } from "./axiosClass";
import { preData } from "../utils/db/preDear";

export const table2 = axiosClass('/table2/list',methodNames.get,paramTypeNames.url,preData.multiDataPages);

export const createCode = axiosClass(
    '/create/code',
    methodNames.post,
    paramTypeNames.url,
    null,
    {
        getResponse: true,
        responseType: 'blob'
    }
);

export const getStrategy = axiosClass('/create/config',methodNames.get,null,preData.singleData);

export const updateStrategy = axiosClass('/create/config',methodNames.post,paramTypeNames.url,preData.singleData);

export const database = axiosClass('/table2/database',methodNames.get,paramTypeNames.url,preData.multiDataNotPages);
