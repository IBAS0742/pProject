var query_list = [];
var query_dict = {};
var temp_list = [];

/* 遍历dom解析结果，将页面text信息提取，push到query_list中 */
function walkParserDom(handler_dom) {
    for (var i in handler_dom) {
        if (handler_dom[i].type === 'text') {
            var text_buf = handler_dom[i].data;
            if (!text_buf.trim()) {
                // 回车和空格不要
                continue;
            } else if (parseFloat(text_buf).toString() === text_buf.toString()) {
                // 纯数字不要
                continue;
            } /*else if (month.indexOf(text_buf.trim()) + 1) {
                // 月份已经做了
                continue;
            }*/
            if (text_buf !== "" && !hasChar(text_buf, fliter_set)) {
                if (!query_dict[replaceChar(text_buf, replace_dict)]) {
                    query_dict[replaceChar(text_buf, replace_dict)] = true;
                    temp_list.push(replaceChar(text_buf, replace_dict));
                    if (temp_list.length === 20) {
                        query_list.push(temp_list);
                        temp_list = [];
                    }
                }
            }
        }
        walkParserDom(handler_dom[i].children);
    }
};

/* 遍历dom树，根据翻译结果进行结果回填 */
function enumChildNodes(parentNode, data,notMakeTranEle) {
    var node = parentNode.firstChild;
    notMakeTranEle = !!notMakeTranEle;
    if ((parentNode.classList || { contains : (a => a) }).contains('el-picker-panel')) {
        notMakeTranEle = true;
    }
    if (node != null) {
        while (node != null) {
            if (node.nodeType === 3) {
                node.nodeValue = node.nodeValue.replace(/(^\s*)|(\s*$)/g, '');
                node.nodeValue = node.nodeValue.replace(/(\n)+|(\r\n)+/g, '');
                for (var i = 0; i < node.nodeValue.length; i++) {
                    if (node.nodeValue[i].charCodeAt() === 160) {
                        var kg = node.nodeValue.substring(i, i + 1);
                        node.nodeValue = node.nodeValue.replace(kg, ' ');
                    }
                }
                // console.log('node.nodeValue--', node.nodeValue);
                if (notMakeTranEle) {
                    node.textContent = data[node.nodeValue];
                    var next = node.nextSibling;
                    node = next;
                } else {
                    var dst = data[node.nodeValue];
                    if (typeof dst === 'undefined' || dst.length === 0 || dst === 'null') {
                        var next = node.nextSibling;
                        node = next;
                        continue;
                    }
                    if (dst.length <= 10) {
                        if (dst[dst.length - 1] === '。') {
                            dst = dst.substring(0, dst.length - 1);
                        }

                    }
                    // console.log('dst----', dst);
                    var trans = document.createElement("trans");
                    var att = document.createAttribute("data-src");
                    att.value = node.nodeValue;
                    trans.setAttributeNode(att);
                    var att1 = document.createAttribute("data-dst");
                    att1.value = data[node.nodeValue];
                    trans.setAttributeNode(att1);
                    // trans.textContent = data[node.nodeValue];
                    trans.textContent = dst;
                    parentNode.insertBefore(trans, node);
                    var next = node.nextSibling;
                    parentNode.removeChild(node);
                    if ((trans.parentElement.textContent || '').trim() === dst.trim() || (trans.parentElement.innerText || '').trim() === dst.trim()) {} else {
                        var span = document.createElement('span');
                        var trans_clone = trans.cloneNode();
                        span.appendChild(trans_clone);
                        trans_clone.textContent = dst;
                        parentNode.insertBefore(span, trans);
                        parentNode.removeChild(trans);
                    }
                    node = next;
                }
                continue;
            }
            enumChildNodes(node, data,notMakeTranEle);
            node = node.nextSibling;
        }
    }
};

function translate(to,cb,dom) {
    dom = dom || document.body;
    Array.prototype.slice.call(dom.getElementsByTagName('trans')).forEach(tr => {
        tr.parentElement.innerHTML = tr.getAttribute('data-src');
    });
    query_list = [];
    query_dict = {};
    temp_list = [];
    var handler = new Tautologistics.NodeHtmlParser.DefaultHandler(function (error, dom) {
        if (error) {
        } else {
        }
    });
    var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
    parser.parseComplete((dom).innerHTML);
    walkParserDom(handler.dom);
    if (query_list.length === 0) {
        if (temp_list.length !== 0) {
            query_list = [temp_list];
        } else {
            return ;
        }
    } else {
        query_list.push(temp_list);
    }
    // query_list.push(["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]);
    fetchTranLists(ajax,dic => {
        enumChildNodes((dom),dic);
        cb ? setTimeout(cb) : false;
    },query_list,langMapping[to].google);
};

/**
 * common
 */
var fliter_set = ['=', '►', '▼', '◄', '★', '☆', '✘', '›', '', ''];
var replace_dict = {
    // '…': "...",
    '&amp': '&',
    '&amp;': '&',
    '&gt;': '>',
    // '&nbsp;': ' '

    '&;': '&'
}
function hasChar(s, c_set) {
    if (s.indexOf('{') >= 0 && s.indexOf('}') >= 0 && s.indexOf('=') >= 0) {
        return true;
    }
    if (s == '\n') {
        return true;
    }
    for (var i = 0; i < c_set.length; i++) {
        if (s.indexOf(c_set[i]) >= 0) {
            return true;
        }
    }
    return false;
}
function replaceChar(s, r_dict) {
    for (var r in r_dict) {
        s = s.replace(r, r_dict[r]);
    }
    return s;
}
function ajax(op) {
    function formsParams(data){
        var arr = [];
        for(var prop in data){
            if (data[prop] instanceof Array) {
                data[prop].forEach(p => {
                    arr.push(prop + "[]=" + p);
                });
            } else {
                arr.push(prop + "=" + data[prop]);
            }
        }
        return arr.join("&");
    }
    var request = new XMLHttpRequest();
    request.op = op;
    request.open('POST', op.url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(formsParams(op.data));
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            console.log(op);
            op.success(request);
        } else {
            // We reached our target server, but it returned an error

        }
    };
}

