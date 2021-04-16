import ElTablePro from './table.vue'
// import ElTableColumnPro from './ElTableColumnPro/index'
// import ElTableColumnPro from './table/src/table-column';
import ElTableColumnPro from './ElTableColumnPro/ElTableColumnPro.vue'
import ElTableSelect from './ElTableSelect/index'

const components = [
	ElTablePro,
	ElTableColumnPro,
	ElTableSelect
];

const install = function(Vue, opts = {}) {
	components.forEach(component => {
		Vue.component(component.name, component);
	});
};

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install
};
