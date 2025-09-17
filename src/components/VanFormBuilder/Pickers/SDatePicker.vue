<template>
  <van-date-picker
    v-model="pickerValue"
    v-bind="$attrs.props"
    :columnsType
    @cancel="_cancelSelect"
    @confirm="_confirmSelect"
  />
</template>

<script setup name="SDatePicker">
const { textFormatter, initDate } = defineProps({
  // 定义用于页面显示的日期格式
  textFormatter: {
    type: Function
  },
  // 定义 DatePicker 初始选中的日期
  initDate: {
    type: [Date, String],
    default: new Date()
  }
})

const fieldValue = defineModel() // formData表单值

const emit = defineEmits(['cancel', 'confirm'])

const attrs = useAttrs()
const columnsType = attrs.props.columnsType || ['year', 'month', 'day']

// DatePicker绑定的日期
const pickerValue = ref([])

// 值对应的文本，用于页面显示
const fieldText = computed(() => {
  if (!fieldValue.value) return ''
  const date = new Date(fieldValue.value)
  const mapping = {
    year: date.getFullYear(),
    month: String(date.getMonth() + 1).padStart(2, '0'),
    day: String(date.getDate()).padStart(2, '0')
  }
  const formatter = textFormatter || _defaultFormatter
  return formatter(mapping)
})

// 默认的日期格式化方法，用'-'连接
function _defaultFormatter({ year, month, day }) {
  const result = []
  if (columnsType.includes('year')) {
    result.push(year)
  }
  if (columnsType.includes('month')) {
    result.push(month)
  }
  if (columnsType.includes('day')) {
    result.push(day)
  }
  return result.join('-')
}

// DatePicker选择器取消事件
function _cancelSelect() {
  if (attrs.props.preventDefaultCancelEvent === true) {
    return
  }
  emit('cancel')
}
// DatePicker选择器确认事件
function _confirmSelect() {
  if (attrs.props.preventDefaultConfirmEvent === true || attrs.preventDefaultGroupConfirmEvent === true) {
    return
  }
  const mapping = {
    year: '0000',
    month: '01',
    day: '01'
  }
  columnsType.forEach((item, index) => {
    mapping[item] = pickerValue.value[index]
  })

  fieldValue.value = _defaultFormatter(mapping)
  emit('confirm')
}

// 初始化Picker绑定的值
function _initPickerValue() {
  const initPickerDate = fieldValue.value ? new Date(fieldValue.value) : new Date(initDate)
  const initPickerDateMap = {
    year: initPickerDate.getFullYear(),
    month: initPickerDate.getMonth() + 1,
    day: initPickerDate.getDate()
  }
  pickerValue.value = columnsType.map(item => initPickerDateMap[item])
}

defineExpose({
  fieldText,
  initPickerValue: _initPickerValue
})
</script>

<style lang="scss" scoped></style>
