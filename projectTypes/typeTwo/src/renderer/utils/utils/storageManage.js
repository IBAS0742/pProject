export const isObject = (obj) => {
    return (obj instanceof Object) || (typeof obj == 'object');
};

export const isFunction = (fn) => {
    return (fn instanceof Function) || (typeof fn == "function");
};

export const defaultDomain = (() => {
    let defaultDomain_ = '';
    if (window.location.href.indexOf('localhost') + 1) {
        defaultDomain_ = "localhost";
    }
    return defaultDomain;
});

export const setCookie = (cname, cvalue, exdays,Domain)  => {
    let d = new Date();
    if(!Domain){Domain=defaultDomain};
    if (exdays) {} else {
        exdays = 1;
    }
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    if (isObject(cvalue)) {
        document.cookie = cname + "=" + JSON.stringify(cvalue) + "; " + expires + ";" +
            (Domain ? "path=/;domain="+Domain : 'path=/;');
    } else {
        document.cookie = cname + "=" + cvalue + "; " + expires + ";" +
            (Domain ? "path=/;domain="+Domain : 'path=/;');
    }
    return this;
};

export const cookieStorageManage = {
    add : setCookie,
    del(name,Domain) {
        setCookie(name,"",-1,Domain);
        return this;
    },
    change(cname, cvalue) {
        if (isObject(cvalue)) {
            document.cookie = cname + "=" + JSON.stringify(cvalue) + "; path=/;" +
                (defaultDomain ? " domain="+defaultDomain : "");
        } else {
            document.cookie = cname + "=" + cvalue + "; path=/;" +
                (defaultDomain ? " domain="+defaultDomain : "");
        };
        return this;
    },
    get(cookieName) {
        let cookieValue = document.cookie;
        let cookieStartAt = cookieValue.indexOf("" + cookieName + "=");
        if (cookieStartAt == -1) {
            cookieStartAt = cookieValue.indexOf(cookieName + "=");
        }
        if (cookieStartAt == -1) {
            cookieValue = null;
        } else {
            cookieStartAt = cookieValue.indexOf("=", cookieStartAt) + 1;
            cookieEndAt = cookieValue.indexOf(";", cookieStartAt);
            if (cookieEndAt == -1) {
                cookieEndAt = cookieValue.length;
            }
            cookieValue = unescape(cookieValue
                .substring(cookieStartAt, cookieEndAt));// 解码latin-1
        }
        try {
            return JSON.parse(cookieValue);
        } catch (e) {
            // console.warn("JSON.parse ocu error");
            return cookieValue;
        }
    },
    getOnce(cookieName) {
        let ret = getCookieValue(cookieName);
        delCookie(cookieName);
        return ret;
    }
};

export const sessionStorageManage = {
    add(sname,svalue) {
        if (isObject(svalue)) {
            sessionStorage.setItem(sname,JSON.stringify(svalue));
        } else {
            sessionStorage.setItem(sname,svalue);
        }
        return this;
    },
    del(sname) {
        if (sname in sessionStorage) {
            delete sessionStorage[sname];
        }
        return this;
    },
    change(sname,svalue) {
        this.add(sname,svalue);
        return this;
    },
    get(sname) {
        if (sname in sessionStorage) {
            try {
                return JSON.parse(sessionStorage[sname]);
            } catch (e) {
                console.log("%c" + sname + "对应存储内容不是一个对象","color: #9dc8ef;text-shadow: 1px 1px black;font-size:1.2em;");
                return (sessionStorage[sname]);
            }
        } else {
            return null;
        }
    }
};

export const nullStorageManage =  {
    add : function () {},
    del : function () {},
    change : function () {},
    get : function () {}
};

export const domStorageManage = (() => {
    if (window.parent !== window) {
        return window.parent.domStorageManage;
    } else {
        let createDom = function () {
            let dom = document.createElement("div");
            dom.style.display = "none";
            //document.body.append(dom);
            return dom;
        };
        let nameAndDom = {};
        return {
            add : function (name,obj) {
                let dom;
                if (nameAndDom[name]) {
                    dom = nameAndDom[name];
                } else {
                    dom = createDom();
                }
                //将对象序列号为字符串
                if (isObject(obj)) {
                    obj = JSON.stringify(obj);
                }
                nameAndDom[name] = dom;
                dom.innerHTML = obj;
                return this;
            },
            del : function (name) {
                if (nameAndDom[name]) {
                    delete nameAndDom[name];
                }
                return this;
            },
            change : function (name,obj) {
                if (nameAndDom[name]) {
                    if (isObject(obj)) {
                        obj = JSON.stringify(obj);
                    }
                    nameAndDom[name].innerHTML = obj;
                    return this;
                } else {
                    return this.add(name,obj);
                }
            },
            get : function (name) {
                if (name in nameAndDom) {
                    let obj = nameAndDom[name].innerHTML;
                    try {
                        obj = JSON.parse(obj);
                    } catch (e) {
                        console.log("%c" + name + "对应存储内容不是一个对象","color: #9dc8ef;text-shadow: 1px 1px black;font-size:1.2em;");
                    } finally {
                        return obj;
                    }
                } else {
                    return null;
                }
            }
        }
    }
})();

export const storageManages = {
    cookieStorageManage,
    sessionStorageManage,
    nullStorageManage,
    domStorageManage
};
