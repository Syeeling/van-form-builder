<template>
  <van-field :model-value="fieldText" is-link readonly v-bind="$attrs" @click="showPicker = true" />
  <van-popup
    v-model:show="showPicker"
    v-bind="popupProps"
    :lazy-render="false"
    @open.once="pickerRefList.forEach(i => i.initPickerValue())"
  >
    <van-picker-group next-step-text="下一步" v-bind="$attrs.props" @cancel="_cancelSelect" @confirm="_confirmSelect">
      <component
        v-for="(item, index) in $attrs.pickerList"
        :key="index"
        :is="pickerTypes[item.formType]"
        v-model="fieldValue[index]"
        v-bind="{ props: {}, ...item }"
        :preventDefaultGroupConfirmEvent="$attrs.props.preventDefaultConfirmEvent"
        ref="pickerList"
      />
    </van-picker-group>
  </van-popup>
</template>

<script setup name="SyPickerGroup">
import SDatePicker from '../Pickers/SDatePicker.vue'
import STimePicker from '../Pickers/STimePicker.vue'
import SPicker from '../Pickers/SPicker.vue'

const { popupProps, separator } = defineProps({
  popupProps: Object,
  // 多个picker文本拼接的分隔符
  separator: {
    type: String,
    default: ','
  }
})

const attrs = useAttrs()
const pickerRefList = useTemplateRef('pickerList')

// formData表单值
const fieldValue = defineModel()
// 如果fieldValue不是数组，则给fieldValue赋值为[]
if (!Array.isArray(fieldValue.value)) {
  fieldValue.value = []
}

const showPicker = ref(false)

// picker组件映射
const pickerTypes = {
  datePicker: SDatePicker,
  timePicker: STimePicker,
  select: SPicker
}

// 值对应的文本，用于页面显示。逻辑为多个picker的fieldText拼接，用separator分隔
const fieldText = computed(() => {
  const text = pickerRefList.value?.map(item => item.fieldText).join(separator)
  return _removeSuffixSeparator(text, separator) // 移除末尾的分隔符
})

// PickerGroup取消事件
function _cancelSelect() {
  if (attrs.props.preventDefaultCancelEvent === true) {
    return
  }
  showPicker.value = false
}
// PickerGroup确认事件
function _confirmSelect() {
  if (attrs.props.preventDefaultConfirmEvent === true) {
    return
  }
  showPicker.value = false
}

// 工具函数，移除字符串末尾的分隔符
function _removeSuffixSeparator(str, sep) {
  while (sep !== '' && str && str.endsWith(sep)) {
    str = str.slice(0, -sep.length)
  }
  return str
}
</script>

<style lang="scss" scoped></style>
