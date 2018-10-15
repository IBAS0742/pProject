import { paramTypeNames, axiosClass , methodNames } from "./axiosClass";
import { preData } from "../utils/db/preDear";

export const fetchTableInfo = axiosClass(
    '/tableinfo/list',
    methodNames.post,
    paramTypeNames.url,
    preData.multiDataNotPages);

export const saveTableInfo = axiosClass(
    '/tableinfo/save',
    methodNames.post,
    paramTypeNames.json,
    preData.singleData);

export const updateTableInfo = axiosClass(
    '/tableinfo/update',
    methodNames.post,
    paramTypeNames.json,
    preData.multiDataNotPages);

export const deleteTableInfo = axiosClass(
    '/tableinfo/delete',
    methodNames.post,
    paramTypeNames.arrayJson,
    preData.singleData);
