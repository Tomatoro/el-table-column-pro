<template>
  <div>
    <el-table-select
    v-model="columnsStatus"
    ></el-table-select>
    <el-table-pro
      :data="tableDataArr"
      border
      max-height="240"
      :columns-status.sync="columnsStatus"
      :columns-update="columnsUpdate"
      highlight-current-row
      @selection-change="rowClick"
      @row-click="rowClick"
      style="width: 100%">
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column-pro
        prop="date"
        label="日期"
        sortable
        render-type="slots"
        width="280">
      <template slot-scope="header">
        <el-date-picker
          v-model="value6"
          type="daterange"
          size="small"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </template>
      </el-table-column-pro>
      <el-table-column-pro
        prop="name"
        label="姓名"
        render-type="input"
        sortable
        :param.sync="param"
        :callback="doThing"
      >
      </el-table-column-pro>
      <el-table-column-pro
        align="left"
        prop="address"
        label="地址"
        render-type="slots"
        is-edit
        @inputcallback="currentChange"
        width="250">
        <el-table-column-pro
                prop="name"
                label="省份"
                sortable
                render-type="slots"
                width="120">
          <template slot="header" slot-scope="header">
            <div>
              <el-select
                      v-model="value"
                      multiple
                      filterable
                      placeholder="请输入关键词"
                      size="small"
                      @change="changeData">
                <el-option
                        v-for="item in options4"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </template>
        </el-table-column-pro>
        <el-table-column-pro
                prop="address"
                label="市区"
                width="120">
        </el-table-column-pro>
        <el-table-column-pro
                prop="address"
                label="地址"
                width="300">
        </el-table-column-pro>
        <el-table-column
                prop="price"
                label="邮编"
                width="120">
        </el-table-column>
      </el-table-column-pro>
      <el-table-column-pro
        prop="goodsName"
        label="商品名称"
        render-type="slots"
        sortable
        min-width="200px"
      >
        <template slot="header" slot-scope="header1111">
          <span>

          <el-select v-model="value1" filterable @change="changeData" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </span>
        </template>
      </el-table-column-pro>
      <el-table-column-pro
        prop="price"
        label="价格"
        min-width="200px"
        type="expand"
      >
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column-pro>
      <el-table-column-pro
        prop="total"
        label="合计"
        sortable
        min-width="200px"
      >
        <template slot-scope="scope">
          <span>{{scope.row.price * scope.row.num}}</span>
        </template>
      </el-table-column-pro>
      <el-table-column-pro
        fixed="right"
        label="操作"
        text-align="center"
        render-type="slots"
        width="100">
        <template slot="header" slot-scope="header1111">
          <div>
            <el-select
              v-model="value"
              multiple
              filterable
              reserve-keyword
              placeholder="请输入关键词"
              size="small"
              @change="changeData">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
        <template slot-scope="scope">
          <el-button @click="lockInfo" type="text" size="small">查看</el-button>
        </template>
      </el-table-column-pro>
    </el-table-pro>
    <el-table-select
      v-model="columnsStatus1"
    ></el-table-select>
    <el-table-pro
      :data="tableDataArr"
      border
      max-height="240"
      :columns-status.sync="columnsStatus1"
      :columns-update="columnsUpdate"
      highlight-current-row
      @selection-change="rowClick"
      style="width: 100%">
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column-pro
        prop="date"
        label="日期"
        sortable
        render-type="slots"
        width="280">
        <template slot="header" slot-scope="header1111">
          <el-date-picker
            v-model="value6"
            type="daterange"
            size="small"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </template>
      </el-table-column-pro>
      <el-table-column-pro
        prop="name"
        label="姓名"
        render-type="input"
        sortable
        :param.sync="param"
        :callback="doThing"
      >
      </el-table-column-pro>
      <el-table-column-pro
        align="left"
        prop="address"
        label="地址"
        render-type="slots"
        sortable
        is-edit
        @inputcallback="currentChange"
        width="250">
        <template slot="header" slot-scope="header1111">
          <div>
            <el-select
              v-model="value"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              size="small"
              @change="changeData">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
      </el-table-column-pro>
      <el-table-column-pro
        prop="goodsName"
        label="商品名称"
        render-type="slots"
        sortable
        min-width="200px"
      >
        <template slot="header" slot-scope="header1111">
          <span>
          <el-select v-model="value3" multiple placeholder="请选择" @change="changeData">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </span>
        </template>
      </el-table-column-pro>
      <el-table-column-pro
        prop="seasons"
        label="季节"
        render-type="slots"
        sortable
        min-width="200px"
      >
        <template slot="headerLabel" slot-scope="headerLabel">
          <span style="color: red;">66666</span>
        </template>
        <template slot="header" slot-scope="header1111">
          <span>
          <el-select v-model="value4" multiple placeholder="请选择" @change="changeData">
            <el-option
              v-for="item in seasons"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          </span>
        </template>
      </el-table-column-pro>
      <el-table-column-pro
        prop="seasons"
        label="7777"
        render-type="slots"
        sortable
        min-width="200px"
      >
        <template slot="header" slot-scope="header1111">
          <span>
          <el-select v-model="value5" placeholder="请选择" multiple @change="changeData">
            <el-option
              v-for="item in Deps"
              :key="item.name"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          </span>
        </template>
      </el-table-column-pro>
      <el-table-column-pro
        prop="price"
        label="价格"
        render-type="slots"
        min-width="200px"
        type="expand"
      >
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column-pro>
      <el-table-column-pro
        prop="total"
        label="合计"
        sortable
        render-type="slots"
        min-width="200px"
      >
        <template slot="header" slot-scope="header1111">
          <span>
          <el-select v-model="value1" placeholder="请选择" @change="changeData">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </span>
        </template>
      </el-table-column-pro>
      <el-table-column-pro
        fixed="right"
        label="操作"
        text-align="center"
        render-type="slots"
        width="100">

        <template slot-scope="scope">
          <el-button @click="lockInfo" type="text" size="small">查看</el-button>
        </template>
      </el-table-column-pro>
    </el-table-pro>
    <el-pagination
      style="float: right"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :total="tableData.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value6: '',
      value: '000',
      value1: '9999',
      value3: '9999',
      value4: [],
      value5: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      years: [
        { name: 2017 },
        { name: 2018 },
        { name: 2019 },
        { name: 2020 },
        { name: 2021 },
        { name: 2022 },
      ],
      season: '',
      seasons: [
        { name: '春季' },
        { name: '夏季' },
        { name: '秋季' },
        { name: '冬季' }
      ],

      warehouses: [
        { name: '全部' },
        { name: '杭州仓' },
        { name: '广州仓' }
      ],
      Deps: [
        { name: '全部',value:'' },
        { name: '外发一部', value: '外发一部' },
        { name: '外发二部', value: '外发二部' },
        { name: '外发三部', value: '外发三部' },
        { name: '外发四部', value: '外发四部' },
        { name: '如贝外发生产部', value: '如贝外发生产部' },
        { name: '饰品外发部', value: '饰品外发部' }
      ],
      clothesTypes: [
        { name: '全部', value: '' },
        { name: '女装', value: '女装' },
        { name: '童装', value: '童装' }
      ],
      options1: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      selectedOptions: [],
      columnsStatus2: [],
      columnsStatus1: [],
      columnsStatus: [
        {'label': '地址', 'key': 'address', 'isActive': true},
        {'label': '合计', 'key': 'total', 'isActive': false},
        {'label': '日期', 'key': 'date', 'isActive': true}, {
          'label': '姓名',
          'key': 'name',
          'isActive': false
        },
        {
          'label': '商品名称',
          'key': 'goodsName',
          'isActive': true
        },
        {'label': '价格', 'key': 'price', 'isActive': true}],
      valueqwqw:
          '',
      tableDataArr:
          [{
            date: '2016-05-02',
            name: '刘德华',
            address: '上海市普陀区金沙江路 1518 弄',
            goodsName: 'ipad',
            price: 3000,
            seasons: '春天',
            num: 1,
            total: 3000
          }, {
            date: '2016-05-02',
            name: '张学友',
            address: '上海市普陀区金沙江路 1518 弄',
            goodsName: 'iphone',
            price: 4000,
            seasons: '春天',
            num: 1,
            total: 4000
          }, {
            date: '2016-05-02',
            name: '程冠希',
            address: '上海市普陀区金沙江路 1518 弄',
            goodsName: 'vivo',
            price: 50,
            seasons: '春天',
            num: 1,
            total: 50
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            goodsName: 'mi',
            price: 1222,
            seasons: '春天',
            num: 1,
            total: 1222
          }],
      tableData:
          [{
            date: '2016-05-02',
            name: '刘德华',
            address: '上海市普陀区金沙江路 1518 弄',
            goodsName: 'ipad',
            seasons: '春天',
            price: 3000,
            num: 1,
            total: 3000
          }, {
            date: '2016-05-02',
            name: '张学友',
            address: '上海市普陀区金沙江路 1518 弄',
            goodsName: 'iphone',
            price: 3000,
            seasons: '春天',
            num: 1,
            total: 3000
          }, {
            date: '2016-05-02',
            name: '程冠希',
            address: '上海市普陀区金沙江路 1518 弄',
            goodsName: 'vivo',
            price: 50,
            seasons: '春天',
            num: 1,
            total: 50
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            goodsName: 'mi',
            price: 1222,
            seasons: '春天',
            num: 1,
            total: 1222
          }, {
            date: '2016-05-02',
            name: '周杰伦',
            address: '上海市普陀区金沙江路 1518 弄',
            goodsName: 'qq',
            price: 50,
            num: 1,
            seasons: '春天',
            total: 50
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            goodsName: 'opp',
            price: 666,
            seasons: '春天',
            num: 1,
            total: 666
          }],
      param:
          null,
      currentPage:
          1,
      pageSize:
          4,
      dateProps:
          {
            value: '2018/08/12',
            editable:
              true,
            format:
              'yyyy/MM/dd',
            type:
              'daterange',
            'value-format':
              'yyyy/MM/dd',
            change:
            this.changeDate
          },
      selectProps: {
        value: [],
        clearable:
            true,
        multiple:
            true
      },
      test: 0,
      options4: [],
      list: [],
      states: ['Alabama', 'Alaska', 'Arizona',
        'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois',
        'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin',
        'Wyoming']
    }
  },
  mounted () {
    // console.log(666)
    this.list = this.states.map(item => {
      return { value: item, label: item }
		})
		setTimeout(()=>{
			this.options4 = [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }];
		},5000)
    // let tableBox = this.$refs.tableBox
    // tableBox.$slots.default = tableBox.$slots.default.splice(0, 6)
    // this.test = 9
    // console.log(tableBox.$slots.default.splice(0, 6))
  },
  methods: {
    changeData (val) {
      console.log('change')
      console.log(val)
    },
    doThing () {
      console.log('回调被触发')
      if (this.param) {
        this.tableDataArr = this.tableDataArr.filter((item) => {
          return item.name.indexOf(this.param) > -1
        })
      } else {
        this.tableDataArr = this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    },
    lockInfo () {
      alert('查看')
    },
    currentChange (row) {
      alert('修改了行' + JSON.stringify(row))
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.tableDataArr = this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    handleCurrentChange () {
      this.tableDataArr = this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    columnsUpdate (selArr) {
      // console.log(JSON.stringify(selArr))
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
          this.tableDataArr = this.tableData.slice(1,1)
        }, 200)
      } else {
        this.options4 = []
      }
    },
    rowClick () {
      console.log('rowClick')
    }
  }
}
</script>
