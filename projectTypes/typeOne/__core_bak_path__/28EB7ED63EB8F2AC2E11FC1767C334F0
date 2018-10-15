var langMapping = require('./langMapping').langMapping;

const getMyLang = function (lang) {
    if (lang === 'en' || lang === 'en_GB' || lang === 'en_US') {
        // 英文
        return 'en';
    } if (lang === 'zh_CN' || lang === 'zh_TW') {
        // 中文
        return 'zh';
    } else {
        for (let i in langMapping) {
            if (lang === langMapping[i].google) {
                // 我们登记的语言
                return i;
            }
        }
    }
    // 其他语言返回中文
    return 'zh';
};

exports.getMyLang = getMyLang;
