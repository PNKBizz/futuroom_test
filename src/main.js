import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueTouch from 'vue-touch'

VueTouch.config.swipe = {
  threshold: 200
}

Vue.use(VueTouch)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
