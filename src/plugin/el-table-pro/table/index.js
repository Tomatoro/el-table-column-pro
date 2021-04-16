import ElTablePro from './src/table.vue'

ElTablePro.install = function (Vue) {
  Vue.component(ElTablePro.name, ElTablePro)
}

// if (window.Vue) {
//   window.Vue.use(ElTablePro)
// }
export default ElTablePro
