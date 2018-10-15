/*
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
};*/

export const multiDataNotPages = data => {
  return {
    code: data.code,
    data: data.data || [],
    message: data.message
  };
};
