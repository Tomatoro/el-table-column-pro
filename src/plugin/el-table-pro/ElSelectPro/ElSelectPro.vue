<template>
  <div>
    <el-select
      v-model="valueSel"
      :name="name"
      :id="id"
      :automatic-dropdown="automaticDropdown"
      :size="size"
      :disabled="disabled"
      :clearable="clearable"
      :filterable="filterable"
      :allow-create="allowCreate"
      :loading="loading"
      :popper-class="popperClass"
      :remote="remote"
      :loading-text="loadingText"
      :no-match-text="noMatchText"
      :no-data-text="noDataText"
      :remote-method="remoteMethod"
      :filter-method="filterMethod"
      :multiple="multiple"
      :multiple-limit="multipleLimit"
      :placeholder="placeholder"
      :default-first-option="defaultFirstOption"
      :reserve-keyword="reserveKeyword"
      :value-key="valueKey"
      :collapse-tags="collapseTags"
      :popper-append-to-body="popperAppendToBody"
      @change="change"
      @visibleChange="visibleChange"
      @removeTag="removeTag"
      @clear="clear"
      @focus="focus"
      @blur="blur"
    >
      <slot></slot>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ElSelectPro',
  props: {
    name: String,
    id: String,
    value: {
      required: true
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default () {
        return '请选择'
      }
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.valueSel = this.value
  },
  data: function () {
    return {
      valueSel: ''
    }
  },
  watch: {
    valueSel (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    change (val) {
      this.$emit('change', val)
    },
    visibleChange (val) {
      this.$emit('visibleChange', val)
    },
    removeTag (val) {
      this.$emit('removeTag', val)
    },
    clear (val) {
      this.$emit('clear', val)
    },
    focus (val) {
      this.$emit('focus', val)
    },
    blur (val) {
      this.$emit('blur', val)
    }
  }
}
</script>

<style scoped>

</style>
