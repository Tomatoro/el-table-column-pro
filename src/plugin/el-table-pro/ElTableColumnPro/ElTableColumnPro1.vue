<template>
  <el-table-column
    v-if="visible"
    :formatter="formatter"
    :fixed="fixed"
    :min-width="minWidth"
    :sortable="sortable"
	:remark="remark"
	:remark-label="remarkLabel"
	:remark-value="remarkValue"
    :align='align'
    :prop="prop"
    :header-align="headerAlign"
    :label="label"
    :width="width"
    :type="type"
    :render-header="renderHeader"
    :class-name="className"
    :label-class-name="labelClassName"
    :property="property"
    :filter-type="filterType"
    :sort-method="sortMethod"
    :sort-by="sortBy"
    :resizable="resizable"
    :context="context"
    :column-key="columnKey"
    :show-tooltip-when-overflow="showTooltipWhenOverflow"
    :show-overflow-tooltip="showOverflowTooltip"
    :selectable="selectable"
    :reserve-selection="reserveSelection"
    :index="index"
    :sort-orders="sortOrders"
  >
    <slot name="header"></slot>
    <template slot-scope="scope">
      <slot :row="scope.row" :$index="scope.$index">
        <span v-if="!isEdit">{{formatMethod(scope.row[prop])}}</span>
        <edit-box v-if="isEdit" @inputCallBack="inputCallBack(scope.row)" v-model="scope.row[prop]"></edit-box>
      </slot>
    </template>
  </el-table-column>
</template>

<script>
import editBox from './editBox.vue'

