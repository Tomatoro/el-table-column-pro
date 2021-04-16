<template>
  <div class="table-select-title">
    <div @click="openSelect" class="table-select-btn">
      <span class="label">自定义列</span>
      <span class="el-icon-arrow-up"></span>
    </div>
    <div v-if="isShow"
         @mouseleave="mouseLeaveParent"
         @mouseup="mouseUpParent"
         @mousedown="mouseDownParent"
         @mousemove="mouseMoveParent"
         @click="clickDo"
         ref="listDomBox"
         class="table-select-box">
      <div v-for="(list) in selectList"
           :key="list.key"
           :id="list.label"
           @mouseover="mouseOver(list)"
           class="table-select-line-box" :class="{active: list.moveIcon}">
        <span class="table-select-line-checkbox" :class="{active: list.isActive}"></span>
        <span class="table-select-line-label">{{list.label}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElTableSelect',
  props: {
    value: {
      type: Array
    }
  },
  data () {
    return {
      isShow: false,
      selectList: [],
      isMove: false,
      mouseDownTime: 0,
      lineDom: null,
      listDom: null
    }
  },
  created() {
    this.init()
    this.$nextTick(()=>{
      if (!window.ElTableSelectCloseTool){
        window.ElTableSelectCloseTool = []
      }
      window.ElTableSelectCloseTool.push(this)
      document.body.onclick = function () {
        window.ElTableSelectCloseTool.map((val)=>{
          val.close()
        })
      }
    })
  },
  watch: {
    value() {
      this.init()
    }
  },
  methods: {
    init () {
      this.selectList = [];
      this.value.map((val) => {
        this.selectList.push({
          ...val,
          moveIcon: false
        })
      })
      let lineTmp = document.createElement('div')
      lineTmp.style.height = '0'
      lineTmp.style.width = '100%'
      lineTmp.style.borderTop = '1px dashed #999'
      lineTmp.className = 'table-select-line_move'
      this.lineDom = lineTmp
    },
    mouseOver (list) {
      if (this.isMove) return
      this.selectList.map((val) => {
        val.moveIcon = false
      })
      list.moveIcon = true
    },
    mouseLeaveParent () {
      this.selectList.map((val) => {
        val.moveIcon = false
      })
      // this.isShow = false

      if (this.lineDom.parentNode && this.selectList.length < this.listDom.childNodes.length && this.isMove) {
        this.listDom.removeChild(this.lineDom)
      }
      this.isMove = false
    },
    mouseUpParent (e) {
      if (this.lineDom.parentNode && this.selectList.length < this.listDom.childNodes.length && this.isMove) {
        this.listDom.removeChild(this.lineDom)
      }
      // 点击选择
      if (new Date().getTime() - this.mouseDownTime < 200) {
        let activeNode = this.getTag(e.target);
        let activeItem = this.getListVal(activeNode.id)
        if (activeItem) {
          activeItem.item.isActive = !activeItem.item.isActive;
        }
        this.selectList = this.selectList.map((val) => {
          return {
            key: val.key,
            label: val.label,
            isActive: val.isActive
          }
        })
        this.$emit('input', this.selectList)
        this.isMove = false
        return
      }
      if (this.lineDom.parentNode && this.selectList.length < this.listDom.childNodes.length && this.isMove) {
        this.listDom.removeChild(this.lineDom)
      }
      if (this.isMove) {
        let el = this.getTag(e.target)
        let mouseY = e.clientY
        if(!el || el.className.indexOf('table-select-line-box') < 0) {
          this.isMove = false
          return
        }
        let domY = el.getBoundingClientRect().top
        let domHeight = el.getBoundingClientRect().height
        let val = this.getListVal(el.id)
        let fromIndex = 0
        let toIndex = 0
        let activeVal = this.selectList.filter((valItem, index)=>{
          if(valItem.moveIcon == true){
            fromIndex = index
            return true
          }
        })
        toIndex = this.selectList.indexOf(val.item)
        if(this.listDom == el || activeVal === toIndex || !activeVal[0]) {
          this.isMove = false
          return
        }
        if (domY + domHeight / 2 > mouseY && this.listDom && this.lineDom) {
          if (fromIndex < toIndex) {
            this.selectList.splice(fromIndex, 1)
            this.selectList.splice(toIndex - 1, 0, activeVal[0])
          }else {
            this.selectList.splice(fromIndex, 1)
            this.selectList.splice(toIndex , 0, activeVal[0])
          }
        }else if(domY + domHeight / 2 <= mouseY && this.listDom && this.lineDom) {
          if (fromIndex < toIndex) {
            this.selectList.splice(fromIndex, 1)
            this.selectList.splice(toIndex, 0, activeVal[0])
          }else {
            this.selectList.splice(fromIndex, 1)
            this.selectList.splice(toIndex + 1, 0, activeVal[0])
          }
        }
      }
      this.selectList = this.selectList.map((val) => {
        return {
          key: val.key,
          label: val.label,
          isActive: val.isActive
        }
      })
      this.$emit('input', this.selectList)
      this.isMove = false
    },
    mouseDownParent () {
      this.isMove = true
      this.mouseDownTime = new Date().getTime()
    },
    mouseMoveParent (e) {
      if (!this.isMove) return
      if (new Date().getTime() - this.mouseDownTime < 200) {
        return
      }
      let el = this.getTag(e.target)
      let mouseY = e.clientY
      let domY = el.getBoundingClientRect().top
      let domHeight = el.getBoundingClientRect().height
      if(this.listDom == el || el.className.indexOf('table-select-line-box') < 0) return
      if (domY + domHeight / 2 > mouseY && this.listDom && this.lineDom) {
        this.listDom.insertBefore(this.lineDom, el)
      }else if(domY + domHeight / 2 <= mouseY && this.listDom && this.lineDom) {
        this.insertAfter(this.lineDom, el, this.listDom)
      }
    },
    getTag (node) {
      if (node.className.indexOf('table-select-line-box') > -1) {
        return node
      } else {
        return node.parentNode
      }
    },
    getListVal (label) {
      for (let i = 0; i < this.selectList.length; i++) {
        if (label == this.selectList[i].label) {
          return {
            index: i,
            item: this.selectList[i]
          }
        }
      }
      return null
    },
    insertAfter (newElement, targetElement, parentElement) {
      let parent = parentElement
      if (parent.lastChild === targetElement) {
        parent.appendChild(newElement)
      } else {
        parent.insertBefore(newElement, targetElement.nextSibling)
      }
    },
    openSelect (e) {
      e.stopPropagation()
      e.preventDefault()
      this.isShow = !this.isShow
      this.$nextTick(()=>{
        this.listDom = this.$refs.listDomBox
      })
    },
    close () {
      this.isShow = false
    },
    clickDo (e) {
      e.stopPropagation()
    }
  }
}
</script>

