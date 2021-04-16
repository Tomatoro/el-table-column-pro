import ElTableSelect from './ElTableSelect.vue'

ElTableSelect.install = function (Vue) {
  Vue.component(ElTableSelect.name, ElTableSelect)
}

if (window.Vue) {
  window.Vue.use(ElTableSelect)
}
export default ElTableSelect
