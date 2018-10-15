const request = require('request');
const cmd = require('child_process');
import { setting } from './setting';
let settingPath = '/__setting__';

export const fetchEventDear = (function(log4j, fs, rootDir, logPath) {
  let logAll = log4j.getLogger('fetchEventDearAll')
  let logPass = log4j.getLogger('fetchEventDearPass')
  let logError = log4j.getLogger('fetchEventDearError')
  let logProcess = log4j.getLogger('process')
  let tempRequestContent = '';
  let commonSetting = setting(rootDir + settingPath + '/common.json');

  /**
   * 如果事件中仅仅有一个参数，则 param 对应参数
   * 如果超过一个，则 param 以对象传递
   *  例如 mysql 的 insert 接口
   *      param = { obj : obj , dbname : dbname , tableName : tableName }
   * */
  let events = {
    log: {
      //所有运行中日志（未分类部分）
      fetchAllLog: function(cb) {
        fs.readFile(rootDir + logPath + 'fetchEventDearAll.log', 'utf-8', cb)
      },
      //分类中发生过错误的日志
      fetchErrorLog: function(cb) {
        fs.readFile(rootDir + logPath + 'fetchEventDearError.log', 'utf-8', cb)
      },
      //分类中通过的日志
      fetchPassLog: function(cb) {
        fs.readFile(rootDir + logPath + 'fetchEventDearPass.log', 'utf-8', cb)
      },
      //整体程序的日志
      fetchSysLog: function(cb) {
        fs.readFile(rootDir + logPath + 'mainLog.log', 'utf-8', cb)
      },
      //清空日志
      clearLog: function(cb, target) {
        switch (target) {
          case 'all' :
            target = rootDir + logPath + 'fetchEventDearAll.log'
            break
          case 'error' :
            target = rootDir + logPath + 'fetchEventDearError.log'
            break
          case 'pass' :
            target = rootDir + logPath + 'fetchEventDearPass.log'
            break
          case 'sys' :
            target = rootDir + logPath + 'mainLog.log'
            break
          default :
            target = ''
        }
        if (target) {
          fs.writeFile(target, '', cb)
        } else {
          cb('找不到目标文件')
        }
      },
      //导出日志
      output: function(cb, path) {
        cb(new Error('todo'), '写入成功')
      },
      //读取本地日志
      read: function(cb, path) {
        fs.readFile(path, 'utf-8', cb)
      }
    },
    request: {
      /**
       * param 格式如下
       *   {
       *       url : "http://localhost:3080/testGet",
       *       headers : {
       *           "hName" : "ibas"
       *       },
       *       method : "get",
       *       form : {
       *           hName : "bing"
       *       }
       *   }
       * */
      get: function(cb, param) {
        request.get(param, function(err, res, body) {
          tempRequestContent = body
          cb(err, res, body)
        })
      },
      post: function(cb, param) {
        request.post(param, function(err, res, body) {
          console.log(err)
          tempRequestContent = body
          cb(err, res, body)
        })
      },
      saveTemp: function(cb, path) {
        if (tempRequestContent) {
          fs.writeFile(path, tempRequestContent, cb)
        } else {
          cb('没有内容可以保存')
        }
      }
    },
    file: {
      /**
       * obj 为
       *      name : 文件名
       *      content : 文件内容
       * */
      append: function(cb, obj) {
        fs.appendFile(obj.name, obj.content, function(err) {
          cb(err, '添加成功')
        })
      },
      write: function(cb, obj) {
        let ret = '写入成功';
        let err = null;
        try {
          if (obj.binary) {
            fs.writeFileSync(obj.path,obj.content,'utf-8','binary');
          } else {
            fs.writeFileSync(obj.path,obj.content,'utf-8');
          }
        } catch (e) {
          err = e;
          ret = '写入失败';
        } finally {
          cb(err,ret);
        }
      },
      read: function(cb,obj) {
        let ret = null;
        let err = null;
        try {
          if (obj.binary) {
            ret = fs.readFileSync(obj.path,'utf-8','binary');
          } else {
            ret = fs.readFileSync(obj.path,'utf-8');
          }
        } catch (e) {
          err = e;
        } finally {
          cb(err,ret);
        }
      }
    },
    cmd: {
      exec(cb,obj) {
        cmd.exec(obj,function(err,stdout,stderr) {
          cb(err,{
            stdout,
            stderr
          });
        })
      }
    },
    setting: {
      get: commonSetting.getFile,
      set(cb,obj) {
        commonSetting.saveFile(cb,JSON.parse(obj));
      }
    }
  }

  var logManager = function(logAll, logPass, logError) {
    /**
     * error 表示仅记录错误日志
     * pass  记录成功日志
     * join 合并记录两种日志
     * split 分开记录两种日志
     * */
    var logType = ''
    return {
      //定制 log 事件
      order: function(type) {
        logType = type
      },
      //完成 log 定制事件
      keepLog: function(err, content) {
        var type = logType
        logType = ''
        if (content instanceof Object) {
          content = JSON.stringify(content)
        }
        if (err) {
          logProcess.error(content)
        } else {
          logProcess.info(content)
        }
        if (type == 'error') {
          if (err) {
            logError.error(content)
          }
        } else if (type == 'pass') {
          if (!err) {
            logPass.info(content)
          }
        } else if (type == 'join') {
          if (err) {
            logAll.error(content)
          } else {
            logAll.info(content)
          }
        } else if (type == 'split') {
          if (err) {
            logError.error(content)
          } else {
            logPass.info(content)
          }
        } else {
          //no log
        }
      }
    }
  }(logAll, logPass, logError)

  /**
   * obj 格式为
   *      event : "mysql-isInit",
   *      param : {}  //根据每个函数具体定义
   *      log : null  // null 是为不启动日志进行记录
   *          log 有多种取值，
   *              error 表示仅记录错误日志
   *              pass  记录成功日志
   *              join 合并记录两种日志
   *              split 分开记录两种日志
   * event 为 ipc 事件对象
   *
   * 前端接收到的信息必定是一个 错误对象和相应的内容，错误对象为空时，可能就没有相应的内容
   * */
  return function(event, obj) {
    var eventList = []
    if (obj.event) {
      eventList = obj.event.toString().split('-')
    }
    if (eventList.length) {
      var el = eventList.shift(),
        ev = events
      while (el) {
        ev = ev[el]
        el = eventList.shift()
      }
      logManager.order(obj.log);
      ev.bind(null,
        (function(id) {
          let data = arguments
          logManager.keepLog(data[0], {
            id,
            data
          });
          event.sender.send('fetchBack', {
            id,
            data: data[2],
            err: data[1]
          });
          console.log('over',JSON.stringify({
            id,
            data: data[2],
            err: data[1]
          },'','\t'));
        }).bind(null,obj.id)
      ) (obj.param || {})
    }
  }
})
