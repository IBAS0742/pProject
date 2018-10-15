/**
 * 生成一个 项目特有的文件结构 MD5
 */
let fs = require('fs');
let md5 = require('md5');
let glob = require('glob');
let UTF8 = 'utf-8';
let coreBakPath = '__core_bak_path__';
const MD5_FILE = 'md5.json';

const source_path = './../typeTwo/';

let file_list = {};

fs.readdir(source_path, function(err, files) {
    if (err) {
        throw err;
    }
    files.forEach(f => {
        if (f === MD5_FILE) {
            return;
        }
        let f_ = source_path + f;
        if (fs.statSync(f_).isFile()) {
            file_list[f] = md5(fs.readFileSync(f_,UTF8)).toUpperCase();
        } else {
            if (f === 'node_modules' || f === coreBakPath) {} else {
                glob.sync(f_ + '/**').forEach(file => {
                    if (fs.statSync(file).isFile()) {
                        file_list[file.replace(source_path,'')] = md5(fs.readFileSync(file,UTF8)).toUpperCase();
                    }
                });
            }
        }
    });
    fs.writeFileSync(source_path + 'md5.json',JSON.stringify(file_list,'','\t'));
    if (fs.existsSync(source_path + coreBakPath)) {} else {
        fs.mkdirSync(source_path + coreBakPath);
    }
    for (let i in file_list) {
        fs.writeFileSync(source_path + coreBakPath + '/' + file_list[i],fs.readFileSync(source_path + i,UTF8));
    }
});
