<template>
  <van-time-picker
    v-model="pickerValue"
    v-bind="$attrs.props"
    :columnsType
    @cancel="_cancelSelect"
    @confirm="_confirmSelect"
  />
</template>

<script setup name="STimePicker">
const { textFormatter, initTime } = defineProps({
  // 定义用于页面显示的日期格式
  textFormatter: {
    type: Function
  },
  // 定义 TimePicker 初始选中的时间
  initTime: {
    type: String,
    default: '00:00:00'
  }
})

const fieldValue = defineModel() // formData表单值

const emit = defineEmits(['cancel', 'confirm'])

const attrs = useAttrs()
const columnsType = attrs.props.columnsType || ['hour', 'minute', 'second']

// TimePicker绑定的时间
const pickerValue = ref([])

// 值对应的文本，用于页面显示
const fieldText = computed(() => {
  if (!fieldValue.value) return ''
  const date = new Date('0001/01/01 ' + fieldValue.value)
  const mapping = {
    hour: String(date.getHours()).padStart(2, '0'),
    minute: String(date.getMinutes()).padStart(2, '0'),
    second: String(date.getSeconds()).padStart(2, '0')
  }
  const formatter = textFormatter || _defaultFormatter
  return formatter(mapping)
})

// 默认的时间格式化方法，用':'连接
function _defaultFormatter({ hour, minute, second }) {
  const result = []
  if (columnsType.includes('hour')) {
    result.push(hour)
  }
  if (columnsType.includes('minute')) {
    result.push(minute)
  }
  if (columnsType.includes('second')) {
    result.push(second)
  }
  return result.join(':')
}

// TimePicker选择器取消事件
function _cancelSelect() {
  if (attrs.props.preventDefaultCancelEvent === true) {
    return
  }
  emit('cancel')
}
// TimePicker选择器确认事件
function _confirmSelect() {
  if (attrs.props.preventDefaultConfirmEvent === true || attrs.preventDefaultGroupConfirmEvent === true) {
    return
  }
  const mapping = {
    hour: '00',
    minute: '00',
    second: '00'
  }
  columnsType.forEach((item, index) => {
    mapping[item] = pickerValue.value[index]
  })

  fieldValue.value = _defaultFormatter(mapping)
  emit('confirm')
}

// 初始化Picker绑定的值
function _initPickerValue() {
  const [hour, minute, second] = fieldValue.value ? fieldValue.value.split(':') : initTime.split(':')
  const initPickerTimeMap = { hour, minute, second }
  pickerValue.value = columnsType.map(item => initPickerTimeMap[item])
}

defineExpose({
  fieldText,
  initPickerValue: _initPickerValue
})
</script>

<style lang="scss" scoped></style>
