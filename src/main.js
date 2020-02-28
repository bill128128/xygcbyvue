// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'
import MintUi from 'mint-ui'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'
import 'swiper/dist/css/swiper.css';
import VueClipboard from 'vue-clipboard2'
import VueTouch from 'vue-touch'
import wxapi from './assets/wx'
import 'babel-polyfill'
import vpay from 'vpay';
Vue.use(vpay);
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueClipboard)
Vue.prototype.wxapi = wxapi; 
VueTouch.config.swipe = {
  threshold: 50 //手指左右滑动距离
}
Vue.use(Vuex)
Vue.prototype.$axios = axios
//axios.defaults.withCredentials = true
axios.defaults.headers['X-REQUESTED-WITH'] = 'xmlhttprequest'
Vue.use(MintUi)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>',
  
})
router.afterEach((to,from,next) => {
            window.scrollTo(0,0);
    });