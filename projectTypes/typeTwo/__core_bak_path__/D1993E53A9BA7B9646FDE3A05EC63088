export const defaultOP =
  ' <div id="operater" :style="\'background:#c5bfbf63;z-index:100;position:absolute;display:\' + opStyle.display + \';pointer-events: none;left:0;top:\' + opStyle.top + \'px;height:\' + opStyle.height + \'px;width:100%;\'" ref="op">\n' +
  '        <div @click="appendBefore()">\n' +
  '            <div style="top: -20px;position: absolute;width: 40px;margin: 0 calc(50% - 20px);" class="plus-btn">+</div>\n' +
  '        </div>\n' +
  '        <div>\n' +
  '            <div style="width: 100%;text-align: center;justify-content: center;align-items: center;display: flex;height: 100%;">\n' +
  '                <div @click="toDelete()" class="plus-btn" style="display: inline-block"><yd-icon name="delete"></yd-icon></div>\n' +
  '                <div @click="toSetting()" class="plus-btn" style="display: inline-block"><yd-icon name="setting"></yd-icon></div>\n' +
  '            </div>\n' +
  '        </div>\n' +
  '        <div @click="appendAfter()">\n' +
  '            <div style="bottom: -20px;position: absolute;width: 40px;margin: 0 calc(50% - 20px);" class="plus-btn">+</div>\n' +
  '        </div>\n' +
  '    </div>\n' +
  '\n' +
  '    <div id="null" v-show="nullShow">\n' +
  '        <img style="padding:10%;width: 100%;" src="##basePath##build/img/icon-insert.png" alt="">\n' +
  '        <div style="display: inline-block;width: 100%;font-size: 17px;text-align: center;color: #2196F3;cursor: pointer;">\n' +
  '            <span @click="insertTemplate()">请添加组件</span>\n' +
  '        </div>\n' +
  '    </div>';

export const defaultOPMethod =
  '        methods: {\n' +
  '            overComponent: function (e) {\n' +
  '                window.ret = e;\n' +
  '                this.selectEle.id = e.target.id;\n' +
  '                if (e.target.getAttribute(\'tar\') === \'corver\') {\n' +
  '                    var loc = e.target.getClientRects()[0];\n' +
  '                    this.opStyle.top = e.target.offsetTop;\n' +
  '                    this.opStyle.height = loc.height;\n' +
  '                    this.opStyle.display = \'block\';\n' +
  '                }\n' +
  '            },\n' +
  '            toDelete: function() {\n' +
  '                window.parent.ret.deleteTemplate.bind(window.parent.ret,this.selectEle.id)();\n' +
  '            },\n' +
  '            toSetting: function() {\n' +
  '                window.parent.ret.settingTemplate.bind(window.parent.ret,this.selectEle.id)();\n' +
  '            },\n' +
  '            appendBefore: function() {\n' +
  '                this.insertTemplate(1);\n' +
  '            },\n' +
  '            appendAfter: function() {\n' +
  '                this.insertTemplate(-1);\n' +
  '            },\n' +
  '            insertTemplate: function (loc) {\n' +
  '                let nullDiv = document.getElementById(this.selectEle.id);\n' +
  '                if (loc) {\n' +
  '                    if (loc === 1) {\n' +
  '                        nullDiv.insertBeforeThis(this.blankBlock);\n' +
  '                    } else {\n' +
  '                        nullDiv.after(this.blankBlock);\n' +
  '                    }\n' +
  '                } else {\n' +
  '                    nullDiv.after(this.blankBlock);\n' +
  '                }\n' +
  '                this.nullShow = false;\n' +
  '                this.opStyle.display = \'none\';\n' +
  '                window.parent.ret.insertTemplate.bind(window.parent.ret,this.selectEle.id,loc)();\n' +
  '            }\n' +
  '        },\n' +
  '        mounted: function () {\n' +
  '            this.blankBlock = document.createElement(\'div\');\n' +
  '            this.blankBlock.classList.add(\'blank-block\');\n' +
  '            this.blankBlock.innerHTML = \'添加到此处\';\n' +
  '            if (document.getElementsByClassName(\'corver\').length) {\n' +
  '                this.nullShow = false;\n' +
  '            } else {\n' +
  '                this.nullShow = true;\n' +
  '            }\n' +
  '        }\n';

