
export const VuePrototypeExtern = (Vue) => {
  Vue.prototype.redirectTo = (url) => {
    Vue.prototype.$loading({
      lock: true,
      text: '正在跳转',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    if (typeof url === 'object') {
      if (url.routerPath) {
        location.href = url.routerPath;
      }
    } else if (url) {
      location.href = url;
    }
  };
  Vue.prototype.refreahPage = (url) => {
    Vue.prototype.$loading({
      lock: true,
      text: '正在跳转',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    location.href = location.href.split('?')[0].split('#')[0] + '?t=' + (new Date()).getTime();
  }
  Vue.prototype.redirectToHome = () => {
    Vue.prototype.$loading({
      lock: true,
      text: '正在跳转',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    location.href = homePageUrl;
  };
};
