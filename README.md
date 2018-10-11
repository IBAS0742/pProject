# pProject
部分性公开项目

> typeOne 是 electron + 普通网站组成的，附加功能有

>> 1.普通国际化(todo 调用 谷歌翻译 )

>> 2.配置载入载出

>> 3.不安全的页面(允许注入代码)

>> 4.三种系统打包

* 文件夹说明
> 1. utils 文件夹是用来维护项目的基础工具

```shell
# 这是一个小型的 node 项目
# 安装
npm i
# 运行
node createMD5
node buildOddFiles
node combineFiles
```

```javascript
// 1. createMD5.js 用法
// 新的项目类型文件夹直接放置到根目录下，例如命名为 typeOne
// 修改 文件【createMD5.js】中的 source_path
source_path = './../typeOne/';
// 执行之后会产生 __core_bak_path__ 文件夹和 md5.json 文件

// 2.buildOddFiles.js
// 修改文件中的 const source_path 、 md5_path 、 key
// 要加密的项目
source_path = 'D:/HTML/test/GEE/';
// 项目类型对应的 md5 文件，由 【createMD5.js】 产生
md5_path = './../typeOne/md5.json';
// 加密解密密钥
key = '加密密钥';
// 执行之后会产生 __bak_file__ 文件夹和 md5.json 文件

// 3.combineFiles.js 
// 解密项目
// 修改文件中的 source_path 、 md5_path 、 key
// source_path 只要有由【2.buildOddFiles.js】 产生的文件即可
// md5_path 是项目类型文件的 md5 文件
// key 千万要记住
```

> 2. projects 中存放我个人的所有项目，其中的第二级目录名称是 项目类型，当前里面有一个项目，密码是【天空】，呃，是加密的【天空】

> 3.剩下的目录结构是项目类型，当前只有一个 【typeOne】

>> 理论上，这里的每一个项目都是基础项目都是可以独立运行的。

| 项目 | 密钥 |
| -------- | -------- |
| project/typeOne/geeis/  | 天空 |

