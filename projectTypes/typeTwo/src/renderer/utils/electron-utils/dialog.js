import { base } from './base';

export const dialogInstall = Vue => {
  let rootObj = base({
    dialog: {
      id: null,
      dialog: null
    }
  }).dialog;

  rootObj.id = setInterval(_ => {
    if (rootObj.dialog) {
      Vue.prototype.dialog  = {
        fileFilter: {
          log: {
            name: '日志文件',
            extensions: ['log']
          },
          img: {
            name: '图片',
            extensions: ['png','jpg','jpeg','gif','ico']
          }
        },
        getFile(cb,fileFilter) {
          fileFilter = fileFilter || {
            name: '所有文件',
            extensions: ['*']
          }
          fileFilter = (fileFilter instanceof Array) ? fileFilter : [fileFilter];
          cb(rootObj.dialog.showOpenDialog({
            fileFilter: fileFilter
          }))
        },
        createFile(cb,title,buttonLabel) {
          cb(rootObj.dialog.showSaveDialog({
            title : title || "选择一个文字存放文件",
            buttonLabel : buttonLabel || "这样就好 o(*￣▽￣*)ブ"
          }));
        },
        getDir(cb) {
          cb(rootObj.dialog.showOpenDialog ({
            properties : ["openDirectory"]
          }));
        }
      };
      clearInterval(rootObj.id);
    } else {
      rootObj.dialog = require('electron').remote.dialog;
    }
  },500);
}
