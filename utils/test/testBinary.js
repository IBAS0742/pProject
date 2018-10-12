let fs = require('fs');
let ende = require('./../ende').ende;

let inp = './test/1.jpg';
let out = './test/2.jpg';
let out2 = './test/3.jpg';
let key = 'ibas';

fs.writeFileSync(out,ende.aesEncrypt(fs.readFileSync(inp,'binary'),key),'binary');

fs.writeFileSync(out2,ende.aesDecrypt(fs.readFileSync(out,'binary'),key),'binary');
