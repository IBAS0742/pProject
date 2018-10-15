const fs = require('fs');

const setting = (function (fileName) {
    var obj = {};
    obj.fileName =  fileName || null;
    obj.data =  null;
    let saveFile = (data) => {
        if (obj.fileName) {
            if (obj.data === null) {
                obj.getFile(obj.saveFile.bind(this,data));
            }
            Object.assign(obj.data,(data || {}));
            fs.writeFileSync(obj.fileName,JSON.stringify(obj.data));
        } else {
            console.log("not file name");
        }
    };
    let getFile = (cb)  => {
        if (obj.fileName) {
            if (fs.existsSync(obj.fileName)) {
                let data = fs.readFileSync(obj.fileName,'utf-8');
                try {
                    obj.data = JSON.parse(data);
                } catch (e) {
                    obj.data = {};
                } finally {
                    cb(obj.data);
                }
            } else {
                obj.data = {};
                cb(obj.data);
            }
        } else {
            console.log("not file name");
            cb({});
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
    return {
        saveFile,
        getFile,
        changeFileName
    };
});

exports.setting = setting;
