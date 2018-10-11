const electron = require('electron');
// Module to control application life.
const app = electron.app;
const Menu = electron.Menu;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const ipc = require('electron').ipcMain;
var getTKK = require('./getTKK/index').getTKK;
let setting = require('./electron-utils/setting').setting('setting.json');
var langMapping = require('./electron-utils/langMapping').langMapping;
var getMyLang = require('./electron-utils/getMyLang').getMyLang;

let debug = (function (_debug_) {
    return function (cb) {
        if (_debug_) {
            cb();
        }
    }
})(false);
let lang = null;
let tkk = null;

// app.commandLine.appendSwitch('proxy-server', '127.0.0.1:1080');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let webContent;
// todo 打包删除
let menu = null;
const setMenu = function (lang) {
    let menuTemplate = [
        {
            label: 'Language',
            submenu: langMenu(lang)
        }
    ];
    debug(() => {
        menuTemplate = menuTemplate.concat([
            {
            label: 'Edit',
            submenu: [
                {
                    role: 'undo'
                },
                {
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'cut'
                },
                {
                    role: 'copy'
                },
                {
                    role: 'paste'
                },
                {
                    role: 'pasteandmatchstyle'
                },
                {
                    role: 'delete'
                },
                {
                    role: 'selectall'
                }
            ],
        },
            {
                label: 'View',
                submenu: [
                    {
                        role: 'reload'
                    },
                    {
                        role: 'forcereload'
                    },
                    {
                        role: 'toggledevtools'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        role: 'resetzoom'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        role: 'togglefullscreen'
                    }
                ]
            }
        ]);
    });
    menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}
let changeLanguage = function(lang_) {
    if (webContent) {
        lang = lang_;
        setting.saveFile({
            lang
        });
        setMenu(lang);
        webContent.executeJavaScript("sessionStorage.setItem('lang','" + lang + "');vm.change = " + (new Date()) .getTime()+ ";");
    } else {
        let s = changeLanguage.bind(null,lang_);
        setTimeout(() => {
            s();
        },3000);
    }
};
let langMenu = (function (langs) {
    return function (tarLang) {
        let menus = [];
        langs.forEach(lang => {
            let changeLanguage_ = changeLanguage.bind(null,lang[1]);
            menus.push({
                label: (lang[1] === tarLang ? ('√ ' + lang[0]) : '⚪ ' + lang[0]),
                click: changeLanguage_
            })
        });
        return menus;
    }
})(((langMapping) => {
    let lm = [];
    for (var i in langMapping) {
        lm.push([langMapping[i].show,i]);
    }
    return lm;
})(langMapping));

let sendTTKtask = function(tkk_) {
    // 可能由于种种问题，没办法吧ttk发送给前端
    if (webContent) {
        tkk = tkk_;
        webContent.executeJavaScript('sessionStorage.setItem("tkk","' + tkk + '");');
        webContent.executeJavaScript('sessionStorage.setItem("lang","' + lang + '");');
        webContent.executeJavaScript("vm.change = " + (new Date()) .getTime()+ ";");
    } else {
        let s = sendTTKtask.bind(null,tkk_);
        setTimeout(() => {
            s();
        },3000);
    }
};
// 十分钟更新一次 TKK
let getTKKid = setInterval(function () {
    getTKK(sendTTKtask);
},10 * 60 * 1000);

let open = false;
function createWindow () {
    open = true;
    // Create the browser window.
    // ref https://github.com/electron/electron/issues/7228#issuecomment-402425540-permalink
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            // ref https://segmentfault.com/a/1190000012030202
            webSecurity: false,
            nativeWindowOpen: true,// window.open return Window object(like in regular browsers), not BrowserWindowProxy
            affinity: 'main-window'// main window, and addition windows should work in one process
        }
    });
    webContent = mainWindow.webContents;
    // ref https://github.com/electron/electron/issues/7228#issuecomment-402425540-permalink
    mainWindow.webContents.on('new-window', function (e, url, frameName, disposition, options) {
        // hook on new opened window

        // at now new window in mainWindow renderer process.
        // Also, this will automatically get an option `nodeIntegration=false`(not override to true, like in iframe's) - like in regular browsers
        options.webPreferences.affinity = 'main-window';
    });

    // and load the index.html of the app.
    // mainWindow.loadURL(url.format({
    //   pathname: path.join(__dirname, 'index.html'),
    //   protocol: 'file:',
    //   slashes: true
    // }));
    //   mainWindow.loadURL('https://code.earthengine.google.com/69599009f309e6535bf6e6bb2f231d0b');

    mainWindow.loadURL(`file://${__dirname}/view/main.html`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;

    });
    setMenu(lang);
}

function beforeCreateWindow() {
    if (!open) {
        open = true;
        setting.getFile(_ => {
            lang = _.lang || lang;
            // 要先拿到语言类型先
            if (!lang) {
                lang = getMyLang(app.getLocale());
            }
            // 要先拿到翻译的 token 先
            getTKK(function (tkk) {
                sendTTKtask(tkk);
                createWindow();
            });
        });
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let app_id = setInterval(function () {
    if (app.isReady()) {
        console.log("ready");
        clearInterval(app_id);
        beforeCreateWindow();
    }
},1000);
// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    beforeCreateWindow();
});
