const copyFile = require('./copyFile');
let fs = require('fs');

// 文件名
const name = 'main';
// 文件深度名称(文件夹)
const dir = '/main/';
const title = '主页面';

let html_path = './base/elm.html';
let ui_path = './base/elm.js.tpl';
let rela_path = './../pages';

let ps = dir.split('/').length;
let jsPath = './';
for (var i = 1;i < ps;i++) {
  jsPath += '../'
}
const setting = {
  //html
  title,
  //js
  Name: name[0].toUpperCase() + name.substring(1),
  //路径
  dir: dir + name,
  //文件名称
  fileName: name,
  path: jsPath
};
if (!fs.existsSync(rela_path + dir)) {
  fs.mkdirSync(rela_path + dir);
}
if (!fs.existsSync(rela_path + setting.dir)) {
  fs.mkdirSync(rela_path + setting.dir);
}

[
  {
    // vue
    from: './base/title.vue.tpl',
    to: rela_path + setting.dir + '/' + setting.fileName + '.vue',
    obj: setting
  },
  {
    // html
    from: html_path,
    to: rela_path + setting.dir + '/' + setting.fileName + '.html',
    obj: setting
  },
  {
    // js
    from: ui_path,
    to: rela_path + setting.dir + '/' + setting.fileName + '.js',
    obj: setting
  }
].forEach(obj => copyFile(obj.from,obj.to,obj.obj,'#'));

require('child_process').exec("node initRoute.js",function(err,stdout,stderr) {
  if (err) {
    console.error(err);
  } else {
    console.log('创建成功')
  }
})

