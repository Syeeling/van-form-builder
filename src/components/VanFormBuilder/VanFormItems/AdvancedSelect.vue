<template>
  <van-field
    :model-value="fieldText"
    :is-link="!$attrs.readonly"
    v-bind="$attrs"
    :clickable="!$attrs.readonly"
    readonly
    @click="!$attrs.readonly && (showPicker = true)"
  />
  <van-popup v-model:show="showPicker" v-bind="popupProps" :lazy-render="false" @open.once="_initPickerValue">
    <component
      ref="advancedPickerRef"
      v-model="pickerValue"
      :is="_resolveComponent($attrs.props)"
      @cancel="_cancelSelect"
      @confirm="_confirmSelect"
    />
  </van-popup>
</template>

<script setup name="AdvancedSelect">
import VanAdvancedPicker from '../ExtComps/VanAdvancedPicker/VanAdvancedPicker.vue'

const _resolveComponent = props => h(VanAdvancedPicker, props, props.slots)

const { popupProps, separator } = defineProps({
  popupProps: Object,
  // 多个选项文本之间的分隔符
  separator: {
    type: String,
    default: ','
  }
})

const attrs = useAttrs()

const advancedPickerRef = useTemplateRef('advancedPickerRef')

// formData表单值
const fieldValue = defineModel()
const showPicker = ref(false)

// Picker绑定的值
const pickerValue = ref([])

// 值对应的文本，用于页面显示
const fieldText = computed(() => {
  return advancedPickerRef.value?.options
    .filter(op =>
      attrs.props.mode === 'single' ? op.value === fieldValue.value : fieldValue.value?.includes(op.value)
    )
    .map(i => i.title)
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
  if (!fieldValue.value) {
    return
  }
  switch (attrs.props.mode) {
    case 'single':
      pickerValue.value = fieldValue.value
      break
    case 'multiple':
      pickerValue.value = advancedPickerRef.value?.options
        .filter(op => fieldValue.value?.includes(op.value))
        .map(i => i.value)
  }
}
</script>

<style lang="scss" scoped>
:deep() .van-checkbox__icon--round {
  --van-checkbox-size: 36px;
}
:deep() .van-radio__icon--round {
  --van-radio-size: 36px;
}
</style>
