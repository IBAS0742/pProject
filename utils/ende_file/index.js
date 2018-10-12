let fs = require('fs');
let ende = require('./../ende').ende;
let writeFile = require('./../fs-ext').writeFile;

/**
 * 加密解密 文件
 * @param inPath        输入文件
 * @param outPath       输出文件
 * @param key           加密密钥
 * @param en            true 表示加密，false 表示解密
 */
const endeFile = function(inPath,outPath,key,en) {
    writeFile(outPath,ende[en ? 'aesEncrypt' : 'aesDecrypt'](fs.readFileSync(inPath,'binary'),key),'binary');
};

exports.endeFile = endeFile;
