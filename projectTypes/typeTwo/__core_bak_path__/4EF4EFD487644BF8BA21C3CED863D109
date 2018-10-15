export const getParam = (str) => {
    //“a=b”最少有3个字符
    if (str.length < 3) {
        return {};
    } else {
        var dic = {};
        str.split(';').forEach(function(i) {
            var p = i.trim().split('=');
            if (dic[p[0]]) {
                if (dic[p[0]] instanceof Array) {
                    dic[p[0]].push(p[1]);
                } else {
                    dic[p[0]] = [dic[p[0]],p[1]];
                }
            } else {
                dic[p[0]] = p[1];
            }
        });
        return dic;
    }
}
