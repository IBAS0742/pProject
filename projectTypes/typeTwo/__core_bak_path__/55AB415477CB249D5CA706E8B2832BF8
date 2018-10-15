export const projectInfo = {
  id: 'id', // 项目名称 --- 仅作为人识别使用
  name: 'name',
  // pages: {
  //   __method__(data) {
  //     data.pages = JSON.parse(data.pages);
  //     return data;
  //   },
  //   __info__: {
  //     pages: 'pages'
  //   }
  // },
  bak: {
    __method__(data) {
      return JSON.parse(data.bak);
    },
    __name__: 'bak',
    __info__: {
      curPage: 'curPage', //  项目实际实施时的页面
      defaultLayout: 'defaultLayout', // 用于新建页面时赋予的默认模板
      path: 'path', //项目路径 --- 用于项目的生成和放置相关资源文件(暂时无定义，但是保存在数据库对应项目的 bak 字段的 projectPath 中 )
      type: 'type', //项目类型 --- 适合手机端还是电脑端
      usage: 'usage',  //项目用途 --- 基础模板，正式使用的项目（基础模板是用来新建项目时使用的，考虑到建立一个完整模板的难度）
      srcPath: 'srcPath',     //资源路径的地址，这里假定所有内容在同一个服务器,
      theme: 'theme'       // 使用的模板主题
    }
  },
  projectOne: {  // 项目资源 --- 项目所需的 js / css / img / icon 等资源 (该项目中默认为 /static/build 文件夹下所有内容)
    __method__(data) {
      return JSON.parse(data.projectOne);
    },
    __name__: 'src',
    __info__: {
      core: 'core',   // 这里是核心，核心的意思是 每一个页面都需要使用的内容的最小交集，这里面不分 css/js/icon
      js: 'js',   // 部分模板可能需要使用到的 js 资源
      css: 'css', // 部分模板可能需要使用到的 css 资源
      img: 'img',    // 部分模板可能需要使用到的 img 资源
      icon: 'icon',   // 部分模板可能需要使用到的 icon 资源 ( iconName.css iconName/iconName.tff )
      other: 'other'   // 部分模板可能需要使用到的 其他 资源
    }
  },
  projectTwo: {
    __name__: 'tpl',
    __method__(data) {
      return JSON.parse(data.projectTwo)
    },
    __info__: {
      defaultOP: '',
      defaultOPMethod: '',
      defaultPageHeader: '',
      defaultPageBody: '',
      pageOPData: ''
    }
  }
};

export const projectInfoToDb = {
  id: {
    field: 'id'
  },
  name: {
    field: 'name'
  },
  // pages: {
  //   dear(data) {
  //     return JSON.stringify(data.pages);
  //   }
  // },
  bak: {
    dear(data) {
      return JSON.stringify(data.bak);
    }
  },
  projectOne: {
    dear(data) {
      return JSON.stringify(data.src);
    }
  },
  projectTwo: {
    dear(data) {
      return JSON.stringify(data.tpl);
    }
  }
};
