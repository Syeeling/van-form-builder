<template>
  <van-cell-group v-if="formItem.formType === 'cellGroup' && !formItem.hidden" v-bind="formItem.props">
    <van-form-item
      v-for="item in formItem.formItems"
      :key="item.name"
      :form-item="item"
      :formData
      :fieldProps
      :popupProps
    />
  </van-cell-group>
  <component
    v-else-if="!formItem.hidden"
    :is="formItemTypes[formItem.formType]"
    v-model="formData[formItem.name]"
    v-bind="{ props: {}, ...defaultFieldProps, ...fieldProps, ...formItem }"
    :popupProps="{ ...defaultPopupProps, ...popupProps, ...formItem.popupProps }"
  />
</template>

<script setup name="VanFormItem">
import formItemTypes from './formItemTypes.js'

const { formItem, formData, fieldProps, popupProps } = defineProps({
  formItem: {
    type: Object,
    required: true
  },
  formData: {
    type: Object,
    required: true
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

// van-field 默认属性
const defaultFieldProps = {
  arrowDirection: 'down'
}

// van-popup 默认属性
const defaultPopupProps = {
  position: 'bottom',
  round: true,
  safeAreaInsetBottom: true
}
</script>

<style lang="scss" scoped></style>
