let fs = require('fs');

/**
 * 复制文本到指定位置
 * @param from      文本来源（文件地址）
 * @param to        文本去向（文件地址）
 * @param obj       文本替换内容（对象，全局替换）
 * @param equ       包裹替换文本的字符 例如 # 表示 obj 中的字段如果是 age: '年龄',就变成 #age#: '年龄'
 *
 * 特别的，当 from 为 false 时，文本直接为 obj （obj 此时为一个【字符串】）
 */
let copyFile = (from,to,obj,equ) => {
    if (!from) {
        fs.writeFileSync(
            to,
            obj
        );
    } else {
        if (obj) {
            let fileStr = fs.readFileSync(from,'utf-8');
            equ = equ || '';
            for (let i in obj) {
                let reg = RegExp(equ + i + equ,'g');
                fileStr = fileStr.replace(reg,obj[i]);
                fs.writeFileSync(to,fileStr);
            }
        } else {
            fs.writeFileSync(
                to,
                fs.readFileSync(from,'utf-8')
            );
        }
    }

};

module.exports = copyFile;