<style>
  .table-select-title {
    width: 100px;
    height: 28px;
    font-size: 12px;
    position: relative;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    user-select: none;
    float: right;
    margin-bottom: 10px;
    color: #333;
  }

  .table-select-btn {
    height: 100%;
    width: 100%;
    line-height: 28px;
    text-align: center;
  }
  .table-select-btn .el-icon-arrow-up{
    color: #c0c4cc;
    font-size: 14px;
    transition: transform .3s;
    transform: rotateZ(180deg);
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 50%;
    margin-top: -7px;
  }
  .table-select-btn .el-icon-arrow-up.open{
    transform: rotateZ(0);
  }
  .table-select-btn .label{
    padding: 0 30px 0 15px;
  }
  .table-select-box{
    position: absolute;
    top: 28px;
    right: 0;
    width: auto;
    min-width: 100px;
    z-index: 2000;
    padding: 5px 0;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    max-height: 500px;
    overflow-y: auto;
    border-radius: 4px;
  }
  .table-select-line-box{
    line-height: 22px;
    padding: 3px 20px 3px 10px;
    text-align: left;
    cursor: pointer;
    user-select: none;
    word-break: keep-all;
    white-space: nowrap;
  }
  .table-select-line-checkbox{
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
    margin-right: 5px;
    vertical-align: middle;
  }
  .table-select-line-checkbox.active{
    background-color: #12B8B2;
    border-color: #12B8B2;
  }
  .table-select-line-checkbox.active:after{
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    width: 3px;
    transform: rotate(45deg);
    transition: transform .15s ease-in .05s;
    transform-origin: center;
  }
  .table-select-line-label{
    vertical-align: middle;
    word-break: keep-all;
  }
  .table-select-line-box.active{
    background-image: url("move_icon.png");
    background-repeat: no-repeat;
    background-position: right;
    background-size: auto 60%;
    background-color: #f2f6fc;
  }
</style>
