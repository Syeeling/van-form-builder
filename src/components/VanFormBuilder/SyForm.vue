<template>
  <van-form ref="formRef" class="sy-form" v-bind="{ ...defaultFormProps, ...formProps, ...$attrs }">
    <sy-form-item v-for="item in formItems" :key="item.name" :form-item="item" :formData :fieldProps :popupProps />
  </van-form>
</template>

<script setup name="SyForm">
import SyFormItem from './SyFormItem.vue'

const formData = defineModel()
const { formItems, formProps, fieldProps, popupProps } = defineProps({
  formItems: {
    type: Array,
    required: true
  },
  formProps: {
    type: Object,
    default: () => ({})
  },
  fieldProps: {
    type: Object,
    default: () => ({})
  },
  popupProps: {
    type: Object,
    default: () => ({})
  }
})

// van-form 默认属性
const defaultFormProps = {
  required: 'auto'
  // showError: true,
  // showErrorMessage: false
}

const formRef = useTemplateRef('formRef')

defineExpose({
  formRef
})
</script>

<style scoped lang="scss"></style>
