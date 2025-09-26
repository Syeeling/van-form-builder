<template>
  <van-field :model-value="fieldText" is-link readonly v-bind="$attrs" @click="showPicker = true" />
  <van-popup
    v-model:show="showPicker"
    v-bind="popupProps"
    :lazy-render="false"
    @open.once="pickerRef.initPickerValue()"
  >
    <s-picker
      ref="picker"
      v-model="fieldValue"
      v-bind="$attrs"
      @cancel="showPicker = false"
      @confirm="showPicker = false"
    />
  </van-popup>
</template>

<script setup name="Select">
import SPicker from '../Pickers/SPicker.vue'

const { popupProps } = defineProps({
  popupProps: Object
})

const pickerRef = useTemplateRef('picker')

// formData表单值
const fieldValue = defineModel()
const showPicker = ref(false)

// 值对应的文本，用于页面显示
const fieldText = computed(() => pickerRef.value?.fieldText || '')
</script>

<style lang="scss" scoped></style>
