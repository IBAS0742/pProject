export const templateInfo = {
  id: 'id',
  name: 'name',
  groupName: 'groupName',
  bak: {
    // __name__: 'bak',
    __method__(data) {
      return JSON.parse(data.bak);
    },
    __info__: {
      name: 'vname',  // 标签名称
      dep: 'dep',     // 模板依赖
      utils: 'utils', // 工具以来
    }
  },
  htmlContent: 'htmlContent',
  attr: {
    // __name__: 'attr',
    __method__(data) {
      return {
        attr: JSON.parse(data.attr)
      };
    },
    __info__: {
      attr: 'attr'
    }
  },
  injJs: 'theme'  // 模板主题
};

export const templateInfoToDB = {
  id: {
    field: 'id'
  },
  name: {
    field: 'name'
  },
  groupName: {
    field: 'groupName'
  },
  bak: {
    dear(data) {
      return JSON.stringify({
        name: data.vname,
        dep: data.dep,
        utils: data.utils
      });
    }
  },
  htmlContent: {
    field: 'htmlContent'
  },
  attr: {
    field: 'attr'
  },
  injJs: {
    field: 'theme'
  }  // 模板主题
};

export const utilInfo = {
  id: 'id',
  htmlContent: 'htmlContent',
  name: 'name',
  tplThree: 'tplThree'
};
