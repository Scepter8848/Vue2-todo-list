import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// const Demo = Vue.extend({})
// const d = Demo()// 太麻烦
// Vue.prototype.x = d
new Vue({
  el:'#app',
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this  //利用beforeCreate钩子安装全局事件总线！！！
  }
})
