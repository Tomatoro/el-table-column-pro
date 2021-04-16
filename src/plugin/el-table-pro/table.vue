<script>
import { Table } from "element-ui";
export default {
	name: "elTablePro",
	extends: Table,
	props: {
		columnsStatus: {
			type: Array
		},
		columnsUpdate: {
			type: Function,
			default: sel => {}
		}
	},
	mounted() {
		this.$nextTick(() => {
		if(!this.store.states._oldColumns && this.$ready){
			this.store.states._oldColumns = this.store.states._columns;
		}
			this.sortColumn(this.columnsStatus);
		});
	},
	updated(){
		this.$nextTick(() => {
			let colDomList = [...document.documentElement.querySelector('colgroup').querySelectorAll('col')],
			tableWidth = colDomList.reduce((total, cur) => total + cur.width*1, 0);
			this.$el.style.width = tableWidth + "px";
			this.$el.style.margin = 'auto';
		})
	},
	methods: {
		sortColumn(sortColumn) {
      let states = this.store.states;
			if (!sortColumn) return;
			let initTmp = [];
			let sortTmp = [];
			let fixedTmp = [];
			if (sortColumn.length < 1) {
				states._columns.map(val => {
					if (val.label && !val.fixed) {
						initTmp.push({
							key: val.property,
							label: val.label,
							isActive: true
						});
					}
				});
				this.changeColumn(initTmp);
			} else {
				states._oldColumns.map(val => {
					if ((val.type !== "default" && !val.label) || val.fixed) {
						fixedTmp.push(val);
					}
				});
				sortTmp = sortTmp.concat(fixedTmp);
				sortColumn.map(item => {
					states._oldColumns.map(val => {
						if (
							val.label &&
							!val.fixed &&
							item.label === val.label &&
							item.isActive
						) {
							sortTmp.push(val);
						}
					});
				});
				states._columns = sortTmp;
			}
			if (this.$ready) {
				this.store.updateColumns(); // hack for dynamics remove column
				this.store.scheduleLayout();
			}
		},
		changeColumn(newVal) {
			this.$emit("update:columnsStatus", newVal);
		}
	},
	watch: {
		columnsStatus: {
			deep: true,
			// immediate: true,
			handler(newVal, oldVal) {
				if (oldVal.length > 0) {
					this.columnsUpdate(newVal);
				}
				this.sortColumn(newVal);
			}
		}
	}
};
</script>
