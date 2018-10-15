import Vue from 'vue'
import app from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import routes from './singleRoutes';
import { VuePrototypeExtern } from './utils/elm-common'
import { electron_utils_install } from './utils/electron-utils';

VuePrototypeExtern(Vue);
Vue.use(VueRouter);
Vue.use(ElementUI);
window.console.error = _ => _;
window.console.warn = _ => _;

const router = new VueRouter({
  routes
});

electron_utils_install(Vue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(app)
});
