<script>
import ElTableSelect from '../ElTableSelect/ElTableSelect.vue'
export default {
  name: 'ElTablePro',
  props: {
    columnsStatus: {
      type: Array
    },
    columnsUpdate: {
      type: Function,
      default: (sel) => {}
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },

    size: String,

    width: [String, Number],

    height: [String, Number],

    maxHeight: [String, Number],

    fit: {
      type: Boolean,
      default: true
    },

    stripe: Boolean,

    border: Boolean,

    rowKey: [String, Function],

    context: {},

    showHeader: {
      type: Boolean,
      default: true
    },

    showSummary: Boolean,

    sumText: String,

    summaryMethod: Function,

    rowClassName: [String, Function],

    rowStyle: [Object, Function],

    cellClassName: [String, Function],

    cellStyle: [Object, Function],

    headerRowClassName: [String, Function],

    headerRowStyle: [Object, Function],

    headerCellClassName: [String, Function],

    headerCellStyle: [Object, Function],

    highlightCurrentRow: Boolean,

    currentRowKey: [String, Number],

    emptyText: String,

    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    defaultSort: Object,

    tooltipEffect: String,

    spanMethod: Function,

    selectOnIndeterminate: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selectList: [],
      slotArr: [],
      emptyNode: null,
      fixColumns: []
    }
  },
  components: {
    ElTableSelect
  },
  mounted () {
    let list = this.$slots.default
    this.emptyNode = this.$slots.default[1]
    let listTmp = []
    for (let i = 0; i < list.length; i++) {
      if (list[i].componentOptions && list[i].componentOptions.propsData.label && !list[i].componentOptions.propsData.fixed) {
        listTmp.push({
          label: list[i].componentOptions.propsData.label,
          key: list[i].componentOptions.propsData.prop,
          isActive: true
        })
      } else if (list[i].componentOptions && (list[i].componentOptions.propsData.fixed || list[i].componentOptions.propsData.type === 'selection' || list[i].componentOptions.propsData.type === 'index')) {
        this.fixColumns.push(list[i])
        this.fixColumns.push(this.emptyNode)
      }
    }
    if (this.columnsStatus && this.columnsStatus.length > 0) {
      this.selectList = this.columnsStatus.length > 0 ? JSON.parse(JSON.stringify(this.columnsStatus)) : []
      let tmpSlot = [].concat(this.fixColumns)
      this.$nextTick(() => {
        this.selectList.map((sel) => {
          this.$slots.default.map((slot, index) => {
            if (slot.componentOptions && sel.label === slot.componentOptions.propsData.label) {
              if (sel.isActive) {
                tmpSlot.push(slot)
                tmpSlot.push(this.emptyNode)
              }
            }
          })
        })
        this.slotArr = this.slotArr.concat(tmpSlot)
        if (this.slotArr.length > 1) {
          this.slotArr.splice(-1, 1)
        }
      })
    } else {
      this.selectList = listTmp
      this.slotArr = this.$slots.default
    }
  },
  watch: {
    columnsStatus: {
      handler (val) {
        this.selectList = this.columnsStatus.length > 0 ? JSON.parse(JSON.stringify(this.columnsStatus)) : []
        this.changeList(val, false)
      },
      deep: true
    }
  },
  methods: {
    changeList (selArr, needUpdata = true) {
      this.slotArr = []
      let tmpSlot = [].concat(this.fixColumns)
      this.$nextTick(() => {
        selArr.map((sel) => {
          this.$slots.default.map((slot, index) => {
            if (slot.componentOptions && sel.label === slot.componentOptions.propsData.label) {
              if (sel.isActive) {
                tmpSlot.push(slot)
                tmpSlot.push(this.emptyNode)
              }
            }
          })
        })
        this.slotArr = this.slotArr.concat(tmpSlot)
        if (this.slotArr.length > 1) {
          this.slotArr.splice(-1, 1)
        }
      })
      if (needUpdata) {
        this.columnsUpdate(selArr)
      }
    }
  },
  render (createElement) {
    return createElement('div',
      [
        createElement('el-table-select', {
          props: {
            selectList: this.selectList
          },
          ref: 'elTableSelect',
          on: {
            selectUpdate: (selArr) => {
              this.changeList(selArr)
            }
          }
        }),
        createElement('el-table', {
          props: {
            ...this.$props
          },
          ref: 'tablePro'
        },
        [
          ...this.slotArr
        ])
      ]
    )
  }
}
</script>

<style scoped>

</style>
