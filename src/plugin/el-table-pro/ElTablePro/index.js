import ElTablePro from './ElTablePro.vue'

ElTablePro.install = function (Vue) {
  Vue.component(ElTablePro.name, ElTablePro)
}

if (window.Vue) {
  window.Vue.use(ElTablePro)
}
export default ElTablePro
