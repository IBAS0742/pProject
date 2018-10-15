import Vue from 'vue'
import Main from './#name#.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { VuePrototypeExtern , i18n_ } from './../../../utils/elm-common'
VuePrototypeExtern(Vue);
//const i18n = i18n_(Vue);

//Vue.use(ElementUI,{
//  i18n: (key, value) => i18n.t(key, value)
//});
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Main)
})
