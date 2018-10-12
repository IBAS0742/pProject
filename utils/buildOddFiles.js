/**
 * 生成一个 项目特有的文件结构
 */
let fs = require('fs');
let md5 = require('md5')
let glob = require('glob');
let ende = require('./ende').ende;
let writeFile = require('./fs-ext').writeFile;
let endeFile = require('./ende_file').endeFile;
let deleteFolder = require('./fs-ext').deleteFolder;

const source_path = 'D:/HTML/test/GEE/';
const md5_path = './../typeOne/md5.json';
const MD5_FILE = 'md5.json';

let file_list = {};
let bakFileDirName = '__bak__file__';
let key = 'key';
let UTF8 = 'UTF-8';

fs.readdir(source_path, function(err, files) {
    if (err) {
        throw err;
    }
    files.forEach(f => {
        let f_ = source_path + f;
        if (fs.statSync(f_).isFile()) {
            file_list[f] = md5(fs.readFileSync(f_,UTF8)).toUpperCase();
        } else {
            if (f === 'node_modules' || f === bakFileDirName) {} else {
                glob.sync(f_ + '/**').forEach(file => {
                    if (fs.statSync(file).isFile()) {
                        file_list[file.replace(source_path,'')] = md5(fs.readFileSync(file,UTF8)).toUpperCase();
                    }
                });
            }
        }
    });
    check_file(file_list,JSON.parse(fs.readFileSync(md5_path,UTF8)));
});

/**
 * @param newMD5    当前文件夹的所有文件的 MD5 码
 * @param oldMD5    记录的所有文件的 MD5 码
 * */
let check_file = function (newMD5,oldMD5) {
    // 一、将不存在的文件的 MD5 码进行删除，并将被修改的文件移除文件保护列表
    for (let i in oldMD5) {
        if (i in newMD5) {
            if (newMD5[i] !== oldMD5[i]) {
                delete oldMD5[i];
            } else {
                delete newMD5[i];
            }
        } else {
            delete oldMD5[i];
        }
    }
    // 二、做妖，生成保护文件
    if (fs.existsSync(source_path + bakFileDirName)) {} else {
        fs.mkdirSync(source_path + bakFileDirName);
    }
    for (let i in newMD5) {
        let ir = i.split('/');
        if (ir[ir.length - 1] === MD5_FILE) {
            continue;
        }
        endeFile(source_path + i,source_path + bakFileDirName + '/' + i,key,true);
    }
    // 三、将新的 MD5 文件进行保存
    fs.writeFileSync(source_path + 'md5.json',JSON.stringify(Object.assign({},newMD5,oldMD5),'','\t'));
};
