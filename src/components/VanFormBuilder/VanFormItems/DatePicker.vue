<template>
  <component :is="_renderField()" />
  <van-popup
    v-model:show="showPicker"
    v-bind="popupProps"
    :lazy-render="false"
    @open.once="pickerRef.initPickerValue()"
  >
    <s-date-picker
      ref="picker"
      v-model="fieldValue"
      v-bind="attrs"
      @cancel="showPicker = false"
      @confirm="showPicker = false"
    />
  </van-popup>
</template>

<script setup name="DatePicker">
import SDatePicker from '../Pickers/SDatePicker.vue'

const { popupProps } = defineProps({
  popupProps: Object
})

const attrs = useAttrs()
const pickerRef = useTemplateRef('picker')

// formData表单值
const fieldValue = defineModel()
const showPicker = ref(false)

// 值对应的文本，用于页面显示
const fieldText = computed(() => pickerRef.value?.fieldText || '')

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
</script>

<style lang="scss" scoped></style>
