<template>
  <component
    :is="_renderTimePicker()"
    v-model="pickerValue"
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
  // 定义 VanTimePicker 初始选中的时间
  initTime: {
    type: String,
    default: '00:00:00'
  }
})

// formData表单值
const fieldValue = defineModel()

const emit = defineEmits(['cancel', 'confirm'])

const attrs = useAttrs()
const columnsType = attrs.props.columnsType || ['hour', 'minute', 'second']

const _renderTimePicker = () => h(VanTimePicker, attrs.props, attrs.props.slots)

// TimePicker绑定的时间
const pickerValue = ref([])

// 值对应的文本，用于页面显示
const fieldText = computed(() => {
  if (!fieldValue.value) return ''
  const mapping = {
    hour: '00',
    minute: '00',
    second: '00'
  }
  // fieldValue是已经按照时、分、秒排序的，所以需要将columnsType也按照时、分、秒的顺序排序，才能使mapping的值映射正确
  const _columnsTypeSorted = ['hour', 'minute', 'second'].filter(i => columnsType.includes(i))
  _columnsTypeSorted.forEach((item, index) => {
    mapping[item] = fieldValue.value.split(':')[index]
  })
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
  const mapping = {
    hour: '00',
    minute: '00',
    second: '00'
  }
  const _columnsTypeSorted = ['hour', 'minute', 'second'].filter(i => columnsType.includes(i))
  const _initValue = fieldValue.value ? fieldValue.value.split(':') : initTime.split(':')
  _columnsTypeSorted.forEach((item, index) => {
    mapping[item] = _initValue[index]
  })
  pickerValue.value = columnsType.map(item => mapping[item])
}

defineExpose({
  fieldText,
  initPickerValue: _initPickerValue
})
</script>

<style lang="scss" scoped></style>
