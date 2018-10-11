let fs = require('fs');

let writeFile = function(path,data,binary) {
    let path_ = path.replace(/\\/g,'/').split('/');
    let path_join = path_.shift();
    while (path_.length > 0) {
        // console.log(path_,path_join);
        if (fs.existsSync(path_join)) {} else {
            fs.mkdirSync(path_join);
        }
        path_join += '/' + path_.shift();
    }
    if (binary) {
        fs.writeFile(path,data,'binary',function (err) {
            if (err) {
                console.log('【' + path + '】复制时发生问题',e);
            }
        });
    } else {
        fs.writeFileSync(path,data);
    }
};

let deleteFolder = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

exports.writeFile = writeFile;
exports.deleteFolder = deleteFolder;
