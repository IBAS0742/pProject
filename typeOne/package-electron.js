var arguments = process.argv.splice(2);
// 程序名称
const outputName = 'gis-plt';
const ignore = "\"(dist|src|docs|.gitignore|LICENSE|README.md|webpack.config*|node_modules)\"";

let str = (obj => {
    let str_ = ['electron-packager . ' + outputName + ' --asar'];
    for (let i in obj) {
        str_.push('--' + i + '=' + obj[i]);
    }
    if (arguments[1] === 'i') {
        str_.push('--ignore=' + ignore);
    }
    return str_;
})(
    {
        // 打包位置
        out: './dist',
        // 平台 ‘win32|darwin|linux’
        platform: (_ => {
            return _[(arguments[0] || 'win')];
        })({
            win: 'win32',
            linux: 'linux',
            mac: 'darwin'
        }),
        // 位( x64 | x86)
        bit: 'x64',
        // 图标
        // icon: '',
        'app-version': '2.0.5'
    }
);

console.log(str.join(' '));

require('child_process')
    .exec(str.join(' '),
        function(err, stdout, stderr) {
            if (err) {
                throw err;
            } else {
                console.log('打包成功 ===> \n',stdout);
            }
        });
