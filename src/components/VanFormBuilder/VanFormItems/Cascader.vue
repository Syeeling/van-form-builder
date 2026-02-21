<template>
  <component :is="_renderField()" />
  <van-popup v-model:show="showPicker" v-bind="popupProps">
    <component :is="_renderCascader()" v-model="fieldValue" :fieldNames @close="_handleClose" @finish="_handleFinish" />
  </van-popup>
</template>

<script setup name="Cascader">
const { popupProps, showFullPath, pathSeparator } = defineProps({
  popupProps: Object,
  // 是否显示完整路径  true: 显示完整路径  false: 只显示值对应当前级别的文本
  showFullPath: {
    type: Boolean,
    default: true
  },
  // 若showFullPath为true，则定义路径分隔符
  pathSeparator: {
    type: String,
    default: '/'
  }
})

const attrs = useAttrs()
const fieldNames = attrs.props.fieldNames || { text: 'text', value: 'value', children: 'children' }

const fieldValue = defineModel() // formData表单值
const showPicker = ref(false)

const _renderField = () =>
  h(
    VanField,
    {
      isLink: !attrs.readonly,
      ...attrs,
      clickable: !attrs.readonly,
      readonly: true,
      modelValue: fieldText.value,
      onClick: () => !attrs.readonly && (showPicker.value = true)
    },
    attrs.slots
  )

const _renderCascader = () => h(VanCascader, attrs.props, attrs.props.slots)

// 值对应的文本路径映射表
const valueTextPathMap = computed(() => {
  const map = {}
  function traverse(node, path) {
    // 构建映射表，存储当前节点的 text 和 path
    map[node[fieldNames.value]] = {
      text: node[fieldNames.text],
      path: path.join(pathSeparator)
    }
    // 如果有子节点，递归遍历
    if (node[fieldNames.children]) {
      node[fieldNames.children].forEach(child => traverse(child, [...path, child[fieldNames.text]]))
    }
  }
  // 初始化映射表
  attrs.props.options.forEach(node => traverse(node, [node[fieldNames.text]]))
  return map
})

// 值对应的文本，用于页面显示
const fieldText = computed(() => {
  if (!fieldValue.value) return ''
  return valueTextPathMap.value[fieldValue.value]?.[showFullPath ? 'path' : 'text'] || ''
})

// 点击关闭图标
function _handleClose() {
  if (attrs.props.preventDefaultCloseEvent === true) {
    return
  }
  showPicker.value = false
}
// 全部选项选择完成
function _handleFinish() {
  if (attrs.props.preventDefaultFinishEvent === true) {
    return
  }
  showPicker.value = false
}
</script>

<style lang="scss" scoped></style>
