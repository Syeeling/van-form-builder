<template>
  <van-form ref="formRef" class="van-form-builder" v-bind="{ ...defaultFormProps, ...formProps, ...$attrs }">
    <van-form-item v-for="item in formItems" :key="item.name" :form-item="item" :formData :fieldProps :popupProps>
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </van-form-item>
  </van-form>
</template>

<script setup name="VanFormBuilder">
import VanFormItem from './VanFormItem.vue'

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

<style scoped lang="scss">
.van-form-builder {
  --readonly-opacity: 0.5;
}
:deep() .van-field__label {
  flex: none;
}
:deep() .van-field.readonly .van-field__control {
  color: var(--van-text-color-2);
}
</style>
