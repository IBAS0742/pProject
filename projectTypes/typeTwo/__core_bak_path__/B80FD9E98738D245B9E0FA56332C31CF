let fs = require('fs');

export const setting = (function (fileName) {
  var obj = {};
  obj.fileName =  fileName || null;
  obj.data =  null;
  let fp = obj.fileName.replace(/\\/g,'/').split('/');
  fp.pop();
  if (fs.existsSync(fp.join('/'))) {} else {
    fs.mkdirSync(fp.join('/'));
  }
  obj.saveFile = function(cb,data) {
    if (obj.fileName) {
      console.log('out',obj.data);
      if (obj.data === null) {
        console.log('in',obj.saveFile);
        obj.getFile(this.saveFile.bind(this,cb,data));
      } else {
        obj.data = Object.assign(obj.data,(data || {}));
        fs.writeFileSync(obj.fileName,JSON.stringify(obj.data));
        cb(null,obj.data);
      }
    } else {
      console.log("not file name");
      cb("not file name");
    }
  };
  obj.getFile = function(cb) {
    if (obj.fileName) {
      if (fs.existsSync(obj.fileName)) {
        let data = fs.readFileSync(obj.fileName,'utf-8');
        try {
          obj.data = JSON.parse(data);
        } catch (e) {
          obj.data = {};
        } finally {
          cb(null,obj.data);
        }
      } else {
        obj.data = {};
        cb(null,obj.data);
      }
    } else {
      console.log("not file name");
      cb(null,{});
    }
  };
  let changeFileName = (fileName) => {
    if (obj.fileName) {
      if (obj.data) {
        saveFile();
      }
    } else {
    }
    obj.fileName = fileName;
  };
  return obj;
});
