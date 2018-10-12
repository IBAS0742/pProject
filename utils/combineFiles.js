/**
 * 将加密文件进行恢复
 */
let fs = require('fs');
let ende = require('./ende').ende;
let writeFile = require('./fs-ext').writeFile;
let endeFile = require('./ende_file').endeFile;
let deleteFolder = require('./fs-ext').deleteFolder;
// 要恢复的项目文件夹
// const source_path = './../projects/typeOne/geeis/';
const source_path = 'D:/HTML/test/GEE_r/';
// 要恢复的项目文件夹的原文件
let bakFileDirName = '__bak__file__';

// 核心项目文件夹
const core_path = './../typeOne/';
// 核心文件
let coreBakPath = '__core_bak_path__';
let MD5_FILE = 'md5.json';
const key = 'key';
let UTF8 = 'UTF-8';

function recorver() {
    // 1. 清空原文件夹
    fs.readdirSync(source_path).forEach(f => {
        if (f === bakFileDirName || f === MD5_FILE) {} else {
            if (fs.statSync(source_path + f).isFile()) {
                fs.unlinkSync(source_path + f);
            } else {
                deleteFolder(source_path + f);
            }
        }
    });
    // 2. 从 MD5 文件恢复文件
    let old_md5 = JSON.parse(fs.readFileSync(core_path + MD5_FILE,UTF8));
    let new_md5 = JSON.parse(fs.readFileSync(source_path + MD5_FILE,UTF8));

    for (let i in new_md5) {
        // 判断 文件i 是否存在
        if (fs.existsSync(source_path + bakFileDirName + '/' + i)) {
            endeFile(source_path + bakFileDirName + '/' + i,source_path + i,key,false);
        } else if (i in old_md5) {
            if (fs.existsSync(core_path + coreBakPath + '/' + old_md5[i])) {
                writeFile(source_path + i,fs.readFileSync(core_path + coreBakPath + '/' + old_md5[i],UTF8));
            } else {
                console.log('丢失文件');
                console.log('\t【' + core_path + coreBakPath + '/' + old_md5[i] + '】');
                console.log('\t【' + source_path + bakFileDirName + '/' + i + '】');
            }
        }
    }

    console.log("##### 合并完成 #####");
}

recorver();


