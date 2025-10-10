<template>
  <van-field
    :model-value="fieldText"
    :is-link="!$attrs.readonly"
    v-bind="$attrs"
    :clickable="!$attrs.readonly"
    readonly
    @click="!$attrs.readonly && (showPicker = true)"
  />
  <van-popup v-model:show="showPicker" v-bind="popupProps" @open.once="_initPickerValue">
    <van-multiple-picker
      v-model="pickerValue"
      v-bind="$attrs.props"
      @cancel="_cancelSelect"
      @confirm="_confirmSelect"
    />
  </van-popup>
</template>

<script setup name="MultipleSelect">
import VanMultiplePicker from '../ExtComps/VanMultiplePicker/VanMultiplePicker.vue'

const { popupProps, separator } = defineProps({
  popupProps: Object,
  // 多个选项文本之间的分隔符
  separator: {
    type: String,
    default: ','
  }
})

const attrs = useAttrs()

// formData表单值
const fieldValue = defineModel()
const showPicker = ref(false)

// Picker绑定的值
const pickerValue = ref([])

// 值对应的文本，用于页面显示
const fieldText = computed(() => {
  return attrs.props.options
    ?.filter(op => fieldValue.value?.includes(op.value))
    .map(i => i.text)
    .join(separator)
})

// Picker选择器取消事件
function _cancelSelect() {
  if (attrs.props.preventDefaultCancelEvent === true) {
    return
  }
  showPicker.value = false
}
// Picker选择器确认事件
function _confirmSelect() {
  if (attrs.props.preventDefaultConfirmEvent === true) {
    return
  }
  fieldValue.value = pickerValue.value
  showPicker.value = false
}

// 初始化Picker绑定的值
function _initPickerValue() {
  pickerValue.value = attrs.props.options?.filter(op => fieldValue.value?.includes(op.value)).map(i => i.value)
}
</script>

<style lang="scss" scoped>
:deep() .van-checkbox__icon--round {
  --van-checkbox-size: 36px;
}
</style>
