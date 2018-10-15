/**
 * 数据统一定义处理方法
 * @param data    从服务器请求的一个格式的数据
 * @param method  数据的格式处理 JSON 代码
 */

export const dbMethod = (data, method) => {
  let obj = {};
  for (let i in method) {
    if (i in data) {
      if (typeof method[i] === 'string') {
        obj[method[i]] = data[i]
      } else if (typeof method[i] === 'object') {
        if ('__method__' in method[i] && '__info__' in method[i]) {
          if ('__name__' in method[i]) {
            obj[method[i].__name__] = dbMethod(method[i].__method__(data),method[i].__info__);
          } else {
            obj = Object.assign(obj,dbMethod(method[i].__method__(data),method[i].__info__));
          }
        }
      }
    }
  }
  return obj;
};

/**
 * 将数据转换为数据库格式或者服务器规定的格式
 * @param data    当前的数据
 * @param method  数据的格式处理 JSON 代码
 */
export const toDB = (data,method,notNull) => {
  let obj = {};
  for (let i in method) {
    if ('dear' in method[i]) {
      obj[i] = method[i].dear(data);
    } else {
      obj[i] = data[method[i].field];
    }
  }
  if (notNull) {
    for (let i in obj) {
      if (!obj[i] && typeof obj[i] !== 'boolean') {
        delete obj[i];
      }
    }
  }
  return obj;
};
