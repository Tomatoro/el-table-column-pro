<script>
  import {TableColumn} from 'element-ui'

  export default {
	name: 'ElTableColumnPro',
	props: {
	  renderType: {
		default: '',
		type: String
	  }, 
	  width: {
		  type: [Number,String]
	  }, 
	  showOverflowTooltip: {
		  type: Boolean,
		  default: true
	  },
	  extraWidth: {
		  type: [Number,String],
		  default: 0
	  }
	},
	data(){
		return{
			notNeedCalWidthList: ['操作']
		}
	},
	computed: {
		tableData(){
			return this.$options.parent.data || this.$options.parent.owner.data
		}
	},
	extends: TableColumn,
	created () {
		const column = this.columnConfig;
	  if (this.notNeedCalWidthList.includes(column.label)) column.showOverflowTooltip = false;
	  this.columnConfig.renderType = this.renderType
	  if (this.renderType == 'slots') {
		let _self = this
		column.renderHeader = function (createElement, {column, $index}) {
		  return (
			<div class="filters">
			  <div>
				{_self.$scopedSlots.headerLabel ? _self.$scopedSlots.headerLabel(column) : column.label}
				{_self.sortable ?
				  <span class="caret-wrapper">
					  <i class="sort-caret ascending"></i>
					  <i class="sort-caret descending"></i>
				  </span> : null
				}
			  </div>
			  <div class="slot-box" on-click={e => {
				e.stopPropagation()
			  }}>
				{_self.$scopedSlots.header ? _self.$scopedSlots.header(column) : _self.$slots.header}
			  </div>
			</div>
		  )
		}
	  }
	},
	methods: {
		 // 判断数据类型
		unitSize(str){
			if (!str) {
				return 16;
			}
			//验证是否是中文 
			var chinesePattern = new RegExp("[\u4E00-\u9FA5]+");
			if(chinesePattern .test(str)){
				return 15;
			}
			//验证是否是英文
			var englishPattern = new RegExp("[A-Za-z]+");
			if(englishPattern.test(str)){
				return 8.94;
			}
			// 判断是否是时间
			if(isNaN(str)&&!isNaN(Date.parse(str))){
				return 12;
			}
			//验证是否是数字
			var numberPattern = new RegExp("[0-9]+");
			if(numberPattern.test(str)){
			    return 6.41;
			}
		}, 
		strToWith(str){
			let scaleParam = this.unitSize(str);
			return String(str).length * scaleParam;
		},
		initColWidth(){
			let maxColumnWidth = this.strToWith(this.label),
				maxValue = this.label,
				columnValueIsEmpty = true;// 列所有的prop没有值则无须额外更新宽度
			for (const n of this.tableData) {
				let prop = n[this.prop]||'';
				if (typeof prop === 'number' || prop) columnValueIsEmpty = false;
				let currentColumnWidth = this.strToWith(prop);
				if (maxColumnWidth < currentColumnWidth) {
					maxColumnWidth = currentColumnWidth;
					maxValue = prop;
				}
			}
			if (!columnValueIsEmpty) maxColumnWidth += this.extraWidth*1;//列有值才需要考虑额外宽度
			if (this.sortable) maxColumnWidth += 25;//排序列宽度需要加上排序符号
			maxColumnWidth = maxColumnWidth >= 200 ? 200 : maxColumnWidth;
			maxColumnWidth = maxColumnWidth < 80 ? 80 : maxColumnWidth;
			console.log(this.label + '  最多的内容是：' + maxValue + '，宽度：' + maxColumnWidth);
			return maxColumnWidth;
		}
	},
	watch: {
		'tableData': {
			handler(val){
				if (val) {
					const column = this.columnConfig;
					 if (!this.$slots.default && !column.width) column.width = this.initColWidth();//非跨列的列才计算列宽
				}
			},
			deep: true
		}
	}
  }
</script>
<style>
	.el-table thead th {
		padding: 5px;
	}

	.el-table thead th div {
		padding: 0;
	}

	.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
		padding: 0;
	}

	.el-table thead th div {
		line-height: normal;
	}

	.el-table .el-select__input, .el-table .el-input__inner {
		margin-left: 0;
		padding: 0 4px;
		line-height: 22px;
		height: 22px;
	}

	.el-table thead th .el-cascader, .el-table thead th .el-input__icon, .el-table thead th .el-select.el-select--mini {
		line-height: 22px;
		height: 22px;
	}

	.el-table thead th .el-range-editor .el-range-separator {
		line-height: 22px;
	}

	.el-table thead th .cell .filters + .caret-wrapper {
		display: none;
	}

	.el-table thead th .sort-caret.ascending {
		top: -4px
	}

	.el-table thead th .sort-caret.descending {
		bottom: -4px;
	}

	.el-table thead th .caret-wrapper {
		height: 14px;
	}

	.el-table thead th .filters .slot-box {
		display: block;
		line-height: normal;
		width: 100%;
		margin: 0;
		/* padding: 5px 0 0 0; */
	}

	.el-table thead th .filters .slot-box div {
		display: block;
		line-height: normal;
		width: 100%;
		margin: 0;
		/* padding: 5px 0 0 0; */
	}

	.el-table tbody tr td {
		padding: 5px;
		line-height: 22px;
		font-size: 12px;
	}

	.el-select .el-select__tags {
		left: 4px;
	}

	.el-select__tags .el-select__input {
		width: auto !important;
	}
</style>
