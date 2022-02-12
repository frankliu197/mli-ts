import Vue from 'vue'
import App from './App.vue'
import VueInputAutowidth from 'vue-input-autowidth'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false
Vue.use(VueInputAutowidth)
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')