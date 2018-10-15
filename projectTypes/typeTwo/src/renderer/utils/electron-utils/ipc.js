import { base } from './base'

export const ipcAction = {
  log: {
    getAll: {
      tar: 'log-fetchAllLog'
    },
    getErr: {
      tar: 'log-fetchErrorLog'
    },
    getPass: {
      tar: 'log-fetchPassLog'
    },
    getSys: {
      tar: 'log-fetchSysLog'
    },
    output: {
      tar: 'log-output',
      param: {
        path: '绝对/相对路径'
      }
    }
  },
  file: {
    read: {
      tar: 'file-read',
      param: {
        path: '文件路径',
        binary: '是否为二进制'
      }
    },
    write: {
      tar: 'file-write',
      param: {
        path: '文件路径',
        content: '写入内容',
        binary: '是否为二进制'
      }
    }
  },
  request: {
    get: {
      tar: 'request-get',
      param: {
        param: {}
      }
    },
    post: {
      tar: 'request-post',
      param: {
        param: {}
      }
    }
  },
  cmd: {
    exec: {
      tar: 'cmd-exec',
      param: {
        cmdline: '执行的命令'
      }
    }
  },
  setting: {
    get: {
      tar: 'setting-get'
    },
    set: {
      tar: 'setting-set',
      param: {
        // 配置内容
        obj: JSON.stringify({})
      }
    }
  }
};

export const ipcInstall = Vue => {
  let rootObj = base({
    ipc: {
      id: '',
      ipc: require('electron').ipcRenderer,
      ipcCallBackList: {}
    }
  }).ipc;

  rootObj.id = setInterval(_ => {
    if (rootObj.ipc) {
      Vue.prototype.ipc = rootObj.ipc;
      clearInterval(rootObj.id);
      initial();
    } else {
      rootObj.ipc = require('electron').ipcRenderer;
    }
  },500);

  let initial = function() {
    Vue.prototype.ipcAction = ipcAction;
    rootObj.ipc.on("fetchBack",function (e,retObj) {
      retObj = Object.assign({
        data: null,
        err: null,
        id: null
      },retObj);
      if (retObj.id in rootObj.ipcCallBackList) {
        rootObj.ipcCallBackList[retObj.id](retObj);
        delete rootObj.ipcCallBackList[retObj.id];
      } else {
        console.error("same error when ipc recall");
      }
    });
    window.ipcCallBackList = {};
      /**
       * 想后台发起消息
       * @param event 事件名称
       * @param obj   事件需要的数据
       * @param cb    回调(回调会获得一个对象 { data: "数据" , err : "错误对象/null" , id : "唯一标识" } )
       * @param log   log 如何记录
       * @param cbThis  回调的this
       */
    Vue.prototype.send = function(event,obj,cb,log,cbThis) {
      let id = (new Date()).getTime() + '_' + parseInt(Math.random() * 10000);
      rootObj.ipcCallBackList[id] = cb.bind(cbThis);
      rootObj.ipc.send("fetchFore",{
        event : event,
        param : obj || "",
        id,
        log : log || ""
      });
    }
  };
};