export default {
	name: 'el-table-column-pro',
  	props: {
  		type: {
  			type: String,
  			default: 'default'
  		},
  		label: String,
  		className: String,
  		labelClassName: String,
  		property: String,
  		prop: String,
  		width: {},
  		minWidth: {},
  		sortable: {
  			type: [Boolean, String],
  			default: false
		},
  		remark: {
  			type: [Boolean, String],
  			default: false
		},
		remarkPlacement: String,
		remarkLabel: String,
		remarkValue: String,
  		filterType: {
  			type: String,
  			default: 'select'
  		},
  		sortMethod: Function,
  		sortBy: [String, Function, Array],
  		resizable: {
  			type: Boolean,
  			default: true
  		},
  		context: {},
  		columnKey: String,
  		align: String,
  		headerAlign: String,
  		showTooltipWhenOverflow: Boolean,
  		showOverflowTooltip: Boolean,
  		fixed: [Boolean, String],
  		formatter: {
  			type: Function,
  			default: (row, column, cellValue) => cellValue
  		},
  		selectable: Function,
  		reserveSelection: Boolean,
  		filterMethod: Function,
  		filteredValue: Array,
  		filters: Array,
  		filterPlacement: String,
  		filterMultiple: {
  			type: Boolean,
  			default: true
  		},
  		index: [Number, Function],
  		sortOrders: {
  			type: Array,
  			default () {
  				return ['ascending', 'descending', null]
  			},
  			validator(val) {
  				return val.every(order => ['ascending', 'descending', null].indexOf(order) > -1)
  			}
  		},
  		isEdit: {
  			type: Boolean,
  			default: false
  		},
  		propsData: {
  			type: Object
  		},
  		renderType: {
  			type: String
  		},
  		placeholder: {
  			type: String
  		},
  		rederWidth: {
  			type: String
  		},
  		param: {
  			default: ''
  		},
  		selectList: {
  			type: Array
  		},
  		visible: {
  			type: Boolean,
  			default: true
  		},
  		filterIcon: {
  			type: String,
  			default: 'el-icon-search'
  		},
  		callback: {
  			type: Function
  		}
  	},
  	data() {
  		return {
  			formatD: this.filterIcon,
  			editStatus: false,
  			dateVal: {
  				...this.propsData,
  				size: 'mini'
  			}
  		}
  	},
  	components: {
  		editBox
  	},
  	methods: {
  		formatMethod(value) {
  			return this.formatter('', '', value)
  		},

  		inputCallBack(row) {
  			this.$emit('inputcallback', row)
  		},
  		renderHeader(createElement, {
  			column,
  			$index
  		}) {
  			let sortNode = this.sortable ? createElement('span', {
  					class: 'caret-wrapper'
  				},
  				[
  					createElement('i', {
  						class: 'sort-caret ascending'
  					}),
  					createElement('i', {
  						class: 'sort-caret descending'
  					})
  				]
			  ) : null
			sortNode = this.remark ? createElement("div", [
				createElement("el-tooltip", {
					attrs: {
						class: "item",
						effect: "dark",
						content: this.remarkValue,
						placement: this.remarkPlacement
					}
				}, [
					createElement("span", [this.remarkLabel,createElement("i", {
                		'class': 'el-icon-warning'
					})]),
				])
			]) : sortNode
  			switch (this.renderType) {
  				case 'date':
  					return this.renderDate(createElement, {
  						column,
  						$index
  					}, sortNode)

  				case 'input':
  					return this.renderInput(createElement, {
  						column,
  						$index
  					}, sortNode)

  				case 'select':
  					return this.renderSelect(createElement, {
  						column,
  						$index
  					}, sortNode)

  				case 'slots':
  					return this.renderSlot(createElement, {
  						column,
  						$index
  					}, sortNode)

  				default:
  					return column.label
  			}
  		},

  		renderInput(createElement, {
  			column,
  			$index
  		}, sortNode) {
  			return createElement(
  				'div', {
  					class: 'filters',
  					style: {
  						color: column.color,
  						width: '100%',
  						'vertical-align': 'top'
  					}
  				},
  				[
  					column.label,
  					sortNode,
  					createElement('div', {
  							class: 'slot-box'
  						},
  						[
  							createElement('el-input', {
  								props: {
  									placeholder: this.placeholder,
  									value: this.param,
  									size: 'mini'
  								},
  								style: {
  									width: '100%',
  									padding: 0,
  									margin: 0
  								},
  								nativeOn: {
  									click: e => {
  										e.stopPropagation()
  									},
  									keyup: event => {
  										if (event.keyCode === 13) {
  											this.$emit('update:param', event.target.value)
  											this.callback && this.callback()
  										}
  									}
  								},
  								on: {
  									blur: event => {
  										this.$emit('update:param', event.target.value)
  										this.callback && this.callback()
  									}
  								}
  							})
  						]
  					)

  				]
  			)
  		},

  		renderSelect(createElement, {
  			column,
  			$index
  		}, sortNode) {
  			let selectList = this.selectList ? this.selectList : this.$parent.data
  			let tmpObj = {}
  			return createElement(
  				'div', {
  					class: 'filters',
  					style: {
  						color: column.color,
  						width: '100%',
  						'vertical-align': 'top'
  					}
  				},
  				[
  					column.label,
  					sortNode,
  					createElement('div', {
  							class: 'slot-box'
  						},
  						[
  							createElement(
  								'el-select', {
  									props: this.dateVal,
  									style: {
  										width: '100%',
  										height: '22px'
  									},
  									nativeOn: {
  										click: e => {
  											e.stopPropagation()
  										}
  									},
  									on: {
  										change: (value) => {
  											this.dateVal.value = value
  											this.$emit('update:propsData', this.dateVal)
  											this.callback && this.callback()
  										}
  									}
  								},
  								[
  									selectList.map(item => {
  										if (this.selectList) {
  											return createElement('el-option', {
  												props: {
  													value: item.value,
  													label: item.label,
  													key: item.value
  												}
  											})
  										} else {
  											if (!tmpObj[item[column.property]]) {
  												tmpObj[item[column.property]] = item[column.property]
  												return createElement('el-option', {
  													props: {
  														value: item[column.property],
  														label: item[column.property],
  														key: item[column.property]
  													}
  												})
  											}
  										}
  									})
  								]
  							)
  						]
  					)

  				]
  			)
  		},

  		renderDate(createElement, {
  			column,
  			$index
  		}, sortNode) {
  			return createElement(
  				'div', {
  					class: 'filters',
  					style: {
  						color: column.color,
  						width: '100%',
  						'vertical-align': 'top'
  					}
  				},
  				[
  					column.label,
  					sortNode,
  					createElement('div', {
  							class: 'slot-box'
  						},
  						[
  							createElement('el-date-picker', {
  								props: this.dateVal,
  								style: {
  									width: '100%'
  								},
  								nativeOn: {
  									click: e => {
  										e.stopPropagation()
  									}
  								},
  								on: {
  									input: (value) => {
  										if (value) {
  											this.dateVal.value = value
  											this.$emit('update:propsData', this.dateVal)
  											this.callback && this.callback()
  										}
  									}
  								}
  							})
  						]
  					)

  				]
  			)
  		},

    renderSlot (createElement, {column, $index}, sortNode) {
      return createElement(
        'div',
        {
          class: 'filters',
          style: {
            color: column.color,
            width: '100%',
            'vertical-align': 'top'
          }
        },
        [
          column.label,
          sortNode,
          createElement('div',
            {
              class: 'slot-box',
              nativeOn: {
                click: e => {
                  e.stopPropagation()
                }
              },
              on: {
                click: e => {
                  e.stopPropagation()
                }
              }
            },
            [
              this.$scopedSlots.header ? this.$scopedSlots.header(column) : this.$slots.header
            ]
          )

  				]
  			)
  		}
  	}
}
</script>
<style>
  .el-table thead th{
    padding: 5px;
  }
  .el-table thead th div {
    padding: 0;
  }
  .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
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

  .el-table thead th .el-cascader,.el-table thead th .el-input__icon,.el-table thead th .el-select.el-select--mini{
    line-height: 22px;
    height: 22px;
  }

  .el-table  thead th .el-range-editor .el-range-separator{
    line-height: 22px;
  }

  .el-table thead th .cell .filters + .caret-wrapper{
    display: none;
  }

  .el-table thead th .sort-caret.ascending{
    top: -4px
  }

  .el-table thead th .sort-caret.descending{
    bottom: -4px;
  }

  .el-table thead th .caret-wrapper{
    height: 14px;
  }
  .el-table thead th .filters .slot-box{
    display: block;
    line-height: normal;
    width: 100%;
    margin: 0;
    padding: 5px 0 0 0;
  }
  .el-table tbody tr td{
    padding: 5px;
    line-height:22px;
    font-size: 12px;
  }
</style>
