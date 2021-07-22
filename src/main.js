import Vue from 'vue'
import App from './App.vue'
import router from './router'

//#region sử dụng thư viện v-money để định dạng tiền tệ
// import money from 'v-money'
// // register directive v-money and component <money>
// Vue.use(money, { precision: 4 })
//#endregion

//#region sử dụng thư viện v-tooltip
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)
//#endregion

//#region sử dụng thư viện vue-tippy
import VueTippy, { TippyComponent } from "vue-tippy";
Vue.use(VueTippy, {
  directive: "tippy",
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false
      },
      hide: {
        enabled: false
      }
    }
  }
});
Vue.component("tippy", TippyComponent);
import "tippy.js/themes/google.css";
//#endregion

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
