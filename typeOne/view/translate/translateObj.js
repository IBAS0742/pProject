/**
 * 将一个对象进行翻译
 * @param obj       要翻译的对象
 * @param cb        回调函数，第一个接受参数是翻译对象的翻译结果
 * @param lang      翻译的语言类型
 */
function translateObj(obj,cb,lang) {
    let atr = [];
    let name = 'tmp__';
    for (let i in obj) {
        atr.push(i);
    }
    makeTranslateDom(name,obj,{
        target: name,
        type: 'object',
        atr
    });
    translate(lang,function () {
        cb(formTran(name))
    },document.getElementById('translate-tmp__'));
}
