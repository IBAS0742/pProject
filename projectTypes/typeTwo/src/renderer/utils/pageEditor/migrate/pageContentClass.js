import { buildComponents } from './buildComponents';
import { buildNode } from './buildNode';

export const pageContentClass = function(name,basePathReplaceName,opProps) {
    let pageContent = {
        name
    };
    pageContent.opEleName = 'operate-ele';
    pageContent.coverEleName = 'cover-ele';
    pageContent.output = false;
    pageContent.preview = false;
    // 以下 3 个对应到 editor 的 idTemplateMapper ，在 初始化结束后再赋值
    pageContent.idToTplName = {};
    pageContent.idToVname = {};
    pageContent.idToFname = {};
    // 替换基础路径的名称 和 下方的正则会关联
    pageContent.basePathReplaceName = basePathReplaceName || '##basePath##';
    pageContent.basePathReplaceNameReg = new RegExp(basePathReplaceName || '##basePath##','g');
    // 输出页面时的文件路径 编辑页面时的文件路径 当前的文件路径（和 output 同步）
    pageContent.outputFilePath = '';
    pageContent.editorFilePath = '';
    pageContent.baseFilePath = '';
    // 操作部件视觉性参数
    pageContent.opProps = opProps || {
        imgStyle: {},
        deleteIcon: '',
        settingIcon: '',
        insertImageUrl: ''
    };
    // meta link
    pageContent.headArr = [
        // {
        //     name: 'meta',
        //     attr: {
        //         'charset': 'utf-8'
        //     }
        // },
        // {
        //     name: 'title',
        //     content: '标题'
        // }
    ];
    pageContent.head = '';
    // js 文件
    pageContent.jsFilesArr = [];
    pageContent.jsFiles = '';
    pageContent.buildComponents = function(contents) {
        return buildComponents(this.baseFilePath,this.coverEleName,this.output || this.preview,this.idToTplName,this.idToVname,this.idToFname,contents);
    };
    /**
     *
     * @param layout
     * @param contents
     */
    pageContent.buildHTML = function (layout,contents) {
        let contentRet = this.buildComponents(contents);
        contentRet.files.push('<script src="' + this.baseFilePath + 'build/components/' + this.idToFname[layout.layoutId] + '"></script>');
        if (this.output || this.preview) {
            contentRet.data = Object.assign({},contentRet.data,{
                layoutdata: layout.attr
            });
        } else {
            contentRet.componentStr.unshift('<' + this.opEleName + ' v-bind="opdata"' + '></' + this.opEleName + '>');
            contentRet.data = Object.assign({},contentRet.data,{
                layoutdata: layout.attr,
                opdata: this.opProps
            });
        }
        contentRet.componentStr.unshift('<body><div id="app"><' + this.idToTplName[layout.layoutId] + ' v-bind="layoutdata">');
        contentRet.componentStr.unshift(this.head.replace(this.basePathReplaceNameReg,this.baseFilePath));
        contentRet.componentStr.push('</' + this.idToTplName[layout.layoutId] + '>');
        contentRet.componentStr.push('</div>');
        contentRet.componentStr.push(this.jsFiles.replace(this.basePathReplaceNameReg,this.baseFilePath));
        contentRet.componentStr = contentRet.componentStr.concat(contentRet.files);
        contentRet.componentStr.push('<script>');
        contentRet.componentStr.push('new Vue(' + JSON.stringify({
            el: '#app',
            data: contentRet.data
        },null,'\t') + ')');
        contentRet.componentStr.push('</script></body>');
        return contentRet.componentStr.join('');
    }
    return new Proxy(pageContent,{
        set: function (obj,prop,value) {
            let pass = true;
            switch (prop) {
                case 'output':
                    obj.baseFilePath = value ? obj.outputFilePath : obj.editorFilePath;
                    value ? obj.preview = false : 0;
                    break;
                case 'headArr':
                    obj.head = '<head>' + buildNode(value) + '</head>';
                    break;
                case 'head':
                    pass = false;
                    break;
                case 'jsFilesArr':
                    obj.jsFiles = buildNode(value);
                    break;
                case 'jsFiles':
                    pass = false;
                    break;
                case 'basePathReplaceName':
                    obj.basePathReplaceNameReg = new RegExp(value,'g');
                    break;
                case 'outputFilePath':
                case 'editorFilePath':
                    obj[prop] = value;
                    obj.baseFilePath = obj.output ? obj.outputFilePath : obj.editorFilePath;
                    break;
            }
            pass ? (obj[prop] = value) : (console.error("属性",prop,"不能设置"));
            return obj;
        }
    });
};

/*
 * test
 var pc = new pageContentClass()
 pc.idToFname = ret.idTemplateMapper.idToFname
 pc.idToVname = ret.idTemplateMapper.idToVname
 pc.idToTplName = ret.idTemplateMapper.idToTplName
 var p = ret.pages["b6eb6f3d-88ce-478d-b792-2c16240739d4"];
 pc.buildHTML(p.layout,p.content.filter(_ => _))
 * */
