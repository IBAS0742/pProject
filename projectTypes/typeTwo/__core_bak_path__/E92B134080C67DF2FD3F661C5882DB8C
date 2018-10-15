/**
 * 本脚本的目的是脱离 electron 代码自动生成国际化的
 * */
const fs = require('fs');
const cheerio = require('cheerio');
const fileName = './合并测试.xml';

fs.readFile(fileName,'utf-8',(err,ret) => {
    var root = cheerio.load(ret);
    console.log(root);
});
