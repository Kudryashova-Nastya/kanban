import Vue from 'vue'
import App from './App.vue'
import Edit from './Edit.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  el: '#app',
  render: h => h(App)
})
