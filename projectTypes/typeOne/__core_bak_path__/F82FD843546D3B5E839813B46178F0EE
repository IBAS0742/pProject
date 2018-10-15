var translateTarget = document.getElementById('forTranslate') || document.body;

function makeTranslateDom(name,obj,tar) {
    // 删除dom
    {
        let tmpDom = document.getElementById('translate-' + name);
        if (tmpDom) {
            tmpDom.remove();
        }
    }
    // 生成dom
    {
        let dom = document.createElement('div');
        dom.id = 'translate-' + name;
        dom.style.display = 'none';
        dom.style.visibility = 'hidden';
        dom.setAttribute('name','div');
        if (!translateTarget) {
            var translateTarget = document.getElementById('forTranslate') || document.body;
        }
        translateTarget.appendChild(dom);
        dom.appendChild(makeDom(tar,obj));
    }
}

/**
 * 将属性写到一个元素里面进行保存
 * @param atr   对象描述
 * @param obj   对象
 */
function objectMakeDomHelp(atr,obj) {
    let div = document.createElement('div');
    div.setAttribute('tar','object');
    for (let i = 0;i < atr.length;i++) {
        let span = document.createElement('span');
        span.setAttribute('tar',atr[i]);
        span.innerText = obj[atr[i]];
        div.appendChild(span);
    }
    for (let i in obj) {
        if (atr.indexOf(i) + 1) {} else {
            let p = document.createElement('p');
            p.setAttribute('key',i);
            p.setAttribute('value',obj[i]);
            div.appendChild(p);
        }
    }
    return div;
}
/**
 * 将属性写到一个元素里面进行保存
 * @param tar       属性描述
 * @param value     值
 */
function makeDom(tar,value) {
    let li = document.createElement('li');
    li.setAttribute('target',tar.target);
    li.setAttribute('type',tar.type);
    if (tar.type === 'arrayObject') {
        li.setAttribute('atr',JSON.stringify(tar.atr));
        value.forEach(obj => {
            li.appendChild(objectMakeDomHelp(tar.atr,obj));
        });
    } else if (tar.type === 'object') {
        li.setAttribute('atr',JSON.stringify(tar.atr));
        li.appendChild(objectMakeDomHelp(tar.atr,value));
    }
    return li;
}

/**
 * 将某一个元素内的对象生成，和上面的 objectMakeDomHelp 对应
 * @param dom   元素
 */
function formTranObjectHelp(dom) {
    let tmpObj = {};
    Array.prototype.slice.call(dom.getElementsByTagName('span')).forEach(span => {
        tmpObj[span.getAttribute('tar')] = span.innerText.trim();
    });
    Array.prototype.slice.call(dom.getElementsByTagName('p')).forEach(p => {
        tmpObj[p.getAttribute('key')] = p.getAttribute('value');
    });
    return tmpObj;
}
/**
 * 生成整体的翻译对象
 */
function formTran(name) {
    let translateDom = null;
    if (name) {
        translateDom = document.getElementById('translate-' + name);
    } else {
        translateDom = document.getElementById('translate');
    }
    let lis = Array.prototype.slice.call(translateDom.getElementsByTagName('li'));
    let obj = {};
    lis.forEach(li => {
        let target = li.getAttribute('target');
        let type = li.getAttribute('type');
        if (type === 'arrayObject') {
            obj[target] = [];
            let atr = li.getAttribute('atr');
            Array.prototype.slice.call(li.getElementsByTagName('div')).forEach(div => {
                obj[target].push(formTranObjectHelp(div));
            });
        } else if (type === 'object') {
            obj[target] = formTranObjectHelp(li.getElementsByTagName('div')[0]);
        }
    });
    if (name) {
        return obj[name];
    } else {
        return obj;
    }
}
