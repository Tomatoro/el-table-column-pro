<template>
  <div>
    <span class="edit-box" v-if="!editStatus" @click="showInput">{{value}}</span>
    <el-input
      v-if="editStatus"
      placeholder="请输入"
      @blur="blurDo"
      ref="elInput"
      type="textarea"
      autosize
      :value="value"
      @input="showInputVal"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'editBox',
  props: [
    'value'
  ],
  data () {
    return {
      editStatus: false
    }
  },
  methods: {
    showInput () {
      this.editStatus = !this.editStatus
      this.$nextTick(() => {
        this.$refs.elInput.focus()
      })
    },
    showInputVal (val) {
      this.$emit('input', val)
    },
    blurDo () {
      this.editStatus = !this.editStatus
      this.$emit('inputCallBack')
    }
  }
}
</script>

<style scoped>
  .edit-box{
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
