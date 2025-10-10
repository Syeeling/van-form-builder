<template>
  <van-field
    :model-value="fieldText"
    :is-link="!$attrs.readonly"
    v-bind="$attrs"
    :clickable="!$attrs.readonly"
    readonly
    @click="!$attrs.readonly && (showPicker = true)"
  />
  <van-popup
    v-model:show="showPicker"
    v-bind="popupProps"
    :lazy-render="false"
    @open.once="pickerRefList.forEach(i => i.initPickerValue())"
  >
    <component :is="_resolveComponent($attrs.props)" @cancel="_cancelSelect" @confirm="_confirmSelect" />
  </van-popup>
</template>

<script setup name="PickerGroup">
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

// formData表单值
const fieldValue = defineModel()
// 如果fieldValue不是数组，则给fieldValue赋值为[]
if (!Array.isArray(fieldValue.value)) {
  fieldValue.value = []
}

const attrs = useAttrs()

// picker组件映射
const pickerTypes = {
  datePicker: SDatePicker,
  timePicker: STimePicker,
  select: SPicker
}

const _resolveComponent = props =>
  h(
    VanPickerGroup,
    { nextStepText: '下一步', ...props },
    {
      ...props.slots,
      default: () =>
        attrs.pickerList.map((item, index) =>
          h(pickerTypes[item.formType], {
            ...{ props: {}, ...item },
            key: index,
            modelValue: fieldValue.value?.[index],
            'onUpdate:modelValue': val => (fieldValue.value[index] = val),
            preventDefaultGroupConfirmEvent: props.preventDefaultConfirmEvent,
            ref: 'pickerList',
            ref_for: true
          })
        )
    }
  )

const pickerRefList = useTemplateRef('pickerList')

const showPicker = ref(false)

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
