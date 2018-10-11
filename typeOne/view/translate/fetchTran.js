function fetchTran(ajax,list,to = 'en',from = 'zh-CN') {
    if (from === to) {
        var dic = {};
        for (var i = 0;i < list.length;i++) {
            dic[list[i]] = list[i];
        }
        return new Promise(s => {
            s(dic);
        });
    } else {
        return new Promise((success,fail) => {
            ajax({
                url: 'https://translate.google.cn/translate_a/single?client=t&sl=auto&tl=' + to + '&hl=' + from + '&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&pc=1&otf=1&ssel=0&tsel=0&kc=1&tk=' + tk(list.join('\n')) + '&q=' + encodeURIComponent(list.join('\n')),
                method: "POST",
                // data : {
                //     q: list
                // },
                success,fail
            })
        }).then(req => {
            // let dic = {};
            // let retList = JSON.parse(req.responseText)[0];
            // let list = req.op.data.q;
            // for (var i = 0;i < retList.length;i++) {
            //     dic[list[i]] = retList[i][0];
            // }
            let dic = {};
            JSON.parse(req.responseText)[0].forEach(_ => {
                if (_[1]) {
                    dic[_[1].trim()] = _[0].trim();
                }
            });
            return dic;
        });
    }
};

console.log();

function fetchTranLists(ajax,cb,lists,to,from) {
    if (lists.length) {
        let total = lists.length;
        let dic = {};
        for (var i = 0;i < lists.length;i++) {
            fetchTran(ajax,lists[i],to,from).then(di => {
                total--;
                dic = Object.assign(dic,di);
                if (total === 0) {
                    cb(dic);
                }
            });
        }
    } else {
        return new Promise(s => {
            cb({});
        });
    }
}

/**
 * @return {string}
 */
var TKK = function() {
    tkk = sessionStorage.getItem('tkk');
    return tkk + '';
};
function b(a, b) {
    for (var d = 0; d < b.length - 2; d += 3) {
        var c = b.charAt(d + 2),
            c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
            c = "+" == b.charAt(d + 1) ? a >>> c : a << c;
        a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c
    }
    return a
}
function tk(a) {
    for (var e = TKK().split("."), h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < a.length; f++) {
        var c = a.charCodeAt(f);
        128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] = c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)
    }
    a = h;
    for (d = 0; d < g.length; d++) a += g[d], a = b(a, "+-a^+6");
    a = b(a, "+-3^+b+-f");
    a ^= Number(e[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1E6;
    return a.toString() + "." + (a ^ h)
}
function testGoogleTranslate(list) {
    list = list || ["今天","明天"];
    ajax({
        url: 'https://translate.google.cn/translate_a/single?client=t&sl=auto&tl=en&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=1&ssel=0&tsel=0&kc=2&tk=' + tk(list.join('')) + '&q=' + list.join(),
        success(ret) {
            window.ret = ret;
        }
    })
}
