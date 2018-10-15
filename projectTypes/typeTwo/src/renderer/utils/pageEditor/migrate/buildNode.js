/**
 *
 * @param nodes 格式为对象或对象的数组
 *      对象的格式为 { name: 'script' , attr : { src : 'js/vue.js' } }
 * @returns {string}
 */
export const buildNode = (nodes) => {
    // 默认格式一定是对的
    // nodes = ((nodes || []) instanceof Array ? nodes : [nodes]);
    nodes = (nodes instanceof Array ? nodes : [nodes]);
    return nodes.map(n => {
        let t = ['<' + n.name];
        for (let i in n.attr) {
            t.push(i + '="' + n.attr[i] + '"');
        }
        if (n.notClose) {
            t.push('/>');
        } else {
            t.push('>' + (n.content || '') + '</' + n.name + '>');
        }
        return t.join(' ');
    }).join('');
};
