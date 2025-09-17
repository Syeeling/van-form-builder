<template>
  <van-picker
    v-model="pickerValue"
    v-bind="$attrs.props"
    :columnsFieldNames
    @cancel="_cancelSelect"
    @confirm="_confirmSelect"
  />
</template>

<script setup name="SPicker">
const { showFullPath, pathSeparator } = defineProps({
  // 级联模式下，是否显示完整路径  true: 显示完整路径  false: 只显示值对应当前级别的文本
  showFullPath: {
    type: Boolean,
    default: true
  },
  // 多列模式下，或级联模式下且showFullPath为true，定义路径分隔符
  pathSeparator: {
    type: String,
    default: '/'
  }
})

const fieldValue = defineModel() // formData表单值

const emit = defineEmits(['cancel', 'confirm'])

const attrs = useAttrs()
const columnsFieldNames = attrs.props.columnsFieldNames || { text: 'text', value: 'value', children: 'children' }

// Picker绑定的值
const pickerValue = ref([])

// Picker选择器模式 single-column:单列 multi-column:多列 cascade:级联
const pickerMode = computed(() => {
  return Array.isArray(attrs.props.columns[0])
    ? 'multi-column'
    : attrs.props.columns[0]?.[columnsFieldNames.children]
      ? 'cascade'
      : 'single-column'
})

// 级联模式下，值对应的文本路径映射表
const valueTextPathMap = computed(() => {
  if (pickerMode.value !== 'cascade') {
    return {}
  }
  const map = {}
  function traverse(node, path, valuePath) {
    // 构建映射表，存储当前节点的 text 和 path
    map[node[columnsFieldNames.value]] = {
      text: node[columnsFieldNames.text],
      path: path.join(pathSeparator),
      valuePath
    }
    // 如果有子节点，递归遍历
    if (node[columnsFieldNames.children]) {
      node[columnsFieldNames.children].forEach(child =>
        traverse(child, [...path, child[columnsFieldNames.text]], [...valuePath, child[columnsFieldNames.value]])
      )
    }
  }
  // 初始化映射表
  attrs.props.columns.forEach(node => traverse(node, [node[columnsFieldNames.text]], [node[columnsFieldNames.value]]))
  return map
})

// 值对应的文本，用于页面显示
const fieldText = computed(() => {
  if (!fieldValue.value) return ''
  switch (pickerMode.value) {
    case 'single-column':
      return (
        attrs.props.columns.find(item => item[columnsFieldNames.value] === fieldValue.value)?.[
          columnsFieldNames.text
        ] || ''
      )
    case 'multi-column':
      return fieldValue.value
        .map(
          (item, index) =>
            attrs.props.columns[index].find(column => column[columnsFieldNames.value] === item)?.[
              columnsFieldNames.text
            ] || ''
        )
        .join(pathSeparator)
    case 'cascade':
      return valueTextPathMap.value[fieldValue.value]?.[showFullPath ? 'path' : 'text'] || ''
  }
})

// Picker选择器取消事件
function _cancelSelect() {
  if (attrs.props.preventDefaultCancelEvent === true) {
    return
  }
  emit('cancel')
}
// Picker选择器确认事件
function _confirmSelect() {
  if (attrs.props.preventDefaultConfirmEvent === true || attrs.preventDefaultGroupConfirmEvent === true) {
    return
  }
  switch (pickerMode.value) {
    case 'single-column':
      fieldValue.value = pickerValue.value[0]
      break
    case 'multi-column':
      fieldValue.value = pickerValue.value
      break
    case 'cascade':
      fieldValue.value = pickerValue.value.filter(Boolean).pop() || '' // 取最后一项非空的值
      break
  }
  emit('confirm')
}

// 初始化Picker绑定的值
function _initPickerValue() {
  if (!fieldValue.value) {
    return
  }
  switch (pickerMode.value) {
    case 'single-column':
      pickerValue.value = [fieldValue.value]
      break
    case 'multi-column':
      pickerValue.value = fieldValue.value
      break
    case 'cascade':
      pickerValue.value = valueTextPathMap.value[fieldValue.value]?.valuePath || []
      break
  }
}

defineExpose({
  fieldText,
  initPickerValue: _initPickerValue
})
</script>

<style lang="scss" scoped></style>
