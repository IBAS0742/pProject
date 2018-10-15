let fs = require("fs");

export const log = (__dirname,logPath) => {
  const log4js = require('log4js');
  __dirname = __dirname + logPath;
  if (fs.existsSync(__dirname)) {} else {
    fs.mkdirSync(__dirname);
  }
  log4js.configure({
    appenders: {
      mainLog: { type: 'file', filename : __dirname + '/mainLog.log' },
      fetchEventDearAll : { type: 'file', filename : __dirname + '/fetchEventDearAll.log' },
      fetchEventDearError : { type: 'file', filename : __dirname + '/fetchEventDearError.log' },
      fetchEventDearPass : { type: 'file', filename : __dirname + '/fetchEventDearPass.log' },
      process : { type: 'file', filename : __dirname + '/process.log' }
    },
    categories: {
      default : { appenders: ['mainLog'], level: 'info' },
      fetchEventDearAll : { appenders: ['fetchEventDearAll'], level: 'ALL' },
      fetchEventDearError : { appenders: ['fetchEventDearError'], level: 'error' },
      fetchEventDearPass : { appenders: ['fetchEventDearPass'], level: 'info' },
      process : { appenders: ['process'], level: 'ALL' }
    }
  });
  return log4js;
}
