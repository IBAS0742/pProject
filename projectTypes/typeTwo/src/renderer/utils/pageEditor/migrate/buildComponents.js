/**
 * 生成组件语句
 * @param coverEleName  默认为 "coverEle"
 * @param output        是否为输出
 * @param tplName       模板名称
 * @param vname         节点名称
 * @param ind           节点序号
 * @returns {string}    组件语句
 */
let buildComponentStr = (coverEleName,output,tplName,vname,ind) => {
    if (output) {
        return '<' + tplName + ' v-bind="' + vname + '' + ind + '"></' + tplName + '>';
    } else {
        coverEleName = coverEleName || "coverEle";
        return '<' + coverEleName + ' :id="\'id_' + ind + '\'"><' + tplName + ' v-bind="' + vname + '' + ind + '"></' + tplName + '></' + coverEleName + '>';
    }
};

/**
 * 生成组件语句和数据方法
 * @param basePath
 * @param coverEleName  默认为 "coverEle"
 * @param output        是否为输出
 * @param idToTplName       templateId 映射到 tplName 的对象 idTemplateMapper.idToTplName
 * @param idToVname         templateId 映射到 vname 的对象 idTemplateMapper.idToVname
 * @param idToFname         templateId 映射到 vname 的对象 idTemplateMapper.idToFname
 * @param contents          page.contents 对象
 *          结构是 [ { id : '组件的id' , attr : { 组件的数据 } } ]
 */
export const buildComponents = (basePath,coverEleName,output,idToTplName,idToVname,idToFname,contents) => {
    let registerTemplate = {};
    let dataObj = {};
    let files = [];
    let componentStr = contents.map((c,ind) => {
        if (c) {
            if (c.id in registerTemplate) {} else {
                registerTemplate[c.id] = '';
                files.push('<script src="' + basePath + 'build/components/' + idToFname[c.id] + '"></script>');
            }
            dataObj[idToVname[c.id] + '' + ind] = c.attr;
            return buildComponentStr(coverEleName,output,idToTplName[c.id],idToVname[c.id],ind);
        } else {
            return '';
        }
    });
    return {
        data: dataObj,
        files,
        componentStr
    };
};

/**
 * test
 * buildComponents('haha',true,ret.idTemplateMapper.idToTplName,ret.idTemplateMapper.idToVname,ret.idTemplateMapper.idToFname,ret.pages["b6eb6f3d-88ce-478d-b792-2c16240739d4"].content.filter(_ => _));
 */
