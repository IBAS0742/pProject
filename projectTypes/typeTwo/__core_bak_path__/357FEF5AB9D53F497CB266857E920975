import { pageContentClass } from './migrate/pageContentClass';
import { templatePath } from './migrate/templatePath'

export const pageContentMobile = () => {
    let basePathName = '##basePath##';
    let pc = new pageContentClass('mobile',basePathName,{
        imgStyle: {
            padding:'10%',
            width: '100%'
        },
        deleteIcon: 'yd-icon-delete',
        settingIcon: 'yd-icon-setting',
        insertImageUrl: './../static/build/img/icon-insert.png'
    });
    pc.outputFilePath = templatePath.outputBasePath;
    pc.editorFilePath = templatePath.basePath;
    pc.jsFilesArr = [
        {
            name: 'script',
            attr: {
                src: '##basePath##build/js/vue2.js'
            }
        },
        {
            name: 'script',
            attr: {
                src: '##basePath##build/js/utils.js'
            }
        },
        {
            name: 'script',
            attr: {
                src: '##basePath##build/vue/ydui.vue.js'
            }
        },
        {
            name: 'script',
            attr: {
                src: './../static/build/js/coverEle.js'
            }
        },
        {
            name: 'script',
            attr: {
                src: './../static/build/js/operateEle.js'
            }
        }
    ];
    pc.headArr = [
        {
            name: 'meta',
            notClose: true,
            attr: {
                'charset': 'utf-8'
            }
        },
        {
            name: 'meta',
            notClose: true,
            attr: {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge'
            }
        },
        {
            name: 'meta',
            notClose: true,
            attr: {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        },
        {
            name: 'link',
            notClose: true,
            attr: {
                rel: 'stylesheet',
                href: '##basePath##build/vue/ydui.vue.css'
            }
        },
        {
            name: 'link',
            notClose: true,
            attr: {
                rel: 'stylesheet',
                href: '##basePath##build/icon/ali/iconfont.css'
            }
        },
        {
            name: 'script',
            attr: {
                src: '##basePath##build/js/ydui.flexible.js'
            }
        }
    ];
    return pc;
};
