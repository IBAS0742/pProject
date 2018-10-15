// let multiDataPages = {
//   "code": 200,
//   "data": {
//     "endRow": 4,
//     "firstPage": 0,
//     "hasNextPage": false,
//     "hasPreviousPage": false,
//     "isFirstPage": false,
//     "isLastPage": true,
//     "lastPage": 0,
//     "list": [
//       {
//         // 单条数据内容
//         "id" : "id"
//       },
//       {
//         // 单条数据内容
//         "id" : "id"
//       }
//     ],
//     "navigateFirstPage": 0,
//     "navigateLastPage": 0,
//     "navigatePages": 8,
//     "navigatepageNums": [],
//     "nextPage": 0,
//     "orderBy": "",
//     "pageNum": 0,
//     "pageSize": 0,
//     "pages": 0,
//     "prePage": 0,
//     "size": 4,
//     "startRow": 1,
//     "total": 4
//   },
//   "message": "SUCCESS"
// };

export const multiDataPages = data => {
    return {
        data: (data.data || {list : []}).list,
        code: data.code,
        message: data.msg,
        total: (data.data || {totalCount : 0}).totalCount,
        size: (data.data || {pageSize : 0}).pageSize,
        totalPage: (data.data || {totalPage : 0}).totalPage,
        currPage: (data.data || {currPage : 0}).currPage
    }
};