export const defaultPageHeader = '    <meta charset="utf-8">\n' +
  '    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
  '    <title>Vue-ydui Demo</title>\n' +
  '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
  '    <!-- 引入样式 -->\n' +
  '    <link rel="stylesheet" href="##basePath##build/vue/ydui.vue.css"/>\n' +
  '    <!-- 引入rem自适应类库 -->\n' +
  '    <script src="##basePath##build/js/ydui.flexible.js"></script>\n' +
  '    <link rel="stylesheet" href="##basePath##build/icon/ali/iconfont.css"/>\n' +
  '    <style>\n' +
  '        .blank-block {\n' +
  '            position: relative;\n' +
  '            display: flex;\n' +
  '            height: 135px;\n' +
  '            background: #F9F9F9;\n' +
  '            justify-content: center;\n' +
  '            align-items: center;\n' +
  '            font-size: 16px;\n' +
  '            color: rgba(0,0,0,.85);\n' +
  '            border: dotted;\n' +
  '            border-radius: 6px;\n' +
  '            margin: 6px;\n' +
  '            width: calc(100% - 12px);\n' +
  '            border-width: 2px;\n' +
  '        }\n' +
  '        .blank-block span {\n' +
  '            cursor: pointer;\n' +
  '        }\n' +
  '        .fill-block {\n' +
  '            width: 100%;\n' +
  '        }\n' +
  '        .fill-block-img {\n' +
  '            height: 30px;\n' +
  '            width: 30px;\n' +
  '            margin: auto;\n' +
  '            background-image: url(\'##basePath##build/img/icon-add.png\');\n' +
  '        }\n' +
  '        body::-webkit-scrollbar {\n' +
  '            display: none;\n' +
  '        }\n' +
  '        .plus-btn {\n' +
  '            width: 40px;\n' +
  '            height: 40px;\n' +
  '            line-height: 40px;\n' +
  '            font-size: 40px;\n' +
  '            margin: auto;\n' +
  '            border: 1px solid white;\n' +
  '            border-radius: 40px;\n' +
  '            text-align: center;\n' +
  '            background: white;\n' +
  '            box-shadow: 1px 1px 1px 1px #a2a2a2;\n' +
  '            cursor: pointer;\n' +
  '            pointer-events: fill;\n' +
  '        }\n' +
  '        .plus-btn-up {\n' +
  '            width: 100%;\n' +
  '            top: -20px;\n' +
  '            position: relative;\n' +
  '        }\n' +
  '        .plus-btn-down {\n' +
  '            width: 100%;\n' +
  '            top: calc(100% - 100px);\n' +
  '            position: relative;\n' +
  '        }\n' +
  '    </style>\n';

export const defaultPageBody =
  '<div id="app" style="height: 100%;">##content##</div>\n' +
  '<!-- 引入 Vue -->\n' +
  '<script src="##basePath##build/js/vue2.js"></script>\n' +
  '<!-- 引入 工具集合 -->\n' +
  '<script src="##basePath##build/js/utils.js"></script>\n' +
  '<!-- 引入组件库 -->\n' +
  '<script src="##basePath##build/vue/ydui.vue.js"></script>\n' +
  '##scriptFile##\n' +
  '<script>\n' +
  '   /*##script##*/\n' +
  '    window.app = new Vue({\n' +
  '        el: \'#app\',\n' +
  '        data: ##data##,##other##' +
  '    });\n' +
  '\n' +
  '    window.HTMLElement.prototype.insertBeforeThis = function (node) {\n' +
  '        this.parentElement.insertBefore(node,this);\n' +
  '    }\n' +
  '</script>';

export const pageOPData = {
  opStyle: {
    display: 'none',
    'pointer-events': 'none',
    top: 0,
    left: 0,
    width: '100%',
    height: 0,
    background:'#c5bfbf63',
    'z-index':100,
    position:'absolute'
  },
  selectEle: {
    id: null,
    blankBlock: null
  },
  nullShow: false
}

export default {
  defaultOP,
  defaultOPMethod,
  defaultPageHeader,
  defaultPageBody,
  pageOPData
}
