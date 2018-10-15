let glob = require('glob');
let fs = require('fs');
let rela_path = './../../pages';
let route_file = './../route.json';

let route = JSON.parse(fs.readFileSync(route_file));

let import_str = ["import home from './singleHome.vue'"];
let route_obj = [
  `{
    path : '/',
    component: home,
    name: "主页"
  }`
];

glob.sync(rela_path + '/**/**.html').forEach(file => {
  //  ./../../pages/main/main/main.html
  file = file.replace('./../../pages','./pages').replace('.html','.vue');
  let file_ = file.split('/');
  import_str.push("import home from '" + file + "'")
  // main
  file_ = file_[file_.length - 1].split('.vue')[0];
  route_obj.push(`{
    path : "/` + file_ + `",
    component: ` + file_ + `,
    ` +
      (
        (file_ in route) ?
          `name: "` + route[file_].name + `",
          icon: "` + route[file_].icon + '"'
          :
          `name: "` + file_ + `",
          icon: "el-icon-setting"`
      )
    + `}`);
});

console.log(import_str.join('\n') + '\n\nlet routers = [' + route_obj.join(',').replace(/ /g,'').replace(/\n/g,'') + '];\n\nexport default routers;');
